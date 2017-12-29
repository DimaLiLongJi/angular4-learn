(() => {
  angular.module('App').controller('allRecruitCtrl', allRecruitCtrl);

  allRecruitCtrl.$inject = [
    'opportunityService',
    'companyService',
    'tagService',
    '$window',
    'BASE_URL',
    '$sessionStorage',
    'userService',
    '$cacheFactory',
    '$USER'
  ];

  function allRecruitCtrl(opportunityService,
    companyService,
    tagService,
    $window,
    BASE_URL,
    $sessionStorage,
    userService,
    $cacheFactory,
    $USER
  ) {
    const vm = this;
    vm.applyStatusList = [{
      id: null,
      name: '全部',
      tabName: '校招状态',
    }, {
      id: 1,
      name: '未开始',
    }, {
      id: 2,
      name: '进行中',
    }, {
      id: 3,
      name: '已结束',
    }];

    vm.sessionParams = $sessionStorage.getObject('recruitCalendarParams') || {};
    vm.keyword = vm.sessionParams.keyword || '';
    vm.applyStatus = vm.sessionParams.applyStatus || {
      id: null,
      name: '全部',
      tabName: '校招状态',
    };
    vm.selectedIndustry = vm.sessionParams.selectedIndustry || {
      id: 0,
      name: '不限行业',
    };
    vm.monthSelectedItem = vm.sessionParams.monthSelectedItem || {
      year: moment().year(),
      month: moment().month() + 1,
      tabName: `${moment().year()}年${moment().month() + 1}月`,
    };
    vm.applyStart = vm.monthSelectedItem.date || moment().date(1).toDate();

    const form = document.getElementById('form');
    const inpu = document.getElementById('searchOppCompany');
    vm.industryListStatus = false;
    vm.allRecruitIsLoad = false;
    // vm.pushTipStatus = true;
    //
    vm.industryArray = [];
    vm.STORE = $cacheFactory.get('STORE');


    vm.pageNum = 1;
    vm.itemsPerPage = 10;
    vm.dropdownStatus = {
      applyStatus: false,
      startTime: false,
      industry: false,
    };
    vm.monthSelectorYearRange = [moment().year(), moment().year() + 1];

    vm.searchRecruitByKeyword = searchRecruitByKeyword;
    vm.loadMoreCompanies = loadMoreCompanies;
    vm.gocompanyDetail = gocompanyDetail;
    vm.enterSearch = enterSearch;
    vm.hideAllPanel = hideAllPanel;
    vm.filterStatus = filterStatus;
    vm.filterIndustry = filterIndustry;
    vm.filterDate = filterDate;
    vm.getMonthStatistics = getMonthStatistics;
    vm.openDetail = openDetail;
    vm.closeTip = closeTip;
    vm.follow = follow;

    if (window.devicePixelRatio && devicePixelRatio >= 2) {
      vm.hairline = true;
    }

    vm.$onInit = () => {
    // getIndustryStatistics();
      getMonthStatistics();
      getUserInfo();
      console.log(`vm.STORE.get('recruitArray')1111111`, vm.STORE.get('recruitArray'));
      if (vm.STORE.get('recruitArray')) {
        vm.recruitArray = vm.STORE.get('recruitArray');
        vm.pageNum = vm.STORE.get('recruitPageNum');
        vm.recruitCount = vm.STORE.get('recruitCount');
      } else {
        getCompanyList(buildParams());
      }
    };

    form.submit = () => {
      searchRecruitByKeyword();
      inpu.blur();
      return false;
    };
    activate();

    function activate() {
      opportunityService.getIndustryStatistics({
        type: 0,
      }).then((result) => {
        vm.industryArray = [{
          id: 0,
          name: '不限',
          count: result.map(r => r.count).reduce((c, n) => c + n),
        }];
        vm.industryArray = vm.industryArray.concat(result);
        vm.industryArray.forEach((i) => {
          if (i.name.length > 6) {
            i.name = `${i.name.slice(0, 6)}…`;
            if (i.name.lastIndexOf('/') === 5) {
              i.name = `${i.name.slice(0, 5)}…`;
            }
          }
        });
      });
    }

    function closeTip() {
      vm.pushTipStatus = !vm.pushTipStatus;
    }

    function follow() {
      if (!$USER) {
        window.location.href = '/api/auth/login?originalUrl=/go-wechat?follow=1';
      }
      if ($USER && !$USER.subscribe) {
        window.location.href = '/go-wechat?follow=1';
      }
    }

    function hideAllPanel() {
      vm.dropdownStatus.applyStatus = false;
      vm.dropdownStatus.startTime = false;
      vm.dropdownStatus.industry = false;
    }

    function enterSearch(event) {
      if (event.keyCode !== 13) {
        return;
      }
      event.target.blur();
      searchRecruitByKeyword();
    }

    function gocompanyDetail(company) {
      sessionStorage.setItem('company', 1);
      window.location.href = `/company/${company.id}`;
    }

    function loadMoreCompanies() {
      vm.pageNum++;
      getCompanyList(buildParams(), 'scroll');
    }

    function buildParams() {
      const params = {};
      params.pageNum = vm.pageNum;
      params.itemsPerPage = vm.itemsPerPage;
      if (vm.keyword) {
        params.keyword = vm.keyword;
      } else {
        if (vm.selectedIndustry.id) {
          params.industryId = vm.selectedIndustry.id;
        }
        if (vm.applyStatus) {
          params.applyStatus = vm.applyStatus.id;
        }
        if (vm.applyStart) {
          params.applyStart = vm.applyStart;
        }
      }
      return params;
    }


    function searchRecruitByKeyword() {
      vm.pageNum = 1;
      vm.allRecruitIsLoad = false;
      event.target.blur();
      vm.sessionParams.keyword = vm.keyword;
      $sessionStorage.putObject('recruitCalendarParams', vm.sessionParams);
      getCompanyList(buildParams());
    }

    // get list  methods
    function getCompanyList(params, type) {
      if (vm.allRecruitIsLoad) {
        return;
      }
      opportunityService.getRecruitCompanyList(params).then((result) => {
        vm.recruitCount = result.totalItems || 0;
        const newCompanyList = result.companies.map((company) => {
          if (company.opportunity) {
            switch (company.opportunity.applyStatus) {
              case 'waiting':
                company.status = {
                  id: 1,
                  name: '未开始',
                };
                break;
              case 'ongoing':
                company.status = {
                  id: 2,
                  name: '进行中',
                };
                break;
              case 'finished':
                company.status = {
                  id: 3,
                  name: '已结束',
                };
                break;
              default:
            }
          }
          return company;
        });

        if (type === 'scroll') {
          vm.recruitArray = vm.recruitArray.concat(newCompanyList);
        } else {
          vm.recruitArray = newCompanyList;
        }
        if (!result.companies.length || result.companies.length < vm.itemsPerPage) {
          vm.allRecruitIsLoad = true;
        }
        vm.STORE.put('recruitArray', vm.recruitArray);
        vm.STORE.put('recruitPageNum', vm.pageNum);
        vm.STORE.put('recruitCount', vm.recruitCount);
      }).catch((error) => {
        console.error(error);
      });
    }

    function getIndustryStatistics() {
      opportunityService.getIndustryStatistics().then((result) => {
        vm.industryArray = [{
          id: 0,
          name: '不限行业',
          count: result.map(r => r.count).reduce((c, n) => c + n),
        }];
        vm.industryArray = vm.industryArray.concat(result);
      });
    }


    function filterStatus(status) {
      vm.applyStatus = status;
      vm.allRecruitIsLoad = false;
      vm.pageNum = 1;
      vm.sessionParams.applyStatus = status;
      $sessionStorage.putObject('recruitCalendarParams', vm.sessionParams);
      getCompanyList(buildParams());
    }

    function filterIndustry(industry) {
      vm.selectedIndustry = industry;
      vm.allRecruitIsLoad = false;
      vm.pageNum = 1;
      vm.sessionParams.selectedIndustry = industry;
      $sessionStorage.putObject('recruitCalendarParams', vm.sessionParams);
      getCompanyList(buildParams());
    }

    function filterDate(date) {
      vm.applyStart = date;
      vm.allRecruitIsLoad = false;
      vm.pageNum = 1;
      vm.sessionParams.monthSelectedItem = vm.monthSelectedItem;
      $sessionStorage.putObject('recruitCalendarParams', vm.sessionParams);
      getCompanyList(buildParams());
    }

    function getMonthStatistics(date) {
      opportunityService.getCompanyStatistics({
        date: date || new Date(),
      }).then((result) => {
        vm.monthStatistics = result;
      });
    }

    function openDetail(recruit) {
      $window.location.href = `${BASE_URL}/company/${recruit.id}?positions=true`;
    }

    function getUserInfo() {
      if (!$USER) {
        vm.pushTipStatus = true;
        return;
      }
      userService.getUserInfo({
          id: $USER.id,
        })
        .then((result) => {
          if ($USER.subscribe !== result.subscribe) {
            $USER.subscribe = result.subscribe;
            userService.refreshToken({
              id: $USER.id,
            });
          }
          if ($USER && $USER.subscribe) {
            vm.pushTipStatus = false;
          } else {
            vm.pushTipStatus = true;
          }
				})
				.catch((error) => {
					console.error(error);
				});
		}
  }
})();
