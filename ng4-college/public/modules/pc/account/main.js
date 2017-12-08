(() => {
  angular.module('App', [
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'ngCookies',
    'ngFileUpload',
    'ngMessages'
  ]).run();

  angular.module('App')
    .controller('accountCtrl', accountCtrl);

  accountCtrl.$inject = [
    'userService',
    '$state',
    '$USER'
  ];

  function accountCtrl(
    userService,
    $state,
    $USER
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.user = $USER;
      vm.state = $state;
      vm.user.questionCheckedNotice = 1;

      checkQuestionCheck();
    };


    function checkQuestionCheck() {
      userService.checkQuestionRead({
        userId: $USER && $USER.id,
      }).then((result) => {
        vm.user.questionCheckedNotice = result.allChecked;
      });
    }
  }
})();
