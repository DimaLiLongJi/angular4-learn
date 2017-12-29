import 'swiper/dist/css/swiper.min.css';
import 'swiper/dist/js/swiper.min';
import './qrcode-modal/index';
import './style.less';

  internOpportunityCtrl.$inject = [
    'opportunityService',
    'userService',
    'bannerService',
    '$scope',
    '$sessionStorage',
    '$timeout',
    '$cacheFactory',
    '$USER',
    '$state',
    '$location',
    '$rootScope',
    'BASE_URL'
  ];

  function internOpportunityCtrl(
    opportunityService,
    userService,
    bannerService,
    $scope,
    $sessionStorage,
    $timeout,
    $cacheFactory,
    $USER,
    $state,
    $location,
    $rootScope,
    BASE_URL
  ) {
    const vm = this;
    vm.pageNum = 1;
    vm.itemsPerPage = 10;
    vm.opportunityArray = null;
    vm.bannerArray = [];
    vm.listCategroy = 'intern';
    vm.$USER = $USER;
    vm.searchTimer = null;
    vm.selectedOppIndustry = {
      id: 0,
      name: '不限',
      category: 'all',
    };
    vm.selectedLocation = {
      id: 0,
      name: '不限',
      category: 'all',
    };
    vm.listStatus = {
      category: false,
      location: false,
      industry: false,
    };
    vm.defaultBanner = [{
      imageUrl: '/images/interview_material_m/banner.jpg',
      id: 1,
      link: '/mobile/discovery/interview_material',
    }, {
      imageUrl: 'http://media.careerfrog.com.cn/Banner2.f2ad68de59d2f78b.jpg',
      id: 2,
      link: '#',
    }, {
      imageUrl: '/images/opp-push-banner.png',
      id: 3,
      link: '#',
    }];
    vm.toolBarFixed = false;
    vm.allOppIsLoad = false;
    vm.myInterval = 5000;
    vm.noWrapSlides = false;
    vm.active = 0;
    vm.slides = [];
    let currIndex = 0;
    const container = document.body.querySelector('.intern-opportunity-container');
    const htmlDom = angular.element(document).find('html');
    const htmlFontSize = htmlDom.css('font-size').slice(0, -2);
    let topValue = 0;
    vm.STORE = $cacheFactory.get('STORE');
    vm.disabled = false;
    vm.qrcodeModalStatus = false;

    vm.loadMoreInternOpp = loadMoreInternOpp;
    vm.searchOpp = searchOpp;
    vm.goOppDetail = goOppDetail;
    vm.enterSearch = enterSearch;
    vm.toggleOppType = toggleOppType;
    vm.goPreferences = goPreferences;
    vm.changeAcceptPush = changeAcceptPush;

    vm.isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

    vm.$onInit = () => {
      $timeout(()=> {
        const swiper = new Swiper('.swiper-container', {
          paginationClickable: true,
          autoplay: 3000,
          loop: true,
        });
      }, 1000);
      const sessionParams = $sessionStorage.getObject('internOpportunity');
      if (sessionParams) {
        vm.keyword = sessionParams.keyword;
        if (sessionParams.selectedLocation) vm.selectedLocation = sessionParams.selectedLocation;
        if (sessionParams.selectedOppIndustry) vm.selectedOppIndustry = sessionParams.selectedOppIndustry;
      }
      const cachedTab = vm.STORE.get('internActiveTab');

      if($USER) {
        vm.$USER.acceptPush = vm.$USER.subscribe?$USER.acceptPush : 0;
        if (sessionStorage.getItem('loginTarget') && !$USER.isPreferenced) {
          sessionStorage.removeItem('loginTarget');
          window.location.href = '/mobile/preferences';
        }
      }

      if (cachedTab || cachedTab === 0) {
        toggleOppType(cachedTab);
      } else if ($USER && $USER.isPreferenced) {
        toggleOppType(1);
      } else {
        toggleOppType(0);
      }
      checkCustomizedStatus();
      getBannerList();
    };
    container.addEventListener('scroll', () => {
      topValue = container.scrollTop;
      if (topValue > (5.28 - 1.29) * htmlFontSize) {
        vm.toolBarFixed = true;
        $scope.$apply();
      } else {
        vm.toolBarFixed = false;
        $scope.$apply();
      }
    });

    function goOppDetail(opp) {
      if (opp.description) {
        window.location.href = `/opportunity/${opp.id}`;
      } else {
        window.open(opp.applyLink, '_blank');
      }
    }

    function searchOpp() {
      vm.allOppIsLoad = false;
      vm.pageNum = 1;
      getOpportunityList(buildParams());
    }

    function loadMoreInternOpp() {
      vm.pageNum++;
      getOpportunityList(buildParams(), 'scroll');
    }

    function buildParams() {
      const params = {};
      const sessionParams = {};
      params.pageNum = vm.pageNum;
      params.itemsPerPage = vm.itemsPerPage;
      if (vm.keyword) {
        params.keyword = vm.keyword;
        sessionParams.keyword = vm.keyword;
      }
      if (vm.selectedOppIndustry.id) {
        params.industryId = vm.selectedOppIndustry.id;
        sessionParams.selectedOppIndustry = vm.selectedOppIndustry;
      }
      if (vm.selectedLocation.id) {
        params.locationId = vm.selectedLocation.id;
        sessionParams.selectedLocation = vm.selectedLocation;
      }

      $sessionStorage.putObject('internOpportunity', sessionParams);
      params.type = vm.activeTab;
      return params;
    }

    function getOpportunityList(params, action) {
      if (vm.allOppIsLoad) return;
      const queryPromise = params.type ? opportunityService.getPrefOpportunityList(params) : opportunityService.getOpportunityList(params);
      queryPromise
        .then((result) => {
          result.opps.forEach((opp) => {
            if (opp.locations.length) {
              opp.locationStr = opp.locations.map(l => l.name).reduce((c, n) => `${c} ${n}`);
            }
            if (opp.publishDate) {
              opp.publishDate = moment(opp.publishDate).format('MM-DD');
            }
          });
          if (action === 'scroll') {
            vm.opportunityArray = vm.opportunityArray.concat(result.opps);
          } else {
            vm.opportunityArray = result.opps;
          }
          if (!result.opps.length || vm.itemsPerPage * vm.pageNum > result.totalItems) {
            vm.allOppIsLoad = true;
          }
          if (!params.type) {
            vm.STORE.put('internOppList', vm.opportunityArray);
            vm.STORE.put('internOppPageNum', vm.pageNum);
            vm.STORE.put('internOppAllLoad', vm.allOppIsLoad);
          } else {
            vm.STORE.put('prefOppList', vm.opportunityArray);
            vm.STORE.put('prefOppPageNum', vm.pageNum);
            vm.STORE.put('prefOppAllLoad', vm.allOppIsLoad);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function getBannerList() {
      bannerService.getBanner()
        .then((result) => {
          vm.bannerArray = result.banners.filter(b => b.published);
          if (!vm.bannerArray.length) {
            vm.bannerArray = vm.defaultBanner;
          }
          console.log('result', result);
          addSlide(vm.bannerArray);
          $timeout(() => {
            $('.carousel-next .carousel-btn').click();
          }, 500);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function addSlide(bannerArray) {
      console.log(bannerArray);
      bannerArray.forEach((b) => {
        vm.slides.push({
          image: b.imageUrl,
          id: currIndex++,
          link: b.link,
        });
      });
    }

    function enterSearch(event) {
      if (event.keyCode !== 13) return;
      event.target.blur();
      searchOpp();
    }

    function toggleOppType(type) {
      vm.activeTab = type;
      vm.STORE.put('internActiveTab', vm.activeTab);
      if (type === 1) {
        if (!$USER || !$USER.isPreferenced) {
          vm.opportunityArray = [];
          vm.pageNum = 1;
          vm.allOppIsLoad = true;
        }
        //  else if (vm.STORE.get('prefOppList')) {
        //   vm.opportunityArray = vm.STORE.get('prefOppList');
        //   vm.pageNum = vm.STORE.get('prefOppPageNum');
        //   vm.allOppIsLoad = vm.STORE.get('prefOppAllLoad');
        // }
        else {
          vm.allOppIsLoad = false;
          vm.pageNum = 1;
          getOpportunityList(buildParams());
        }
      } else if (vm.STORE.get('internOppList')) {
        vm.allOppIsLoad = false;
        vm.opportunityArray = vm.STORE.get('internOppList');
        vm.pageNum = vm.STORE.get('internOppPageNum');
        vm.allOppIsLoad = vm.STORE.get('internOppAllLoad');
      } else {
        vm.pageNum = 1;
        vm.allOppIsLoad = false;
        getOpportunityList(buildParams());
      }
    }

    function goPreferences() {
      if (!$USER || !$USER.id) {
        sessionStorage.setItem('loginTarget', 'preferences');
        window.location.href = `${BASE_URL}/api/auth/login?originalUrl=${encodeURIComponent(`${BASE_URL}/mobile`)}`;
      } else {
        $state.go('preferences');
      }
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
      userService.getUserInfo({id: $USER.id})
				.then((result) => {
					vm.$USER.subscribe = result.subscribe;
				})
				.catch((error) => {
					console.error(error);
          return;
				});
      if(vm.$USER.subscribe && !vm.$USER.acceptPush) {
        vm.$USER.acceptPush = 1;
        updateAcceptPush(vm.$USER.acceptPush);
      } else if (vm.$USER.subscribe && vm.$USER.acceptPush) {
        vm.$USER.acceptPush = 0;
        updateAcceptPush(vm.$USER.acceptPush);
      } else if (!vm.$USER.subscribe && vm.$USER.acceptPush) {
        vm.$USER.acceptPush = 0;
        updateAcceptPush(vm.$USER.acceptPush);
      } else if (!vm.$USER.subscribe && !vm.$USER.acceptPush) {
          vm.disabled = false;
          event.target.checked = vm.$USER.acceptPush;
          if (vm.isiOS) {
            window.location.href = '/ios_qr_code';
            return;
          } else {
            vm.qrcodeModalStatus = true;
          }
      }
    }

    function checkCustomizedStatus() {
      const customizedStatus = sessionStorage.getItem('customizedStatus');
      if (customizedStatus === 'loading') {
        loadCustomizeData();
      }
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
        vm.qrcodeModalStatus = vm.$USER.subscribe?false : true;
        vm.$USER.acceptPush = vm.$USER.subscribe?1 : 0;
        sessionStorage.setItem('customizedStatus','success');
      }, vm.animationDuration * 1000);
    }
  }


  export default angular.module('App')
  .controller('internOpportunityCtrl', internOpportunityCtrl);

  // export default angular.module('internOpportunityCtrl', []).controller('internOpportunityCtrl', internOpportunityCtrl);
