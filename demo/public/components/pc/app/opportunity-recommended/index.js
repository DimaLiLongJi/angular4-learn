(() => {
  angular.module('App')
    .controller('opportunityRecommendedCtrl', opportunityRecommendedCtrl);

  opportunityRecommendedCtrl.$inject = [
    'opportunityService',
    'userService',
    '$rootScope',
    'tagService',
    'professionService',
    '$document',
    '$location',
    '$interval',
    '$uibModal',
    '$timeout',
    '$scope',
    '$state',
    '$USER'
  ];

  function opportunityRecommendedCtrl(
    opportunityService,
    userService,
    $rootScope,
    tagService,
    professionService,
    $document,
    $location,
    $interval,
    $uibModal,
    $timeout,
    $scope,
    $state,
    $USER
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.user = $USER;
      vm.totalItems = 0;
      vm.totalPages = 1;
      vm.params = {
        keyword: $rootScope.keyword || '',
        pageNum: 1,
        itemsPerPage: 20,
      };
      vm.oppRecommendedArray = [];
      vm.customizationInfo = {
        industries: [],
        locations: [],
        positions: [],
        stages: [],
      };
      vm.animationDuration = 0;
      $rootScope.customizedStatus = 'failure';
      $rootScope.reloadDanmu = false;
      vm.options = [];
      vm.scrollTop = null;

      vm.customize = customize;
      vm.saveStatus = saveStatus;

      vm.changeAcceptPush = changeAcceptPush;
      vm.disabled = false;

      activate();
    };

    $scope.$watch('vm.params', (n, o) => {
      if (!vm.user ||
          !vm.customizationInfo.industries.length ||
          !vm.customizationInfo.locations.length ||
          !vm.customizationInfo.positions.length ||
          !vm.customizationInfo.stages.length
      ) return;
      if (n.keyword !== o.keyword) {
        vm.params.pageNum = 1;
      }
      getList(buildCondition());
    }, true);

    $rootScope.searchOpportunityRecommended = (keyword) => {
      vm.params.keyword = keyword;
    };

    function activate() {
      const paramsSession = sessionStorage.getItem('recommendOppParams');
      if (paramsSession) {
        vm.params = JSON.parse(paramsSession);
        vm.scrollTop = vm.params.scrollTop;
        delete vm.params.scrollTop;
        sessionStorage.removeItem('recommendOppParams');
      }
      if (vm.params.keyword) {
        $rootScope.keyword = vm.params.keyword;
      }
      if(vm.user) {
        vm.acceptPush = vm.user.subscribe?vm.user.acceptPush : 0;
      }
      if (vm.user) {
        checkUserCustomizationInfo();
      }
      getOptionList();
    }

    function scrollTo() {
      if (!vm.scrollTop) return;
      $document.scrollTopAnimated(vm.scrollTop, 500)
      .then(() => {
        vm.scrollTop = null;
      });
    }

    function saveStatus() {
      const params = Object.assign({}, vm.params);
      params.scrollTop = document.documentElement.scrollTop ||
        window.pageYOffset || document.body.scrollTop;
      sessionStorage.setItem('recommendOppParams', JSON.stringify(params));
    }

    function buildCondition() {
      const params = Object.assign({}, vm.params);
      let key;
      for (key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }
      params.type = 1;
      return params;
    }

    function getList(params) {
      opportunityService.getPrefOpportunityList(params)
        .then((result) => {
          vm.oppRecommendedArray = result.opps;
          vm.totalItems = result.totalItems;
          vm.totalPages = Math.ceil(vm.totalItems / vm.params.itemsPerPage);
          scrollTo();
        })
        .catch(error => console.error(error));
    }
// customize & modal
    function customize() {
      if (vm.user) {
        openCustomizeModal();
      } else {
        localStorage.setItem('customize', 1);
        openLoginModal();
      }
    }

    function openLoginModal(urlParams) {
      const modalInstance = $uibModal.open({
        windowClass: 'small-modal login-modal',
        animation: true,
        backdrop: 'static',
        templateUrl: '/gadgets/wechat-login-subscribe-modal/template.html',
        controller: 'wechatLoginSubscribeCtrl',
        controllerAs: 'vm',
        resolve: {
          urlParams: () => urlParams,
        },
      });
      saveStatus();
      modalInstance.result
        .then(() => {
        })
        .catch(() => {
        });
    }

    function openCustomizeModal() {
      const modal = $uibModal.open({
        windowClass: 'customize-modal',
        animation: true,
        keyboard: false,
        templateUrl: '/components/pc/app/customize-modal/template.html',
        size: 'lg',
        controller: 'customizeModalCtrl',
        controllerAs: 'vm',
        resolve: {
          user: () => vm.user,
          options: () => vm.options,
          customizationInfo: () => vm.customizationInfo,
        },
      });
      modal.result
      .then((type) => {
        if (type === 'recustomize') {
          vm.params = {
            keyword: '',
            pageNum: 1,
            itemsPerPage: 20,
          };
          $rootScope.keyword = vm.params.keyword;
          vm.acceptPush = 1;
          checkUserCustomizationInfo('recustomize');
        }
      });
    }

    function checkUserCustomizationInfo(type) {
        userService.getCustomization({
          userId: vm.user.id,
        })
        .then((customizationInfo) => {
          if (customizationInfo.industries.length ||
              customizationInfo.locations.length ||
              customizationInfo.positions.length ||
              customizationInfo.stages.length
          ) {
            vm.customizationInfo = {
              industries: customizationInfo.industries,
              locations: customizationInfo.locations,
              positions: customizationInfo.positions,
              stages: customizationInfo.stages,
            };
            $rootScope.customizedStatus = 'success';
            if (type === 'recustomize') {
              loadCustomizeData();
            }
            getList(buildCondition());
          }
        })
        .catch(error => console.error(error));
    }

    function loadCustomizeData() {
      $rootScope.customizedStatus = 'loading';
      vm.animationDuration = Math.floor(Math.random() * 5);
      $rootScope.animationDuration = vm.animationDuration;
      if (vm.animationDuration < 2) {
        loadCustomizeData();
      }
      const timer = $timeout(() => {
        $rootScope.customizedStatus = 'success';
        $rootScope.reloadDanmu = true;
        $timeout.cancel(timer);
      }, vm.animationDuration * 1000);
    }

    function getOptionList() {
      Promise.all([
        opportunityService.getIndustryStatistics({
          type: 0,
        }),
        professionService.getList(),
        tagService.getTagList('college_qa_type')
      ])
      .then((result) => {
        console.log('result==', result);
        const goOnCustomize = localStorage.getItem('customize');
        vm.options = result;
        if (goOnCustomize && vm.user && !vm.user.isPreferenced) {
          openCustomizeModal();
        }
        localStorage.removeItem('customize');
      })
      .catch(error => console.error(error));
    }

    function updateAcceptPush(data) {
      userService.updateAcceptPush(data)
        .then(result => {
          vm.disabled = false;
        })
        .catch(error => {
          console.error('订阅状态改变错误：', error);
        });
    }

    function changeAcceptPush(event) {
      vm.disabled = true;
      userService.getUserInfo({id: vm.user.id})
				.then((result) => {
					vm.user.subscribe = result.subscribe;
				})
				.catch((error) => {
					console.error(error);
          return;
				});
      if(vm.user.subscribe && !vm.acceptPush) {
        vm.acceptPush = 1;
        updateAcceptPush(vm.acceptPush);
      } else if (vm.user.subscribe && vm.acceptPush) {
        vm.acceptPush = 0;
        updateAcceptPush(vm.acceptPush);
      } else if (!vm.user.subscribe && vm.acceptPush) {
        vm.acceptPush = 0;
        updateAcceptPush(vm.acceptPush);
      } else if (!vm.user.subscribe && !vm.acceptPush) {
        const modalInstance = $uibModal.open({
          windowClass: 'small-modal login-modal',
          animation: true,
          backdrop: 'static',
          templateUrl: '/gadgets/wechat-subscribe-modal/template.html',
          controller: 'wechatSubscribeCtrl',
          controllerAs: 'vm',
          resolve: {
            userId: () => vm.user.id,
          },
        });

        modalInstance.result
          .then((result) => {
            if(result === 'subscribe') {
              vm.acceptPush = 1;
              updateAcceptPush(vm.acceptPush);
              $USER.subscribe = true;
              vm.user = $USER;
              userService.refreshToken({
                id: $USER.id,
              })
              .then(result => {console.log(result);})
              .catch(error => console.error(error));
            } else {
              vm.acceptPush = 0;
              event.target.checked = vm.acceptPush;
              vm.disabled = false;
            }
          })
          .catch((error) => {
            console.error('组件错误:',error);
          });
      }
    }
  }
})();
