'use strict';

const cfAdminService = require('./cf-admin-service');

module.exports = {
  getTagList
};

function getTagList(category) {
  let params = {
    method: 'get',
    uri: `tags?category=${category}`
  };
  return cfAdminService.execRpWithOptions(params);
}