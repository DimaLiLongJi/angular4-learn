import './style.less';

export default angular.module('App')
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
  vm.pageChanged = getList;
  vm.loadMore = loadMore;
  vm.gotoAccount = gotoAccount;
  getList({
    status: 'all',
  });

  function getList(obj) {
    if (obj.status) {
      vm.pageNum = 1;
      vm.status = obj.status;
    }
    if (vm.status === 'success') {
      vm.searchParams.checked = 0;
    }
    if (vm.status === 'checked') {
      vm.searchParams.checked = 1;
      if (vm.user.applicationCheckedNotice) {
        vm.user.applicationCheckedNotice = !vm.user.applicationCheckedNotice;
      }
    }
    if (vm.status === 'all') {
      delete vm.searchParams.checked;
    }
    vm.searchParams.pageNum = vm.pageNum;
    userService.getApplications(vm.searchParams)
      .then((res) => {
        vm.totalItems = res.totalItems;
        if (obj.status === 'all') {
          vm.allTotalItems = res.totalItems;
        }
        if (obj.type === 'scroll') {
          vm.progresses = vm.progresses.concat(res.items);
        } else {
          vm.progresses = res.items;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function loadMore() {
    vm.pageNum++;
    getList({
      type: 'scroll',
    });
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}