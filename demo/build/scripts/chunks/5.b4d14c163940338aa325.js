webpackJsonp([5],{

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(619);

__webpack_require__(620);

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

/***/ 619:
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

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(621);
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

/***/ 621:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/../../.svgo.yml'\n    at Error (native)\n    at Object.fs.openSync (fs.js:641:18)\n    at Object.fs.readFileSync (fs.js:509:33)\n    at module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/config.js:31:48)\n    at new module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo.js:21:19)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss-svgo@2.1.6@postcss-svgo/dist/index.js:95:16\n    at Object.creator [as postcssSvgo] (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:295:40\n    at Array.forEach (native)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:282:29\n    at creator (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at processCss (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/processCss.js:199:16)\n    at Object.module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/loader.js:40:2)");

/***/ })

});