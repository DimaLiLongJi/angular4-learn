(() => {
  angular.module('App').component('dan', {
    templateUrl: '/gadgets/dan/template.html',
    controller: danCtrl,
    controllerAs: 'vm',
    bindings: {
      callBack: '&',
      favorite: '&',
      dan: '=',
      animationStatus: '=',
      questionCount: '=',
      pauseAnimation: '&',
    },
  });
  danCtrl.$inject = [
    '$uibModal',
    '$timeout'
  ];

  function danCtrl(
    $uibModal,
    $timeout
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.contentStatus = false;
      vm.timer = null;

      vm.showContent = showContent;
      vm.hideContent = hideContent;
      vm.askQuestion = askQuestion;
      vm.viewCompany = viewCompany;
      vm.toggleFavorite = toggleFavorite;

      if (vm.dan && !Object.prototype.hasOwnProperty.call(vm.dan, 'opportunity')) {
        vm.dan.type = 'question';
      } else {
        vm.dan.type = 'recruit';
      }
    };

    function viewCompany() {
      vm.dan.visited = true;
      window.open(`/company/${vm.dan.id}?campus=1`, '_blank');
    }

    function askQuestion() {
      vm.callBack();
    }

    function showContent() {
      vm.timer = null;
      vm.contentStatus = true;
    }

    function hideContent() {
      vm.timer = $timeout(() => {
        if (!vm.timer) return;
        vm.contentStatus = false;
        $timeout.cancel(vm.timer);
      }, 100);
    }

    function toggleFavorite() {
      if (vm.favorite) {
        vm.favorite();
      }
    }
  }
})();
