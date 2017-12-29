(function() {
  /*global PDFObject*/


  angular.module('App')
    .component('filePreviewPage', {
      templateUrl: '/gadgets/file-preview-page/template.html',
      controller: filePreviewCtr,
      controllerAs: 'vm',
      bindings: {
        fileInfo: '=',
      }
    });

  filePreviewCtr.$inject = [
    '$scope',
  ];

  function filePreviewCtr(
    $scope
  ) {
    let vm = this; //jshint ignore:line
    vm.hideDownloadBtn = false;
    if (/hd=1/.test(location.search)) {
      vm.hideDownloadBtn = true;
    }

    $scope.$watch('vm.fileInfo', (n) => {
      if (n && n.name) activate();
    });

    function activate() {
      vm.file = vm.fileInfo;
    }


  }
})();
