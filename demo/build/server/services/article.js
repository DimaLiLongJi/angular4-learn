'use strict';

const cfAdminService = require('./cf-admin-service');

module.exports = {
  getArticle,
  getArticleDetail,
  getListGroupBycategory
};

function getArticle(params) {
  const options = {
    method: 'get',
    qs: params,
    uri: 'articles'
  };
  return cfAdminService.execRpWithOptions(options);
}

function getArticleDetail(id) {
  const options = {
    method: 'get',
    uri: `articles/${id}`
  };
  return cfAdminService.execRpWithOptions(options);
}

function getListGroupBycategory(params) {
  const options = {
    method: 'get',
    qs: params,
    uri: 'articles/group_by_category'
  };
  return cfAdminService.execRpWithOptions(options);
}