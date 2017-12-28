webpackJsonp([6],{

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(616);

__webpack_require__(617);

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

/***/ 616:
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

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(618);
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

/***/ 618:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/../../.svgo.yml'\n    at Error (native)\n    at Object.fs.openSync (fs.js:641:18)\n    at Object.fs.readFileSync (fs.js:509:33)\n    at module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/config.js:31:48)\n    at new module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo.js:21:19)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss-svgo@2.1.6@postcss-svgo/dist/index.js:95:16\n    at Object.creator [as postcssSvgo] (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:295:40\n    at Array.forEach (native)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:282:29\n    at creator (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at processCss (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/processCss.js:199:16)\n    at Object.module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/loader.js:40:2)");

/***/ })

});