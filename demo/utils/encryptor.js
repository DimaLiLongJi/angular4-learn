var crypto = require('crypto');

function encryptPwd(origPwd) {
  if (origPwd) {
    var shasum = crypto.createHash('sha1');
  	shasum.update(origPwd);
  	var destPwd = shasum.digest('hex');

    return destPwd;
  } else {
    return origPwd;
  }
}

module.exports = {
  encryptPwd: encryptPwd
};
