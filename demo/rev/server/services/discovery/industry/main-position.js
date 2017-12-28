'use strict';

const cfAdminService = require('../../cf-admin-service');

module.exports = {
  getList
};

function getList(params) {
  if (!params.industryId) {
    return Promise.reject({ err: '参数缺失' });
  }
  const requestOption = {
    method: 'GET',
    uri: 'college/discovery/industry/position',
    qs: params,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}