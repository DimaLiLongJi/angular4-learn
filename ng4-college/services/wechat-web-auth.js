module.exports = {
  getUserByWebAuth,
  wechatApiAuth,
  userWebAuth,
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

async function getUserByWebAuth(code) {
  try {
    const accessInfo = await getAccessInfo(code);
    const accessToken = accessInfo.access_token;
    const openId = accessInfo.openid;
    const user = await getWechatUserInfo(accessToken, openId);
    return user;
  } catch (e) {
    return e;
  }
}

async function userWebAuth(req, res, next) {
  const token = req.cookies.wechatToken;
  let authUser;
  if (token) {
    try {
      authUser = await cipherService.parseToken(token);
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
}

async function redirectWechatAuth(req, res) {
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
      maxAge: 60 * 60 * 1000, // 1h
    });
    return res.redirect(url);
  }

  url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatCollegeAssistant.appID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
  res.cookie('echoStr', echoStr, {
    maxAge: 60 * 60 * 1000, // 1h
  });
  return QRCode.toFileStream(res, url);
}

async function getAccessInfo(code) {
  const reqCodeUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechatCollegeAssistant.appID}&secret=${wechatCollegeAssistant.appsecret}&code=${code}&grant_type=authorization_code`;
  const reqCodeOption = {
    uri: reqCodeUrl,
    json: true,
  };
  const accessInfo = await rp(reqCodeOption);
  return accessInfo;
}

async function getWechatUserInfo(accessToken, openId) {
  const reqUserUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`;
  const reqUserOption = {
    uri: reqUserUrl,
    json: true,
  };
  const userInfo = await rp(reqUserOption);
  return userInfo;
}
