(() => {
	angular.module('App')
    .controller('tipCtrl', tipCtrl);

	tipCtrl.$inject = [
    '$uibModalInstance'
  ];

	function tipCtrl(
    $uibModalInstance
  ) {
		const vm = this;
		vm.$onInit = () => {
      vm.closeModal = closeModal;
		};

    function closeModal() {
      $uibModalInstance.dismiss();
    }
	}
})();
