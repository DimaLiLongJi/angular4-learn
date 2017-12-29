(() => {
  angular.module('App')
  .controller('allRecruitCtrl', allRecruitCtrl);

  allRecruitCtrl.$inject = [
    'subscriptionService',
    'opportunityService',
    '$sessionStorage',
    'userService',
    '$rootScope',
    '$uibModal',
    '$timeout',
    '$scope',
    '$USER'
  ];

  function allRecruitCtrl(
    subscriptionService,
    opportunityService,
    $sessionStorage,
    userService,
    $rootScope,
    $uibModal,
    $timeout,
    $scope,
    $USER
  ) {
    const vm = this;
    vm.user = $USER;
    vm.$onInit = () => {
      vm.sessionParams = $sessionStorage.getObject('recruitCalendarParams') || {};
      $sessionStorage.remove('recruitCalendarParams');
      vm.industryList = [];
      vm.companyArray = [];
      vm.limit = 7;
      vm.expandIndustryList = true;
      vm.pageNum = vm.sessionParams.pageNum || 1;
      vm.totalItems = 0;
      vm.totalPages = 0;
      vm.itemsPerPage = 10;
      $rootScope.keyword = vm.sessionParams.keyword || '';
      vm.params = {
        pageNum: vm.sessionParams.pageNum || 1,
        itemsPerPage: vm.sessionParams.itemsPerPage,
        applyStart: vm.sessionParams.applyStart,
        applyYear: vm.sessionParams.applyYear,
        applyStatus: vm.sessionParams.applyStatus || '',
        industryId: vm.sessionParams.industryId || 0,
        keyword: $rootScope.keyword,
      };

      vm.showAllTags = showAllTags;
      vm.pageChanged = pageChanged;
      vm.selectIndustry = selectIndustry;
      vm.selectStatus = selectStatus;
      vm.gotoCompany = gotoCompany;
      vm.search = search;
      vm.closeTip = closeTip;
      vm.openLoginModal = openLoginModal;
      vm.openSubscriptionModal = openSubscriptionModal;
      vm.subscribe = subscribe;

      if (!vm.params.applyStart && !vm.params.applyYear) {
        vm.params.applyStart = `${moment().year()}-${moment().month() + 1}`;
      }

      init();
    };
    // 如果时间段变化，重新获取列表
    $scope.$watch('vm.params.applyStart', (n, o) => {
      if ((n === o) || !n) return;
      // if ((n === o) || !n || !o) return;
        getCompanyStatistics({
          date: n,
        });
      vm.pageNum = 1;
      vm.params.pageNum = vm.pageNum;
      search();
    });

    function init() {
      getCompanyStatistics();
      search();

      if (sessionStorage.getItem('danmuSwich')) {
        vm.swichStatus = sessionStorage.getItem('danmuSwich') === 'true';
      } else {
        vm.swichStatus = true;
      }

      vm.industryId = sessionStorage.getItem('subscriptionIndustryId');
      if (vm.industryId) {
        subscribe(null, {
          industry: {
            id: vm.industryId,
            subscriptionStatus: false,
          },
        });
        sessionStorage.removeItem('subscriptionIndustryId');
      }
      if (!$USER) {
        vm.tipStatus = true;
      }
      if ($USER && $USER.subscribe) {
        vm.tipStatus = false;
      } else {
        vm.tipStatus = true;
      }
    }

    $rootScope.searchAllRecruit = (keyword) => {
      vm.pageNum = 1;
      vm.params.keyword = keyword;
      search();
    };

    function subscribe(event, c) {
      const industryId = c.industry.id;
      if (event) {
        event.stopPropagation();
      }
      if (c.subscriptionStatus) {
        return;
      }
      if (!$USER || !$USER.subscribe) {
        sessionStorage.setItem('subscriptionIndustryId', industryId);
        openSubscriptionModal(false, industryId);
        return;
      }

      checkFollowStatus(industryId);
    }

    function checkFollowStatus(industryId) {
      getUserInfo()
        .then((result) => {
          $USER.subscribe = result.subscribe;
          if (!result.subscribe) {
            openSubscriptionModal(false, industryId);
            return;
          }
          subscribeIndustry({
            userId: $USER.id,
            industryId,
          });
        })
        .catch((error) => {
          console.log('errr=', error);
        });
    }

    function openLoginModal({ urlParams, industryId, }) {
      $uibModal.open({
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
    }

    function openSubscriptionModal(subscription, industryId) {
      const modalInstance = $uibModal.open({
        windowClass: 'small-modal subscription-modal',
        animation: true,
        backdrop: 'static',
        templateUrl: '/gadgets/subscription-modal/template.html',
        controller: 'subscriptionCtrl',
        controllerAs: 'vm',
        resolve: {
          subscribe: () => subscription,
          scene: () => 'recruit',
        },
      });

      modalInstance.result
        .then((result) => {
          if (!subscription) {
            if (!$USER) {
              window.location.reload();
            }
            if ($USER && $USER.subscribe) {
              vm.tipStatus = false;
            } else {
              vm.tipStatus = true;
            }
            subscribeIndustry({
              userId: result.id,
              industryId,
            });
          }
        })
        .catch(() => {
          search();
        });
    }

    function subscribeIndustry(params) {
      subscriptionService.create(params)
        .then(() => {
          const timer = $timeout(() => {
            openSubscriptionModal(true);
            $timeout.cancel(timer);
          }, 500);
          sessionStorage.removeItem('subscriptionIndustryId');
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function getUserInfo() {
			return userService.getUserInfo({
				id: $USER.id,
			});
		}

    function getSubscriptionInfo() {
      if (!$USER) {
        return;
      }
      subscriptionService.getList({
        userId: $USER.id,
      })
        .then((result) => {
          vm.subscriptionIndustryIds = result;
          vm.companyArray.map((c) => {
            if (vm.subscriptionIndustryIds.some(sId => sId.industryId === c.industryId)) {
              c.subscriptionStatus = 1;
            } else {
              c.subscriptionStatus = 0;
            }
            return c;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
// =====================>
    function getRecruitList(params) {
      opportunityService.getRecruitCompanyList(params)
        .then((result) => {
          vm.companyArray = parseRecruitList(result.companies);
          vm.totalItems = result.totalItems;
          vm.totalPages = Math.ceil(vm.totalItems / vm.itemsPerPage);
        })
        .then(() => {
          getSubscriptionInfo();
        })
        .catch((error) => {
          console.error('get recruit company list failed:', error);
        });
    }

    function parseRecruitList(array) {
      if (!array.length) {
        return [];
      }
      array.map((r) => {
        if (r.opportunity.applyStart) {
          r.opportunity.applyStart = moment(r.opportunity.applyStart).format('YYYY/MM/DD');
        }
        if (r.opportunity.applyEnd) {
          r.opportunity.applyEnd = moment(r.opportunity.applyEnd).format('YYYY/MM/DD');
        } else {
          r.opportunity.applyEnd = '待定';
        }
        if (r.introduction) {
          r.text = `${r.introduction.replace(/\n/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, '')
          .replace(/\s/g, '')
          .replace(/<\/?[^>]*>/g, '')
          .trim()
          .substr(0, 70)}……`;
        } else {
          r.text = '暂无';
        }
        if (!r.industry) {
          r.industry = {
            name: '暂无',
          };
        }
        if (!r.size) {
          r.size = {
            name: '暂无',
          };
        }
        if (r.opportunity.applyStatus === 'unknown') {
          r.opportunity.applyStatus = 'finished';
        }
        return r;
      });
      return array;
    }

    function getCompanyStatistics(params) {
      opportunityService.getCompanyStatistics(params)
        .then((result) => {
          vm.industryList = result.byIndustry.map((i) => {
            if (i.name && i.name.length > 6) {
              i.name = `${i.name.slice(0, 6)}…`;
              if (i.name.lastIndexOf('/') === 5) {
                i.name = `${i.name.slice(0, 5)}…`;
              }
            }
            if (!i.name) {
              i.name = '其它';
              i.id = -1;
            }
            return i;
          }).sort((a, b) => b.companies - a.companies);
          if (result.byIndustry.length) {
            const companyCount = result.byIndustry.map(c => c.companies).reduce((a, b) => a + b);
            vm.industryList.unshift({
              id: 0,
              name: '全部',
              companies: companyCount,
            });
          }
          if (vm.theLastTime && (vm.industryList.length >= vm.limit)) {
            vm.expandIndustryList = true;
            vm.theLastTime = false;
          }
        })
        .catch((error) => {
          console.error('getCompanyStatistics error', error);
        });
    }

    function buildCondition() {
      const params = Object.assign({}, vm.params);
      let key;
      if (params.keyword) {
        params.itemsPerPage = 12;
        // $sessionStorage.putObject('recruitCalendarParams', params);
        return params;
      }
      if (params.applyStart && Number(params.applyStart) > 12) {
        params.applyYear = params.applyStart;
        delete params.applyStart;
      }
      for (key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }
      // $sessionStorage.putObject('recruitCalendarParams', params);
      return params;
    }

    function search(target) {
      const params = buildCondition(target);
      getRecruitList(params);
    }

    function selectIndustry(industry) {
      vm.pageNum = 1;
      vm.params.pageNum = vm.pageNum;
      vm.params.industryId = industry.id;
      search();
    }

    function selectStatus(status) {
      vm.pageNum = 1;
      vm.params.pageNum = vm.pageNum;
      vm.params.applyStatus = status;
      search();
    }

    function gotoCompany(id) {
      $sessionStorage.putObject('recruitCalendarParams', buildCondition());
      window.location.href = `/company/${id}?campus=1`;
    }

    function showAllTags() {
      vm.expandIndustryList = false;
    }

    function closeTip() {
      vm.tipStatus = !vm.tipStatus;
    }

    function pageChanged() {
      vm.params.pageNum = vm.pageNum;
      search('change page');
    }
  }
})();
