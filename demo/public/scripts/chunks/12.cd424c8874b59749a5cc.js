webpackJsonp([12],{

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(426);

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

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(427);
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

/***/ 427:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'less'\n    at Function.Module._resolveFilename (module.js:469:15)\n    at Function.Module._load (module.js:417:25)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/index.js:7:13)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js:3:18)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:165:10)\n    at /Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/Compilation.js:151:10)");

/***/ })

});