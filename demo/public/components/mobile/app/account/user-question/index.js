  import './style.less';
  
  export default angular.module('App')
    .controller('userQuestionCtrl', userQuestionCtrl);

  userQuestionCtrl.$inject = [
    '$USER',
    'userService'
  ];

  function userQuestionCtrl(
    $USER,
    userService
  ) {
    const vm = this;
    vm.user = $USER;
    vm.itemsPerPage = 10;
    vm.pageNum = 1;
    vm.totalItems = 0;
    vm.questionList = null;
    vm.getList = getList;
    vm.loadMore = loadMore;
    vm.toggleStatus = toggleStatus;
    vm.gotoAccount = gotoAccount;

    activate();

    function activate() {
      getList();
    }


    function getList() {
      userService.getUserQuestion({
        userId: $USER.id,
        pageNum: vm.pageNum,
        itemsPerPage: vm.itemsPerPage,
      }).then((result) => {
        const questions = result.questions || [];
        vm.questionList = vm.questionList || [];
        vm.questionList = vm.questionList.concat(questions);
        vm.totalItems = result.totalItems;
      });
    }

    function loadMore() {
      if (vm.pageNum * vm.itemsPerPage) {
        vm.pageNum++;
      }
      getList(vm.status);
    }

    function toggleStatus(status) {
      vm.status = status;
    }

    function gotoAccount() {
      window.location.href = '/mobile/account';
    }
  }
