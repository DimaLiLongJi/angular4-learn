'use strict';

const cfAdminService = require('./cf-admin-service');

module.exports = {
  createAccessLog,
  isFirstAccess
};

function createAccessLog(params) {
  const requestOption = {
    method: 'post',
    body: params,
    uri: 'college/access_log',
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function isFirstAccess(params) {
  const requestOption = {
    method: 'get',
    qs: params,
    uri: 'college/access_log/is_first_access',
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}