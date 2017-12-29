(() => {
  angular.module('App')
  .controller('deadlineRecruitCtrl', deadlineRecruitCtrl);

  deadlineRecruitCtrl.$inject = [
    'opportunityService',
    'companyService',
    'tagService',
    '$window',
    'BASE_URL'
  ];

  function deadlineRecruitCtrl(
    opportunityService,
    companyService,
    tagService,
    $window,
    BASE_URL
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.params = {
        selectedIndustry: {
          id: 0,
          name: '不限行业',
        },
        pageNum: 1,
        itemsPerPage: 10,
      };
      vm.totalItems = 0;
      vm.allRecruitIsLoad = false;
      vm.industryArray = [];
      vm.industrySelectorStatus = false;
      vm.list = document.querySelector('#list');

      vm.loadMoreCompanies = loadMoreCompanies;
      vm.openDetail = openDetail;
      vm.toggleIndustrySelector = toggleIndustrySelector;
      vm.selectIndustry = selectIndustry;

      activate();
    };


    function activate() {
      const sessionParams = sessionStorage.getItem('deadlineRecruit');

      if (sessionParams) {
        sessionStorage.removeItem('deadlineRecruit');
        vm.params = JSON.parse(sessionParams);
        vm.recruitArray = vm.params.recruitArray;
        vm.allRecruitIsLoad = vm.params.allRecruitIsLoad;
        vm.totalItems = vm.params.totalItems;
        scrollTo();
        delete vm.params.totalItems;
        delete vm.params.recruitArray;
        delete vm.params.allRecruitIsLoad;
      } else {
        getCompanyList(buildParams());
      }

      if (window.devicePixelRatio && devicePixelRatio >= 2) {
        vm.hairline = true;
      }
      getIndustryStatistics();
    }

    function scrollTo() {
      window.onload = () => {
        vm.list.scrollTop = vm.params.scrollTop;
        delete vm.params.scrollTop;
      };
    }

    function toggleIndustrySelector() {
      vm.industrySelectorStatus = !vm.industrySelectorStatus;
    }

    function selectIndustry(industry) {
      vm.industryArray.forEach((ind) => {
        ind.selected = false;
      });
      industry.selected = true;

      vm.params.selectedIndustry = industry;
      vm.params.pageNum = 1;
      vm.allRecruitIsLoad = false;
      toggleIndustrySelector();
      getCompanyList(buildParams());
    }

    function loadMoreCompanies() {
      vm.params.pageNum++;
      getCompanyList(buildParams(), 'scroll');
    }

    function buildParams() {
      const params = Object.assign({}, vm.params);
      if (vm.params.selectedIndustry.id) {
        params.industryId = vm.params.selectedIndustry.id;
        delete params.selectedIndustry;
      }
      return params;
    }

    // get list  methods
    function getCompanyList(params, type) {
      if (vm.allRecruitIsLoad) {
        return;
      }
      opportunityService.getRecruitCountdownList(params).then((result) => {
        vm.totalItems = result.totalItems;
        const newOppList = result.opportunities.map((opp) => {
            switch (opp.status) {
              case 1:
                opp.status = {
                  id: 1,
                  name: '未开始',
                };
                break;
              case 2:
                opp.status = {
                  id: 2,
                  name: '进行中',
                };
                break;
              case 3:
                opp.status = {
                  id: 3,
                  name: '已结束',
                };
                break;
              default:
            }
          return opp;
        });

        if (type === 'scroll') {
          vm.recruitArray = vm.recruitArray.concat(newOppList);
        } else {
          vm.recruitArray = newOppList;
        }
        if (vm.recruitArray.length === vm.totalItems) {
          vm.allRecruitIsLoad = true;
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    function getIndustryStatistics() {
      opportunityService.getIndustryStatistics().then((result) => {
        vm.industryArray = [{
          id: 0,
          name: '不限',
          count: result.map(r => r.count).reduce((c, n) => c + n),
        }];
        vm.industryArray = vm.industryArray.concat(result);
      });
    }

    function openDetail(recruit) {
      saveStatus();
      $window.location.href = `${BASE_URL}/company/${recruit.companies[0].id}?positions=true`;
    }

    function saveStatus() {
      const params = Object.assign({}, vm.params);
      params.recruitArray = vm.recruitArray;
      params.scrollTop = vm.list.scrollTop;
      params.allRecruitIsLoad = vm.allRecruitIsLoad;
      params.totalItems = vm.totalItems;
      sessionStorage.setItem('deadlineRecruit', JSON.stringify(params));
    }
  }
})();
