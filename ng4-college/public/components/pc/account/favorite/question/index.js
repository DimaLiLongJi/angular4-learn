(() => {
   angular.module('App')
    .controller('favoriteQuestionCtrl', favoriteQuestionCtrl);

  favoriteQuestionCtrl.$inject = [
    '$sce',
    '$USER',
    'userService'
  ];

  function favoriteQuestionCtrl(
    $sce,
    $USER,
    userService
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.totalItems = 1;
      vm.totalPages = 1;
      vm.user = $USER;
      vm.params = {
        pageNum: 1,
        itemsPerPage: 15,
        type: 'question',
        userId: $USER.id,
      };
      vm.questionArray = [];

      vm.pageChanged = pageChanged;
      vm.cancelFavorite = cancelFavorite;

      getList();
    };

    function getList() {
      userService.getFavoriteList(vm.params).then((result) => {
        vm.totalItems = result.totalItems;
        vm.questionArray = result
        .favorites.map((f) => {
          f.answer = $sce.trustAsHtml(f.answer);
          return f.question;
        });
        vm.totalPages = Math.ceil(vm.totalItems / vm.params.itemsPerPage);
      });
    }

    function cancelFavorite(question, event) {
      event.stopPropagation();
      const params = {
        userId: vm.user.id,
        entityType: 'question',
        entityId: question.id,
      };
      userService.disableFavorite(params)
      .then(() => getList());
    }

    function pageChanged() {
      getList();
    }
}
})();
