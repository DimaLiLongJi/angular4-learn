'use strict';

let refreshToken = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    const user = req.user;
    if (!user) {
      return next();
    }
    return authService.getUserInfo({ id: req.user.id }).then((() => {
      var _ref2 = _asyncToGenerator(function* (result) {
        if (result && result.id) {
          const tokenParams = {
            openId: result.openId,
            id: result.id,
            nickname: result.nickname,
            headImgUrl: result.headImgUrl,
            subscribe: result.subscribe
          };
          const wechatToken = yield cipherService.createToken(tokenParams);
          res.cookie('wechatToken', wechatToken, {
            // domain: config.domain,
            maxAge: 15 * 24 * 60 * 60 * 1000 // 15d
          });
        }
        return next();
      });

      return function (_x4) {
        return _ref2.apply(this, arguments);
      };
    })()).catch(function (err) {
      logger.err('refresh token err is', err);
      return next();
    });
  });

  return function refreshToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const authService = require('../services/user/auth');
const cipherService = require('../services/cipher-service');
const logger = require('../utils/logger')('refresh-token');

module.exports = refreshToken;