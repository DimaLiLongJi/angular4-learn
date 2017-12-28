'use strict';

let processEventPush = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    const params = req.body.xml;
    logger.info('wechat params==', req.body.xml);
    const openId = params.FromUserName;
    try {
      if (params.MsgType === 'event') {
        logger.info('MsgType event');
        const result = yield processEvent(openId, params);
        return res.send(result);
      } else if (params.MsgType === 'text') {
        logger.info('MsgType text');
        const result = yield processMessage(openId, params);
        return res.send(result);
      }
    } catch (e) {
      logger.error('processEventPush error=', e, 'params=', params);
    }

    return next();
  });

  return function processEventPush(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

let processEvent = (() => {
  var _ref2 = _asyncToGenerator(function* (openId, params) {
    const event = params.Event.toUpperCase();
    let result = '';
    if (event === 'SUBSCRIBE' || event === 'UNSUBSCRIBE') {
      result = yield processSubcribe(openId, params);
      return result;
    }
    if (event === 'SCAN') {
      result = yield processScan(openId, params);
      return result;
    }
    if (event === 'CLICK') {
      result = processClick(openId, params);
      return result;
    }
    return result;
  });

  return function processEvent(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

let processSubcribe = (() => {
  var _ref3 = _asyncToGenerator(function* (openId, params) {
    const event = params.Event.toUpperCase();
    let echoParams;
    if (params.EventKey && typeof params.EventKey === 'string') {
      params.EventKey = params.EventKey.replace(/qrscene_/, '');
      echoParams = buildEchoUtm(params);
    }

    const checkUser = yield userService.getUserInfo({ openId });
    let message = '';
    if (!checkUser && event === 'SUBSCRIBE') {
      yield registerUser(openId, params, echoParams);
      message = wechatAutoReplyMsg.welcomeMsg;
    } else if (checkUser && event === 'SUBSCRIBE') {
      // TODO create activity record
      params.subscribe = 1;
      params.openId = openId;
      params.echoStr = echoParams ? echoParams.qrScene : null;
      if (echoParams && echoParams.utm) {
        params.utmSource = echoParams.utm.source;
        params.utmMedium = echoParams.utm.medium;
        params.utmCampaign = echoParams.utm.campaign;
      }
      yield userService.updateUserInfo(params);
      message = wechatAutoReplyMsg.welcomeMsg;
    } else if (checkUser && event === 'UNSUBSCRIBE') {
      params.subscribe = 0;
      params.openId = openId;
      yield userService.updateUserInfo(params);
      yield subscriptionService.destroy(checkUser.id).catch(function (err) {
        return err;
      });
      message = '退订成功';
    }
    const data = {
      ToUserName: openId,
      FromUserName: params.ToUserName,
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      Content: message
    };

    return buildXml(data);
  });

  return function processSubcribe(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
})();

let processScan = (() => {
  var _ref4 = _asyncToGenerator(function* (openId, params) {
    const subscribeReg = /subscribe_/g;
    const message = wechatAutoReplyMsg.welcomeMsg;
    const data = {
      ToUserName: openId,
      FromUserName: params.ToUserName,
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      Content: message
    };
    if (params.EventKey && typeof params.EventKey === 'string' && subscribeReg.test(params.EventKey)) {
      const echoParams = buildEchoUtm(params);

      const checkUser = yield userService.getUserInfo({ openId });
      if (checkUser) {
        params.subscribe = 1;
        params.openId = openId;
        params.echoStr = echoParams ? echoParams.qrScene : null;
        if (echoParams.utm) {
          params.utmSource = echoParams.utm.source;
          params.utmMedium = echoParams.utm.medium;
          params.utmCampaign = echoParams.utm.campaign;
        }
        yield userService.updateUserInfo(params);
      } else {
        yield registerUser(openId, params, echoParams);
      }
    }

    return buildXml(data);
  });

  return function processScan(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
})();

let processClick = (() => {
  var _ref5 = _asyncToGenerator(function* (openId, params) {
    if (params.EventKey === 'subcribe_recruit_message') {
      const data = {
        ToUserName: openId,
        FromUserName: params.ToUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'text',
        Content: wechatAutoReplyMsg.subscribeMsg
      };
      return buildXml(data);
    }
    if (params.EventKey === 'user_response') {
      const data = {
        ToUserName: openId,
        FromUserName: params.ToUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'text',
        Content: wechatAutoReplyMsg.feedbackMsg
      };
      return buildXml(data);
    }
    return '';
  });

  return function processClick(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
})();

let processMessage = (() => {
  var _ref6 = _asyncToGenerator(function* (openId, params) {
    const reg = /\W/g;
    const regSubscribe = /[^a-zA-z]/g;
    const content = params.Content.toLowerCase().replace(reg, '');

    if (!content || content === '' || regSubscribe.test(content)) {
      const data = {
        ToUserName: openId,
        FromUserName: params.ToUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'text',
        Content: wechatAutoReplyMsg.feedbackReplyMsg
      };
      return buildXml(data);
    }
    let user = yield userService.getUserInfo({ openId }).catch(function (err) {
      return err;
    });

    if (!user || !user.id) {
      const userInfo = yield wechatService.getSubcribeUserInfo(openId);
      userInfo.subscribe = 1;
      user = yield userService.signIn(userInfo).catch(function (err) {
        return err;
      });
    }

    // subscribe message

    const msg = wechatAutoReplyMsg.feedbackReplyMsg;

    const data = {
      ToUserName: openId,
      FromUserName: params.ToUserName,
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      Content: msg
    };
    return buildXml(data);
  });

  return function processMessage(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
})();

let genMessageSubscribe = (() => {
  var _ref7 = _asyncToGenerator(function* (content, user) {
    let industry = '';
    let msg;
    try {
      for (let i = 0; i <= content.length - 1; i++) {
        const key = content[i];
        if (subcribeIndustry[key] && subcribeIndustry[key].id) {
          yield subscriptionService.create(user.id, { industryId: subcribeIndustry[key].id });
          industry += `【${subcribeIndustry[key].name}】`;
        }
      }
    } catch (e) {
      logger.debug('createUserSubscripiton err=', e, 'params=', { content, user });
    }

    if (industry === '') {
      msg = wechatAutoReplyMsg.subscribeErrMsg;
    } else {
      msg = `您已成功订阅
    ${industry}
    行业的网申信息。最新的网申信息我们将以模板消息的形式通知你。

如果需要重新选择订阅行业，请回复gd，然后重新选择你想订阅的行业。

退订请回复td`;
    }

    return msg;
  });

  return function genMessageSubscribe(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
})();

let genMessageTD = (() => {
  var _ref8 = _asyncToGenerator(function* (user) {
    let msg;
    const checkSubscribe = yield subscriptionService.getUserSubscription(user.id);
    if (!checkSubscribe || checkSubscribe.length === 0) {
      msg = wechatAutoReplyMsg.unsubscribeErrMsg;
    } else {
      msg = wechatAutoReplyMsg.unsubscribeMsg;
      yield subscriptionService.destroy(user.id).catch(function (err) {
        return err;
      });
    }
    return msg;
  });

  return function genMessageTD(_x16) {
    return _ref8.apply(this, arguments);
  };
})();

let genMessageGD = (() => {
  var _ref9 = _asyncToGenerator(function* (user) {
    let msg;
    const checkSubscribe = yield subscriptionService.getUserSubscription(user.id);
    if (!checkSubscribe || checkSubscribe.length === 0) {
      msg = wechatAutoReplyMsg.unsubscribeMsg;
    } else {
      msg = wechatAutoReplyMsg.subscribeMsg;
      try {
        yield subscriptionService.destroy(user.id);
      } catch (e) {
        logger.debug('clearUserSubscripiton err=', e, 'params=', { user });
      }
    }
    return msg;
  });

  return function genMessageGD(_x17) {
    return _ref9.apply(this, arguments);
  };
})();

let registerUser = (() => {
  var _ref10 = _asyncToGenerator(function* (openId, params, echoParams) {
    params.openId = openId;
    const userInfo = yield wechatService.getSubcribeUserInfo(openId);
    userInfo.subscribe = 1;
    userInfo.echoStr = echoParams ? echoParams.qrScene : null;
    if (echoParams && echoParams.utm) {
      userInfo.utmSource = echoParams.utm.source;
      userInfo.utmMedium = echoParams.utm.medium;
      userInfo.utmCampaign = echoParams.utm.campaign;
    }
    yield userService.signIn(userInfo).catch(function (err) {
      return err;
    });
  });

  return function registerUser(_x18, _x19, _x20) {
    return _ref10.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
  processEventPush
};

const buildXml = require('../utils/genWechatXml');
const wechatService = require('./wechat');
const subcribeIndustry = require('../config/subcribeIndustry');
const subscriptionService = require('./user/subscription');
const userService = require('./user/auth');
const logger = require('../utils/logger')('wechat-callback');
const wechatAutoReplyMsg = require('../config/wechatAutoReply');

function buildEchoUtm(params) {
  const utmReg = /utm_/g;
  const subscribeReg = /subscribe_/g;
  const sceneStr = params.EventKey.split('||')[0];
  const utmStr = params.EventKey.split('||')[1];
  let utm;
  const qrScene = sceneStr.replace(subscribeReg, '');
  try {
    utm = JSON.parse(utmStr.replace(utmReg, ''));
  } catch (e) {
    logger.error('JSON parse error is no utm params is ', params);
  }
  return { utm, qrScene };
}