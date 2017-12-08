(() => {
  angular.module('App')
  .controller('deadlineRecruitCtrl', deadlineRecruitCtrl);

  deadlineRecruitCtrl.$inject = [
    'subscriptionService',
    'opportunityService',
    '$sessionStorage',
    'userService',
    '$rootScope',
    '$uibModal',
    '$document',
    '$timeout',
    '$scope',
    '$USER'
  ];

  function deadlineRecruitCtrl(
    subscriptionService,
    opportunityService,
    $sessionStorage,
    userService,
    $rootScope,
    $uibModal,
    $document,
    $timeout,
    $scope,
    $USER
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.industryList = [];
      vm.expandIndustryList = true;
      vm.industryList = [];
      vm.companyArray = [];
      vm.recruitArray = [];
      vm.scrollTop = null;
      vm.paramsSession = null;
      vm.limit = 7;
      vm.params = {
        pageNum: 1,
        itemsPerPage: 10,
        industryId: 0,
        keyword: $rootScope.keyword || '',
      };

      vm.pageChanged = pageChanged;
      vm.selectIndustry = selectIndustry;
      vm.gotoCompany = gotoCompany;
      vm.showAllTags = showAllTags;

      init();
    };

    function init() {
      vm.paramsSession = sessionStorage.getItem('deadlineRecruitParams');

      if (vm.paramsSession) {
        vm.params = JSON.parse(vm.paramsSession);
        $rootScope.keyword = vm.params.keyword;
        vm.scrollTop = vm.params.scrollTop;
        delete vm.params.scrollTop;
      }


      getCompanyStatistics();
      getCompanyList(buildCondition());
    }

    $rootScope.searchDeadlineRecruit = (keyword) => {
      vm.params.keyword = keyword;
      vm.params.industryId = 0;
      getCompanyList(buildCondition());
    };

    function pageChanged() {
      getCompanyList(buildCondition());
    }

    function gotoCompany(rc) {
      saveStatus();
      window.location.href = `/company/${rc.companies[0].id}?campus=1`;
    }

    function showAllTags() {
      vm.expandIndustryList = false;
    }

    function selectIndustry(industry) {
      vm.params.pageNum = 1;
      vm.params.industryId = industry.id;
      getCompanyList(buildCondition());
    }

    function saveStatus() {
      const params = Object.assign({}, vm.params);
      params.scrollTop = document.documentElement.scrollTop ||
        window.pageYOffset || document.body.scrollTop;
      sessionStorage.setItem('deadlineRecruitParams', JSON.stringify(params));
    }

    function scrollTo() {
      if (!vm.scrollTop) return;
      $document.scrollTopAnimated(vm.scrollTop, 500)
      .then(() => {
        vm.scrollTop = null;
      });
    }

    function buildCondition() {
      const params = Object.assign({}, vm.params);
      if (!params.industryId) {
        delete params.industryId;
      }
      return params;
    }

    function getCompanyList(params) {
      opportunityService.getRecruitCountdownList(params).then((result) => {
        vm.totalItems = result.totalItems;
        vm.recruitArray = parseRecruitList(result.opportunities);
        vm.totalItems = result.totalItems;
        vm.totalPages = Math.ceil(vm.totalItems / vm.params.itemsPerPage);
        if (vm.paramsSession) {
          sessionStorage.removeItem('deadlineRecruitParams');
          scrollTo();
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    function parseRecruitList(array) {
      if (!array.length) {
        return [];
      }
      array.map((r) => {
         switch (r.status) {
          case 1:
            // r.status = {
            //   id: 1,
            //   name: '未开始',
            // };
            r.applyStatus = 'waiting';
            break;
          case 2:
            // r.status = {
            //   id: 2,
            //   name: '进行中',
            // };
            r.applyStatus = 'ongoing';
            break;
          case 3:
            // r.status = {
            //   id: 3,
            //   name: '已结束',
            // };
            r.applyStatus = 'finished';
            break;
          default:
        }
        if (r.applyStart) {
          r.applyStart = moment(r.applyStart).format('YYYY/MM/DD');
        }
        if (r.applyEnd) {
          r.applyEnd = moment(r.applyEnd).format('YYYY/MM/DD');
        } else {
          r.applyEnd = '待定';
        }
        if (!r.companies[0].industry) {
          r.companies[0].industry = {
            name: '暂无',
          };
        }
        if (!r.companies[0].size) {
          r.companies[0].size = {
            name: '暂无',
          };
        }
        if (r.applyStatus === 'unknown') {
          r.applyStatus = 'finished';
        }
        return r;
      });
      return array;
    }

    function getCompanyStatistics(params) {
      opportunityService.getCompanyStatistics(params)
        .then((result) => {
          vm.industryList = result.byIndustry.map((i) => {
            if (i.name && i.name.length > 6) {
              i.name = `${i.name.slice(0, 6)}…`;
              if (i.name.lastIndexOf('/') === 5) {
                i.name = `${i.name.slice(0, 5)}…`;
              }
            }
            if (!i.name) {
              i.name = '其它';
              i.id = -1;
            }
            return i;
          }).sort((a, b) => b.companies - a.companies);
          if (result.byIndustry.length) {
            const companyCount = result.byIndustry.map(c => c.companies).reduce((a, b) => a + b);
            vm.industryList.unshift({
              id: 0,
              name: '全部',
              companies: companyCount,
            });
          }
          // if (vm.theLastTime && (vm.industryList.length >= vm.limit)) {
          //   vm.expandIndustryList = true;
          //   vm.theLastTime = false;
          // }
        })
        .catch((error) => {
          console.error('getCompanyStatistics error', error);
        });
    }
  }
})();
