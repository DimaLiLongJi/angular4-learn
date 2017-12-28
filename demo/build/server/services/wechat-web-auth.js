'use strict';

let getUserByWebAuth = (() => {
  var _ref = _asyncToGenerator(function* (code) {
    try {
      const accessInfo = yield getAccessInfo(code);
      const accessToken = accessInfo.access_token;
      const openId = accessInfo.openid;
      const user = yield getWechatUserInfo(accessToken, openId);
      return user;
    } catch (e) {
      return e;
    }
  });

  return function getUserByWebAuth(_x) {
    return _ref.apply(this, arguments);
  };
})();

let userWebAuth = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    const token = req.cookies.wechatToken;
    let authUser;
    if (token) {
      try {
        authUser = yield cipherService.parseToken(token);
      } catch (e) {
        logger.info('user web auth err is', e);
        return redirectWechatAuth(req, res);
      }

      if (authUser && authUser.id) {
        req.user = authUser;
        return next();
      }
      res.clearCookie('wechatToken');
      return redirectWechatAuth(req, res);
    }
    return redirectWechatAuth(req, res);
  });

  return function userWebAuth(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let redirectWechatAuth = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const agent = ua(req.headers['user-agent']);
    const originalUrl = req.query.originalUrl ? req.query.originalUrl : '/';
    const utmArr = req.cookies.utm || [];
    let lastUtmInfo = {};
    if (utmArr.length) {
      lastUtmInfo = utmArr[utmArr.length - 1];
    }
    const echoStr = randomString.generate() + new Date().getTime();
    let redirectUrl = `${baseUrls.API_BASE_URL}/wechat/web_auth?originalUrl=${encodeURIComponent(originalUrl)}`;
    if (lastUtmInfo) {
      redirectUrl += `&utmSource=${lastUtmInfo.utm_source}&utmMedium=${lastUtmInfo.utm_medium}&utmCampaign=${lastUtmInfo.utm_campaign}`;
    }
    let url;
    redirectUrl += `&echoStr=${echoStr}`;
    if (agent.mobile) {
      url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatCollegeAssistant.appID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
      res.cookie('echoStr', echoStr, {
        maxAge: 60 * 60 * 1000 // 1h
      });
      return res.redirect(url);
    }

    url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatCollegeAssistant.appID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
    res.cookie('echoStr', echoStr, {
      maxAge: 60 * 60 * 1000 // 1h
    });
    return QRCode.toFileStream(res, url);
  });

  return function redirectWechatAuth(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let getAccessInfo = (() => {
  var _ref4 = _asyncToGenerator(function* (code) {
    const reqCodeUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechatCollegeAssistant.appID}&secret=${wechatCollegeAssistant.appsecret}&code=${code}&grant_type=authorization_code`;
    const reqCodeOption = {
      uri: reqCodeUrl,
      json: true
    };
    const accessInfo = yield rp(reqCodeOption);
    return accessInfo;
  });

  return function getAccessInfo(_x7) {
    return _ref4.apply(this, arguments);
  };
})();

let getWechatUserInfo = (() => {
  var _ref5 = _asyncToGenerator(function* (accessToken, openId) {
    const reqUserUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`;
    const reqUserOption = {
      uri: reqUserUrl,
      json: true
    };
    const userInfo = yield rp(reqUserOption);
    return userInfo;
  });

  return function getWechatUserInfo(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
  getUserByWebAuth,
  wechatApiAuth,
  userWebAuth
};

const rp = require('request-promise');
const wechatCollegeAssistant = require('config').wechatCollegeAssistant;
const sha1 = require('sha1');
const baseUrls = require('config').baseUrls;
const ua = require('../utils/userAgent');
const QRCode = require('qrcode');
const cipherService = require('./cipher-service');
const randomString = require('randomstring');
const logger = require('../utils/logger')('wechat-web-auth');

function wechatApiAuth(req, res, next) {
  const token = wechatCollegeAssistant.token;
  const signature = req.query.signature;
  const nonce = req.query.nonce;
  const timestamp = req.query.timestamp;
  const echostr = req.query.echostr;
  const str = [token, timestamp, nonce].sort().join('');
  const sha = sha1(str);

  if (sha === signature) {
    if (req.method === 'GET' || req.Method === 'GET') {
      return res.send(echostr);
    }
    return next();
  }
  return res.send('err');
}