webpackJsonp([46],{

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(680);

exports.default = angular.module('App').controller('qaQuestionCtrl', qaQuestionCtrl);


qaQuestionCtrl.$inject = ['$USER', 'userService', '$state', 'BASE_URL', 'authService', '$location', '$stateParams'];

function qaQuestionCtrl($USER, userService, $state, BASE_URL, authService, $location, $stateParams) {
  var vm = this;
  vm.showSubscribeFlag = false;
  vm.questionSuccess = false;
  vm.commitQuestion = commitQuestion;
  // vm.closeSubscribe = closeSubscribe;
  vm.saveToBrowser = saveToBrowser;
  vm.goBack = goBack;

  activate();

  function activate() {
    vm.question = localStorage.userQuestion || '';
    if ($stateParams.commit && vm.question) {
      commitQuestion();
    }
  }

  function commitQuestion() {
    if (vm.question) {
      if (!$USER || !$USER.id) {
        // authService.wechatLogin(`${window.location.href}`);
        var url = $location.absUrl();
        if (url.indexOf('?') > -1) {
          url = url.slice(0, url.indexOf('?'));
        }
        url += '?commit=true';
        authService.wechatLogin(url);
      }
      userService.askQuestion({
        userId: $USER.id,
        title: vm.question
      }).then(function () {
        vm.questionSuccess = true;
        localStorage.userQuestion = '';
        userService.refreshToken({
          id: $USER.id
        }).then(function (result) {
          if (result && result.result) {
            $USER.subscribe = result.result.subscribe;
          }
          if (!$USER || $USER && !$USER.subscribe) {
            window.location.href = BASE_URL + '/go-wechat-qa';
            // $state.go('discovery.subscribe');
            // vm.showSubscribeFlag = true;
          }
        });
      }).catch(function (err) {
        console.err('question err', err);
        alert('提交问题失败');
      });
    }
  }

  // function closeSubscribe() {
  //   vm.showSubscribeFlag = false;
  // }

  function saveToBrowser() {
    localStorage.userQuestion = vm.question || '';
  }

  function goBack() {
    window.history.go(-1);
  }
}

/***/ }),

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!../../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!../../../../../../../node_modules/_style-loader@0.18.2@style-loader/lib/addStyles.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less", function() {
			var newContent = require("!!../../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});