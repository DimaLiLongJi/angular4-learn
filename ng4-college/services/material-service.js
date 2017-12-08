const cfAdminService = require('./cf-admin-service');

module.exports = {
  getMaterialList,
  countViewMaterial,
  countDownloadMaterial,
  getHotCompany,
};


function getMaterialList(params) {
  const requestOption = {
    method: 'get',
    uri: 'college_materials',
    qs: params,
    json: true,
  };
  console.log('requestOption', requestOption);
  return cfAdminService.execRpWithOptions(requestOption);
}

function countViewMaterial(id) {
  const requestOption = {
    method: 'get',
    uri: `/college_materials/${id}/view`,
    json: true,
  };
  console.log('requestOption', requestOption);
  return cfAdminService.execRpWithOptions(requestOption);
}

function countDownloadMaterial(id) {
  const requestOption = {
    method: 'get',
    uri: `/college_materials/${id}/download`,
    json: true,
  };
  console.log('requestOption', requestOption);
  return cfAdminService.execRpWithOptions(requestOption);
}

function getHotCompany(params) {
  const requestOption = {
    method: 'get',
    uri: 'college_materials/hot_companies',
    qs: params,
    json: true,
  };
  console.log('requestOption', requestOption);
  return cfAdminService.execRpWithOptions(requestOption);
}
