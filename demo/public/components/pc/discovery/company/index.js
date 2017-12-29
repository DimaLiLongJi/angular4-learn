(() => {
    angular.module('App')
    .controller('companyListCtrl', companyListCtrl);
    companyListCtrl.$inject = [
      'companyService',
      '$rootScope'
    ];

    function companyListCtrl(companyService, $rootScope) {
      const vm = this;
      vm.totalItems = 0;
      vm.itemsPerPage = 10;
      vm.pageNum = 1;
      vm.totalItems = 0;
      vm.companyArray = [];
      vm.industryArray = [];
      vm.recommendCompanyArray = [];
      vm.selectedIndustry = {
        name: '不限',
        category: 'industry',
        id: 0,
      };

      // vm.search = search;
      // vm.searchBykeyword = searchBykeyword;
      vm.pageChanged = pageChanged;
      vm.saveStatus = saveStatus;

      function saveStatus() {
        sessionStorage.setItem('companyStatus', JSON.stringify({
          pageNum: vm.pageNum,
          selectedIndustry: vm.selectedIndustry,
        }));
      }

      $rootScope.searchBykeyword = function (keyword) {
        vm.pageNum = 1;
        vm.keyword = keyword;
        getCompanyList(buildParams());
      };

      $rootScope.search = function ({ selectedIndustry, }) {
        vm.selectedIndustry = selectedIndustry;
        vm.pageNum = 1;
        getCompanyList(buildParams());
      };

      activate();
      function activate() {
        getRecommendCompanyList();
        if (sessionStorage.getItem('searchCompanyIndustryBaike')) {
          vm.selectedIndustry = JSON.parse(sessionStorage.getItem('searchCompanyIndustryBaike')).selectedIndustry;
        }
        if (sessionStorage.getItem('searchCompanyKeywordBaike')) {
          vm.keyword = sessionStorage.getItem('searchCompanyKeywordBaike');
          return;
        }
        const companyStatus = JSON.parse(sessionStorage.getItem('companyStatus'));
        sessionStorage.clear();
        if (companyStatus && companyStatus.pageNum) {
          vm.pageNum = Number(companyStatus.pageNum);
        }
        if (companyStatus && companyStatus.selectedIndustry) {
          vm.selectedIndustry = companyStatus.selectedIndustry;
        }
        getCompanyList(buildParams());
        // sessionStorage.clear();
      }

      function pageChanged() {
        getCompanyList(buildParams());
      }

      function buildParams() {
        const params = {
          itemsPerPage: vm.itemsPerPage,
          pageNum: vm.pageNum,
        };
        if (vm.selectedIndustry.id) {
          params.industryId = vm.selectedIndustry.id;
        }
        if (vm.keyword) {
          params.keyword = vm.keyword;
        }
        return params;
      }

      function getCompanyList(params) {
        companyService.getCompanyList(params)
          .then((result) => {
            vm.totalItems = result.totalItems;
            vm.companyArray = result.companies;
          })
          .catch((error) => {
            console.error(error);
          });
      }

      function getRecommendCompanyList() {
        companyService.getRecommendCompanies()
          .then((result) => {
            vm.recommendCompanyArray = result;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
})();
