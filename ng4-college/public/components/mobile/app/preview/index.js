import './mobile-file-preview-core';
import './style.less';

export default angular.module('App')
    .controller('previewCtrl', previewCtrl);
  previewCtrl.$inject = [
    'CF_FILE_BASE_URL',
    'fileService',
    '$location'
  ];

  function previewCtrl(
    CF_FILE_BASE_URL,
    fileService,
    $location
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.file = {
        fileId: $location.$$url.match(/.+\/(\d+)/)[1],
        encodeOriginalName: $location.$$url.match(/.+\/(\d+)\/(.+)/)[2],
        originalName: decodeURIComponent(decodeURIComponent($location.$$url.match(/.+\/(\d+)\/(.+)/)[2])),
      };
      vm.fileInfo = {
        name: `${vm.file.encodeOriginalName}`,
        src: `${CF_FILE_BASE_URL}/${vm.file.fileId}?originalName=${vm.file.encodeOriginalName}`,
        download: `${CF_FILE_BASE_URL}/${vm.file.fileId}?originalName=${vm.file.encodeOriginalName}&download=1`,
        fileId: vm.file.fileId,
        originalName: vm.file.originalName,
      };

      vm.goBack = goBack;
    };

    function goBack() {
      window.history.back();
    }
  }
