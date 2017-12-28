webpackJsonp([9],{

/***/ 1820:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(1854);

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

/***/ 1854:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1855);
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
		module.hot.accept("!!../../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--2-2!../../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--2-3!./style.less", function() {
			var newContent = require("!!../../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--2-2!../../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--2-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1855:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1815)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.qa-question-container{width:100%;height:100vh;overflow:auto;left:0;top:0;background:#fff;z-index:9}.qa-question-container .question{padding:0 .48387097rem .48387097rem;position:relative}.qa-question-container .question-label{font-size:16px;height:1.12903226rem;line-height:1.12903226rem}[data-dpr=\"2\"] .qa-question-container .question-label{font-size:32px}[data-dpr=\"3\"] .qa-question-container .question-label{font-size:48px}.qa-question-container .question-content{position:relative}.qa-question-container .question-content textarea{resize:vertical;height:6.41935484rem;width:100%;line-height:1.5;padding:.28225806rem .27419355rem .88709677rem;border-radius:.06451613rem;border:none;font-size:16px;background:#f5f5f5;border:1px solid #dbdbdb;-webkit-appearance:none}[data-dpr=\"2\"] .qa-question-container .question-content textarea{font-size:32px}[data-dpr=\"3\"] .qa-question-container .question-content textarea{font-size:48px}.qa-question-container .question-content textarea::-webkit-input-placeholder{color:gray}.qa-question-container .question-content textarea::-moz-placeholder{color:gray}.qa-question-container .question-content .word-count{position:absolute;padding:.38709677rem;right:0;bottom:0}.qa-question-container .question-content .word-count span{color:#378ced}.qa-question-container .commit-question{margin:.56451613rem auto}.qa-question-container .commit-question.disabled{background:#b4b0b0}.qa-question-container .question-success{text-align:center;position:absolute;width:100%;left:0;top:0;z-index:19;background:#fff;height:100%}.qa-question-container .question-success .little-sister{background:url(\"http://static.careerfrog.com.cn/cf-college/images/little-sister.60dc4914.png\") no-repeat;width:3.38709677rem;height:3.38709677rem;background-size:100% 100%;margin:1.16935484rem auto .64516129rem}.qa-question-container .question-success div{font-size:15px;line-height:2}[data-dpr=\"2\"] .qa-question-container .question-success div{font-size:30px}[data-dpr=\"3\"] .qa-question-container .question-success div{font-size:45px}.qa-question-container .question-success .back-to-qa{padding:0 .60483871rem;margin-top:.75806452rem;line-height:2.5;border:1px solid #378ced;color:#378ced;border-radius:9999px;display:inline-block}", ""]);

// exports


/***/ })

});