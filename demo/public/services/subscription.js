(function () {
  angular.module('App')
    .factory('subscriptionService', subscriptionService);

  subscriptionService.$inject = [
    '$resource',
    'API_BASE_URL'
  ];

  function subscriptionService(
    $resource,
    API_BASE_URL
  ) {
    return {
      create,
      getList,
    };

    function create(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/subscription`, null, {})
        .save(params).$promise;
    }

    function getList(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/subscription`, null, {})
        .query(params).$promise;
    }
  }
}());
