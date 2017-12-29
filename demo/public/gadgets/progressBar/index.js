(() => {
  angular.module('App').component('progressBar', {
    templateUrl: '/gadgets/progressBar/template.html',
    controller: progressBar,
    controllerAs: 'vm',
    bindings: {
      tips: '@',
      animationDuration: '=',
    },
  });
  progressBar.$inject = [
  ];

  function progressBar(
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.timingArray = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];
      vm.progressAnimation = {
        animation: `progressing ${vm.animationDuration}s 1`,
        'animation-timing-function': vm.timingArray[Math.floor(Math.random() * 5)],
      };
    };
  }
})();
