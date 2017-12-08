(() => {
  angular.module('App', [
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'ngCookies',
    'duScroll',
    'ngFileUpload',
    'ngMessages'
  ]).run();

  angular.module('App')
    .controller('discoveryCtrl', discoveryCtrl);

  discoveryCtrl.$inject = [
    '$scope',
    '$state',
    '$rootScope',
    '$uibModal',
    'IndustryList',
    '$USER'
  ];

  function discoveryCtrl(
    $scope,
    $state,
    $rootScope,
    $uibModal,
    IndustryList,
    $USER
  ) {
    const vm = this;
    vm.user = $USER;
    vm.IndustryList = IndustryList;
    $scope.state = $state;
    // vm.swichStatus = true;
    vm.swichLable = {
      on: '弹幕开启',
      off: '弹幕已关闭',
    };
    vm.imgSrc = {
      on: '/images/banner-discovery.jpg',
      off: '/images/banner-discovery.jpg',
    };

    vm.toggleBaike = toggleBaike;
    vm.keywordSearch = keywordSearch;
    vm.search = search;
    vm.openLoginModal = openLoginModal;

    if (sessionStorage.getItem('danmuSwich')) {
      vm.swichStatus = sessionStorage.getItem('danmuSwich') === 'true';
    } else {
      vm.swichStatus = true;
    }

    function toggleBaike(id) {
      if (Number(id) === Number($scope.state.params.id)) {
        return false;
      }
    }

    function search(params) {
      params.industryId = params.selectedIndustry.id;
      if (!/company/.test(location.hash)) {
        sessionStorage.setItem('searchCompanyIndustryBaike', JSON.stringify(params));
        $state.go('company');
        return;
      }
      $rootScope.search(params);
    }

    function keywordSearch(keyword) {
      if (!/company/.test(location.hash)) {
        sessionStorage.setItem('searchCompanyKeywordBaike', keyword);
        $state.go('company');
        return;
      }
      $rootScope.searchBykeyword(keyword);
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
        .then(() => {})
        .catch(() => {});
    }
  }
})();
