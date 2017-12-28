'use strict';

const cfAdminService = require('../cf-admin-service');

module.exports = {
  postFeedback
};

function postFeedback(params) {
  const requestOption = {
    method: 'post',
    body: params,
    uri: 'college/users/postFeedback',
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}