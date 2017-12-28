const cfAdminService = require('./cf-admin-service');

module.exports = {
  getList,
  getDetail,
};

function getList(params) {
  const requestOption = {
    method: 'GET',
    uri: 'activities',
    qs: params,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption)
    .catch(err => err);
}

function getDetail(activityId) {
  if (!activityId) {
    return Promise.reject({ err: '参数缺失', });
  }
  const requestOption = {
    method: 'GET',
    uri: `activities/${activityId}`,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}
