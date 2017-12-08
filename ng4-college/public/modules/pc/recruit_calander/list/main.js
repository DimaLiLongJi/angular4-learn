(() => {
  angular.module('App', [
    'ngCookies',
    'ngResource',
    'ui.bootstrap',
    'ngSessionStorage',
    'ngFileUpload',
    'duScroll',
    'ui.router',
    'ngMessages'
  ]).run();
})();
(() => {
  angular.module('App')
  .controller('recruitCalendarCtrl', recruitCalendarCtrl);

  recruitCalendarCtrl.$inject = [
    'subscriptionService',
    'opportunityService',
    '$sessionStorage',
    'userService',
    '$rootScope',
    '$uibModal',
    '$timeout',
    '$state',
    '$scope',
    '$USER'
  ];

  function recruitCalendarCtrl(
    subscriptionService,
    opportunityService,
    $sessionStorage,
    userService,
    $rootScope,
    $uibModal,
    $timeout,
    $state,
    $scope,
    $USER
  ) {
    const vm = this;
    vm.user = $USER;
    $scope.state = $state;
    vm.$onInit = () => {
      vm.swichLable = {
        on: '弹幕开启',
        off: '弹幕已关闭',
      };
      vm.imgSrc = {
        on: '/images/banner-recruit-no-word.jpg',
        off: '/images/banner-recruit-has-words.jpg',
      };
      $rootScope.keyword = '';

      vm.inputKeyword = inputKeyword;

      init();
    };

    function inputKeyword() {
      if ($scope.state.includes('deadline')) {
        $rootScope.searchDeadlineRecruit($rootScope.keyword);
      }
      if ($scope.state.includes('all')) {
        $rootScope.searchAllRecruit($rootScope.keyword);
      }
    }

    function init() {
      if (sessionStorage.getItem('danmuSwich')) {
        vm.swichStatus = sessionStorage.getItem('danmuSwich') === 'true';
      } else {
        vm.swichStatus = true;
      }
    }
  }
})();
