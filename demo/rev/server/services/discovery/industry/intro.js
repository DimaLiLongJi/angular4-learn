'use strict';

const cfAdminService = require('../../cf-admin-service');

module.exports = {
  getDetail
};

function getDetail(params) {
  if (!params.industryId) {
    return Promise.reject({ err: '参数缺失' });
  }
  const requestOption = {
    method: 'GET',
    uri: 'college/discovery/industry/intro',
    qs: params,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption).then(result => result.industryIntro[0]);
}