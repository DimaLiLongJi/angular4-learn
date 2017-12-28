webpackJsonp([10],{

/***/ 1823:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(1869);

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

/***/ 1869:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1870);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1811)(content, options);
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

/***/ 1870:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1810)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.apply{height:100vh;background:#f5f5f5;overflow:auto}.apply.no-scroll{overflow:hidden}.apply .apply-form{color:#666}.apply .apply-form .apply-entry{padding:0 .48387097rem}.apply .apply-form .apply-entry .apply-entry-title{display:flex;justify-content:space-between;height:1.20967742rem;line-height:1.20967742rem}.apply .apply-form .apply-entry .apply-entry-title>div{display:flex;align-items:center}.apply .apply-form .apply-entry .apply-entry-title .apply-entry-caret{color:#378ced;margin-right:.09677419rem}.apply .apply-form .apply-entry .apply-entry-title span{font-size:16px}[data-dpr=\"2\"] .apply .apply-form .apply-entry .apply-entry-title span{font-size:32px}[data-dpr=\"3\"] .apply .apply-form .apply-entry .apply-entry-title span{font-size:48px}.apply .apply-form .apply-entry .apply-entry-title .error-msg{color:#ff3f24}@keyframes bounceIn{0%,20%,40%,60%,80%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0}25%{opacity:.5}50%{opacity:1}75%{opacity:.5}to{opacity:0}}.apply .apply-form .apply-entry .apply-entry-title .bounceIn{animation:bounceIn 1s linear 3}.apply .apply-form .mobile-entry .wrap{display:flex}.apply .apply-form .mobile-entry .wrap .prefix{line-height:1.2;padding:.28225806rem .27419355rem;box-shadow:0 .03225806rem .0483871rem rgba(0,0,0,.2);border-radius:.06451613rem;border:none;font-size:16px;display:flex;align-items:center;background:#fff;margin-bottom:.28225806rem;width:1.82258065rem;margin-right:.33870968rem;position:relative}[data-dpr=\"2\"] .apply .apply-form .mobile-entry .wrap .prefix{font-size:32px}[data-dpr=\"3\"] .apply .apply-form .mobile-entry .wrap .prefix{font-size:48px}.apply .apply-form .mobile-entry .wrap .prefix .iconfont{position:absolute;font-size:16px;top:50%;right:.2rem;transform:translateY(-50%)}[data-dpr=\"2\"] .apply .apply-form .mobile-entry .wrap .prefix .iconfont{font-size:32px}[data-dpr=\"3\"] .apply .apply-form .mobile-entry .wrap .prefix .iconfont{font-size:48px}.apply .apply-form .mobile-entry .wrap input{width:8rem}.apply .apply-form .apply-input{width:100%;line-height:1.2;padding:.28225806rem .27419355rem;box-shadow:0 .03225806rem .0483871rem rgba(0,0,0,.2);border-radius:.06451613rem;border:none;font-size:16px;display:flex;align-items:center;background:#fff;margin-bottom:.28225806rem}[data-dpr=\"2\"] .apply .apply-form .apply-input{font-size:32px}[data-dpr=\"3\"] .apply .apply-form .apply-input{font-size:48px}.apply .apply-form .apply-input.resume-entry{padding:.48387097rem .27419355rem}.apply .apply-form .apply-input .radio{border:.14516129rem solid #dbdbdb;width:.45967742rem;height:.45967742rem;background:#c2c2c2;margin:0 .24193548rem 0 0}.apply .apply-form .apply-input .radio .point{background:#fff;width:100%;height:100%}.apply .apply-form .apply-input .radio.checked{border:.14516129rem solid #dbdbdb}.apply .apply-form .apply-input .radio.checked .point{background:#378ced}.apply .apply-form .apply-input .resume-name{flex:1;font-size:14px;color:#333}[data-dpr=\"2\"] .apply .apply-form .apply-input .resume-name{font-size:28px}[data-dpr=\"3\"] .apply .apply-form .apply-input .resume-name{font-size:42px}.apply .apply-form textarea.apply-input{resize:vertical}.apply .apply-form .apply-tip{color:#999}.apply .apply-form .apply-tip.email-tip{color:#ff3f24}.apply .apply-form .apply-btn{display:block;width:9.0483871rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin:.56451613rem auto}[data-dpr=\"2\"] .apply .apply-form .apply-btn{font-size:32px}[data-dpr=\"3\"] .apply .apply-form .apply-btn{font-size:48px}.apply .modal-wrapper{position:fixed;top:0;left:0;height:100vh;width:100%;background:rgba(0,0,0,.6);z-index:99}.apply .modal-wrapper .info-modal{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;width:7.25806452rem;height:9.37096774rem;border-radius:.16129032rem;padding:.72580645rem .64516129rem;font-size:16px;text-align:center}[data-dpr=\"2\"] .apply .modal-wrapper .info-modal{font-size:32px}[data-dpr=\"3\"] .apply .modal-wrapper .info-modal{font-size:48px}.apply .modal-wrapper .apply-success{background:#fff}.apply .modal-wrapper .apply-success .title{font-size:22px;color:#378ced}[data-dpr=\"2\"] .apply .modal-wrapper .apply-success .title{font-size:44px}[data-dpr=\"3\"] .apply .modal-wrapper .apply-success .title{font-size:66px}.apply .modal-wrapper .apply-success .apply-success-pic{background:url(\"http://static.careerfrog.com.cn/cf-college/images/success-bg.becb19c2.png\") no-repeat;background-size:100%;width:100%;height:3.06451613rem;margin:.68548387rem 0 .36290323rem}.apply .modal-wrapper .apply-success .apply-success-text{width:105%;margin:0 auto;color:#666;text-align:center;line-height:1.5}.apply .modal-wrapper .apply-success .apply-success-ok{border-radius:.51612903rem;width:3.43548387rem;height:1.03225806rem;color:#fff;background:#378ced;border:none;margin:.36290323rem auto 0;font-size:16px}[data-dpr=\"2\"] .apply .modal-wrapper .apply-success .apply-success-ok{font-size:32px}[data-dpr=\"3\"] .apply .modal-wrapper .apply-success .apply-success-ok{font-size:48px}.apply .modal-wrapper .no-resume{color:#fff;display:block;background:linear-gradient(-90deg,#53dff0,#5da3ff)}.apply .modal-wrapper .no-resume.uk-tour{background:#fff}.apply .modal-wrapper .no-resume.uk-tour .no-resume-text{color:#333}.apply .modal-wrapper .no-resume.uk-tour .clipboard-paste input{background:#333;color:#fff}.apply .modal-wrapper .no-resume .no-resume-pic{background:url(\"http://static.careerfrog.com.cn/cf-college/images/no-resume-notice.d8890ada.png\") no-repeat;background-size:auto 100%;background-position:50%;height:3.06451613rem}.apply .modal-wrapper .no-resume .clipboard-paste{width:100%;display:flex;margin:.27777778rem 0}.apply .modal-wrapper .no-resume .clipboard-paste button{width:1.38888889rem;padding:.16666667rem 0;border-radius:0 .125rem .125rem 0;border:none;background-color:#dbdbdb;color:#666;font-size:12px}[data-dpr=\"2\"] .apply .modal-wrapper .no-resume .clipboard-paste button{font-size:24px}[data-dpr=\"3\"] .apply .modal-wrapper .no-resume .clipboard-paste button{font-size:36px}.apply .modal-wrapper .no-resume .clipboard-paste .enabled{color:#fff;background:#fedc0f}.apply .modal-wrapper .no-resume .clipboard-paste input{flex:1;color:#333;padding:.16666667rem .16129032rem;border-radius:.125rem 0 0 .125rem;border:none;font-size:12px}[data-dpr=\"2\"] .apply .modal-wrapper .no-resume .clipboard-paste input{font-size:24px}[data-dpr=\"3\"] .apply .modal-wrapper .no-resume .clipboard-paste input{font-size:36px}.apply .modal-wrapper .no-resume .no-resume-text{text-align:center;line-height:1.5;margin:.40322581rem 0 .56451613rem;font-size:14px;white-space:nowrap}[data-dpr=\"2\"] .apply .modal-wrapper .no-resume .no-resume-text{font-size:28px}[data-dpr=\"3\"] .apply .modal-wrapper .no-resume .no-resume-text{font-size:42px}.apply .modal-wrapper .no-resume .no-resume-text span{font-size:16px;line-height:1.5}[data-dpr=\"2\"] .apply .modal-wrapper .no-resume .no-resume-text span{font-size:32px}[data-dpr=\"3\"] .apply .modal-wrapper .no-resume .no-resume-text span{font-size:48px}.apply .modal-wrapper .no-resume .no-resume-ok{width:3.38709677rem;height:1.03225806rem;border-radius:5.33333333rem;background:#fedc0f;line-height:1.03225806rem;margin:0 auto;border:none;font-size:16px;color:#fff}[data-dpr=\"2\"] .apply .modal-wrapper .no-resume .no-resume-ok{font-size:32px}[data-dpr=\"3\"] .apply .modal-wrapper .no-resume .no-resume-ok{font-size:48px}", ""]);

// exports


/***/ })

});