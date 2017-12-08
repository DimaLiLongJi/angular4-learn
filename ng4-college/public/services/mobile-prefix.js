(() => {
  angular.module('App')
    .factory('mobilePrefixService', mobilePrefixService);

  mobilePrefixService.$inject = [
    '$resource',
    'API_BASE_URL'
  ];

  function mobilePrefixService(
    $resource,
    API_BASE_URL
  ) {
    const service = {
      getPrefixList,
    };
    return service;

    function getPrefixList() {
      return $resource(`${API_BASE_URL}/mobile-prefixs`).query().$promise;
    }
  }
})();
