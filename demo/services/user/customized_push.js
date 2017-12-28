const cfAdminService = require('../cf-admin-service');

module.exports = {
  getListCustomizedPushByDate,
};

function getListCustomizedPushByDate(params) {
  const requestOption = {
    method: 'GET',
    uri: `college/users/${params.userId}/customized_push`,
    qs: params,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}
