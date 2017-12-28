'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const config = require('config');
const router = require('express').Router();
const wechatWebAuthService = require('../../services/wechat-web-auth');
const xmlParser = require('../../utils/parseXml');
const wechatApiAuth = require('../../services/wechat-web-auth').wechatApiAuth;
const cipherService = require('../../services/cipher-service');
const collegeUserService = require('../../services/user/auth');
const wechatCallbackService = require('../../services/wechat-callback');
const wechatService = require('../../services/wechat');

module.exports = router;

// router.get('/wechat/signature', (req, res) => {
//   getSignature(req.query.pageUrl)
//     .then(signature => res.send(signature))
//     .catch((error) => {
//       console.error('get ticket errored:', error);
//       res.end(error);
//     });
// });

router.get('/wechat/web_auth', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const originalUrl = req.query.originalUrl;
      const code = req.query.code;
      const utmSource = req.query.utmSource;
      const utmMedium = req.query.utmMedium;
      const utmCampaign = req.query.utmCampaign;
      const wechatUser = yield wechatWebAuthService.getUserByWebAuth(code);
      const userInfo = {
        openId: wechatUser.openid,
        nickname: wechatUser.nickname,
        headImgUrl: wechatUser.headimgurl,
        gender: wechatUser.sex,
        echoStr: req.query.echoStr,
        utmSource: utmSource && utmSource !== 'undefined' ? utmSource : null,
        utmMedium: utmMedium && utmMedium !== 'undefined' ? utmMedium : null,
        utmCampaign: utmCampaign && utmCampaign !== 'undefined' ? utmCampaign : null
      };
      const user = yield collegeUserService.signIn(userInfo);

      const tokenParams = {
        openId: userInfo.openid,
        id: user.id,
        nickname: user.nickname,
        headImgUrl: user.headImgUrl,
        subscribe: user.subscribe,
        acceptPush: user.acceptPush
      };
      const wechatToken = yield cipherService.createToken(tokenParams);
      res.cookie('wechatToken', wechatToken, {
        // domain: config.domain,
        maxAge: 15 * 24 * 60 * 60 * 1000 // 15d
      });
      return res.redirect(`${originalUrl}`);
    } catch (e) {
      console.log('err=', e);
      return e;
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

router.get('/wechat/access_token', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const token = yield wechatService.getToken();
      res.json({
        access_token: token
      });
    } catch (e) {
      console.log('get access_token error:', JSON.stringify(e));
      res.status(500).send(e);
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

router.get('/wechat/user', (req, res) => {
  return wechatService.getSubcribeUserInfo(req.query.openId).then(result => {
    res.send(result);
  });
});

router.get('/wechat/menu', (req, res) => {
  return wechatService.createCustomMenu().then(result => {
    res.send(result);
  });
});

router.get('/wechat/temp_qrcode', (req, res) => {
  const params = {
    utm: req.cookies.utm
  };
  return wechatService.getTempQrCodeTicket(params).then(result => {
    res.cookie('echoStr', result.echoStr, {
      maxAge: 60 * 60 * 1000 // 1h
    });
    res.send(result);
  });
});

router.get('/wechat/sendTemplateNotice', (req, res) => {
  return wechatService.sendSubscribeNotice().then(result => {
    res.send(result);
  });
});

router.post('/wechat/sendAnswerTemplateNotice', (req, res) => {
  return wechatService.sendAnswerTemplateNotice(req.body).then(result => {
    res.send(result);
  });
});

router.get('/wechat/callback', wechatApiAuth);

router.post('/wechat/callback', wechatApiAuth, xmlParser, wechatCallbackService.processEventPush, (req, res) => {
  res.send('success').status(200);
});

router.get('/test/token', (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const user = yield collegeUserService.getUserInfo({
      id: 1
    });
    const tokenParams = {
      openId: user.openid,
      id: user.id,
      nickname: user.nickname,
      headImgUrl: user.headImgUrl,
      subscribe: user.subscribe
    };
    const wechatToken = yield cipherService.createToken(tokenParams);
    res.cookie('wechatToken', wechatToken, {
      domain: config.domain,
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15d
    });
    return res.redirect(`${config.baseUrls.BASE_URL}`);
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());