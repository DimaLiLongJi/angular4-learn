module.exports = {
  processEventPush,
};

const buildXml = require('../utils/genWechatXml');
const wechatService = require('./wechat');
const subcribeIndustry = require('../config/subcribeIndustry');
const subscriptionService = require('./user/subscription');
const userService = require('./user/auth');
const logger = require('../utils/logger')('wechat-callback');
const wechatAutoReplyMsg = require('../config/wechatAutoReply');

async function processEventPush(req, res, next) {
  const params = req.body.xml;
  logger.info('wechat params==', req.body.xml);
  const openId = params.FromUserName;
  try {
    if (params.MsgType === 'event') {
      logger.info('MsgType event');
      const result = await processEvent(openId, params);
      return res.send(result);
    } else if (params.MsgType === 'text') {
      logger.info('MsgType text');
      const result = await processMessage(openId, params);
      return res.send(result);
    }
  } catch (e) {
    logger.error('processEventPush error=', e, 'params=', params);
  }

  return next();
}

async function processEvent(openId, params) {
  const event = params.Event.toUpperCase();
  let result = '';
  if (event === 'SUBSCRIBE' || event === 'UNSUBSCRIBE') {
    result = await processSubcribe(openId, params);
    return result;
  }
  if (event === 'SCAN') {
    result = await processScan(openId, params);
    return result;
  }
  if (event === 'CLICK') {
    result = processClick(openId, params);
    return result;
  }
  return result;
}

async function processSubcribe(openId, params) {
  const event = params.Event.toUpperCase();
  let echoParams;
  if (params.EventKey && typeof params.EventKey === 'string') {
    params.EventKey = params.EventKey.replace(/qrscene_/, '');
    echoParams = buildEchoUtm(params);
  }

  const checkUser = await userService.getUserInfo({ openId, });
  let message = '';
  if (!checkUser && event === 'SUBSCRIBE') {
    await registerUser(openId, params, echoParams);
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
    await userService.updateUserInfo(params);
    message = wechatAutoReplyMsg.welcomeMsg;
  } else if (checkUser && event === 'UNSUBSCRIBE') {
    params.subscribe = 0;
    params.openId = openId;
    await userService.updateUserInfo(params);
    await subscriptionService.destroy(checkUser.id).catch(err => err);
    message = '退订成功';
  }
  const data = {
    ToUserName: openId,
    FromUserName: params.ToUserName,
    CreateTime: new Date().getTime(),
    MsgType: 'text',
    Content: message,
  };

  return buildXml(data);
}

async function processScan(openId, params) {
  const subscribeReg = /subscribe_/g;
  const message = wechatAutoReplyMsg.welcomeMsg;
  const data = {
    ToUserName: openId,
    FromUserName: params.ToUserName,
    CreateTime: new Date().getTime(),
    MsgType: 'text',
    Content: message,
  };
  if (params.EventKey && typeof params.EventKey === 'string' && subscribeReg.test(params.EventKey)) {
    const echoParams = buildEchoUtm(params);

    const checkUser = await userService.getUserInfo({ openId, });
    if (checkUser) {
      params.subscribe = 1;
      params.openId = openId;
      params.echoStr = echoParams ? echoParams.qrScene : null;
      if (echoParams.utm) {
        params.utmSource = echoParams.utm.source;
        params.utmMedium = echoParams.utm.medium;
        params.utmCampaign = echoParams.utm.campaign;
      }
      await userService.updateUserInfo(params);
    } else {
      await registerUser(openId, params, echoParams);
    }
  }

  return buildXml(data);
}

async function processClick(openId, params) {
  if (params.EventKey === 'subcribe_recruit_message') {
    const data = {
      ToUserName: openId,
      FromUserName: params.ToUserName,
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      Content: wechatAutoReplyMsg.subscribeMsg,
    };
    return buildXml(data);
  }
  if (params.EventKey === 'user_response') {
    const data = {
      ToUserName: openId,
      FromUserName: params.ToUserName,
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      Content: wechatAutoReplyMsg.feedbackMsg,
    };
    return buildXml(data);
  }
  return '';
}

async function processMessage(openId, params) {
  const reg = /\W/g;
  const regSubscribe = /[^a-zA-z]/g;
  const content = params.Content.toLowerCase().replace(reg, '');
  let msg;

  if (!content || content === '' || regSubscribe.test(content)) {
    const data = {
      ToUserName: openId,
      FromUserName: params.ToUserName,
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      Content: wechatAutoReplyMsg.feedbackReplyMsg,
    };
    return buildXml(data);
  }
  let user = await userService.getUserInfo({ openId, }).catch(err => err);

  if (!user || !user.id) {
    const userInfo = await wechatService.getSubcribeUserInfo(openId);
    userInfo.subscribe = 1;
    user = await userService.signIn(userInfo)
      .catch(err => err);
  }

  // subscribe message
  if (content !== 'td' && content !== 'gd') {
    msg = await genMessageSubscribe(content, user);
  } else if (content === 'td') {
    // td message
    msg = await genMessageTD(user);
  } else if (content === 'gd') {
    // gd message
    msg = await genMessageGD(user);
  } else {
    msg = wechatAutoReplyMsg.feedbackReplyMsg;
  }

  const data = {
    ToUserName: openId,
    FromUserName: params.ToUserName,
    CreateTime: new Date().getTime(),
    MsgType: 'text',
    Content: msg,
  };
  return buildXml(data);
}

async function genMessageSubscribe(content, user) {
  let industry = '';
  let msg;
  try {
    for (let i = 0; i <= content.length - 1; i++) {
      const key = content[i];
      if (subcribeIndustry[key] && subcribeIndustry[key].id) {
        await subscriptionService.create(user.id, { industryId: subcribeIndustry[key].id, });
        industry += `【${subcribeIndustry[key].name}】`;
      }
    }
  } catch (e) {
    logger.debug('createUserSubscripiton err=', e, 'params=', { content, user, });
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
}

async function genMessageTD(user) {
  let msg;
  const checkSubscribe = await subscriptionService.getUserSubscription(user.id);
  if (!checkSubscribe || checkSubscribe.length === 0) {
    msg = wechatAutoReplyMsg.unsubscribeErrMsg;
  } else {
    msg = wechatAutoReplyMsg.unsubscribeMsg;
    await subscriptionService.destroy(user.id).catch(err => err);
  }
  return msg;
}

async function genMessageGD(user) {
  let msg;
  const checkSubscribe = await subscriptionService.getUserSubscription(user.id);
  if (!checkSubscribe || checkSubscribe.length === 0) {
    msg = wechatAutoReplyMsg.unsubscribeMsg;
  } else {
    msg = wechatAutoReplyMsg.subscribeMsg;
    try {
      await subscriptionService.destroy(user.id);
    } catch (e) {
      logger.debug('clearUserSubscripiton err=', e, 'params=', { user, });
    }
  }
  return msg;
}

async function registerUser(openId, params, echoParams) {
  params.openId = openId;
  const userInfo = await wechatService.getSubcribeUserInfo(openId);
  userInfo.subscribe = 1;
  userInfo.echoStr = echoParams ? echoParams.qrScene : null;
  if (echoParams && echoParams.utm) {
    userInfo.utmSource = echoParams.utm.source;
    userInfo.utmMedium = echoParams.utm.medium;
    userInfo.utmCampaign = echoParams.utm.campaign;
  }
  await userService.signIn(userInfo)
    .catch(err => err);
}

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
  return { utm, qrScene, };
}
