(() => {
  angular.module('App', [
    'ngCookies',
    'ngResource',
    'ui.bootstrap',
    'duScroll'
  ]).run();
})();
(() => {
  angular.module('App')
    .controller('companyDetailCtrl', companyDetailCtrl)
    .value('duScrollOffset', 60)
    .value('duScrollBottomSpy', true);
  companyDetailCtrl.$inject = [
    'opportunityService',
    'companyService',
    'company',
    '$scope',
    '$document',
    '$timeout',
    '$uibModal',
    '$rootScope',
    '$location'
  ];

  function companyDetailCtrl(opportunityService, companyService, company, $scope, $document, $timeout, $uibModal, $rootScope, $location) {
    const vm = this;
    vm.oppArray = [];
    vm.barFixed = false;
    vm.totalItems = 0;
    vm.params = {
      pageNum: 1,
      itemsPerPage: 10,
      companyId: company.id,
    };
    vm.campus = null;
    let scrollTop = document.documentElement.scrollTop
    || window.pageYOffset || document.body.scrollTop;
    vm.getOpportunityList = getOpportunityList;
    vm.openLoginModal = openLoginModal;
    vm.gotoOpp = gotoOpp;

    getOpportunityList();

    const timer = $timeout(() => {
      if (window.location.search) {
        vm.campus = window.location.search.match(/campus=([^&]+)/)[1];
      }
      if (vm.campus) {
        scrollToRecruit();
      }
      $timeout.cancel(timer);
    }, 500);

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
        },
        scope,
      });
      modalInstance.result
      .then(() => {
        })
        .catch(() => {
        });
      }

    function getOpportunityList() {
      companyService.getUniversityTourCompanyDetail(vm.params)
      .then((result) => {
        if (result.opportunities.length) {
          vm.oppArray = result.opportunities;
          console.log('vm.oppArray', vm.oppArray);
          vm.totalItems = vm.oppArray.length;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

// scroll event
    $document[0].onscroll = () => {
      scrollTop = document.documentElement.scrollTop
      || window.pageYOffset || document.body.scrollTop;
      if (scrollTop >= 470) {
        $scope.$apply(() => {
          vm.barFixed = true;
        });
      } else {
        $scope.$apply(() => {
          vm.barFixed = false;
        });
      }
    };

    function scrollToRecruit() {
      $document.scrollToElementAnimated(document.getElementById('section-2'));
    }

    function gotoOpp(id) {
      window.location.href = `/university_tour/opportunity/${id}`;
    }
  }
})();
