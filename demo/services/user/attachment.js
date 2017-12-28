const cfAdminService = require('../cf-admin-service');

module.exports = {
  getUserAttachments,
  create,
  destroy,
};

function getUserAttachments(userId) {
  const requestOption = {
    method: 'GET',
    uri: `college/users/${userId}/attachments`,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function create(userId, params) {
  const requestOption = {
    method: 'post',
    body: params,
    uri: `college/users/${userId}/attachments`,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function destroy(userId, attachmentId) {
  const requestOption = {
    method: 'DELETE',
    uri: `college/users/${userId}/attachments/${attachmentId}`,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}
