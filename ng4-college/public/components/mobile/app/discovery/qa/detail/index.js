(() => {
  angular.module('App').component('qaDetail', {
    templateUrl: '/components/mobile/app/discovery/qa/detail/template.html',
    controller: qaDetailCtrl,
    controllerAs: 'vm',
    bindings: {
      show: '=',
      content: '=',
      onClose: '=',
    },
  });
  qaDetailCtrl.$inject = [
    '$sce',
    'userService',
    '$USER',
    'authService',
    '$scope',
    '$state',
  ];

  function qaDetailCtrl(
    $sce,
    userService,
    $USER,
    authService,
    $scope,
    $state,
  ) {
    const vm = this;
    vm.hideDetail = hideDetail;
    vm.toggleFavorite = toggleFavorite;
    vm.questionId = null;
    vm.askQuestion = askQuestion;



    activate();

    function activate() {
      $scope.$watch('vm.content', (curr, prev) => {
        if (curr) {
          vm.questionId = vm.content && vm.content.id;
          userService.getQuestionDetail({
            questionId: vm.questionId,
          }).then((result) => {
            vm.isFavored = result.isFavorite;
          });
        }
      });
    }

    function hideDetail() {
      // if (vm.questionId) {
      //   window.cfGoHistory({
      //     url: '/mobile/discovery/question-list',
      //     target: '_self',
      //   });
      //   sessionStorage.removeItem('questionId');
      //   return;
      // }
      vm.show = false;
      if (vm.onClose) {
        vm.onClose();
      }
    }

    function toggleFavorite() {
      const questionParams = {
        entityId: vm.questionId,
        entityType: 'question',
        userId: $USER && $USER.id,
      };
      if (!vm.isFavored) {
        if (!$USER || !$USER.id) {
          authService.wechatLogin(`/mobile/discovery/question-detail/${vm.questionId}?favorite=true`);
          return;
        }
        userService.enableFavorite(questionParams).then(() => {
          vm.isFavored = true;
        });
      } else {
        userService.disableFavorite(questionParams).then(() => {
          vm.isFavored = false;
        });
      }
    }

    function askQuestion() {
      if (!$USER || !$USER.id) {
        window.location.href = `${BASE_URL}/api/auth/login?originalUrl=${encodeURIComponent(`${BASE_URL}/mobile/discovery/question`)}`;
      } else {
        $state.go('discovery.question');
      }
    }
  }
})();
