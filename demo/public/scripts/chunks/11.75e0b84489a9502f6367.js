webpackJsonp([11],{

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(438);

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

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(439);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(379)(content, options);
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

/***/ 439:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'less'\n    at Function.Module._resolveFilename (module.js:469:15)\n    at Function.Module._load (module.js:417:25)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/index.js:7:13)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js:3:18)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:165:10)\n    at /Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/Compilation.js:151:10)");

/***/ })

});