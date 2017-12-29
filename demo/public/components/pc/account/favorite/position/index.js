(() => {
   angular.module('App')
    .controller('favoritePositionCtrl', favoritePositionCtrl);

  favoritePositionCtrl.$inject = [
    'userService',
    '$USER'
  ];

  function favoritePositionCtrl(
    userService,
    $USER
  ) {
    const vm = this;

    vm.$onInit = () => {
      vm.totalItems = 1;
      vm.totalPages = 1;
      vm.user = $USER;
      vm.params = {
        pageNum: 1,
        itemsPerPage: 20,
        type: 'opportunity',
        userId: $USER.id,
      };
      vm.oppArray = [];

      vm.pageChanged = pageChanged;
      vm.cancelFavorite = cancelFavorite;
      vm.viewDetail = viewDetail;

      const sessionParams = sessionStorage.getItem('accontFavoritePositon');

      if (sessionParams) {
        vm.params = JSON.parse(sessionParams);
        sessionStorage.removeItem('accontFavoritePositon');
      }

      getList();
    };

    function viewDetail(opp) {
      sessionStorage.setItem('accontFavoritePositon', JSON.stringify(vm.params));
      if (opp.status === 3) return;
      window.location.href = `/opportunity/${opp.id}`;
    }

    function cancelFavorite(opp, event) {
      event.stopPropagation();
      const params = {
        userId: vm.user.id,
        entityType: 'opportunity',
        entityId: opp.id,
      };
      userService.disableFavorite(params)
      .then(() => getList());
    }

    function getList() {
      userService.getFavoriteList(vm.params).then((result) => {
        vm.totalItems = result.totalItems;
        vm.oppArray = result.favorites.map(f => f.opportunity);
        vm.totalPages = Math.ceil(vm.totalItems / vm.params.itemsPerPage);
      });
    }

    function pageChanged() {
      getList();
    }
  }
})();
