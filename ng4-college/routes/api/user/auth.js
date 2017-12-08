const router = require('express').Router();
const authService = require('../../../services/user/auth');
const logger = require('../../../utils/logger')('auth');
const cipherService = require('../../../services/cipher-service');
const userWebAuth = require('../../../services/wechat-web-auth').userWebAuth;
const config = require('config');

module.exports = router;

// router.post('/auth/sign_in', verifyCode, (req, res) => {
//   const params = req.body;
//   params.ip = req.headers['x-real-ip'];
//   params.urlInfo = req.headers.referer;
//   params.cookies = req.cookies;
//   return authService.signIn(params)
//     .then((result) => {
//       if (!result.err) {
//         const user = {
//           id: result.id,
//           mobile: result.mobile,
//           nickname: result.nickname,
//         };
//         const userToken = cipherService.createToken(user, req.cookies);
//         res.cookie('userToken', userToken, {
//           maxAge: 15 * 24 * 60 * 60 * 1000, // 15d
//         });
//         console.log('destroy session!!!');
//         req.session.destroy();
//         res.clearCookie('verifyCode');
//         res.clearCookie('captcha');
//       }
//       return res.send(result);
//     })
//     .catch((error) => {
//       const errorObj = {
//         msg: '用户注册失败',
//         error,
//       };
//       logger.error(errorObj);
//       return res.status(500)
//         .send(errorObj);
//     });
// });

router.get('/auth/user_info', (req, res) => {
  authService.getUserInfo(req.query)
    .then(async (result) => {
      if (result && result.id) {
        const tokenParams = {
          openId: result.openId,
          id: result.id,
          nickname: result.nickname,
          headImgUrl: result.headImgUrl,
          subscribe: result.subscribe,
          acceptPush: result.acceptPush,
        };
        const wechatToken = await cipherService.createToken(tokenParams);
        res.cookie('wechatToken', wechatToken, {
          // domain: config.domain,
          maxAge: 15 * 24 * 60 * 60 * 1000, // 15d
        });
      }
      return res.send(result);
    });
});

router.get('/auth/check_login', (req, res) => {
  return authService.getUserInfo(req.query)
    .then(async (result) => {
      if (result && result.id) {
        const tokenParams = {
          openId: result.openId,
          id: result.id,
          nickname: result.nickname,
          headImgUrl: result.headImgUrl,
          subscribe: result.subscribe,
        };
        const wechatToken = await cipherService.createToken(tokenParams);
        res.cookie('wechatToken', wechatToken, {
          // domain: config.domain,
          maxAge: 15 * 24 * 60 * 60 * 1000, // 15d
        });
      }
      return res.send(result);
    });
});

router.get('/auth/login', userWebAuth, (req, res) => {
  res.redirect(req.query.originalUrl ? req.query.originalUrl : '/');
});

router.put('/auth/pw_recover', verifyCode, (req, res) => {
  const params = req.body;
  return authService.recoverPW(params)
    .then((result) => {
      if (!result.err) {
        console.log('destroy session!!!');
        req.session.destroy();
        res.clearCookie('verifyCode');
      }
      return res.send(result);
    })
    .catch((error) => {
      const errorObj = {
        msg: '修改密码失败',
        error,
      };
      logger.error(errorObj);
      return res.status(500)
        .send(errorObj);
    });
});

router.get('/auth/check_auth', userWebAuth);

router.get('/auth/:userId(\\d+)/refresh_token', (req, res) => {
  authService.getUserInfo({ id: req.params.userId, })
    .then(async (result) => {
      if (result && result.id) {
        const tokenParams = {
          openId: result.openId,
          id: result.id,
          nickname: result.nickname,
          headImgUrl: result.headImgUrl,
          subscribe: result.subscribe,
        };
        const wechatToken = await cipherService.createToken(tokenParams);
        res.cookie('wechatToken', wechatToken, {
          // domain: config.domain,
          maxAge: 15 * 24 * 60 * 60 * 1000, // 15d
        });
      }
      res.send({ result, });
    });
});

router.get('/auth/captcha', (req, res) => {
  if (req.session.captchaCount > 3) {
    const errorObj = {
      msg: '获取验证码失败',
      error: '刷新过于频繁，请5秒后再试',
    };
    logger.error(errorObj);
    return res.status(500)
      .send(errorObj);
  }
  return authService.getCaptcha()
    .then((result) => {
      if (result) {
        req.session.captchaCount = req.session.captchaCount ? ++req.session.captchaCount : 1;
        req.session.cookie.expires = new Date(Date.now() + 5000);
        res.cookie('captcha', result[0]);
        return res.end(new Buffer(result[1]));
      }
      return res.send(result);
    })
    .catch((error) => {
      const errorObj = {
        error,
      };
      logger.error(errorObj);
      return res.status(500)
        .send(errorObj);
    });
});

router.post('/auth/send_verify_code_sms', verifyCaptcha, (req, res) => {
  const params = {
    mobile: req.body.mobile,
    prefixValue: req.body.prefixValue,
  };
  return authService.sendVerifyCodeSms(params)
    .then((result) => {
      const tenMins = 10 * 60 * 1000;
      res.cookie('verifyCode', result.verifyCode, {
        expires: new Date(Date.now() + tenMins),
      });
      req.session.verifyCode = result.verifyCode;
      req.session.cookie.expires = new Date(Date.now() + tenMins);
      res.send(result);
    })
    .catch((error) => {
      const errorObj = {
        msg: '发送短信失败',
        error,
      };
      logger.error(errorObj);
      return res.status(500)
        .send(errorObj);
    });
});

router.get('/auth/mobile_check', (req, res) => {
  const params = req.query;
  return authService.checkMobile(params)
    .then(result => res.send(result))
    .catch((error) => {
      const errorObj = {
        msg: '检查手机号失败',
        error,
      };
      logger.error(errorObj);
      return res.send(errorObj).status(500);
    });
});

router.get('/auth/logout', (req, res) => {
  res.clearCookie('wechatToken');
  res.clearCookie('echoStr');
  res.redirect('/');
});

router.post('/auth/check_verify_code', verifyCode, (req, res) =>
  res.send({ result: 1, })
);

function verifyCaptcha(req, res, next) {
  if (!req.cookies.captcha || !req.body.captcha
    || req.body.captcha.toUpperCase() !== req.cookies.captcha) {
    const errorObj = {
      msg: '图形验证码校验失败',
    };
    errorObj.error = req.cookies.captcha ? '验证码校验失败，请重新输入验证码' : '验证码已过期，请重新获取验证码';
    return res.send(errorObj).status(500);
  }
  return next();
}

function verifyCode(req, res, next) {
  // TODO
  const code = req.session.verifyCode ? req.session.verifyCode : req.cookies.verifyCode;
  if (!code || !req.body.verifyCode || code !== req.body.verifyCode.toUpperCase()) {
    const errorObj = {
      msg: '手机验证码校验失败',
    };
    errorObj.error = code ? '验证码校验失败，请重新输入验证码' : '验证码已过期，请重新获取验证码';
    logger.error(errorObj);
    return res.status(500)
      .send(errorObj);
  }
  return next();
}
