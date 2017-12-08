(() => {
  angular.module('App').factory('discoveryService', discoveryService);
  discoveryService.$inject = ['API_BASE_URL', '$resource'];

  function discoveryService(API_BASE_URL, $resource) {
    return {
      getMainCompanyOfIndustry,
      getIntroductionOfIndustry,
      getPositionsOfIndustry,
    };

    function getMainCompanyOfIndustry(params) {
      return $resource(`${API_BASE_URL}/discovery/industry/company`, null, {})
        .get(params).$promise;
    }

    function getIntroductionOfIndustry(params) {
      return $resource(`${API_BASE_URL}/discovery/industry/intro`, null, {})
        .get(params).$promise;
    }

    function getPositionsOfIndustry(params) {
      return $resource(`${API_BASE_URL}/discovery/industry/position`, null, {})
        .get(params).$promise;
    }
  }
})();
