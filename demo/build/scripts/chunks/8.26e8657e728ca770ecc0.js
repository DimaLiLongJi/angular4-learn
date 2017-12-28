webpackJsonp([8],{

/***/ 1830:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(1878);

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

/***/ 1878:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1879);
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

/***/ 1879:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1815)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.preference{height:100vh;overflow:hidden;position:relative;display:flex;flex-direction:column}.preference .back-btn{position:absolute;left:.4516129rem;top:.28225806rem;width:2em;height:2em;border-radius:50%;background:#b0d1f8;z-index:5;font-size:14px}[data-dpr=\"2\"] .preference .back-btn{font-size:28px}[data-dpr=\"3\"] .preference .back-btn{font-size:42px}.preference .back-btn .iconfont{color:#fff;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.preference .pick-list{flex:1;width:400%;transition:transform .5s ease}.preference .pick-list.index1{transform:translateX(-25%) translateZ(0)}.preference .pick-list.index2{transform:translateX(-50%) translateZ(0)}.preference .pick-list.index3{transform:translateX(-75%) translateZ(0)}.preference .pick-list .pick-entry{float:left;width:25%;height:100%;text-align:center;display:flex;flex-direction:column}.preference .pick-list .pick-entry h3{font-size:18px;margin-top:.28225806rem;color:#378ced;line-height:1.5}[data-dpr=\"2\"] .preference .pick-list .pick-entry h3{font-size:36px}[data-dpr=\"3\"] .preference .pick-list .pick-entry h3{font-size:54px}.preference .pick-list .pick-entry .pick-entry-info{line-height:2;color:#333}.preference .pick-list .pick-entry .preference-pickers{position:relative;flex:1}.preference .pick-list .pick-entry .preference-pickers .alert-message{position:absolute;top:50%;margin-top:-5.80645161rem;left:0;width:100%;text-align:center;color:#ff9146;font-size:14px;line-height:2}[data-dpr=\"2\"] .preference .pick-list .pick-entry .preference-pickers .alert-message{font-size:28px}[data-dpr=\"3\"] .preference .pick-list .pick-entry .preference-pickers .alert-message{font-size:42px}.preference .pick-list .pick-entry .preference-pickers .avatar{position:absolute;left:50%;top:50%;transform:translateX(-50%) translateY(-50%);width:2.78225806rem;height:2.78225806rem;border:.16935484rem solid #cbefff;background:#fff url(\"/images/default-portrait.jpg\");background-size:100% 100%;border-radius:50%;z-index:5}.preference .pick-list .pick-entry .preference-pickers .preference-btns{position:relative;width:100%;height:100%}.preference .pick-list .pick-entry .preference-pickers .preference-btns .preference-btn{position:absolute;left:50%;top:50%;line-height:1.4;margin-left:-.88709677rem;margin-top:-.88709677rem;width:1.77419355rem;height:1.77419355rem;display:flex;justify-content:center;align-items:center;color:#76b0f0;border-radius:50%;background-image:url(\"/images/preferences/pref-picker.png\");background-size:100% 100%;opacity:0;transition:transform 1s ease,opacity 1s ease .3s}.preference .pick-list .pick-entry .preference-pickers .preference-btns .preference-btn.selected{color:#fff;background-image:url(\"/images/preferences/pref-picker-selected.png\")}.preference .progress-ctrl{height:2.09677419rem;border-top:1px solid #dbdbdb}.preference .progress-ctrl .progress-tabs{height:1.00806452rem;line-height:1.00806452rem;padding:0 .98387097rem;display:flex}.preference .progress-ctrl .progress-tabs li{flex:1;text-align:center;color:#889099;font-size:14px}[data-dpr=\"2\"] .preference .progress-ctrl .progress-tabs li{font-size:28px}[data-dpr=\"3\"] .preference .progress-ctrl .progress-tabs li{font-size:42px}.preference .progress-ctrl .progress-tabs li.active{color:#378ced}.preference .progress-ctrl .next-btn{height:1.08870968rem;line-height:1.08870968rem;background:#378ced;color:#fff;text-align:center;font-size:16px}[data-dpr=\"2\"] .preference .progress-ctrl .next-btn{font-size:32px}[data-dpr=\"3\"] .preference .progress-ctrl .next-btn{font-size:48px}", ""]);

// exports


/***/ })

});