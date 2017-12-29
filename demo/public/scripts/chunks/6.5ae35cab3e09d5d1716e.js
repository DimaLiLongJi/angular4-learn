webpackJsonp([6],{

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(418);

__webpack_require__(419);

// import 'bootstrap/less/bootstrap.less';
exports.default = angular.module('App').controller('accountCtrl', accountCtrl);


accountCtrl.$inject = ['$USER', 'authService', '$state', 'userService', '$cookies'];

function accountCtrl($USER, authService, $state, userService, $cookies) {
  var vm = this;
  vm.user = $USER;
  vm.userQuestionCheckedNotice = true;
  vm.login = login;
  vm.logout = logout;
  vm.gotoPage = gotoPage;

  if (!vm.user) {
    getUserInfo();
  } else {
    window.onpageshow = checkQuestionCheck;
  }

  function checkQuestionCheck() {
    userService.checkQuestionRead({
      userId: $USER && $USER.id
    }).then(function (result) {
      vm.userQuestionCheckedNotice = result.allChecked;
    });
  }

  function getUserInfo() {
    var echoStr = $cookies.get('echoStr');
    if (!echoStr) return;
    authService.checkLogin({
      echoStr: echoStr
    }).then(function (result) {
      $USER = result;
      vm.user = result;
      userService.checkQuestionRead({
        userId: $USER && $USER.id
      }).then(function (rs) {
        vm.userQuestionCheckedNotice = rs.allChecked;
      });
    }).catch(function (error) {
      console.error(error);
    });
  }

  function login() {
    authService.wechatLogin();
  }

  function logout() {
    vm.logoutModalStatus = true;
    // const modal = $uibModal.open({
    //   windowClass: 'logout-modal',
    //   animation: true,
    //   keyboard: false,
    //   templateUrl: '/components/mobile/app/account/logout-modal/template.html',
    //   controller: 'logoutModalCtrl',
    //   controllerAs: 'vm',
    // });
    // modal.result.then(() => {
    //   window.location.href = window.location.href;
    // });
  }

  function gotoPage(url, state) {
    if (!vm.user || !vm.user.id) {
      authService.wechatLogin(url);
    } else {
      $state.go(state);
      // window.location.href = url;
    }
  }
}

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  angular.module('App').component('logoutModal', {
    templateUrl: '/components/mobile/app/account/logout-modal/template.html',
    controller: logoutModalCtrl,
    controllerAs: 'vm',
    bindings: {
      showModal: '='
    }
  });
  angular.module('App').controller('logoutModalCtrl', logoutModalCtrl);

  logoutModalCtrl.$inject = ['authService'];

  function logoutModalCtrl(authService) {
    var vm = this;

    vm.confirm = confirm;
    vm.cancel = cancel;

    function confirm() {
      authService.logout().then(function () {
        window.location.href = window.location.href;
        // vm.showModal = false;
      }).catch(function (error) {
        console.error(error);
      });
    }

    function cancel() {
      vm.showModal = false;
    }
  }
})();

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(420);
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

/***/ 420:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'less'\n    at Function.Module._resolveFilename (module.js:469:15)\n    at Function.Module._load (module.js:417:25)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/index.js:7:13)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js:3:18)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:165:10)\n    at /Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/Compilation.js:151:10)");

/***/ })

});