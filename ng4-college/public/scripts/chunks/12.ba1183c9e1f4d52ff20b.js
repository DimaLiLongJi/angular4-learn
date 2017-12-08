webpackJsonp([12],{

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(615);

exports.default = angular.module('App').controller('feedbackCtrl', feedbackCtrl);


feedbackCtrl.$inject = ['fileService', 'userService', '$timeout', 'feedbackService', 'CF_FILE_BASE_URL'];

function feedbackCtrl(fileService, userService, $timeout, feedbackService, CF_FILE_BASE_URL) {
  var vm = this;

  vm.attachments = [];
  vm.emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  vm.uploadImage = uploadImage;
  vm.deleteImage = deleteImage;
  vm.previewImage = previewImage;
  vm.submit = submit;
  vm.gotoAccount = gotoAccount;

  vm.$onInit = function () {
    if (!isUploadSupported()) {
      vm.noImageUpload = true;
    }
  };

  function isUploadSupported() {
    if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
      return false;
    }
    var elem = document.createElement('input');
    elem.type = 'file';
    return !elem.disabled;
  }

  function uploadImage(files, errFiles) {
    vm.errFile = errFiles && errFiles[0];
    console.log(files);
    if (files && files.length > 0) {
      files = files.slice(0, 3);
      angular.forEach(files, function (file) {
        file.progressArray = [];
        vm.attachments.push(file);

        fileService.upload([file]).then(function (response) {
          $timeout(function () {
            file.result = response.data;
          });
        }, function (response) {
          if (response.status > 0) {
            console.error('upload err', response.status + ': ' + response.data);
            file.uploadFailed = true;
            file.progressArray.push(100);
          }
        }, function (evt) {
          file.progressArray.push(Math.min(100, parseInt(100.0 * evt.loaded / evt.total)));
        });
        updateProgress();
        function updateProgress() {
          setTimeout(function () {
            file.progress = file.progressArray.slice(-1).pop();
            if (!file.progress || file.progress < 100) {
              updateProgress();
            }
          }, 500);
        }
      });
    }
  }

  function deleteImage(index) {
    vm.attachments.splice(index, 1);
  }
  function previewImage(file) {
    vm.previewedImage = file;
    vm.showPreviewFlag = true;
  }

  function submit(form) {
    vm.submitted = true;
    if (!form.$valid) {
      return;
    }
    feedbackService.postFeedback({
      email: vm.email,
      comment: vm.comment,
      attachments: JSON.stringify(vm.attachments.map(function (attachment) {
        if (attachment.result && attachment.result[0]) {
          var fileInfo = attachment.result[0];
          return CF_FILE_BASE_URL + '/' + fileInfo.id + '?originalName=' + encodeURIComponent(fileInfo.originalName);
        }
        return '';
      }))
    }).then(function () {
      vm.feedbackSuccess = true;
    }).catch(function (err) {
      console.error('post feedback err,', err);
      vm.feedbackSuccess = true;
    });
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}

/***/ }),

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(616);
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

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(553)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.feedback{height:100vh;overflow:auto}.feedback.no-scroll{overflow:hidden}.feedback .feedback-form{color:#333}.feedback .feedback-form .feedback-entry{padding:0 .48387097rem;padding-right:.38709677rem!important;padding-left:.38709677rem!important}.feedback .feedback-form .feedback-entry.feedback-tip{padding:.24193548rem .48387097rem;color:#666;font-size:14px}[data-dpr=\"2\"] .feedback .feedback-form .feedback-entry.feedback-tip{font-size:28px}[data-dpr=\"3\"] .feedback .feedback-form .feedback-entry.feedback-tip{font-size:42px}.feedback .feedback-form .feedback-entry.feedback-tip span{color:#378ced}.feedback .feedback-form .feedback-entry .feedback-entry-title{display:flex;justify-content:space-between;height:1.20967742rem;line-height:1.20967742rem}.feedback .feedback-form .feedback-entry .feedback-entry-title>div{display:flex;align-items:center}.feedback .feedback-form .feedback-entry .feedback-entry-title span{font-size:16px}[data-dpr=\"2\"] .feedback .feedback-form .feedback-entry .feedback-entry-title span{font-size:32px}[data-dpr=\"3\"] .feedback .feedback-form .feedback-entry .feedback-entry-title span{font-size:48px}.feedback .feedback-form .feedback-entry .feedback-entry-title .error-msg{color:#ff3f24}.feedback .feedback-form .image-container>div{float:left;width:2.66129032rem;height:2.66129032rem;box-sizing:border-box;position:relative}.feedback .feedback-form .image-container>div+div{margin-left:.52419355rem}.feedback .feedback-form .image-container .image-entry .image-entry-container{position:relative;width:100%;height:100%;overflow:hidden;background-color:#f5f5f5}.feedback .feedback-form .image-container .image-entry .thumb{width:100%;height:100%;background-size:cover;background-position:50%}.feedback .feedback-form .image-container .image-entry .upload-progress{position:absolute;bottom:0;height:.26612903rem;background:rgba(73,144,226,.82);transition:width .5s ease-out}.feedback .feedback-form .image-container .image-entry .upload-progress.progress-success{animation:progress-success 1s .5s;animation-fill-mode:forwards}.feedback .feedback-form .image-container .image-entry .upload-progress.progress-failure{animation:progress-failure 1s .5s;animation-fill-mode:forwards}.feedback .feedback-form .image-container .image-entry .upload-failed-mask{position:absolute;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.5)}.feedback .feedback-form .image-container .image-entry .image-del-btn{position:absolute;top:-.2016129rem;right:-.2016129rem;font-size:26px;color:#ff3f24;border-radius:50%;background:#fff}[data-dpr=\"2\"] .feedback .feedback-form .image-container .image-entry .image-del-btn{font-size:52px}[data-dpr=\"3\"] .feedback .feedback-form .image-container .image-entry .image-del-btn{font-size:78px}.feedback .feedback-form .image-container .add-image-btn{line-height:2.66129032rem;border:1px dashed #c2c2c2;text-align:center}.feedback .feedback-form .image-container .add-image-btn label{width:100%;height:100%;position:absolute;left:0;top:0}.feedback .feedback-form .image-container .add-image-btn .add-image{display:none}.feedback .feedback-form .image-container .add-image-btn .iconfont{font-size:30px;color:#c2c2c2}[data-dpr=\"2\"] .feedback .feedback-form .image-container .add-image-btn .iconfont{font-size:60px}[data-dpr=\"3\"] .feedback .feedback-form .image-container .add-image-btn .iconfont{font-size:90px}.feedback .feedback-form .feedback-input{width:100%;line-height:1.5;padding:.28225806rem .27419355rem;border-radius:.06451613rem;border:none;font-size:16px;display:flex;align-items:center;background:#f5f5f5;margin-bottom:.28225806rem;border:1px solid #dbdbdb;-webkit-appearance:none}[data-dpr=\"2\"] .feedback .feedback-form .feedback-input{font-size:32px}[data-dpr=\"3\"] .feedback .feedback-form .feedback-input{font-size:48px}.feedback .feedback-form .feedback-input::-webkit-input-placeholder{color:gray;font-size:14px}[data-dpr=\"2\"] .feedback .feedback-form .feedback-input::-webkit-input-placeholder{font-size:28px}[data-dpr=\"3\"] .feedback .feedback-form .feedback-input::-webkit-input-placeholder{font-size:42px}.feedback .feedback-form .feedback-input.comment{height:5.08064516rem;overflow:auto}.feedback .feedback-form textarea.feedback-input{resize:vertical}.feedback .feedback-form .feedback-btn{margin:.56451613rem auto}.feedback .image-preview{position:fixed;top:0;left:0;height:100vh;width:100%;background-color:rgba(0,0,0,.6);background-size:contain;background-position:50%;background-repeat:no-repeat}.feedback .image-preview .close-preview-btn{position:absolute;right:.80645161rem;top:.80645161rem;font-size:25px;color:#fff;z-index:9}[data-dpr=\"2\"] .feedback .image-preview .close-preview-btn{font-size:50px}[data-dpr=\"3\"] .feedback .image-preview .close-preview-btn{font-size:75px}.feedback .image-preview .close-btn-mask{position:absolute;left:0;top:0;width:100%;height:2.01612903rem;background-image:linear-gradient(180deg,rgba(0,0,0,.3),hsla(0,0%,100%,0))}.feedback .feedback-success{text-align:center}.feedback .feedback-success .little-sister{background:url(\"/images/little-sister.png\") no-repeat;width:3.38709677rem;height:3.38709677rem;background-size:100% 100%;margin:1.16935484rem auto .64516129rem}.feedback .feedback-success div{font-size:15px;line-height:2}[data-dpr=\"2\"] .feedback .feedback-success div{font-size:30px}[data-dpr=\"3\"] .feedback .feedback-success div{font-size:45px}@keyframes progress-success{0%{bottom:0}50%{background-color:#53b80b;bottom:0}to{bottom:-.28225806rem}}@keyframes progress-failure{0%{bottom:0}50%{background-color:#ff3f24;bottom:0}to{bottom:-.28225806rem}}", ""]);

// exports


/***/ })

});