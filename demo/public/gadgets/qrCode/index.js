(() => {
  angular.module('App').component('qrCode', {
    templateUrl: '/gadgets/qrCode/template.html',
    controller: qrCodeCtrl,
    controllerAs: 'vm',
  });
  qrCodeCtrl.$inject = [
  ];

  function qrCodeCtrl(
  ) {
    const vm = this;

  }
})();
