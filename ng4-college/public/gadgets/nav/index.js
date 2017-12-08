(() => {
  angular.module('App').component('accountNav', {
    templateUrl: '/gadgets/nav/template.html',
    controller: navCtrl,
    controllerAs: 'vm',
    bindings: {
      user: '=',
      url: '@',
    },
  });
  navCtrl.$inject = [
    '$uibModal'
  ];

  function navCtrl(
    $uibModal
  ) {
    const vm = this;

    vm.openLoginModal = openLoginModal;

    function openLoginModal() {
      let urlParams = vm.url;
      if (!urlParams) {
        urlParams = '';
      }
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
