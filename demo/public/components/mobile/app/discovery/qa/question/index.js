(() => {
  angular.module('App').controller('qaQuestionCtrl', qaQuestionCtrl);

  qaQuestionCtrl.$inject = ['$USER', 'userService', '$state', 'BASE_URL', 'authService', '$location', '$stateParams'];

  function qaQuestionCtrl($USER, userService, $state, BASE_URL, authService, $location, $stateParams) {
    const vm = this;
    vm.showSubscribeFlag = false;
    vm.questionSuccess = false;
    vm.commitQuestion = commitQuestion;
    // vm.closeSubscribe = closeSubscribe;
    vm.saveToBrowser = saveToBrowser;
    vm.goBack = goBack;

    activate();

    function activate() {
      vm.question = localStorage.userQuestion || '';
      if ($stateParams.commit && vm.question) {
        commitQuestion();
      }
    }

    function commitQuestion() {
      if (vm.question) {
        if (!$USER || !$USER.id) {
          // authService.wechatLogin(`${window.location.href}`);
          let url = $location.absUrl();
          if (url.indexOf('?') > -1) {
            url = url.slice(0, url.indexOf('?'));
          }
          url += '?commit=true';
          authService.wechatLogin(url);
        }
        userService.askQuestion({
          userId: $USER.id,
          title: vm.question,
        }).then(() => {
          vm.questionSuccess = true;
          localStorage.userQuestion = '';
          userService.refreshToken({
            id: $USER.id,
          }).then((result) => {
            if (result && result.result) {
              $USER.subscribe = result.result.subscribe;
            }
            if (!$USER || ($USER && !$USER.subscribe)) {
              window.location.href = `${BASE_URL}/go-wechat-qa`;
              // $state.go('discovery.subscribe');
              // vm.showSubscribeFlag = true;
            }
          });
        }).catch((err) => {
          console.err('question err', err);
          alert('提交问题失败');
        });
      }
    }

    // function closeSubscribe() {
    //   vm.showSubscribeFlag = false;
    // }

    function saveToBrowser() {
      localStorage.userQuestion = vm.question || '';
    }

    function goBack() {
      window.history.go(-1);
    }
  }
})();
