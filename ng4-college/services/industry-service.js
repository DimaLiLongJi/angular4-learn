const cfAdminService = require('./cf-admin-service');

module.exports = {
  getList
};

function getList(qs) {
  const params = {
    method: 'get',
    uri: 'industries',
    qs,
  };
  return cfAdminService.execRpWithOptions(params);
}
