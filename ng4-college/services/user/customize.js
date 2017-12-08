const cfAdminService = require('../cf-admin-service');

module.exports = {
  customizeUserInfo,
  getCustomizeInfo,
  getDailyPushData,
};

function customizeUserInfo(params) {
  const options = {
    method: 'post',
    body: params,
    uri: 'college/users/customize',
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}

function getCustomizeInfo(userId) {
  const options = {
    method: 'get',
    uri: `college/users/${userId}/customize`,
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}

function getDailyPushData() {
  const options = {
    method: 'get',
    uri: 'college/users/customized_push_daily',
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}
