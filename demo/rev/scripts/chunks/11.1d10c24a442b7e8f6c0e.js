webpackJsonp([11],{

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(636);

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

/***/ 636:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(637);
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

/***/ 637:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/../../.svgo.yml'\n    at Error (native)\n    at Object.fs.openSync (fs.js:641:18)\n    at Object.fs.readFileSync (fs.js:509:33)\n    at module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/config.js:31:48)\n    at new module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo.js:21:19)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss-svgo@2.1.6@postcss-svgo/dist/index.js:95:16\n    at Object.creator [as postcssSvgo] (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:295:40\n    at Array.forEach (native)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:282:29\n    at creator (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at processCss (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/processCss.js:199:16)\n    at Object.module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/loader.js:40:2)");

/***/ })

});