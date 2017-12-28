'use strict';

const cfAdminService = require('../cf-admin-service');

module.exports = {
  getUserLastApplication,
  create,
  checkApplyAvailable,
  getUserApplicationList
};

function getUserApplicationList(userId, params) {
  const requestOption = {
    method: 'get',
    qs: params,
    uri: `college/users/${userId}/applications`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function getUserLastApplication(userId) {
  const requestOption = {
    method: 'GET',
    uri: `college/users/${userId}/applications/latest`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function create(userId, params) {
  const requestOption = {
    method: 'post',
    body: params,
    uri: `college/users/${userId}/applications`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function checkApplyAvailable(params) {
  const requestOption = {
    method: 'get',
    uri: `college/users/${params.userId}/applications/${params.opportunityId}/available`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}