webpackJsonp([5],{

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(549);

__webpack_require__(550);

exports.default = angular.module('App').controller('resumeCtrl', resumeCtrl);


resumeCtrl.$inject = ['$USER', '$state', 'CF_FILE_BASE_URL', 'userService'];

function resumeCtrl($USER, $state, CF_FILE_BASE_URL, userService) {
  var vm = this;

  vm.user = $USER;
  vm.openResumeDeleteModal = openResumeDeleteModal;
  vm.openFilePreviewModal = openFilePreviewModal;
  vm.gotoAccount = gotoAccount;

  activate();

  function activate() {
    getUserResume();
  }

  function getUserResume() {
    var params = {
      userId: vm.user.id
    };
    userService.getUserAttachments(params).then(function (result) {
      vm.resumeArray = result;
      resumeExist();
      console.log(vm.resumeExist);
    }).catch(function (error) {
      console.error(error);
    });
  }

  function resumeExist() {
    vm.resumeExist = vm.resumeArray.length > 0;
  }

  function openResumeDeleteModal(resume) {
    vm.deleteReume = resume;
    vm.showDeleteModal = true;
  }

  function openFilePreviewModal(resume) {
    $state.go('preview', {
      id: resume.fileId,
      name: encodeURIComponent(resume.originalName)
    });
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('App').component('resumeDeleteModal', {
  templateUrl: '/components/mobile/app/account/resume/resume-delete-modal/template.html',
  controller: resumeDeleteModalCtrl,
  controllerAs: 'vm',
  bindings: {
    showModal: '=',
    resume: '='
  }
});
angular.module('App').controller('resumeDeleteModalCtrl', resumeDeleteModalCtrl);

resumeDeleteModalCtrl.$inject = ['userService', '$USER', '$state'];

function resumeDeleteModalCtrl(userService, $USER, $state) {
  var vm = this;

  vm.user = $USER;

  vm.confirm = confirm;
  vm.cancel = cancel;

  function confirm() {
    var params = {
      userId: vm.user.id,
      attachmentId: vm.resume.id
    };
    userService.deleteAttachment(params).then(function (result) {
      $state.reload();
      // vm.cancel(vm.resume.id);
    }).catch(function (error) {
      console.error(error);
    });
  }

  function cancel() {
    vm.showModal = false;
  }
}

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(551);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(508)(content, options);
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

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(507)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.delete-resume-modal{display:none;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;overflow:hidden;-webkit-overflow-scrolling:touch;outline:0;background:rgba(0,0,0,.4);border-radius:.06451613rem}.delete-resume-modal .modal-dialog{margin-top:6.00806452rem;margin-left:1.13709677rem;width:7.74193548rem!important;background:#fff}.delete-resume-modal .modal-content{width:7.74193548rem;height:3.17741935rem;overflow:inherit;box-shadow:none}.delete-resume-modal.show-modal{display:block}.delete-resume-modal .btn:active{box-shadow:none}.delete-resume-modal .tips{height:1.95967742rem;line-height:1.95967742rem;text-align:center;font-size:.41935484rem;color:#333;border-bottom:.00806452rem solid #dbdbdb}.delete-resume-modal .btn{padding:0;border:0;display:inline-block;height:1.20967742rem;line-height:1.20967742rem;width:3.79032258rem;font-size:.40322581rem;text-align:center}.delete-resume-modal .cancel-btn{color:#999;border-right:.00806452rem solid #dbdbdb}.delete-resume-modal .delete-btn{color:#378ced}.resume-page{background-color:#f5f5f5;min-height:100vh}.pageFull{height:100vh;overflow:hidden}.no-resume{height:98.90322581vh;background-image:url(\"/images/account/resume/mobile/bg-no-resume1.png\");background-size:6.39516129rem auto;background-position:center 1.9516129rem;background-repeat:no-repeat}.no-resume p{position:relative;top:8.29032258rem;margin:0 auto;background:#ffc244;border-radius:.12903226rem;width:6.39516129rem;height:1.0483871rem;line-height:1.0483871rem;font-size:17px;text-align:center;color:#fff}[data-dpr=\"2\"] .no-resume p{font-size:34px}[data-dpr=\"3\"] .no-resume p{font-size:51px}.has-resume{padding-bottom:.40322581rem}.has-resume .resume-notice{width:100vw;height:2.09677419rem;background-image:url(\"/images/account/resume/mobile/resume-info.jpg\");background-size:100vw auto;background-position:50%;background-repeat:no-repeat}.has-resume .resume-wrap{border-radius:20px;-webkit-border-radius:20px;background-color:#fff;margin:.40322581rem .38709677rem 0 .36290323rem;height:2.98387097rem}.has-resume .resume-wrap .resume-img{float:left;margin-left:.48387097rem;margin-top:.56451613rem;height:1.61290323rem;width:1.61290323rem;background-image:url(\"/images/account/resume/mobile/resume.jpg\");background-size:1.61290323rem 1.61290323rem;background-position:50%;background-repeat:no-repeat}.has-resume .resume-wrap .resume-show{float:left;margin-left:.5483871rem;margin-top:.45967742rem;width:4.79032258rem}.has-resume .resume-wrap .resume-name{width:4.83870968rem;height:1.12903226rem;line-height:.56451613rem;font-size:.35483871rem;color:#333;word-wrap:break-word;text-overflow:ellipsis;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.has-resume .resume-wrap .resume-info{width:4.83870968rem;margin-top:.08064516rem}.has-resume .resume-wrap .resume-info .icon-dele{float:left;display:inline-block;height:.4516129rem;width:.40322581rem;background-image:url(\"/images/account/resume/mobile/icon-delete.png\");background-size:.40322581rem .4516129rem;background-position:50%;background-repeat:no-repeat}.has-resume .resume-wrap .resume-info .created-at{display:inline-block;float:right}.has-resume .resume-wrap .resume-preview{float:right;height:100%;width:1.77419355rem;text-align:center}.has-resume .resume-wrap .resume-preview .icon-preview{display:block;height:100%;background-image:url(\"/images/account/resume/mobile/icon-preview.png\");background-size:.24193548rem .40322581rem;background-position:50%;background-repeat:no-repeat}", ""]);

// exports


/***/ })

});