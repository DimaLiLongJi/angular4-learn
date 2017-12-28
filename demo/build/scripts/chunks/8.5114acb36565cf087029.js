webpackJsonp([8],{

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(638);

exports.default = angular.module('App').controller('preferencesCtrl', preferencesCtrl);


preferencesCtrl.$inject = ['opportunityService', 'tagService', 'userService', 'professionService', '$USER', '$scope', '$timeout', '$cacheFactory'];

function preferencesCtrl(opportunityService, tagService, userService, professionService, $USER, $scope, $timeout, $cacheFactory) {
  var vm = this;
  vm.$USER = $USER;
  vm.back = back;
  vm.pickNext = pickNext;
  vm.preferenceList = ['industryIds', 'positionIds', 'locationIds', 'stageIds'];
  vm.preferenceObject = {
    industryIds: [],
    positionIds: [],
    locationIds: [],
    stageIds: []
  };

  // 某些版本safari竖向flex布局高度问题
  $('.pick-entry').height($('.pick-list').height());
  $('.preference-btns').height($('.preference-pickers').height());

  vm.locationList = [{
    id: 1,
    name: '上海'
  }, {
    id: 13,
    name: '广州'
  }, {
    id: -1,
    name: '其他'
  }, {
    id: 9,
    name: '深圳'
  }, {
    id: 8,
    name: '北京'
  }];
  vm.currentIndex = 0;
  vm.animateTrigger = [];
  vm.nextTouched = false;

  vm.pickReference = pickReference;
  activate();

  function activate() {
    vm.$onInit = function () {
      userService.getCustomization({
        userId: $USER && $USER.id
      }).then(function (result) {
        $USER.preferences = result;
        $USER.isPreferenced = result.industries.length || result.stages.length || result.positions.length || result.locations.length;
        vm.preferenceObject = {
          industryIds: result ? result.industries.map(function (entry) {
            return entry.id;
          }) : [],
          positionIds: result ? result.positions.map(function (entry) {
            return entry.id;
          }) : [],
          locationIds: result ? result.locations.map(function (entry) {
            return entry.id;
          }) : [],
          stageIds: result ? result.stages.map(function (entry) {
            return entry.id;
          }) : []
        };
        if ($USER.preferences) {
          findAndSelect(vm.locationList, $USER.preferences.locations);
        }
        opportunityService.getIndustryStatistics({
          type: 0
        }).then(function (result) {
          var otherIndustry = [24, 53, 76, 15, 73, 70, 68, 79];
          vm.industryList = (result || []).filter(function (industry) {
            return !otherIndustry.includes(industry.id);
          });
          vm.industryList.push({
            id: -1,
            name: '其他'
          });
          // 初始化数据
          vm.industryList = vm.industryList.map(function (industry) {
            industry.selected = false;
            return industry;
          });
          if ($USER.preferences) {
            findAndSelect(vm.industryList, $USER.preferences.industries);
          }
          $timeout(function () {
            vm.animateTrigger[vm.currentIndex] = true;
          }, 1);
        });
        professionService.getList().then(function (position) {
          vm.positionList = position;
          if ($USER.preferences) {
            findAndSelect(vm.positionList, $USER.preferences.positions);
          }
        });

        tagService.getTagList('college_qa_type').then(function (result) {
          vm.stageList = result;
          if ($USER.preferences) {
            findAndSelect(vm.stageList, $USER.preferences.stages);
          }
        });
      });
    };
  }

  function findAndSelect(source, selectedList) {
    if (!source || !selectedList) {
      return;
    }
    selectedList.forEach(function (entry) {
      var index = source.findIndex(function (temp) {
        return temp.id === entry.id;
      });
      if (index > -1) {
        source[index].selected = true;
      }
    });
  }

  function back() {
    window.history.back();
  }

  function pickNext() {
    vm.nextTouched = true;
    if (!vm.preferenceObject[vm.preferenceList[vm.currentIndex]].length) {
      return;
    }
    vm.nextTouched = false;
    if (vm.currentIndex === 3) {
      userService.createCustomization(vm.preferenceObject).then(function () {
        $USER.isPreferenced = true;
        $cacheFactory.get('STORE').put('prefOppList', null);
        $cacheFactory.get('STORE').put('prefOppPageNum', null);
        sessionStorage.setItem('customizedStatus', 'loading');
        back();
      });
    } else {
      vm.currentIndex++;
      vm.animateTrigger[vm.currentIndex] = true;
    }
  }

  function pickReference(entry, categoryIndex) {
    entry.selected = !entry.selected;
    var categoryIds = vm.preferenceObject[vm.preferenceList[categoryIndex]];
    if (entry.selected) {
      categoryIds.push(entry.id);
    } else {
      vm.preferenceObject[vm.preferenceList[categoryIndex]] = categoryIds.filter(function (ele) {
        return ele !== entry.id;
      });
    }
  }
}
angular.module('App').directive('roundCircleLayout', roundCircleLayout);
roundCircleLayout.$inject = ['$timeout'];

function roundCircleLayout($timeout) {
  function _link(scope, elm, attr) {
    scope.$watch('roundCircleLayout', function (prev, curr) {
      if (prev == curr) {
        return;
      }
      var pickers = elm.find('li');
      if (pickers.length) {
        var htmlDom = angular.element(document).find('html');
        var htmlFontSize = htmlDom.css('font-size').slice(0, -2);
        var angle = 360 / pickers.length;
        var radius = pickers.length > 5 ? htmlFontSize * (468 / 124) : htmlFontSize * (408 / 124);
        var rotate = -90;
        $timeout(function () {
          angular.forEach(pickers, function (picker) {
            var transform = 'rotate(' + rotate * 1 + 'deg)\n          translate(' + radius + 'px)\n          rotate(' + rotate * -1 + 'deg)\n          translate3d(0, 0, 0)';
            angular.element(picker).css('transform', transform);
            angular.element(picker).css('opacity', 1);
            rotate += angle;
          });
        }, 10, false);
      }
    });
  }
  return {
    restrict: 'A',
    scope: {
      roundCircleLayout: '='
    },
    link: _link
  };
}

/***/ }),

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(639);
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

/***/ 639:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/../../.svgo.yml'\n    at Error (native)\n    at Object.fs.openSync (fs.js:641:18)\n    at Object.fs.readFileSync (fs.js:509:33)\n    at module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/config.js:31:48)\n    at new module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo.js:21:19)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss-svgo@2.1.6@postcss-svgo/dist/index.js:95:16\n    at Object.creator [as postcssSvgo] (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:295:40\n    at Array.forEach (native)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:282:29\n    at creator (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at processCss (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/processCss.js:199:16)\n    at Object.module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/loader.js:40:2)");

/***/ })

});