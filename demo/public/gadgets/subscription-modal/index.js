(() => {
	angular.module('App')
    .controller('subscriptionCtrl', subscriptionCtrl);

	subscriptionCtrl.$inject = [
		'$uibModalInstance',
		'userService',
		'authService',
		'wechatService',
		'$interval',
		'$cookies',
		'subscribe',
		'scene',
		'$USER'
  ];

	function subscriptionCtrl(
		$uibModalInstance,
		userService,
		authService,
		wechatService,
		$interval,
		$cookies,
		subscribe,
		scene,
		$USER
  ) {
		const vm = this;
		vm.$onInit = () => {
			vm.subscribe = subscribe;
			vm.scene = scene;
			vm.closeModal = closeModal;
			vm.user = $USER;

			wechatService.getTempQrCodeTicket()
				.then((r) => {
					vm.qrCode = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${r.ticket}`;
				});
			if (!vm.subscribe) {
				vm.timer = $interval(() => {
					getUserInfo();
				}, 3000, 30);
			}
		};

		function closeModal() {
			$interval.cancel(vm.timer);
			$uibModalInstance.dismiss();
		}

		function getUserInfo() {
			vm.echoStr = $cookies.get('echoStr');
			if (!vm.echoStr) return;
			authService.checkLogin({
				echoStr: vm.echoStr,
			})
			.then((result) => {
				if (result && result.subscribe) {
					userService.refreshToken({
						id: result.id,
					});
					if ($USER) {
						$USER.subscribe = result.subscribe;
					}
					$interval.cancel(vm.timer);
					$uibModalInstance.close(result);
				}
			})
			.catch((error) => {
				console.error(error);
			});
		}
	}
})();
