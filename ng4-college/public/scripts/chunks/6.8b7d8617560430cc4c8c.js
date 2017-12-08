webpackJsonp([6],{

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(416);

__webpack_require__(417);

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

/***/ 416:
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

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(418);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(378)(content, options);
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

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(377)(undefined);
// imports


// module
exports.push([module.i, ".logout-modal{display:none;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;overflow:hidden;-webkit-overflow-scrolling:touch;outline:0;background:rgba(0,0,0,.4)}.logout-modal.show-modal{display:block}.logout-modal .modal-dialog{border-radius:.06451613rem;margin-top:6.00806452rem;margin-left:1.13709677rem;width:7.74193548rem}.logout-modal .modal-content{width:7.74193548rem;box-shadow:none;background-color:#fff}.logout-modal .logout-modal-container{margin:0}.logout-modal h1{font-size:.41935484rem;color:#333;border-bottom:1px solid #dbdbdb;font-weight:400;line-height:1.20967742rem}.logout-modal .logo,.logout-modal h1{text-align:center}.logout-modal .logo img{width:1.4516129rem}.logout-modal .tips{text-align:center;font-size:.41935484rem;color:#333;padding-bottom:.68548387rem;border-bottom:1px solid #dbdbdb}.logout-modal .btn{padding:0;border:0;display:inline-block;height:1.20967742rem;line-height:1.20967742rem;width:3.79032258rem;font-size:.40322581rem;text-align:center}.logout-modal .cancel-btn{color:#999;border-right:.00806452rem solid #dbdbdb}.logout-modal .delete-btn{color:#378ced}.page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.account-wrap{background-color:#f5f5f5;height:100%;overflow:auto}.account-wrap .discovery-header{width:100%;background:#fff}.account-wrap header{height:1.12903226rem;min-height:1.12903226rem;background:#fff url(\"/images/logo@2x.png\") no-repeat 50%;background-size:auto 70%}.account-wrap .portrait-wrap{height:5.24193548rem;padding-top:.64516129rem;background:#fff url(\"/images/account-banner.jpg\") no-repeat 50%}.account-wrap .portrait-wrap .login-btn-wrap,.account-wrap .portrait-wrap .portrait{width:2.74193548rem;margin:0 auto}.account-wrap .portrait-wrap .portrait{height:2.74193548rem;border-radius:50%;border:.16129032rem solid #cbefff;overflow:hidden}.account-wrap .portrait-wrap .portrait img{width:100%}.account-wrap .portrait-wrap .login-btn{width:100%;display:block;line-height:.96774194rem;font-size:.38709677rem;color:#378ced;background-color:#f5f5f5;border-radius:.48387097rem;margin-top:.32258065rem;text-align:center}.account-wrap .portrait-wrap .nickname{font-size:.48387097rem;color:#fff;text-align:center;margin-top:.48387097rem}.account-wrap ul{background-color:#fff}.account-wrap ul li{border-bottom:1px solid #dbdbdb;padding:0 .38709677rem}.account-wrap ul li a{display:block;line-height:1.33064516rem;font-size:.38709677rem;color:#666;position:relative}.account-wrap ul li a .arrow-icon{color:#dbdbdb;float:right}.account-wrap ul li a .red-circle{background:#ff3f24;width:.17741935rem;height:.17741935rem;border-radius:50%;position:absolute;top:.35483871rem;left:25%}.account-wrap .log-out-wrap{margin-top:.56451613rem}.account-wrap .page-prop{width:100%;height:1.4516129rem}", ""]);

// exports


/***/ })

});