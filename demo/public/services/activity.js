(() => {
  angular.module('App')
    .factory('activityService', activityService);

  activityService.$inject = ['API_BASE_URL', '$resource'];

  function activityService(API_BASE_URL, $resource) {
    return {
      getActivityList,
    };

    function getActivityList(params) {
      return $resource(`${API_BASE_URL}/activities`, null, {
        query: {
          isArray: false,
        },
      }).query(params).$promise;
    }
  }
})();
