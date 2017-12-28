'use strict';

const cfAdminService = require('./cf-admin-service');

module.exports = {
  getLocationTagList
};

function getLocationTagList() {
  let params = {
    method: 'get',
    uri: `location_tags`
  };
  return cfAdminService.execRpWithOptions(params);
}