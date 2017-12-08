(() => {
  angular.module('App').component('mobileDropdownSelector', {
    templateUrl: '/gadgets/mobile-dropdown-selector/template.html',
    controller: mobileDropdownSelectorCtrl,
    controllerAs: 'vm',
    bindings: {
      selectSource: '=',
      selectedItem: '=?',
      placeholder: '=?',
      onSelect: '<',
      mode: '<',
      showList: '=?',
      onToggle: '<',
    },
  });
  mobileDropdownSelectorCtrl.$inject = [];

  function mobileDropdownSelectorCtrl() {
    const vm = this;
    vm.selectedItem = vm.selectedItem || { id: 0, };
    vm.selectItem = selectItem;
    vm.toggleList = toggleList;

    function selectItem(item) {
      vm.selectedItem = item;
      vm.showList = false;
      if (vm.onSelect) {
        vm.onSelect(item);
      }
    }

    function toggleList() {
      const temp = vm.showList;
      if (vm.onToggle) { vm.onToggle(); }
      vm.showList = !temp;
    }
  }
})();
