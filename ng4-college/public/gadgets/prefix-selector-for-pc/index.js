(() => {
  angular.module('App').component('prefixSelectorForPc', {
    templateUrl: '/gadgets/prefix-selector-for-pc/template.html',
    controller: selectPrefixPcCtrl,
    controllerAs: 'vm',
    bindings: {
      prefix: '=',
      listStatus: '=',
      callBack: '&',
    },
  });
  selectPrefixPcCtrl.$inject = [
    'mobilePrefixService',
    '$scope'
  ];

  function selectPrefixPcCtrl(
    mobilePrefixService,
    $scope
  ) {
    const vm = this;
    vm.prefixArray = [];
    vm.listStatus = vm.listStatus || false;
    vm.toggleList = toggleList;
    vm.selectPrefix = selectPrefix;

    vm.$onInit = () => {
      getPrefixList();
    };

    $scope.$watch('vm.prefix', (n, o) => {
      if (typeof n !== 'object' || typeof o !== 'object') {
        // getPrefixList();
      }
      if (!vm.prefix) {
       vm.prefix = {
         name: '中国',
         value: '86',
         id: 1,
       };
     }
      if (vm.callBack) {
        vm.callBack();
      }
    });

    function toggleList() {
      vm.listStatus = !vm.listStatus;
    }

    function selectPrefix(p) {
      vm.prefix = p;
      toggleList();
    }

    function getPrefixList() {
      mobilePrefixService.getPrefixList()
        .then((result) => {
          vm.prefixArray = result;
          // vm.prefix = vm.prefixArray
          //   .filter(p => Number(p.id) === Number(vm.prefix))[0];
        })
        .catch(error => console.error(error));
    }
  }
})();
