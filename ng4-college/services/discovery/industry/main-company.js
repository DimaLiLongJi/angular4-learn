const cfAdminService = require('../../cf-admin-service');

module.exports = {
  getList,
};

function getList(params) {
  if (!params.industryId) {
    return Promise.reject({ err: '参数缺失', });
  }
  const requestOption = {
    method: 'GET',
    uri: 'college/discovery/industry/company',
    qs: params,
    json: true,
  };
  console.log('get main company params at service: ', requestOption);
  return cfAdminService.execRpWithOptions(requestOption);
}
