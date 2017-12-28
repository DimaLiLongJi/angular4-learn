webpackJsonp([12],{

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(624);

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

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(625);
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

/***/ 625:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/../../.svgo.yml'\n    at Error (native)\n    at Object.fs.openSync (fs.js:641:18)\n    at Object.fs.readFileSync (fs.js:509:33)\n    at module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/config.js:31:48)\n    at new module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo.js:21:19)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss-svgo@2.1.6@postcss-svgo/dist/index.js:95:16\n    at Object.creator [as postcssSvgo] (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:295:40\n    at Array.forEach (native)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:282:29\n    at creator (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at processCss (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/processCss.js:199:16)\n    at Object.module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/loader.js:40:2)");

/***/ })

});