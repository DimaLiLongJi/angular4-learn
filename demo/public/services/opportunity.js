(function () {
  angular.module('App')
    .factory('opportunityService', opportunityService);

  opportunityService.$inject = [
    '$resource',
    'API_BASE_URL'
  ];

  function opportunityService(
    $resource,
    API_BASE_URL
  ) {
    const service = {
      getOpportunityList,
      getPrefOpportunityList,
      getIndustryStatistics,
      getDetail,
      apply,
      getLocationList,
      getPushedOpportunityList,
      getCompanyStatistics,
      getRecruitCompanyList,
      getCompanyCampusOpportunities,
      getOppCount,
      getRecruitCountdownList,
    };
    const opportunityServiceCache = {
      industry: {
      },
      companies: {

      },
    };
    return service;

    function getOpportunityList(params) {
      return $resource(`${API_BASE_URL}/opportunities`).get(params).$promise;
    }

    function getPrefOpportunityList(params) {
      return $resource(`${API_BASE_URL}/opportunities/customize`).get(params).$promise;
    }

    function getIndustryStatistics(params) {
      // if ((params.type || params.type === 0) && opportunityServiceCache.industry[params.type]) {
      //   return opportunityServiceCache.industry[params.type];
      // }
      const queryResult = $resource(`${API_BASE_URL}/opportunities/statistics/industry`).query(params).$promise;
      // opportunityServiceCache.industry[params.type] = queryResult;
      return queryResult;
    }

    function getDetail(id, viewType) {
      return $resource(`${API_BASE_URL}/opportunities/${id}`).get({
        viewType,
      }).$promise;
    }

    function apply(id, params) {
      return $resource(`${API_BASE_URL}/opportunities/${id}/application`).save(params).$promise;
    }


    function getLocationList(pms) {
      return $resource(`${API_BASE_URL}/opportunities/location/list`).query(pms).$promise;
    }

    function getPushedOpportunityList(id) {
      return $resource(`${API_BASE_URL}/opportunities/pushed/${id}`).query().$promise;
    }

    function getCompanyStatistics(params) {
      const queryResult = $resource(`${API_BASE_URL}/campus_recruits/companies/statistics`).get(params).$promise;
      return queryResult;
    }

    function getRecruitCompanyList(params) {
      return $resource(`${API_BASE_URL}/campus_recruits/companies`).get(params).$promise;
    }

    function getCompanyCampusOpportunities(companyId) {
      return $resource(`${API_BASE_URL}/campus_recruits/companies/${companyId}/opportunities`).query().$promise;
    }

    function getOppCount() {
      return $resource(`${API_BASE_URL}/opportunities/count`).get().$promise;
    }

    function getRecruitCountdownList(params) {
      return $resource(`${API_BASE_URL}/campus_recruits/countdown_list`).get(params).$promise;
    }
  }
}());
