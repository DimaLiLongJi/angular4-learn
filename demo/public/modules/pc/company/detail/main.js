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
    'company',
    '$scope',
    '$document',
    '$timeout',
    '$uibModal',
    '$USER',
    'BASE_URL',
  ];

  function companyDetailCtrl(
    opportunityService,
    company,
    $scope,
    $document,
    $timeout,
    $uibModal,
    $USER,
    BASE_URL,
  ) {
    const vm = this;
    vm.user = $USER;
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

    const bgDom = document.getElementById('background-wrap');

    getOpportunityList();
    getCampusList();
    randomBg();
    function randomBg() {
      const randomNum = (Math.random().toFixed(1) * 10) % 2;
      if (randomNum) {
        bgDom.style.backgroundImage = "url('/images/banner-company.jpg')";
      } else {
        bgDom.style.backgroundImage = "url('/images/banner-company2.jpg')";
      }
    }

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

    function getOpportunityList() {
      opportunityService.getOpportunityList(vm.params)
      .then((result) => {
        if (result.opps.length) {
          vm.oppArray = result.opps.filter(o => o.categoryId !== 48);
          vm.totalItems += vm.oppArray.length;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

    function getCampusList() {
      opportunityService.getCompanyCampusOpportunities(vm.params.companyId)
      .then((result) => {
        vm.recruitRecommendArray = result;
        vm.totalItems += vm.recruitRecommendArray.length;
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

    function gotoOpp(opp) {
      if (opp.applyLink === '' || opp.applyLink === null || opp.applyLink === undefined) {
          window.open(`${BASE_URL}/recruit_calendar/upcoming?opportunityId=${opp.id}`);
        } else {
          window.open(opp.applyLink);
        }
    }

  }
})();
