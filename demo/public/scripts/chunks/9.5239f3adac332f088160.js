webpackJsonp([9],{

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(436);

exports.default = angular.module('App').controller('applyCtrl', applyCtrl);


applyCtrl.$inject = ['$USER', 'userService', '$state', '$stateParams', '$scope', 'mobilePrefixService', '$location', 'BASE_URL', '$timeout'];

function applyCtrl($USER, userService, $state, $stateParams, $scope, mobilePrefixService, $location, BASE_URL, $timeout) {
  var vm = this;
  if (!$USER || !$USER.id) {
    window.location.href = BASE_URL + '/opportunity/' + $stateParams.opportunityId;
  }
  vm.$onInit = function () {
    vm.noResume = false;
    vm.applySuccess = false;
    vm.copyed = false;
    vm.emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    vm.mobileReg = /^1[34578]{1}\d{9}$/;
    vm.pasteUrl = $stateParams.pasteUrl || BASE_URL + '/opportunity/' + $stateParams.opportunityId;
    vm.isUKTour = $stateParams.pasteUrl;
    vm.resumeAnimationStatus = true;
    vm.attachmentIds = [];

    vm.toggleResume = toggleResume;
    vm.goBack = goBack;
    vm.submit = submit;
    vm.selectPrefix = selectPrefix;
    vm.copyLink = copyLink;
    vm.saveParamsToSession = saveParamsToSession;

    vm.prefix = JSON.parse(sessionStorage.getItem('selectPrefix'));
    vm.applyParams = JSON.parse(sessionStorage.getItem('applyParams'));
    sessionStorage.clear('selectPrefix');
    if (!vm.prefix) {
      vm.prefix = {
        enName: 'China',
        id: 1,
        name: '中国',
        value: '86'
      };
    }
    if (vm.applyParams && vm.applyParams.title) {
      vm.title = vm.applyParams.title;
    }
    if (vm.applyParams) {
      for (var key in vm.applyParams) {
        vm[key] = vm.applyParams[key];
      }
    }
    sessionStorage.clear('applyParams');

    Promise.all([getResumeList(), getLatestInfo()]).then(function () {
      vm.attachmentIds = vm.attachmentIds.filter(function (id) {
        return vm.resumeList.some(function (r) {
          return r.id === id;
        });
      });

      vm.resumeList.forEach(function (r) {
        if (vm.attachmentIds.some(function (id) {
          return id === r.id;
        })) {
          r.checked = true;
        }
      });
    });
  };

  function copyLink() {
    vm.copyed = true;
  }

  $scope.$watch('vm.prefix', function (n) {
    if (n && n.name === '中国') {
      vm.mobileReg = /^1[34578]{1}\d{9}$/;
    } else {
      vm.mobileReg = /^\d+$/;
    }
  });
  function selectPrefix() {
    saveParamsToSession();
    $state.go('prefix');
  }

  function saveParamsToSession() {
    var params = {};
    if (vm.title) {
      params.title = vm.title;
    }
    if (vm.resume) {
      params.resume = vm.resume;
    }
    if (vm.email) {
      params.email = vm.email;
    }

    if (vm.mobile) {
      params.mobile = vm.mobile;
    }
    if (vm.attachmentIds.length) {
      params.attachmentIds = vm.attachmentIds;
    }
    sessionStorage.setItem('applyParams', JSON.stringify(params));
  }

  function getResumeList() {
    return userService.getUserAttachments({ userId: $USER.id }).then(function (result) {
      vm.resumeList = result;
      if (vm.resumeList.length <= 0) {
        vm.noResume = true;
      }
    }).catch(function (err) {
      vm.noResume = true;
      console.error('get resume list failed', err);
    });
  }

  function getLatestInfo() {
    return userService.getLastApplyInfo($USER.id).then(function (result) {
      if (result && !vm.applyParams) {
        vm.title = result.title;
        vm.email = result.email;
        if (result.attachmentId) {
          vm.resume = {
            id: result.attachmentId
          };
          // vm.attachmentIds = [result.attachmentId];
        }
        if (result.attachmentIds && result.attachmentIds.length) {
          vm.attachmentIds = result.attachmentIds;
        }
        vm.mobile = result.mobile;
        if (result.prefixId) {
          getPrefixList(result.prefixId);
        }
      }
    });
  }

  function toggleResume(resume) {
    if (vm.attachmentIds.length >= 2 && !resume.checked) return;
    resume.checked = !resume.checked;
    if (resume.checked) {
      vm.attachmentIds.push(resume.id);
    } else {
      vm.attachmentIds = vm.attachmentIds.filter(function (id) {
        return id !== resume.id;
      });
    }
  }

  function submit() {
    vm.submitted = true;
    if (vm.email && vm.email.split('@').length > 2) {
      vm.multiple = true;
      return;
    } else {
      vm.multiple = false;
    }
    if (!vm.resume || !vm.resume.originalName) {
      vm.resumeAnimationStatus = false;
      $timeout(function () {
        vm.resumeAnimationStatus = true;
      }, 1);
    }
    if (!vm.title || !vm.email || !vm.attachmentIds.length || vm.title.length > 60 || !vm.emailReg.test(vm.email)) {
      return;
    }
    if (vm.prefix.name !== '中国' && !/^\d+$/.test(vm.mobile)) {
      return;
    }
    if (vm.prefix.name === '中国' && !/^1[34578]{1}\d{9}$/.test(vm.mobile)) {
      return;
    }
    userService.apply({
      userId: $USER.id,
      title: vm.title,
      email: vm.email,
      mobile: vm.mobile,
      prefixId: vm.prefix.id,
      opportunityId: $stateParams.opportunityId,
      attachmentIds: vm.attachmentIds
      // attachmentId: vm.resume.id,
    }).then(function () {
      vm.applySuccess = true;
    }).catch(function () {
      vm.applySuccess = true;
    });
  }

  function getPrefixList(prefix) {
    mobilePrefixService.getPrefixList().then(function (result) {
      vm.prefixArray = result;
      vm.prefix = vm.prefixArray.filter(function (p) {
        return Number(p.id) === Number(prefix);
      })[0];
    }).catch(function (error) {
      return console.error(error);
    });
  }

  function goBack() {
    window.history.back();
  }

  // function goBack() {
  //   const prevHistoryLen = localStorage.historyLen;
  //   if (prevHistoryLen) {
  //     localStorage.removeItem('historyLen');
  //     if (!document.referrer) {
  //       console.log(1, '没登陆，没简历');
  //       console.log('document.referrer', document.referrer);
  //       return;
  //       window.history.go(-1);
  //     } else {
  //       console.log(2);
  //       console.log('document.referrer', document.referrer);
  //       return;
  //       window.history.go(-3);
  //     }
  //   } else {
  //     console.log(3);
  //     console.log('document.referrer', document.referrer);
  //     return;
  //   window.history.back();
  //   }
  // }
}

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(437);
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

/***/ 437:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'less'\n    at Function.Module._resolveFilename (module.js:469:15)\n    at Function.Module._load (module.js:417:25)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/index.js:7:13)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js:3:18)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:165:10)\n    at /Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/Compilation.js:151:10)");

/***/ })

});