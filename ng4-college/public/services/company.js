(() => {
  angular.module('App').factory('companyService', companyService);
  companyService.$inject = ['API_BASE_URL', '$resource'];

  function companyService(API_BASE_URL, $resource) {
    const service = {
      getCompanyList,
      getCompanyDetail,
      getRecommendCompanies,
      getUniversityTourCompanies,
      getUniversityTourCompanyDetail,
    };
    return service;

    function getCompanyList(params) {
      return $resource(`${API_BASE_URL}/companies`, null, {
        query: {
          isArray: false,
        },
      }).query(params).$promise;
    }

    function getCompanyDetail(companyId) {
      return $resource(`${API_BASE_URL}/companies/${companyId}`, null, {}).get().$promise;
    }

    function getRecommendCompanies() {
      return $resource(`${API_BASE_URL}/recommend_companies`, null, {}).query().$promise;
    }

    function getUniversityTourCompanies() {
      return $resource(`${API_BASE_URL}/companies/university_tour`, null, {}).query().$promise;
    }

    function getUniversityTourCompanyDetail(params) {
      if (!params.companyId) {
        return Promise.reject({
          err: '参数缺失',
        });
      }
      return $resource(`${API_BASE_URL}/companies/${params.companyId}/university_tour`).get().$promise;
    }
  }
})();
