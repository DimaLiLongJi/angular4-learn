(() => {
	angular.module('App').controller('applySuccessModalCtrl', applySuccessModalCtrl);

	applySuccessModalCtrl.$inject = [
		'$uibModalInstance',
  ];

	function applySuccessModalCtrl(
		$uibModalInstance,
  ) {
		const vm = this;

		vm.closeModal = closeModal;

		function closeModal() {
			$uibModalInstance.close();
		}
	}
})();
