(function() {
  angular.module('App')
    .controller('applicationCtrl', applicationCtrl);
  applicationCtrl.$inject = [
    '$USER',
    'userService'
  ];

  function applicationCtrl(
    $USER,
    userService
  ) {
    const vm = this;
    vm.user = $USER;
    vm.totalItems = 0;
    vm.allTotalItems = 0;
    vm.itemsPerPage = 10;
    vm.pageNum = 1;
    vm.searchParams = {
      userId: vm.user.id,
      itemsPerPage: vm.itemsPerPage,
    };
    vm.getList = getList;
    vm.pageChanged = pageChanged;

    getList('all');

    function getList(status) {
      if (status) {
        vm.pageNum = 1;
        vm.status = status;
      }
      if (status === 'success') {
        vm.searchParams.checked = 0;
      }
      if (status === 'checked') {
        vm.searchParams.checked = 1;
        if (vm.user.applicationCheckedNotice) {
          vm.user.applicationCheckedNotice = !vm.user.applicationCheckedNotice;
        }
      }
      if (status === 'all') {
        delete vm.searchParams.checked;
      }
      vm.searchParams.pageNum = vm.pageNum;
      userService.getApplications(vm.searchParams)
        .then((res) => {
          vm.progresses = res.items;
          vm.totalItems = res.totalItems;
          if (status === 'all') {
            vm.allTotalItems = res.totalItems;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function pageChanged() {
      getList();
    }
  }
})();
