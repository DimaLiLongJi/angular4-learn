webpackJsonp([14],{

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(601);

exports.default = angular.module('App').controller('applicationCtrl', applicationCtrl);


applicationCtrl.$inject = ['$USER', 'userService'];

function applicationCtrl($USER, userService) {
  var vm = this;
  vm.user = $USER;
  vm.totalItems = 0;
  vm.allTotalItems = 0;
  vm.itemsPerPage = 10;
  vm.pageNum = 1;
  vm.searchParams = {
    userId: vm.user.id,
    itemsPerPage: vm.itemsPerPage
  };
  vm.getList = getList;
  vm.pageChanged = getList;
  vm.loadMore = loadMore;
  vm.gotoAccount = gotoAccount;
  getList({
    status: 'all'
  });

  function getList(obj) {
    if (obj.status) {
      vm.pageNum = 1;
      vm.status = obj.status;
    }
    if (vm.status === 'success') {
      vm.searchParams.checked = 0;
    }
    if (vm.status === 'checked') {
      vm.searchParams.checked = 1;
      if (vm.user.applicationCheckedNotice) {
        vm.user.applicationCheckedNotice = !vm.user.applicationCheckedNotice;
      }
    }
    if (vm.status === 'all') {
      delete vm.searchParams.checked;
    }
    vm.searchParams.pageNum = vm.pageNum;
    userService.getApplications(vm.searchParams).then(function (res) {
      vm.totalItems = res.totalItems;
      if (obj.status === 'all') {
        vm.allTotalItems = res.totalItems;
      }
      if (obj.type === 'scroll') {
        vm.progresses = vm.progresses.concat(res.items);
      } else {
        vm.progresses = res.items;
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  function loadMore() {
    vm.pageNum++;
    getList({
      type: 'scroll'
    });
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(602);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(554)(content, options);
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

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(553)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.application-wrap{display:flex;flex-direction:column;height:100%}.application-wrap .blue-btn{display:inline-block;background:#378ced;border-radius:.0483871rem;width:4.43548387rem;line-height:1.12903226rem;color:#fff;font-size:.38709677rem}.application-wrap .tab-wrap{flex:1;overflow:auto}.application-wrap .red-circle{background:#ff3f24;width:.17741935rem;height:.17741935rem;border-radius:50%;position:absolute;top:.12903226rem;left:60%}.application-wrap .navs{display:flex;border-bottom:1px solid #c2c2c2;min-height:1.12903226rem;font-size:14px}[data-dpr=\"2\"] .application-wrap .navs{font-size:28px}[data-dpr=\"3\"] .application-wrap .navs{font-size:42px}.application-wrap .navs li{width:50%;text-align:center;height:1.12903226rem;line-height:1.12903226rem;color:#666;font-size:14px}[data-dpr=\"2\"] .application-wrap .navs li{font-size:28px}[data-dpr=\"3\"] .application-wrap .navs li{font-size:42px}.application-wrap .navs li.active{position:relative}.application-wrap .navs li.active:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.application-wrap .navs li .checked-notice{top:1.29032258rem;left:90%}.application-wrap .no-items{height:100%;background:#f5f5f5;text-align:center}.application-wrap .no-items img{width:4.2rem;margin-top:2.33870968rem;margin-bottom:.60483871rem}.application-wrap .progress-block{border-bottom:1px solid #c2c2c2;padding:.44354839rem 0 .46774194rem}.application-wrap .progress-block .datetime{color:#666}.application-wrap .progress-block .status{font-size:14px;color:#378ced;font-weight:700}[data-dpr=\"2\"] .application-wrap .progress-block .status{font-size:28px}[data-dpr=\"3\"] .application-wrap .progress-block .status{font-size:42px}.application-wrap .progress-block .content-wrap{margin:.40322581rem 0 0;display:flex}.application-wrap .progress-block .logo{margin-right:.40322581rem}.application-wrap .progress-block .context{flex:1}.application-wrap .progress-block .position-name{display:block;font-size:15px;font-weight:700;color:#378ced}[data-dpr=\"2\"] .application-wrap .progress-block .position-name{font-size:30px}[data-dpr=\"3\"] .application-wrap .progress-block .position-name{font-size:45px}.application-wrap .progress-block .company{color:#666;margin:.19354839rem 0}.application-wrap .progress-block .location{color:#c2c2c2}.application-wrap .progress-block .location .iconfont{font-size:15px}[data-dpr=\"2\"] .application-wrap .progress-block .location .iconfont{font-size:30px}[data-dpr=\"3\"] .application-wrap .progress-block .location .iconfont{font-size:45px}.application-wrap .detail{color:#666;padding-top:.38709677rem}.application-wrap .detail .yellow-circle{float:left;margin-right:.36290323rem;width:.36290323rem;height:.36290323rem;border-radius:50%;border:.06451613rem solid #ffc244}.application-wrap .detail .detail-tag{font-size:14px}[data-dpr=\"2\"] .application-wrap .detail .detail-tag{font-size:28px}[data-dpr=\"3\"] .application-wrap .detail .detail-tag{font-size:42px}.application-wrap .detail .time{color:#999;padding-left:.55645161rem;margin-left:.16935484rem;margin-bottom:.08064516rem;margin-top:.24193548rem}.application-wrap .detail .time.border-left{border-left:.04032258rem solid #dbdbdb;padding-bottom:.40322581rem}.application-wrap .detail .tip{color:#ff3f24;font-size:14px;line-height:1.5;margin:.60483871rem 0 .30645161rem}[data-dpr=\"2\"] .application-wrap .detail .tip{font-size:28px}[data-dpr=\"3\"] .application-wrap .detail .tip{font-size:42px}.application-wrap .fold-btn{border:.02419355rem solid #378ced;width:1.29032258rem;height:.64516129rem;border-radius:.32258065rem;background-color:#fff;color:#378ced;float:right}", ""]);

// exports


/***/ })

});