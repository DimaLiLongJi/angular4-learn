webpackJsonp([3],{

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(628);

__webpack_require__(629);

__webpack_require__(630);

exports.default = angular.module('App').controller('recruitCalendarCtrl', recruitCalendarCtrl);


recruitCalendarCtrl.$inject = ['$state'];

function recruitCalendarCtrl($state) {
  // const vm = this;
  $state.go('recruit-calendar.deadline');
}

/***/ }),

/***/ 628:
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

/***/ 629:
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

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(631);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(578)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less", function() {
			var newContent = require("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 631:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/../../.svgo.yml'\n    at Error (native)\n    at Object.fs.openSync (fs.js:641:18)\n    at Object.fs.readFileSync (fs.js:509:33)\n    at module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/config.js:31:48)\n    at new module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo.js:21:19)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss-svgo@2.1.6@postcss-svgo/dist/index.js:95:16\n    at Object.creator [as postcssSvgo] (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:295:40\n    at Array.forEach (native)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:282:29\n    at creator (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at processCss (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/processCss.js:199:16)\n    at Object.module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/loader.js:40:2)");

/***/ })

});