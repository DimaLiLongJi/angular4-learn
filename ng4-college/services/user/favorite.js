const cfAdminService = require('../cf-admin-service');

module.exports = {
  createUserFavorite,
  getUserFavorites,
  checkUserFavorite,
  cancelUserFavorites,
};

function createUserFavorite(params) {
  const options = {
    method: 'post',
    body: params,
    uri: 'college/users/favorite',
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}

function getUserFavorites(params) {
  const options = {
    method: 'get',
    uri: `college/users/${params.userId}/favorite`,
    qs: params,
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}

function checkUserFavorite(params) {
  const options = {
    method: 'get',
    uri: `college/users/${params.userId}/favorite/check`,
    qs: params,
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}

function cancelUserFavorites(params) {
  const options = {
    method: 'delete',
    uri: 'college/users/favorite',
    body: params,
  };
  return cfAdminService.execRpWithOptions(options)
    .catch(err => err);
}
