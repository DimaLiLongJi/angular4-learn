(() => {
  angular.module('App', [
    'ngResource',
    'ui.bootstrap',
    'ngFileUpload',
    'ngCookies',
    'ui.router',
    'duScroll'
    // 'ngMessages'
  ]).run();

  angular.module('App')
    .controller('opportunityCtrl', opportunityCtrl);

  opportunityCtrl.$inject = [
    '$scope',
    '$rootScope',
    'opportunityService',
    'userService',
    '$location',
    '$interval',
    '$uibModal',
    '$state',
    '$USER'
  ];

  function opportunityCtrl(
    $scope,
    $rootScope,
    opportunityService,
    userService,
    $location,
    $interval,
    $uibModal,
    $state,
    $USER
  ) {
    const vm = this;
    vm.user = $USER;
    $scope.state = $state;

    vm.$onInit = () => {
      vm.pageNum = 1;
      vm.totalItems = 0;
      vm.totalPages = 1;
      vm.itemsPerPage = 20;
      vm.params = {
        location: {
          name: '不限',
        },
        industry: {
          name: '不限',
          category: 'industry',
          id: 0,
        },
        keyword: '',
        pageNum: vm.pageNum,
        itemsPerPage: vm.itemsPerPage,
      };
      vm.swichLable = {
        on: '弹幕开启',
        off: '弹幕已关闭',
      };
      vm.imgSrc = {
        on: '/images/banner-intern-no-word.jpg',
        off: '/images/banner-intern-has-words.jpg',
      };
      $rootScope.keyword = '';

      vm.openLoginModal = openLoginModal;
      vm.inputKeyword = inputKeyword;

      activate();
    };

    function activate() {
      if (sessionStorage.getItem('danmuSwich')) {
        vm.swichStatus = sessionStorage.getItem('danmuSwich') === 'true';
      } else {
        vm.swichStatus = true;
        getOppCount();
      }
    }

    function inputKeyword() {
      if ($scope.state.includes('opportunity-recommended')) {
        $rootScope.searchOpportunityRecommended($rootScope.keyword);
      }
      if ($scope.state.includes('opportunities')) {
        $rootScope.searchOpportunities($rootScope.keyword);
      }
    }

    function checkUserCustomizationInfo() {
      userService.getCustomization({
        userId: vm.user.id,
      })
        .then((customizationInfo) => {
          if (customizationInfo.industries.length ||
              customizationInfo.locations.length ||
              customizationInfo.positions.length ||
              customizationInfo.stages.length
          ) {
            $state.go('opportunity-recommended');
          } else {
            $state.go('opportunities');
          }
        })
        .catch(error => console.error(error));
    }

    $interval(() => {
      getOppCount();
    }, 60000);

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

    function getOppCount() {
      opportunityService.getOppCount()
        .then((result) => {
          vm.oppCount = result.totalItems;
        });
    }
  }
})();
