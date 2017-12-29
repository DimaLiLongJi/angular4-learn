webpackJsonp([8],{

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(440);

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

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(441);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(379)(content, options);
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

/***/ 441:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'less'\n    at Function.Module._resolveFilename (module.js:469:15)\n    at Function.Module._load (module.js:417:25)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/index.js:7:13)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js:3:18)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:165:10)\n    at /Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/Compilation.js:151:10)");

/***/ })

});