(() => {
  angular.module('App').component('pageTitle', {
    templateUrl: '/gadgets/page_title/template.html',
    controller: pageTitleCtrl,
    controllerAs: 'vm',
    bindings: {
      title: '@',
      customizedGoBack: '=',
    },
  });
  pageTitleCtrl.$inject = [
  ];

  function pageTitleCtrl(
  ) {
    const vm = this;
    vm.goBack = () => {
      if (vm.customizedGoBack) {
        vm.customizedGoBack();
      } else {
        window.history.back();
      }
    };
  }
})();
