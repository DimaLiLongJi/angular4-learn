(() => {
  angular.module('App')
    .controller('qaQuestionDetailCtrl', qaQuestionDetailCtrl);

  qaQuestionDetailCtrl.$inject = [
    'userService',
    '$location',
    '$sce',
    'wechatService',
    'BASE_URL',
    '$state',
    '$stateParams',
    '$USER',
    'authService'
  ];

  function qaQuestionDetailCtrl(
    userService,
    $location,
    $sce,
    wechatService,
    BASE_URL,
    $state,
    $stateParams,
    $USER,
    authService
  ) {
    const vm = this;

    vm.questionId = $stateParams.id;
    vm.isUserQuestion = $stateParams.userQuestion;
    vm.goBack = goBack;
    vm.toggleFavorite = toggleFavorite;
    vm.askQuestion = askQuestion;
    const questionParams = {
      entityId: vm.questionId,
      entityType: 'question',
      userId: $USER && $USER.id,
    };
    vm.fromShare = document.location.href.match('from=') ? true : false;
    function goBack() {
      window.cfGoHistory({
        url: '/mobile/discovery/qa',
        target: '_self',
      });
    }
    activate();

    function activate() {
      userService.getQuestionDetail({
          questionId: vm.questionId,
        })
        .then((result) => {
          vm.content = result;
          const shareContent = vm.content && vm.content.answers && vm.content.answers[0] && vm.content.answers[0].content;
          vm.isFavored = vm.content.isFavorite;
          wechatService.setWxShareInfo({
            link: $location.absUrl(),
            title: vm.content && vm.content.title,
            desc: shareContent,
            imgUrl: '/images/share.jpg',
          });
          vm.content.answers.forEach((answer) => {
            answer.content = $sce.trustAsHtml(answer.content);
          });
          // 授权回来自动给收藏
          if ($stateParams.favorite && !vm.isFavored) {
            userService.enableFavorite(questionParams).then(() => {
              vm.isFavored = true;
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function toggleFavorite() {
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
