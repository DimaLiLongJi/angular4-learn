(() => {
  angular.module('App').factory('bannerService', bannerService);
  bannerService.$inject = ['API_BASE_URL', '$resource'];

  function bannerService(API_BASE_URL, $resource) {
    const service = {
      getBanner,
    };
    return service;

    function getBanner(params) {
      return $resource(`${API_BASE_URL}/banners`, null, {}).get(params).$promise;
    }
  }
})();
