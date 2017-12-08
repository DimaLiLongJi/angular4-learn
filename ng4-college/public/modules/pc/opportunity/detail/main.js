(() => {
  angular.module('App', [
    'ngResource',
    'ui.bootstrap',
    'ngFileUpload',
    'ngCookies'
  ]).run();
})();
(() => {
  angular.module('App')
    .controller('positionCtrl', positionCtrl);

  positionCtrl.$inject = [
    '$uibModal',
    '$USER',
    '$oppId',
    '$opp',
    '$cookies',
    'userService'
  ];

  function positionCtrl(
    $uibModal,
    $USER,
    $oppId,
    $opp,
    $cookies,
    userService
  ) {
    const vm = this;
    vm.user = $USER;

    vm.$onInit = () => {
      vm.applyed = false;
      vm.opp = $opp;

      vm.applyOpportunity = applyOpportunity;
      vm.goCompany = goCompany;
      vm.openLoginModal = openLoginModal;
      vm.toggleFavorite = toggleFavorite;

      getApplyStatus();
      if (/(\??|&?)action=apply(&?)/.test(window.location.search)) {
        openApplyModal();
      }

      if (/fp=1/.test(location.search) && vm.user) {
        favorite();
      }
    };

    function toggleFavorite() {
      if (!vm.user) {
        openLoginModal(`opportunity/${$oppId}?fp=1`);
        return;
      }

      if (vm.opp.isFavorite) {
        cancelFavorite();
      } else {
        favorite();
      }
    }

    function favorite() {
      const params = {
        userId: vm.user.id,
        entityType: 'opportunity',
        entityId: $oppId,
      };
      userService.enableFavorite(params)
      .then(() => {
        vm.opp.isFavorite = 1;
        if (/fp=1/.test(location.search) && vm.user) {
          window.location.href = location.pathname;
        }
      });
    }

    function cancelFavorite() {
      const params = {
        userId: vm.user.id,
        entityType: 'opportunity',
        entityId: $oppId,
      };
      userService.disableFavorite(params)
      .then(() => {
        vm.opp.isFavorite = 0;
      });
    }

    function getApplyStatus() {
      if (!$USER) return;
      const params = {
        userId: $USER.id,
        opportunityId: $oppId,
      };
      userService.getApplyStatus(params)
        .then((result) => {
          vm.applyed = !result.available;
          if (/(\??|&?)action=apply(&?)/.test(window.location.search && !vm.applyed)) {
            openApplyModal();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

  function openLoginModal(urlParams) {
		const modalInstance = $uibModal.open({
			windowClass: 'small-modal login-modal',
			animation: true,
      backdrop: 'static',
			templateUrl: '/gadgets/wechat-login-modal/template.html',
			controller: 'wechatLoginCtrl',
			controllerAs: 'vm',
			resolve: {
        urlParams: () => urlParams,
			},
		});

	modalInstance.result
		.then(() => {
		})
		.catch(() => {
		});
	}

    function goCompany(event) {
      const companyId = event.path.filter(dom => dom.id)[0].id;
      window.open(`/company/${companyId}`, '_blank');
    }

    function applyOpportunity() {
      if (!$USER) {
        openLoginModal(`opportunity/${$oppId}?action=apply`);
        return;
      }
      if (vm.applyed) return;
      openApplyModal();
    }
    function openApplyModal() {
      const modalInstance = $uibModal.open({
        windowClass: 'small-modal apply-modal',
        animation: true,
        templateUrl: '/components/pc/opportunity/apply-modal/template.html',
        controller: 'applyOppCtrl',
        controllerAs: 'vm',
        resolve: {
          $USER: () => $USER,
          $oppId: () => $oppId,
        },
      });

      modalInstance.result
        .then(() => {
          openSuccessModal();
          vm.applyed = true;
          sessionStorage.removeItem('applyParams');
        })
        .catch(() => {
        });
    }

    function openSuccessModal() {
      $uibModal.open({
        windowClass: 'small-modal success-modal',
        animation: true,
        templateUrl: '/components/pc/opportunity/success-modal/template.html',
        controller: 'applySuccessModalCtrl',
        controllerAs: 'vm',
      });
    }
  }
})();
