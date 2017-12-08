(() => {
  angular.module('App')
  .component('searchBar', {
    templateUrl: '/gadgets/search_bar/template.html',
    controller: searchBarCtrl,
    controllerAs: 'vm',
    bindings: {
      callBack: '&',
      keyword: '=',
    },
  });
  searchBarCtrl.$inject = ['$timeout'];

  function searchBarCtrl($timeout) {
    const vm = this;
    const form = document.getElementById('form');
    vm.searchOppStatus = false;

    vm.toggleSearchBar = toggleSearchBar;
    vm.enterSearch = enterSearch;

    form.submit = () => {
      vm.callBack();
      return false;
    };

    function enterSearch(event) {
      if (event.keyCode !== 13) return;
      event.target.blur();
      vm.callBack();
    }

    function toggleSearchBar() {
      let timer = null;
      vm.searchOppStatus = !vm.searchOppStatus;
      if (!vm.searchOppStatus) {
        vm.keyword = '';
        timer = $timeout(() => {
          vm.callBack();
          $timeout.cancel(timer);
        }, 10);
      }
    }
  }
})();
