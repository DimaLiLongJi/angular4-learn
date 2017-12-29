(() => {
  angular.module('App')
  .factory('materialService', materialService);

  materialService.$inject = ['API_BASE_URL', '$resource'];

  function materialService(API_BASE_URL, $resource) {
    const service = {
      getMaterials,
      countViewMaterial,
      countDownloadMaterial,
      getHotCompany,
    };
    return service;

    function getMaterials(params) {
      return $resource(`${API_BASE_URL}/materials`, null, {}).get(params).$promise;
    }

    function countViewMaterial(id) {
      return $resource(`${API_BASE_URL}/materials/${id}/view`, null, {}).get().$promise;
    }

    function countDownloadMaterial(id) {
      return $resource(`${API_BASE_URL}/materials/${id}/download`, null, {}).get().$promise;
    }

    function getHotCompany(params) {
      return $resource(`${API_BASE_URL}/materials/hot_companies`, null, {}).get(params).$promise;
    }
  }
})();
