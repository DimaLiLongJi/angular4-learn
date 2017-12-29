(() => {
  angular.module('App').component('mobileMonthSelector', {
    templateUrl: '/gadgets/mobile-month-selector/template.html',
    controller: mobileMonthSelectorCtrl,
    controllerAs: 'vm',
    bindings: {
      selectSource: '=',
      selectedItem: '=?',
      monthStatistics: '=?',
      placeholder: '=?',
      onSelect: '<',
      onChangeYear: '<',
      showList: '=?',
      onToggle: '<',
      yearRange: '<',
    },
  });
  mobileMonthSelectorCtrl.$inject = ['$scope'];

  function mobileMonthSelectorCtrl($scope) {
    const vm = this;
    vm.monthSelectSource = [
      { id: 1, name: '1月', hasAlert: true, },
      { id: 2, name: '2月', hasAlert: false, },
      { id: 3, name: '3月', hasAlert: false, },
      { id: 4, name: '4月', hasAlert: false, },
      { id: 5, name: '5月', hasAlert: false, },
      { id: 6, name: '6月', hasAlert: false, },
      { id: 7, name: '7月', hasAlert: false, },
      { id: 8, name: '8月', hasAlert: false, },
      { id: 9, name: '9月', hasAlert: false, },
      { id: 10, name: '10月', hasAlert: false, },
      { id: 11, name: '11月', hasAlert: false, },
      { id: 12, name: '12月', hasAlert: false, },
      { id: 0, name: '开始时间不限', tabName: '开始时间', hasAlert: false, }
    ];
    vm.selectItem = selectItem;
    vm.toggleList = toggleList;
    vm.changeYear = changeYear;

    vm.$onInit = (() => {
      vm.selectedItem = vm.selectedItem || {};
      $scope.$watch('vm.monthStatistics', (curr, prev) => {
        if (curr && curr.byDate) {
          const statistics = curr.byDate;
          statistics.forEach((item) => {
            const matchedSource = vm.monthSelectSource
            .find(source => source.id == moment(item.date).month() + 1);
            if (matchedSource) {
              matchedSource.hasAlert = item.companies > 0;
            }
          });
        }
      });
    });

    function selectItem(item) {
      vm.selectedItem.month = item.id;
      vm.selectedItem.tabName = item.id !== 0 ? `${vm.selectedItem.year}年${item.id}月` : item.tabName;
      vm.showList = false;
      if (vm.onSelect) {
        let currentDate = moment().year(vm.selectedItem.year)
        .month(vm.selectedItem.month - 1).date(1)
        .toDate();
        if (!vm.selectedItem.month) {
          currentDate = null;
        }
        vm.selectedItem.date = currentDate;
        vm.onSelect(currentDate);
      }
    }

    function toggleList() {
      const temp = vm.showList;
      if (vm.onToggle) { vm.onToggle(); }
      vm.showList = !temp;
    }

    function changeYear(offset) {
      if (vm.yearRange && (vm.selectedItem.year + offset < vm.yearRange[0] || vm.selectedItem.year + offset > vm.yearRange[1])) {
        return;
      }
      vm.selectedItem.year += offset;
      if (vm.onChangeYear) { vm.onChangeYear(moment().year(vm.selectedItem.year).toDate()); }
    }
  }
})();
