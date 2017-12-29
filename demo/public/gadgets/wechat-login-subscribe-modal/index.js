(() => {
	angular.module('App')
    .controller('wechatLoginSubscribeCtrl', wechatLoginSubscribeCtrl).value('isUniversityTour', null);

	wechatLoginSubscribeCtrl.$inject = [
		'$uibModalInstance',
		'wechatService',
		'authService',
		'$interval',
		'$cookies',
		'urlParams',
		'$scope'
  ];

	function wechatLoginSubscribeCtrl(
		$uibModalInstance,
		wechatService,
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
				wechatService.getTempQrCodeTicket()
					.then((r) => {
						vm.qrCode = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${r.ticket}`;
					});
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
