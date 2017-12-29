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
    '$cookies',
    'userService',
    '$rootScope'
  ];

  function positionCtrl(
    $uibModal,
    $USER,
    $oppId,
    $cookies,
    userService,
    $rootScope
  ) {
    const vm = this;

    vm.$onInit = () => {
      vm.applyed = false;

      vm.applyOpportunity = applyOpportunity;
      vm.goCompany = goCompany;
      vm.openLoginModal = openLoginModal;

      getApplyStatus();
      if (/(\??|&?)action=apply(&?)/.test(window.location.search)) {
        openApplyModal();
      }
    };

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
    const scope = $rootScope.$new();
    scope.isUniversityTour = true;
		const modalInstance = $uibModal.open({
			windowClass: 'small-modal login-modal',
			animation: true,
      backdrop: 'static',
			templateUrl: '/gadgets/wechat-login-modal/template.html',
			controller: 'wechatLoginCtrl',
			controllerAs: 'vm',
			resolve: {
        urlParams: () => urlParams,
        isUniversityTour: () => true,
			},
      scope,
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
        openLoginModal(`university_tour/opportunity/${$oppId}`);
        return;
      }
      if (vm.applyed) return;
      openApplyModal();
    }
    function openApplyModal() {
      const modalInstance = $uibModal.open({
        windowClass: 'small-modal apply-modal',
        animation: true,
        templateUrl: '/modules/pc/university-tour/opportunity/apply-modal/template.html',
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
