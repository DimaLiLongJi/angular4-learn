 import './all';
 import './deadline';
 import './style.less';

 export default angular.module('App').controller('recruitCalendarCtrl', recruitCalendarCtrl);

  recruitCalendarCtrl.$inject = [
    '$state'
  ];

  function recruitCalendarCtrl(
    $state
  ) {
    // const vm = this;
    $state.go('recruit-calendar.deadline');
  }
