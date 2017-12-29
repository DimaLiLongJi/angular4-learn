(() => {
  angular.module('App').component('swich', {
    templateUrl: '/gadgets/swich/template.html',
    controller: swichCtrl,
    controllerAs: 'vm',
    bindings: {
      swichStatus: '=',
      swichLable: '=',
      callBack: '&',
    },
  });
  swichCtrl.$inject = [
  ];

  function swichCtrl(
  ) {
    const vm = this;
    vm.$onInit = () => {
      // vm.swichStatus = vm.swichStatus ? vm.swichStatus : true;
      vm.swich = swich;
    };

    function swich() {
      vm.swichStatus = !vm.swichStatus;
      sessionStorage.setItem('danmuSwich', vm.swichStatus);
      if (!vm.callBack) return;
      vm.callBack();
    }
  }
})();
