(() => {
  angular.module('App').component('selectPrefix', {
    templateUrl: '/gadgets/select-prefix-for-mobile/template.html',
    controller: selectPrefixCtrl,
    controllerAs: 'vm',
    bindings: {
      prefix: '=',
    },
  });
  selectPrefixCtrl.$inject = [
    'mobilePrefixService'
  ];

  function selectPrefixCtrl(
    mobilePrefixService
  ) {
    const vm = this;
    vm.prefixArray = [];
    vm.listStatus = false;

    vm.toggleList = toggleList;
    vm.selectPrefix = selectPrefix;

    vm.$onInit = () => {
      getPrefixList();
    };

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
        })
        .catch(error => console.error(error));
    }
  }
})();
