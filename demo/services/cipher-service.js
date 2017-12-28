const jwt = require('jsonwebtoken');
const jwtConfig = require('config')
  .jwt;

module.exports = {
  createToken: (user) => {
    const expiresIn = user.expiresIn || jwtConfig.expiresIn;
    if (user.expiresIn) delete user.expiresIn;
    return jwt.sign(user, jwtConfig.secret, {
      expiresIn,
    });
  },
  parseToken: token =>
    new Promise((resolve, reject) => {
      jwt.verify(token, jwtConfig.secret, (err, user) => {
        if (err) {
          reject(err);
        }
        resolve(user);
      });
    }),
  verifySync: token => jwt.verify(token, jwtConfig.secret),
};
