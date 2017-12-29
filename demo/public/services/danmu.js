(() => {
  angular.module('App').factory('danmuService', danmuService);
  danmuService.$inject = ['API_BASE_URL', '$resource'];

  function danmuService(API_BASE_URL, $resource) {
    const service = {
      getDanmu,
      getCustomizedDanmu,
      getQuestions,
      getCustomizedQuestions,
    };
    return service;

    function getDanmu(params) {
      return $resource(`${API_BASE_URL}/danmu`, null, {}).get(params).$promise;
    }

    function getCustomizedDanmu(params) {
      return $resource(`${API_BASE_URL}/danmu/customize`, null, {}).get(params).$promise;
    }
    function getQuestions(params) {
      return $resource(`${API_BASE_URL}/danmu/qa`, null, {
        get: {
          method: 'GET',
          cache: true,
        }
      }).get(params).$promise;
    }

    function getCustomizedQuestions(params) {
      return $resource(`${API_BASE_URL}/danmu/qa/customize`, null).get(params).$promise;
    }
  }
})();
