(() => {
  angular.module('App')
    .component('calendar', {
      templateUrl: '/gadgets/calendar/template.html',
      controller: calendarCtrl,
      controllerAs: 'vm',
      bindings: {
        date: '=',
        callback: '&',
      },
    });
  calendarCtrl.$inject = [
    'opportunityService'
  ];

  function calendarCtrl(
    opportunityService
  ) {
    const vm = this;

    vm.$onInit = () => {
      vm.currentYear = new Date().getFullYear();
      vm.yearsArray = [vm.currentYear, vm.currentYear + 1];
      vm.monthArray = [{
        month: 'Jan.',
      }, {
          month: 'Feb.',
        }, {
          month: 'Mar.',
        }, {
          month: 'Apr.',
        }, {
          month: 'May.',
        }, {
          month: 'Jun.',
        }, {
          month: 'Jul.',
        }, {
          month: 'Aug.',
        }, {
          month: 'Sep.',
        }, {
          month: 'Oct.',
        }, {
          month: 'Nov.',
        }, {
          month: 'Dec.',
        }];
      vm.selectedYear = vm.date ? moment(vm.date, 'yyyy-M MM').year() : vm.currentYear;
      vm.selectedMonth = {
        year: vm.selectedYear,
        // month: vm.date ? (moment(vm.date, 'yyyy-M MM').month() + 1) : (new Date().getMonth() + 1),
        month: vm.date ? (moment(vm.date, 'yyyy-M MM').month() + 1) : '',
      };
      // vm.date = `${vm.selectedMonth.year}-${vm.selectedMonth.month}`;
      vm.subtractYear = subtractYear;
      vm.plusYear = plusYear;
      vm.selectMonth = selectMonth;
      vm.clearDate = clearDate;
      getCompanyStatistics({
        date: new Date(),
      });
    };

    function clearDate() {
      vm.selectedMonth = {
        year: vm.selectedYear,
        month: -1,
      };
      vm.date = vm.selectedMonth.year;
      // callback refresh list
    }

    function selectMonth(index) {
      vm.selectedMonth = {
        year: vm.selectedYear,
        month: index + 1,
      };
      vm.date = `${vm.selectedMonth.year}-${vm.selectedMonth.month}`;
      // vm.callback();
      // callback refresh list
    }

    function subtractYear() {
      if (vm.selectedYear === vm.yearsArray[0]) return;
      vm.selectedYear--;
      getCompanyStatistics({
        date: vm.selectedYear,
      });
    }
    function plusYear() {
      if (vm.selectedYear === vm.yearsArray[1]) return;
      vm.selectedYear++;
      getCompanyStatistics({
        date: vm.selectedYear,
      });
    }

    function getCompanyStatistics(params) {
      opportunityService.getCompanyStatistics(params)
        .then((result) => {
          result.byDate.forEach((m, index) => {
            vm.monthArray[index].companies = m.companies;
          });
        })
        .catch((error) => {
          console.error('getCompanyStatistics error', error);
        });
    }
  }
})();
