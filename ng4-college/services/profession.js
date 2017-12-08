'use strict';
const cfAdminService = require('./cf-admin-service');
const _ = require('lodash');

module.exports = {
  getList,
};

function getList() {
  const params = {
    method: 'get',
    uri: 'professions?level=1',
  };
  return cfAdminService.execRpWithOptions(params)
    .then((result) => {
      return _.reject(result, o => o.name === '其它');
    });
}
