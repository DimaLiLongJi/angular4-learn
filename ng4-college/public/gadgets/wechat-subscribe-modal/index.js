(() => {
	angular.module('App')
    .controller('wechatSubscribeCtrl', wechatSubscribeCtrl);

	wechatSubscribeCtrl.$inject = [
		'$uibModalInstance',
		'userService',
		'$interval',
		'$cookies',
		'userId',
		'$scope'
  ];

	function wechatSubscribeCtrl(
		$uibModalInstance,
		userService,
		$interval,
		$cookies,
		userId,
		$scope
  ) {
		const vm = this;

		vm.params = {
			echoStr: '',
		};

		vm.$onInit = () => {
			vm.closeModal = closeModal;
			vm.count = 1;
			vm.codeInvidate = false;
			vm.timer = $interval(() => {
				checkLoginStatus();
			}, 3000);
			vm.userId = userId;

		};

		function closeModal(type) {
			$interval.cancel(vm.timer);
			$uibModalInstance.close(type);
		}

		function checkLoginStatus() {
			if (vm.count >= 40) {
				$interval.cancel(vm.timer);
				vm.codeInvidate = true;
				vm.count = 1;
				return;
			}
			vm.count++;
			userService.getUserInfo({id: vm.userId})
				.then((result) => {
					if(result.subscribe) {
						$interval.cancel(vm.timer);
						$uibModalInstance.close('subscribe');
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
})();
