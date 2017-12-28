'use strict';

const cfAdminService = require('../cf-admin-service');

module.exports = {
  getUserSubscription,
  getIndustrySubscription,
  create,
  destroy,
  cancel
};

function getUserSubscription(userId) {
  const requestOption = {
    method: 'GET',
    uri: `college/users/${userId}/subscription`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function getIndustrySubscription(industryId) {
  const requestOption = {
    method: 'GET',
    uri: `college/users/subscription?industryId=${industryId}`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function create(userId, params) {
  const requestOption = {
    method: 'post',
    body: params,
    uri: `college/users/${userId}/subscription`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function destroy(userId) {
  const requestOption = {
    method: 'DELETE',
    uri: `college/users/${userId}/subscription`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function cancel(params) {
  const requestOption = {
    method: 'DELETE',
    uri: `college/users/${params.userId}/subscription/${params.subscriptionId}`,
    json: true
  };
  return cfAdminService.execRpWithOptions(requestOption);
}