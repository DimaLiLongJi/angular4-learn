(() => {
  angular.module('App')
    .factory('locationTagService', locationTagService);

  locationTagService.$inject = [
    '$resource',
    'API_BASE_URL'
  ];

  function locationTagService(
    $resource,
    API_BASE_URL
  ) {
    const service = {
      getLocationTagList,
    };
    return service;

    function getLocationTagList() {
      return $resource(`${API_BASE_URL}/location_tags`, {}, {
        query: {
          method: 'GET',
          cache: true,
          isArray: true,
        },
      }).query().$promise;
    }
  }
})();
