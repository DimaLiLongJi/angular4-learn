'use strict';

const cfAdminService = require('./cf-admin-service');

module.exports = {
  getPrefixList
};

function getPrefixList() {
  const params = {
    method: 'get',
    uri: 'mobile-prefixs'
  };
  return cfAdminService.execRpWithOptions(params);
}