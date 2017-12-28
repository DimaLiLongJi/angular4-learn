'use strict';

const baseUrls = require('config').baseUrls;
const cfAdminService = require('./cf-admin-service');

module.exports = {
  getList: getList,
  getDetail: getDetail
};

function getList(params) {
  const requestOption = {
    method: 'GET',
    uri: 'banners',
    qs: params,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption).catch(err => err);;
}

function getDetail(bannerId) {
  const requestOption = {
    method: 'GET',
    uri: `banners/${bannerId}`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption).catch(err => err);;
}