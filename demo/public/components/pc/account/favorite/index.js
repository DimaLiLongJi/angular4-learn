(() => {
   angular.module('App')
    .controller('favoriteCtrl', favoriteCtrl);

  favoriteCtrl.$inject = [
    '$state'
  ];

  function favoriteCtrl(
    $state
  ) {
    const vm = this;
    vm.state = $state;
    $state.go('account.favorite.position');
  }
})();
