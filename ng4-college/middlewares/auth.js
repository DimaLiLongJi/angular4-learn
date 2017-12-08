const cipherService = require('../services/cipher-service');
const authService = require('../services/user/auth');

module.exports = auth;

async function auth(req, res, next) {
  if (req.query.id && req.headers['x-real-ip'] === '127.0.0.1') {
    const user = await authService.getUserInfo({
      id: req.query.id
    });
    if (user) {
      req.user = user;
      res.cookie('wechatToken', await cipherService.createToken(user));
      return next();
    }
  }
  const token = req.cookies.wechatToken;
  if (!token) {
    return next();
  }
  try {
    req.user = await cipherService.parseToken(token);
    return next();
  } catch (e) {
    return next();
  }
}
