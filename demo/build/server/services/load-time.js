'use strict';

const cfAdminService = require('./cf-admin-service');

module.exports = {
  create,
  createUIError
};

function create(body) {
  const params = {
    method: 'post',
    uri: 'load_time',
    body
  };
  return cfAdminService.execRpWithOptions(params);
}

function createUIError(body) {
  const params = {
    method: 'post',
    uri: 'ui_error',
    body
  };
  return cfAdminService.execRpWithOptions(params);
}