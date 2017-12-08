webpackJsonp([12],{

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(596);

exports.default = angular.module('App').controller('favoriteCtrl', favoriteCtrl);


favoriteCtrl.$inject = ['$USER', 'userService', '$state'];

function favoriteCtrl($USER, userService, $state) {
  var vm = this;
  vm.user = $USER;
  vm.itemsPerPage = 10;
  vm.questionPageNum = 1;
  vm.oppPageNum = 1;
  vm.questionTotalItems = 0;
  vm.oppTotalItems = 0;
  vm.oppList = null;
  vm.questionList = null;
  console.log(sessionStorage.favoriteTab);
  vm.status = sessionStorage.favoriteTab || 'opportunity';
  sessionStorage.favoriteTab = '';
  vm.getList = getList;
  vm.loadMore = loadMore;
  vm.toggleStatus = toggleStatus;
  vm.goOpp = goOpp;
  vm.goQuestion = goQuestion;
  vm.unfavorOpp = unfavorOpp;
  vm.unfavorQuestion = unfavorQuestion;
  vm.gotoAccount = gotoAccount;

  // activate();
  var pageShow = void 0;
  window.onpageshow = function () {
    pageShow = true;
    activate();
  };
  if (!pageShow) {
    activate();
  }

  function activate() {
    getList('question');
    getList('opportunity');
  }

  function getList(status) {
    // if (vm.questionList || vm.oppList) {
    //   return;
    // }
    userService.getFavoriteList({
      type: status,
      userId: $USER.id
    }).then(function (result) {
      var favorites = result.favorites || [];
      if (status === 'question') {
        // vm.questionList = (vm.questionList || []).concat(favorites);
        vm.questionList = favorites;
        vm.questionTotalItems = result.totalItems;
      } else {
        // vm.oppList = (vm.oppList || []).concat(favorites);
        vm.oppList = favorites;
        vm.oppTotalItems = result.totalItems;
      }
    });
  }

  function loadMore() {
    if (vm.status === 'question') {
      if (vm.questionPageNum * vm.itemsPerPage) {
        vm.questionPageNum++;
      } else {
        vm.oppPageNum++;
      }
      getList(vm.status);
    }
  }

  function toggleStatus(status) {
    vm.status = status;
  }

  function goOpp(opp) {
    if (!opp.applied && opp.status !== 3) {
      sessionStorage.favoriteTab = 'opportunity';
      window.location.href = '/opportunity/' + opp.id;
    }
  }

  function goQuestion(qs) {
    sessionStorage.favoriteTab = 'question';
    $state.go('discovery.question-detail', {
      id: qs.id
    });
  }

  function unfavorOpp(opp, index) {
    userService.disableFavorite({
      userId: $USER && $USER.id,
      entityId: opp.id,
      entityType: 'opportunity'
    }).then(function () {
      // $state.reload();
      vm.oppList.splice(index, 1);
    });
  }

  function unfavorQuestion(qs, index, $event) {
    $event.stopImmediatePropagation();
    console.log($event);
    userService.disableFavorite({
      userId: $USER && $USER.id,
      entityId: qs.id,
      entityType: 'question'
    }).then(function () {
      vm.questionList.splice(index, 1);
    });
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}

/***/ }),

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(597);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(550)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less", function() {
			var newContent = require("!!../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 597:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(549)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.favorite-wrap{display:flex;flex-direction:column;height:100%}.favorite-wrap .blue-btn{display:inline-block;background:#378ced;border-radius:.0483871rem;width:4.43548387rem;line-height:1.12903226rem;color:#fff;font-size:.38709677rem}.favorite-wrap .tab-wrap{flex:1;overflow:auto;background:#f5f5f5}.favorite-wrap .red-circle{background:#ff3f24;width:.17741935rem;height:.17741935rem;border-radius:50%;position:absolute;top:.12903226rem;left:60%}.favorite-wrap .navs{display:flex;border-bottom:1px solid #c2c2c2;min-height:1.12903226rem;font-size:14px}[data-dpr=\"2\"] .favorite-wrap .navs{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .navs{font-size:42px}.favorite-wrap .navs li{width:50%;text-align:center;height:1.12903226rem;line-height:1.12903226rem;color:#666;font-size:14px}[data-dpr=\"2\"] .favorite-wrap .navs li{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .navs li{font-size:42px}.favorite-wrap .navs li.active{position:relative}.favorite-wrap .navs li.active:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.favorite-wrap .no-items{height:100vh;background:#f5f5f5;text-align:center}.favorite-wrap .no-items img{width:2.5rem;margin-top:2.33870968rem;margin-bottom:.54032258rem}.favorite-wrap .no-items .no-item-desc{font-size:16px;color:#c2c2c2;line-height:1.5;margin-bottom:.56451613rem}[data-dpr=\"2\"] .favorite-wrap .no-items .no-item-desc{font-size:32px}[data-dpr=\"3\"] .favorite-wrap .no-items .no-item-desc{font-size:48px}.favorite-wrap .opp-entry{background:#fff;margin-bottom:.18548387rem;position:relative}.favorite-wrap .opp-entry .opp-card{display:flex;padding:.42741935rem .46774194rem;border-bottom:1px solid #c2c2c2}.favorite-wrap .opp-entry .opp-card .avatar-container{width:1.59677419rem;height:1.59677419rem;flex-basis:1.59677419rem}.favorite-wrap .opp-entry .opp-card .opp-info{flex:1;line-height:1;margin-left:.40322581rem;overflow:hidden}.favorite-wrap .opp-entry .opp-card .opp-info .opp-title{color:#378ced;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}[data-dpr=\"2\"] .favorite-wrap .opp-entry .opp-card .opp-info .opp-title{font-size:32px}[data-dpr=\"3\"] .favorite-wrap .opp-entry .opp-card .opp-info .opp-title{font-size:48px}.favorite-wrap .opp-entry .opp-card .opp-info .opp-info1{margin:.2016129rem 0}.favorite-wrap .opp-entry .opp-card .opp-info .opp-info1 span{color:#666}.favorite-wrap .opp-entry .opp-card .opp-info .opp-info2{color:#c2c2c2}.favorite-wrap .opp-entry .opp-card .opp-time{align-self:flex-end;color:#c2c2c2;white-space:nowrap}.favorite-wrap .opp-entry .opp-btns{display:flex;height:1.07258065rem;line-height:1.07258065rem;text-align:center}.favorite-wrap .opp-entry .opp-btns .opp-btn{flex:1;font-size:14px}[data-dpr=\"2\"] .favorite-wrap .opp-entry .opp-btns .opp-btn{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .opp-entry .opp-btns .opp-btn{font-size:42px}.favorite-wrap .opp-entry .opp-btns .separator{color:#c2c2c2}.favorite-wrap .opp-entry .opp-btns .go-detail{color:#378ced}.favorite-wrap .opp-entry>img{position:absolute;width:2.41935484rem;top:.61290323rem;right:1.41129032rem}.favorite-wrap .opp-entry.is-applied .go-detail,.favorite-wrap .opp-entry.is-outdated .go-detail,.favorite-wrap .opp-entry.is-outdated .opp-info .opp-info1,.favorite-wrap .opp-entry.is-outdated .opp-info .opp-info1 span,.favorite-wrap .opp-entry.is-outdated .opp-info .opp-title{color:#c2c2c2}.favorite-wrap .question-entry{background:#fff;margin-bottom:.18548387rem;padding:.46774194rem .44354839rem}.favorite-wrap .question-entry .question-content{display:flex}.favorite-wrap .question-entry .question-content .question-label{color:#ff3f24;font-size:14px;flex-basis:2em}[data-dpr=\"2\"] .favorite-wrap .question-entry .question-content .question-label{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .question-entry .question-content .question-label{font-size:42px}.favorite-wrap .question-entry .question-content .question-text{flex:1;font-size:14px;line-height:1.4}[data-dpr=\"2\"] .favorite-wrap .question-entry .question-content .question-text{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .question-entry .question-content .question-text{font-size:42px}.favorite-wrap .question-entry .tag-container{width:100%;display:flex;justify-content:space-between;align-items:center;margin-top:.40322581rem}.favorite-wrap .question-entry .tag-container .tag span{display:inline-block;color:#fff;background:#d9bc8b;padding:.3em .5em;line-height:1;margin-right:.24193548rem;font-size:12px;border-radius:.167em}[data-dpr=\"2\"] .favorite-wrap .question-entry .tag-container .tag span{font-size:24px}[data-dpr=\"3\"] .favorite-wrap .question-entry .tag-container .tag span{font-size:36px}.favorite-wrap .question-entry .tag-container .unfavor-btn{color:#378ced}", ""]);

// exports


/***/ })

});