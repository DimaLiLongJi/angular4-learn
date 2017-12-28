webpackJsonp([4],{

/***/ 1826:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(1868);

__webpack_require__(1869);

__webpack_require__(1870);

exports.default = angular.module('App').controller('recruitCalendarCtrl', recruitCalendarCtrl);


recruitCalendarCtrl.$inject = ['$state'];

function recruitCalendarCtrl($state) {
  // const vm = this;
  $state.go('recruit-calendar.deadline');
}

/***/ }),

/***/ 1868:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  angular.module('App').controller('allRecruitCtrl', allRecruitCtrl);

  allRecruitCtrl.$inject = ['opportunityService', 'companyService', 'tagService', '$window', 'BASE_URL', '$sessionStorage', 'userService', '$cacheFactory', '$USER'];

  function allRecruitCtrl(opportunityService, companyService, tagService, $window, BASE_URL, $sessionStorage, userService, $cacheFactory, $USER) {
    var vm = this;
    vm.applyStatusList = [{
      id: null,
      name: '全部',
      tabName: '校招状态'
    }, {
      id: 1,
      name: '未开始'
    }, {
      id: 2,
      name: '进行中'
    }, {
      id: 3,
      name: '已结束'
    }];

    vm.sessionParams = $sessionStorage.getObject('recruitCalendarParams') || {};
    vm.keyword = vm.sessionParams.keyword || '';
    vm.applyStatus = vm.sessionParams.applyStatus || {
      id: null,
      name: '全部',
      tabName: '校招状态'
    };
    vm.selectedIndustry = vm.sessionParams.selectedIndustry || {
      id: 0,
      name: '不限行业'
    };
    vm.monthSelectedItem = vm.sessionParams.monthSelectedItem || {
      year: moment().year(),
      month: moment().month() + 1,
      tabName: moment().year() + '\u5E74' + (moment().month() + 1) + '\u6708'
    };
    vm.applyStart = vm.monthSelectedItem.date || moment().date(1).toDate();

    var form = document.getElementById('form');
    var inpu = document.getElementById('searchOppCompany');
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
      industry: false
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

    vm.$onInit = function () {
      // getIndustryStatistics();
      getMonthStatistics();
      getUserInfo();
      console.log('vm.STORE.get(\'recruitArray\')1111111', vm.STORE.get('recruitArray'));
      if (vm.STORE.get('recruitArray')) {
        vm.recruitArray = vm.STORE.get('recruitArray');
        vm.pageNum = vm.STORE.get('recruitPageNum');
        vm.recruitCount = vm.STORE.get('recruitCount');
      } else {
        getCompanyList(buildParams());
      }
    };

    form.submit = function () {
      searchRecruitByKeyword();
      inpu.blur();
      return false;
    };
    activate();

    function activate() {
      opportunityService.getIndustryStatistics({
        type: 0
      }).then(function (result) {
        vm.industryArray = [{
          id: 0,
          name: '不限',
          count: result.map(function (r) {
            return r.count;
          }).reduce(function (c, n) {
            return c + n;
          })
        }];
        vm.industryArray = vm.industryArray.concat(result);
        vm.industryArray.forEach(function (i) {
          if (i.name.length > 6) {
            i.name = i.name.slice(0, 6) + '\u2026';
            if (i.name.lastIndexOf('/') === 5) {
              i.name = i.name.slice(0, 5) + '\u2026';
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
      window.location.href = '/company/' + company.id;
    }

    function loadMoreCompanies() {
      vm.pageNum++;
      getCompanyList(buildParams(), 'scroll');
    }

    function buildParams() {
      var params = {};
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
      opportunityService.getRecruitCompanyList(params).then(function (result) {
        vm.recruitCount = result.totalItems || 0;
        var newCompanyList = result.companies.map(function (company) {
          if (company.opportunity) {
            switch (company.opportunity.applyStatus) {
              case 'waiting':
                company.status = {
                  id: 1,
                  name: '未开始'
                };
                break;
              case 'ongoing':
                company.status = {
                  id: 2,
                  name: '进行中'
                };
                break;
              case 'finished':
                company.status = {
                  id: 3,
                  name: '已结束'
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
      }).catch(function (error) {
        console.error(error);
      });
    }

    function getIndustryStatistics() {
      opportunityService.getIndustryStatistics().then(function (result) {
        vm.industryArray = [{
          id: 0,
          name: '不限行业',
          count: result.map(function (r) {
            return r.count;
          }).reduce(function (c, n) {
            return c + n;
          })
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
        date: date || new Date()
      }).then(function (result) {
        vm.monthStatistics = result;
      });
    }

    function openDetail(recruit) {
      $window.location.href = BASE_URL + '/company/' + recruit.id + '?positions=true';
    }

    function getUserInfo() {
      if (!$USER) {
        vm.pushTipStatus = true;
        return;
      }
      userService.getUserInfo({
        id: $USER.id
      }).then(function (result) {
        if ($USER.subscribe !== result.subscribe) {
          $USER.subscribe = result.subscribe;
          userService.refreshToken({
            id: $USER.id
          });
        }
        if ($USER && $USER.subscribe) {
          vm.pushTipStatus = false;
        } else {
          vm.pushTipStatus = true;
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
  }
})();

/***/ }),

/***/ 1869:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  angular.module('App').controller('deadlineRecruitCtrl', deadlineRecruitCtrl);

  deadlineRecruitCtrl.$inject = ['opportunityService', 'companyService', 'tagService', '$window', 'BASE_URL'];

  function deadlineRecruitCtrl(opportunityService, companyService, tagService, $window, BASE_URL) {
    var vm = this;
    vm.$onInit = function () {
      vm.params = {
        selectedIndustry: {
          id: 0,
          name: '不限行业'
        },
        pageNum: 1,
        itemsPerPage: 10
      };
      vm.totalItems = 0;
      vm.allRecruitIsLoad = false;
      vm.industryArray = [];
      vm.industrySelectorStatus = false;
      vm.list = document.querySelector('#list');

      vm.loadMoreCompanies = loadMoreCompanies;
      vm.openDetail = openDetail;
      vm.toggleIndustrySelector = toggleIndustrySelector;
      vm.selectIndustry = selectIndustry;

      activate();
    };

    function activate() {
      var sessionParams = sessionStorage.getItem('deadlineRecruit');

      if (sessionParams) {
        sessionStorage.removeItem('deadlineRecruit');
        vm.params = JSON.parse(sessionParams);
        vm.recruitArray = vm.params.recruitArray;
        vm.allRecruitIsLoad = vm.params.allRecruitIsLoad;
        vm.totalItems = vm.params.totalItems;
        scrollTo();
        delete vm.params.totalItems;
        delete vm.params.recruitArray;
        delete vm.params.allRecruitIsLoad;
      } else {
        getCompanyList(buildParams());
      }

      if (window.devicePixelRatio && devicePixelRatio >= 2) {
        vm.hairline = true;
      }
      getIndustryStatistics();
    }

    function scrollTo() {
      window.onload = function () {
        vm.list.scrollTop = vm.params.scrollTop;
        delete vm.params.scrollTop;
      };
    }

    function toggleIndustrySelector() {
      vm.industrySelectorStatus = !vm.industrySelectorStatus;
    }

    function selectIndustry(industry) {
      vm.industryArray.forEach(function (ind) {
        ind.selected = false;
      });
      industry.selected = true;

      vm.params.selectedIndustry = industry;
      vm.params.pageNum = 1;
      vm.allRecruitIsLoad = false;
      toggleIndustrySelector();
      getCompanyList(buildParams());
    }

    function loadMoreCompanies() {
      vm.params.pageNum++;
      getCompanyList(buildParams(), 'scroll');
    }

    function buildParams() {
      var params = Object.assign({}, vm.params);
      if (vm.params.selectedIndustry.id) {
        params.industryId = vm.params.selectedIndustry.id;
        delete params.selectedIndustry;
      }
      return params;
    }

    // get list  methods
    function getCompanyList(params, type) {
      if (vm.allRecruitIsLoad) {
        return;
      }
      opportunityService.getRecruitCountdownList(params).then(function (result) {
        vm.totalItems = result.totalItems;
        var newOppList = result.opportunities.map(function (opp) {
          switch (opp.status) {
            case 1:
              opp.status = {
                id: 1,
                name: '未开始'
              };
              break;
            case 2:
              opp.status = {
                id: 2,
                name: '进行中'
              };
              break;
            case 3:
              opp.status = {
                id: 3,
                name: '已结束'
              };
              break;
            default:
          }
          return opp;
        });

        if (type === 'scroll') {
          vm.recruitArray = vm.recruitArray.concat(newOppList);
        } else {
          vm.recruitArray = newOppList;
        }
        if (vm.recruitArray.length === vm.totalItems) {
          vm.allRecruitIsLoad = true;
        }
      }).catch(function (error) {
        console.error(error);
      });
    }

    function getIndustryStatistics() {
      opportunityService.getIndustryStatistics().then(function (result) {
        vm.industryArray = [{
          id: 0,
          name: '不限',
          count: result.map(function (r) {
            return r.count;
          }).reduce(function (c, n) {
            return c + n;
          })
        }];
        vm.industryArray = vm.industryArray.concat(result);
      });
    }

    function openDetail(recruit) {
      saveStatus();
      $window.location.href = BASE_URL + '/company/' + recruit.companies[0].id + '?positions=true';
    }

    function saveStatus() {
      var params = Object.assign({}, vm.params);
      params.recruitArray = vm.recruitArray;
      params.scrollTop = vm.list.scrollTop;
      params.allRecruitIsLoad = vm.allRecruitIsLoad;
      params.totalItems = vm.totalItems;
      sessionStorage.setItem('deadlineRecruit', JSON.stringify(params));
    }
  }
})();

/***/ }),

/***/ 1870:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1871);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1816)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--2-2!../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--2-3!./style.less", function() {
			var newContent = require("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--2-2!../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--2-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1871:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1815)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.recruit-calendar-container{height:100vh;overflow:auto;display:flex;flex-direction:column}.recruit-calendar-container.no-scroll{overflow:hidden}.recruit-calendar-container .search-bar{display:flex;position:relative;padding:.21774194rem .32258065rem}.recruit-calendar-container .search-bar .input-wrapper{flex:1;height:.75806452rem;width:4.5rem;border-radius:.72580645rem;background:#f5f5f5;border:none;display:flex;align-items:center;padding:0 .41935484rem}.recruit-calendar-container .search-bar .input-wrapper .iconfont{margin-right:.25806452rem;color:#c2c2c2}.recruit-calendar-container .search-bar .input-wrapper input{border:none;flex:1;background-color:transparent}.recruit-calendar-container .search-bar .input-wrapper input::-webkit-input-placeholder{color:#c2c2c2}.recruit-calendar-container .search-bar .input-wrapper input::-moz-input-placeholder{color:#c2c2c2}.recruit-calendar-container .search-bar .input-wrapper input[type=search]{-webkit-appearance:none}.recruit-calendar-container .search-bar .input-wrapper input::-webkit-search-cancel-button{display:none}.recruit-calendar-container .search-bar button{font-size:14px;margin-left:.3rem;padding:0 .1rem;background:#fff;color:#666;border:none}[data-dpr=\"2\"] .recruit-calendar-container .search-bar button{font-size:28px}[data-dpr=\"3\"] .recruit-calendar-container .search-bar button{font-size:42px}.recruit-calendar-container .search-recruit-calendar-container{position:relative}.recruit-calendar-container .search-recruit-calendar-container .selector-wrapper{float:left;width:33.3333333%}.recruit-calendar-container .list-count{background:#f5f5f5;color:#999;padding:.2016129rem .48387097rem;font-size:14px;display:flex;justify-content:space-between}[data-dpr=\"2\"] .recruit-calendar-container .list-count{font-size:28px}[data-dpr=\"3\"] .recruit-calendar-container .list-count{font-size:42px}.recruit-calendar-container .list-count span{height:.58064516rem;line-height:.58064516rem}.recruit-calendar-container .list-count .tab-btn{background:#378ced;border-radius:3px;padding:0 .22580645rem}[data-dpr=\"2\"] .recruit-calendar-container .list-count .tab-btn{border-radius:6px}[data-dpr=\"3\"] .recruit-calendar-container .list-count .tab-btn{border-radius:9px}.recruit-calendar-container .list-count .tab-btn a{color:#fff}.recruit-calendar-container .recruit-list{flex:1;overflow:auto;padding-bottom:1.3125rem}.recruit-calendar-container .recruit-detail{display:flex;justify-content:flex-start;padding:.48387097rem;border-bottom:1px solid #c2c2c2}.recruit-calendar-container .recruit-detail .img-wrapper{width:1.61290323rem;height:1.61290323rem;border:1px solid #dbdbdb;flex:0 0 1.61290323rem}.recruit-calendar-container .recruit-detail .img-wrapper img{width:100%;height:100%}.recruit-calendar-container .recruit-detail .info{margin-left:.40322581rem;padding-right:1.5625rem;width:100%;position:relative}.recruit-calendar-container .recruit-detail .info .recruit-name{font-size:15px;line-height:1.4;color:#378ced;font-weight:700;width:5.3rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}[data-dpr=\"2\"] .recruit-calendar-container .recruit-detail .info .recruit-name{font-size:30px}[data-dpr=\"3\"] .recruit-calendar-container .recruit-detail .info .recruit-name{font-size:45px}.recruit-calendar-container .recruit-detail .info .industry{height:.6rem;margin-bottom:.12096774rem;line-height:.6rem;color:#c2c2c2}.recruit-calendar-container .recruit-detail .info .current-status{position:absolute;right:0;top:0}.recruit-calendar-container .no-filter-data{background-image:url(\"http://static.careerfrog.com.cn/cf-college/images/list-is-null.1f24c4a7.png\");background-repeat:no-repeat;background-size:100%}.recruit-calendar-container .push-tip{background:url(\"http://static.careerfrog.com.cn/cf-college/images/push-bg.652ff8a4.png\") no-repeat 50%;background-size:contain;width:10rem;height:1.53225806rem;position:fixed;bottom:1.21774194rem}.recruit-calendar-container .push-tip .close-btn-wrap{position:absolute;right:0;top:0;padding:.33064516rem}.recruit-calendar-container .push-tip .close-btn-wrap .iconfont{color:#fff}.hairline:after{background:#c2c2c2}.deadline-recruit-container{height:100vh;overflow:auto;display:flex;flex-direction:column}.deadline-recruit-container.no-scroll{overflow:hidden}.deadline-recruit-container .title{display:flex;justify-content:space-between;padding:0 .48387097rem}.deadline-recruit-container .title h1{display:flex;line-height:1.17741935rem;color:#378ced;font-size:16px}[data-dpr=\"2\"] .deadline-recruit-container .title h1{font-size:32px}[data-dpr=\"3\"] .deadline-recruit-container .title h1{font-size:48px}.deadline-recruit-container .title h1 i.text{font-style:normal;margin:0 .13709677rem 0 .24193548rem}.deadline-recruit-container .title h1 .icon{width:.49193548rem;height:.49193548rem}.deadline-recruit-container .title h1 .logo{color:#378ced}.deadline-recruit-container .title h1 .hot{color:#ff3f24}.deadline-recruit-container .title .tab-btn{margin-top:.2983871rem}.deadline-recruit-container .list-count{background:#f5f5f5;color:#999;padding:0 .48387097rem;font-size:14px;display:flex;justify-content:space-between;position:relative;align-items:center}[data-dpr=\"2\"] .deadline-recruit-container .list-count{font-size:28px}[data-dpr=\"3\"] .deadline-recruit-container .list-count{font-size:42px}.deadline-recruit-container .list-count span{line-height:2.5em}.deadline-recruit-container .industry-list{width:100vw;height:100vh;left:0;background:rgba(0,0,0,.6);z-index:10;position:absolute;top:100%}.deadline-recruit-container .industry-list ul{display:flex;flex-wrap:wrap;padding:.48387097rem;background:#fff}.deadline-recruit-container .industry-list ul li{margin:0 .24193548rem .35483871rem 0;border:1px solid #c2c2c2;border-width:1px;border-radius:2px;border-radius:6px}[data-dpr=\"2\"] .deadline-recruit-container .industry-list ul li{border-width:2px}[data-dpr=\"3\"] .deadline-recruit-container .industry-list ul li{border-width:3px}[data-dpr=\"2\"] .deadline-recruit-container .industry-list ul li{border-radius:4px}[data-dpr=\"3\"] .deadline-recruit-container .industry-list ul li{border-radius:6px}.deadline-recruit-container .industry-list ul li.primary{color:#378ced;border:1px solid #378ced}.deadline-recruit-container .recruit-list{flex:1;overflow:auto;padding-bottom:1.3125rem}.deadline-recruit-container .recruit-detail{display:flex;justify-content:flex-start;padding:.48387097rem;border-bottom:1px solid #c2c2c2}.deadline-recruit-container .recruit-detail .info{margin-left:.40322581rem;width:100%;position:relative}.deadline-recruit-container .recruit-detail .info .recruit-name{font-size:15px;line-height:1.4;color:#378ced;font-weight:700;width:5.3rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}[data-dpr=\"2\"] .deadline-recruit-container .recruit-detail .info .recruit-name{font-size:30px}[data-dpr=\"3\"] .deadline-recruit-container .recruit-detail .info .recruit-name{font-size:45px}.deadline-recruit-container .recruit-detail .info .industry{height:.6rem;line-height:.6rem;margin-bottom:.12096774rem;color:#c2c2c2}.deadline-recruit-container .recruit-detail .info .begin-time{display:flex;justify-content:space-between;color:#666}.deadline-recruit-container .recruit-detail .info .current-status{position:absolute;right:0;top:0}.deadline-recruit-container .recruit-detail .info .current-status span{margin:0 .05rem}.deadline-recruit-container .no-filter-data{background-image:url(\"http://static.careerfrog.com.cn/cf-college/images/list-is-null.1f24c4a7.png\");background-repeat:no-repeat;background-size:100%}.deadline-recruit-container .push-tip{background:url(\"http://static.careerfrog.com.cn/cf-college/images/push-bg.652ff8a4.png\") no-repeat 50%;background-size:contain;width:10rem;height:1.53225806rem;position:fixed;bottom:1.21774194rem}.deadline-recruit-container .push-tip .close-btn-wrap{position:absolute;right:0;top:0;padding:.33064516rem}.deadline-recruit-container .push-tip .close-btn-wrap .iconfont{color:#fff}.hairline{border:none!important;position:relative}.hairline:after{content:\"\";position:absolute;left:0;top:100%;background:#dbdbdb;width:100%;height:1px;transform:scaleY(.5);transform-origin:0 0}", ""]);

// exports


/***/ })

});