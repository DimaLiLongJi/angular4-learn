'use strict';

let auth = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    if (req.query.id && req.headers['x-real-ip'] === '127.0.0.1') {
      const user = yield authService.getUserInfo({
        id: req.query.id
      });
      if (user) {
        req.user = user;
        res.cookie('wechatToken', (yield cipherService.createToken(user)));
        return next();
      }
    }
    const token = req.cookies.wechatToken;
    if (!token) {
      return next();
    }
    try {
      req.user = yield cipherService.parseToken(token);
      return next();
    } catch (e) {
      return next();
    }
  });

  return function auth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const cipherService = require('../services/cipher-service');
const authService = require('../services/user/auth');

module.exports = auth;