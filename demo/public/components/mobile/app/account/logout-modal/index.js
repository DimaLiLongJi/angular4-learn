(() => {
  angular.module('App')
    .component('logoutModal', {
      templateUrl: '/components/mobile/app/account/logout-modal/template.html',
      controller: logoutModalCtrl,
      controllerAs: 'vm',
      bindings: {
        showModal: '=',
      },
    });
  angular.module('App')
    .controller('logoutModalCtrl',
      logoutModalCtrl);

  logoutModalCtrl.$inject = [
    'authService'
  ];

  function logoutModalCtrl(
    authService,
  ) {
    const vm = this;

    vm.confirm = confirm;
    vm.cancel = cancel;

    function confirm() {
      authService.logout()
        .then(() => {
          window.location.href = window.location.href;
         // vm.showModal = false;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function cancel() {
      vm.showModal = false;
    }
  }
})();