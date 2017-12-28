webpackJsonp([11],{

/***/ 1825:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(1866);

exports.default = angular.module('App').controller('userQuestionCtrl', userQuestionCtrl);


userQuestionCtrl.$inject = ['$USER', 'userService'];

function userQuestionCtrl($USER, userService) {
  var vm = this;
  vm.user = $USER;
  vm.itemsPerPage = 10;
  vm.pageNum = 1;
  vm.totalItems = 0;
  vm.questionList = null;
  vm.getList = getList;
  vm.loadMore = loadMore;
  vm.toggleStatus = toggleStatus;
  vm.gotoAccount = gotoAccount;

  activate();

  function activate() {
    getList();
  }

  function getList() {
    userService.getUserQuestion({
      userId: $USER.id,
      pageNum: vm.pageNum,
      itemsPerPage: vm.itemsPerPage
    }).then(function (result) {
      var questions = result.questions || [];
      vm.questionList = vm.questionList || [];
      vm.questionList = vm.questionList.concat(questions);
      vm.totalItems = result.totalItems;
    });
  }

  function loadMore() {
    if (vm.pageNum * vm.itemsPerPage) {
      vm.pageNum++;
    }
    getList(vm.status);
  }

  function toggleStatus(status) {
    vm.status = status;
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}

/***/ }),

/***/ 1866:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1867);
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
		module.hot.accept("!!../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--2-2!../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--2-3!./style.less", function() {
			var newContent = require("!!../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--2-2!../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--2-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1867:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1815)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.user-question-wrap .question-msg{background:#378ced;font-size:14px;padding-left:.46774194rem;line-height:2.2;color:#fff}[data-dpr=\"2\"] .user-question-wrap .question-msg{font-size:28px}[data-dpr=\"3\"] .user-question-wrap .question-msg{font-size:42px}.user-question-wrap .blue-btn{display:inline-block;background:#378ced;border-radius:.0483871rem;width:4.43548387rem;line-height:1.12903226rem;color:#fff;font-size:.38709677rem}.user-question-wrap .question-entry{background:#fff;margin-bottom:.18548387rem;padding:.41935484rem .38709677rem;padding-right:1.29032258rem;position:relative;border-bottom:1px solid #c2c2c2}.user-question-wrap .question-entry .question-content{display:flex}.user-question-wrap .question-entry .question-content .question-label{color:#ff3f24;font-size:14px;flex-basis:2em}[data-dpr=\"2\"] .user-question-wrap .question-entry .question-content .question-label{font-size:28px}[data-dpr=\"3\"] .user-question-wrap .question-entry .question-content .question-label{font-size:42px}.user-question-wrap .question-entry .question-content .question-text{flex:1;line-height:1.4;font-size:14px;position:relative;top:-.1em;word-break:break-all}[data-dpr=\"2\"] .user-question-wrap .question-entry .question-content .question-text{font-size:28px}[data-dpr=\"3\"] .user-question-wrap .question-entry .question-content .question-text{font-size:42px}.user-question-wrap .question-entry .question-content .question-text .red-dot{background:#ff3f24;width:.17741935rem;height:.17741935rem;border-radius:50%;position:absolute;top:-.06451613rem;right:-.12903226rem}.user-question-wrap .question-entry .question-info{width:100%;display:flex;justify-content:space-between;align-items:center;margin-top:.32258065rem}.user-question-wrap .question-entry .question-info .question-status{color:#fff;background:#cad2db;padding:.3em .5em;line-height:1;margin-right:.24193548rem;font-size:12px;border-radius:.167em;position:relative}[data-dpr=\"2\"] .user-question-wrap .question-entry .question-info .question-status{font-size:24px}[data-dpr=\"3\"] .user-question-wrap .question-entry .question-info .question-status{font-size:36px}.user-question-wrap .question-entry .question-info .question-status.answered{background:#378ced}.user-question-wrap .question-entry .question-info .question-time{color:#999}.user-question-wrap .question-entry .question-info .question-time span{color:#c2c2c2}.user-question-wrap .question-entry .question-arrow{position:absolute;width:1.29032258rem;height:100%;text-align:center;line-height:100%;display:flex;align-items:center;justify-content:center;right:0;top:0;color:#dbdbdb}.user-question-wrap .question-entry .question-arrow .iconfont{font-size:18px}[data-dpr=\"2\"] .user-question-wrap .question-entry .question-arrow .iconfont{font-size:36px}[data-dpr=\"3\"] .user-question-wrap .question-entry .question-arrow .iconfont{font-size:54px}.user-question-wrap .no-items{height:100vh;background:#f5f5f5;text-align:center}.user-question-wrap .no-items img{width:2.5rem;margin-top:2.33870968rem;margin-bottom:.54032258rem}.user-question-wrap .no-items .no-item-desc{font-size:16px;color:#c2c2c2;line-height:1.5;margin-bottom:.56451613rem}[data-dpr=\"2\"] .user-question-wrap .no-items .no-item-desc{font-size:32px}[data-dpr=\"3\"] .user-question-wrap .no-items .no-item-desc{font-size:48px}", ""]);

// exports


/***/ })

});