(() => {
	angular.module('App', [
		'ngResource',
		// 'ui.bootstrap',
		'ngFileUpload'
	]).run();

	angular.module('App')
		.controller('materialPageCtrl', materialPageCtrl);

	materialPageCtrl.$inject = ['$RESUME', 'CF_FILE_BASE_URL'];

	function materialPageCtrl($RESUME, CF_FILE_BASE_URL) {
		const vm = this;
		vm.resume = $RESUME;

		vm.fileInfo = {
			fileId: vm.resume.fileId,
			name: vm.resume.fileName,
			src: `${CF_FILE_BASE_URL}/${vm.resume.fileId}?originalName=${encodeURIComponent(vm.resume.fileName)}`,
			download: `${CF_FILE_BASE_URL}/${vm.resume.fileId}?originalName=${encodeURIComponent(vm.resume.fileName)}&download=1`,
		};
	}
})();
