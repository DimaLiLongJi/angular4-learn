(() => {
   angular.module('App')
    .controller('questionCtrl', questionCtrl);

  questionCtrl.$inject = [
    'userService',
    '$USER',
    '$sce'
  ];

  function questionCtrl(
    userService,
    $USER,
    $sce
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.totalItems = 1;
      vm.totalPages = 1;
      vm.user = $USER;
      vm.params = {
        pageNum: 1,
        itemsPerPage: 10,
        userId: vm.user.id,
      };
      vm.questionArray = [];

      vm.pageChanged = pageChanged;

      active();
    };

    function active() {
      // const sessionParams = sessionStorage.getItem('myQuestionsParams');
      //
      // if (sessionParams) {
      //   vm.params = JSON.parse(sessionParams);
      //   sessionStorage.removeItem('myQuestionsParams');
      // }
      getList();
      // checkQuestionCheck();
    }

    function getList() {
      userService.getUserQuestion(vm.params).then((result) => {
        vm.questionArray = result.questions
        .map((q) => {
          q.answers = q.answers
          .map((answer) => {
            answer.content = $sce.trustAsHtml(answer.content);
            if (!answer.checked) {
              getDetail(answer.questionId);
            }
            return answer;
          })
          .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
          return q;
        });
        vm.totalItems = result.totalItems;
        vm.totalPages = Math.ceil(vm.totalItems / vm.params.itemsPerPage);
      });
    }

    function pageChanged() {
      getList();
    }

    function getDetail(questionId) {
      userService.getQuestionDetail({
          questionId,
        })
      .then(checkQuestionCheck());
    }

    function checkQuestionCheck() {
      userService.checkQuestionRead({
        userId: $USER && $USER.id,
      }).then((result) => {
        // sessionStorage.setItem('myQuestionsParams', JSON.stringify(vm.params));
        vm.user.questionCheckedNotice = result.allChecked;
        window.location.reload();
      });
    }
  }
})();
