webpackJsonp([9],{

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(634);

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

/***/ 634:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(635);
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

/***/ 635:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/../../.svgo.yml'\n    at Error (native)\n    at Object.fs.openSync (fs.js:641:18)\n    at Object.fs.readFileSync (fs.js:509:33)\n    at module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/config.js:31:48)\n    at new module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo.js:21:19)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss-svgo@2.1.6@postcss-svgo/dist/index.js:95:16\n    at Object.creator [as postcssSvgo] (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:295:40\n    at Array.forEach (native)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:282:29\n    at creator (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at processCss (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/processCss.js:199:16)\n    at Object.module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/loader.js:40:2)");

/***/ })

});