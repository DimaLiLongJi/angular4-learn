const authService = require('../services/user/auth');
const cipherService = require('../services/cipher-service');
const logger = require('../utils/logger')('refresh-token');

module.exports = refreshToken;

async function refreshToken(req, res, next) {
  const user = req.user;
  if (!user) {
    return next();
  }
  return authService.getUserInfo({ id: req.user.id, })
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
      return next();
    })
    .catch((err) => {
      logger.err('refresh token err is', err);
      return next();
    });
}
