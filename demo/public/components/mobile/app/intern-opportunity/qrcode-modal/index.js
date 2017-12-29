(() => {
  angular.module('App')
    .component('qrcodeModal', {
      templateUrl: '/components/mobile/app/intern-opportunity/qrcode-modal/template.html',
      controller: qrcodeModalCtrl,
      controllerAs: 'vm',
      bindings: {
        showModal: '=',
      },
    });
  angular.module('App')
    .controller('qrcodeModalCtrl',
      qrcodeModalCtrl);

  qrcodeModalCtrl.$inject = [
    'userService',
  ];

  function qrcodeModalCtrl(
    userService,
  ) {
    const vm = this;

    vm.confirm = confirm;
    vm.cancel = cancel;
    vm.outsideClick = outsideClick;

    function cancel() {
      vm.showModal = false;
    }

    function outsideClick(event) {
      if(event.target === document.querySelector('.qr-code-modal')) {
        vm.cancel();
      }
    }
  }
})();
