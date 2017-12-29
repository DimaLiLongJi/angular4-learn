(() => {
  angular.module('App')
    .controller('opportunitiesCtrl', opportunitiesCtrl);

  opportunitiesCtrl.$inject = [
    'opportunityService',
    '$rootScope',
    '$document',
    '$interval',
    '$uibModal',
    '$scope'
  ];

  function opportunitiesCtrl(
    opportunityService,
    $rootScope,
    $document,
    $interval,
    $uibModal,
    $scope
  ) {
    const vm = this;

    vm.$onInit = () => {
      vm.totalItems = 0;
      vm.totalPages = 1;
      vm.params = {
        location: {
          name: '不限',
        },
        industry: {
          name: '不限',
          category: 'industry',
          id: 0,
        },
        keyword: $rootScope.keyword || '',
        pageNum: 1,
        itemsPerPage: 20,
      };
      vm.scrollTop = null;

      vm.search = search;
      vm.saveStatus = saveStatus;
      vm.openLoginModal = openLoginModal;

      activate();
    };

    $scope.$watch('vm.params', (n, o) => {
      if (n.industry.name !== o.industry.name ||
          n.location.name !== o.location.name ||
          n.keyword !== o.keyword) {
        vm.params.pageNum = 1;
      }
      getList(buildCondition());
    }, true);

    $rootScope.searchOpportunities = (keyword) => {
      vm.params.keyword = keyword;
    };

    function activate() {
      const paramsSession = sessionStorage.getItem('allOppParams');

      if (sessionStorage.getItem('danmuSwich')) {
        vm.swichStatus = sessionStorage.getItem('danmuSwich') === 'true';
      } else {
        vm.swichStatus = true;
      }

      if (paramsSession) {
        vm.params = JSON.parse(paramsSession);
        vm.scrollTop = vm.params.scrollTop;
        delete vm.params.scrollTop;
        sessionStorage.removeItem('allOppParams');
      }

      if (vm.params.keyword) {
        $rootScope.keyword = vm.params.keyword;
      }
    }

    function saveStatus() {
      const params = Object.assign({}, vm.params);
      params.scrollTop = document.documentElement.scrollTop ||
        window.pageYOffset || document.body.scrollTop;

      sessionStorage.setItem('allOppParams', JSON.stringify(params));
    }

    function search() {
      getList(buildCondition());
    }

    function scrollTo() {
      if (!vm.scrollTop) return;
      $document.scrollTopAnimated(vm.scrollTop, 500)
      .then(() => {
        vm.scrollTop = null;
      });
    }

    function buildCondition() {
      let key;
      const params = Object.assign({}, vm.params);
      for (key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }
      if (params.industry && params.industry.id) {
        params.industryId = params.industry.id;
        delete params.industry;
      }
      if (params.location && params.location.id) {
        params.locationId = params.location.id;
        delete params.location;
      }
      return params;
    }

    function getList(params) {
      opportunityService.getOpportunityList(params)
        .then((result) => {
          vm.oppArray = result.opps.map((opp) => {
            if (/default/.test(opp.company.imageUrl)) {
              opp.company.imageUrl = '/images/default-logo.jpg';
            }
            return opp;
          });
          vm.totalItems = result.totalItems;
          vm.totalPages = Math.ceil(vm.totalItems / vm.params.itemsPerPage);
          scrollTo();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function openLoginModal(urlParams) {
      const modalInstance = $uibModal.open({
        windowClass: 'small-modal login-modal',
        animation: true,
        backdrop: 'static',
        templateUrl: '/gadgets/wechat-login-modal/template.html',
        controller: 'wechatLoginCtrl',
        controllerAs: 'vm',
        resolve: {
          urlParams: () => urlParams,
        },
      });

      modalInstance.result
        .then(() => {
        })
        .catch(() => {
        });
    }
  }
})();
