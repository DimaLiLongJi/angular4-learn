(() => {
  angular.module('App').component('scrollToTop', {
    templateUrl: '/gadgets/scrollToTop/template.html',
    controller: scrollToTopCtrl,
    controllerAs: 'vm',
    bindings: {
    },
  });
  scrollToTopCtrl.$inject = [
    '$document'
  ];

  function scrollToTopCtrl(
    $document
  ) {
    const vm = this;

    vm.toTheTop = toTheTop;
    // $document[0].addEventListener('scroll', (e) => {
    // });

    function toTheTop() {
      $document.scrollTopAnimated(0, 500).then(() => {
        console.log('You just scrolled to the top!');
      });
    }
  }
})();
