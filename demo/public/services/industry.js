(() => {
  angular.module('App').factory('industryService', industryService);
  industryService.$inject = ['$resource', 'API_BASE_URL'];

  function industryService($resource, API_BASE_URL) {
    const service = {
      getList
    };
    return service;

    function getList(params) {
      return $resource(`${API_BASE_URL}/industries`).query(params).$promise;
    }
  }
})();
