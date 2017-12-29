(() => {
	angular.module('App')
    .controller('wechatLoginCtrl', wechatLoginCtrl).value('isUniversityTour', null);

	wechatLoginCtrl.$inject = [
		'$uibModalInstance',
		'authService',
		'$interval',
		'$cookies',
		'urlParams',
		'$scope'
  ];

	function wechatLoginCtrl(
		$uibModalInstance,
		authService,
		$interval,
		$cookies,
		urlParams,
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
			if ($scope.isUniversityTour) {
				vm.imgUrl = '/api/auth/login?originalUrl=/university_tour';
			} else {
				vm.imgUrl = '/api/auth/login';
			}
			vm.timer = $interval(() => {
				if (!vm.params.echoStr) {
					vm.params.echoStr = $cookies.get('echoStr');
				}
				checkLoginStatus();
			}, 3000);
		};

		function closeModal() {
			$interval.cancel(vm.timer);
			$uibModalInstance.dismiss();
		}

		function checkLoginStatus() {
			if (vm.count >= 40) {
				$interval.cancel(vm.timer);
				vm.codeInvidate = true;
				vm.count = 1;
			}
			vm.count++;
			authService.checkLogin(vm.params)
				.then((result) => {
					let link = '/';
					if (urlParams) {
						link += urlParams;
					}
					if (result.id) {
						$interval.cancel(vm.timer);
						window.location.href = link;
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
})();
