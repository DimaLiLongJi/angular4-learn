const cfAdminService = require('../cf-admin-service');
const logger = require('../../utils/logger')('auth-service');

module.exports = {
  signIn,
  getUserInfo,
  updateUserInfo,
};

function signIn(params) {
  const options = {
    method: 'post',
    body: params,
    uri: 'college/auth/sign_in',
    json: true,
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}

function getUserInfo(params) {
  if (!params) {
    return Promise.reject({ err: '参数缺失', });
  }
  console.log('get user info params ===', params);
  logger.log('get user info params ===', params);
  const objKeys = [];
  let flag = true;
  for (const key in params) {
    objKeys.push(key);
    if (!params[key] || params[key] === 'null' || params[key] === 'undefined'
        || params[key] === 'NULL' || params[key] === 'UNDEFINED') {
      flag = false;
    }
  }
  if (objKeys.length === 0) {
    flag = false;
  }
  if (!flag) return Promise.resolve(null);
  const options = {
    method: 'get',
    uri: 'college/auth/user_info',
    qs: params,
    json: true,
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}

function updateUserInfo(params) {
  const options = {
    method: 'put',
    body: params,
    uri: 'college/auth/user_info',
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}
