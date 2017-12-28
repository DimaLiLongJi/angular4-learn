webpackJsonp([0,2],{

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ScrollMagic = __webpack_require__(593);

var _ScrollMagic2 = _interopRequireDefault(_ScrollMagic);

__webpack_require__(595);

__webpack_require__(598);

__webpack_require__(599);

__webpack_require__(601);

__webpack_require__(602);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
/* global $ */
exports.default = angular.module('App').controller('discoveryQaCtrl', discoveryQaCtrl);
// import TweenMax from 'gsap/src/uncompressed/TweenMax';
// import TimelineMax from 'gsap/src/uncompressed/TimelineMax';

discoveryQaCtrl.$inject = ['danmuService', 'userService', '$timeout', '$scope', 'BASE_URL', '$USER', '$state', '$location', 'wechatService', '$sce'];

function discoveryQaCtrl(danmuService, userService, $timeout, $scope, BASE_URL, $USER, $state, $location, wechatService, $sce) {
  var htmlDom = angular.element(document).find('html')[0];
  var dpr = Number(htmlDom.attributes['data-dpr'].nodeValue) || 1;
  var scrollMagicCtrl = null;
  var scrollMagicScenes = [];
  var scrollTimer = null;
  var discoveryHeaderHeight = $('.discovery-header').height();
  var $danmuContainer = $('#danmu-container');
  var danmuHeight = $danmuContainer.height();

  var vm = this;
  vm.autoplay = true;
  vm.autoplayInterval = 2000;
  vm.currentScene = 0;
  vm.showDetailFlag = false;
  vm.showQuestionFlag = false;
  vm.qaDetail = null;

  vm.toggleAutoScroll = toggleAutoScroll;
  vm.showDetail = showDetail;
  vm.closeDetail = closeDetail;
  vm.askQuestion = askQuestion;

  vm.$onInit = function () {
    var danmuPromise = null;
    if (!$USER || !$USER.isPreferenced) {
      danmuPromise = danmuService.getQuestions();
    } else {
      danmuPromise = danmuService.getCustomizedQuestions();
    }
    danmuPromise.then(function (result) {
      if ($USER && $USER.isPreferenced) {
        vm.questions = result.questions;
      } else {
        vm.questions = result.questions && result.questions.publishedQuestions;
      }
      // 添加一条空的数据，可以滚到最后一条
      vm.questions.push({});
      $timeout(function () {
        scrollMagicCtrl = new _ScrollMagic2.default.Controller({
          container: '.danmu-container',
          vertical: true
        });

        vm.questions.forEach(function (question, index) {
          var tween = new TimelineLite();
          tween.add(TweenLite.to('#danmu' + index, 1, {
            opacity: 1,
            transform: 'scale(1.2)',
            ease: Linear.easeNone
          }));
          tween.add(TweenLite.to('#danmu' + index, 2, {
            opacity: 1,
            transform: 'scale(1.2)',
            ease: Linear.easeNone
          }));
          tween.add(TweenLite.to('#danmu' + index, 1, {
            opacity: 0.5,
            transform: 'scale(1)',
            ease: Linear.easeNone
          }));
          var myscene = new _ScrollMagic2.default.Scene({
            duration: $('#danmu' + index).height() + 15 * dpr, // the scene should last for a scroll distance of 100px
            offset: -discoveryHeaderHeight / 2,
            triggerElement: '#danmu' + index
          }).setTween(tween).on('enter', function (event) {
            if (event.scrollDirection === 'FORWARD' && event.progress > 0.9) {
              return;
            }
            vm.currentScene = event.target.triggerElement().getAttribute('data-index');
            // console.log('enter', vm.currentScene);
          });
          scrollMagicScenes.push(myscene);
          scrollMagicCtrl.addScene(myscene);
        });
      }, 1);
      $timeout(function () {
        autoScroll();
        $danmuContainer.on('touchstart', function () {
          if (scrollTimer) $timeout.cancel(scrollTimer);
        });
        $danmuContainer.on('touchend', function () {
          if (vm.autoplay) {
            scrollTimer = $timeout(function () {
              autoScroll();
            }, 500);
          }
        });
      }, 1);
    });
    var questionId = sessionStorage.getItem('questionId');
    if (questionId) {
      userService.getQuestionDetail({
        questionId: questionId
      }).then(function (result) {
        wechatService.setWxShareInfo({
          link: BASE_URL + '/mobile/discovery/question-detail/' + result.id,
          title: result.title,
          desc: result.answers[0].content,
          imgUrl: '/images/share.jpg'
        });
        showDetail(result);
      }).catch(function (error) {
        console.error(error);
      });
    }
  };

  $scope.$on('$destroy', function () {
    if (scrollTimer) $timeout.cancel(scrollTimer);
    scrollMagicScenes.forEach(function (scene) {
      scene.destroy();
    });
  });

  function toggleAutoScroll() {
    vm.autoplay = !vm.autoplay;
    if (vm.autoplay) {
      autoScroll();
    } else {
      $timeout.cancel(scrollTimer);
    }
  }

  function showDetail(question) {
    wechatService.setWxShareInfo({
      link: BASE_URL + '/mobile/discovery/question-detail/' + question.id,
      title: question.title,
      desc: question.answers[0].content,
      imgUrl: '/images/share.jpg'
    });
    console.log('question', question);
    console.log('link', BASE_URL + '/mobile/discovery/question-detail/' + question.id);
    question.answers = question.answers.map(function (answer) {
      if (answer.content && typeof answer.content === 'string') {
        answer.content = $sce.trustAsHtml(answer.content.replace(/\n/g, '<br>'));
      }
      return answer;
    });

    vm.qaDetail = question;
    vm.showDetailFlag = true;
    vm.isAutoplayBeforeModal = vm.autoplay;
    if (vm.autoplay) {
      toggleAutoScroll();
    }
  }

  function closeDetail() {
    if (vm.isAutoplayBeforeModal && !vm.autoplay) {
      toggleAutoScroll();
    }
  }

  function askQuestion() {
    if (!$USER) {
      window.location.href = BASE_URL + '/api/auth/login?originalUrl=' + encodeURIComponent(BASE_URL + '/mobile/question');
    } else {
      $state.go('question');
    }
  }

  var prevScene = null;

  function autoScroll() {
    scrollDanmu();

    function scrollDanmu() {
      if (scrollMagicCtrl) {
        var currentScene = parseInt(vm.currentScene, 10);
        var offset = prevScene === currentScene ? 3 : 2;
        var nextScene = currentScene + offset;
        if (scrollMagicScenes[nextScene]) {
          prevScene = currentScene;
          var nextSceneElm = $(scrollMagicScenes[nextScene].triggerElement());
          // const nextSceneElmHeight = nextSceneElm.height();

          nextSceneElm.velocity('scroll', {
            offset: -(danmuHeight + discoveryHeaderHeight + scrollMagicScenes[nextScene - 1].duration()) / 2,
            container: $danmuContainer
          });
        }
        scrollTimer = $timeout(function () {
          scrollDanmu();
        }, vm.autoplayInterval);
      }
    }
  }
}

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(579);

__webpack_require__(609);

__webpack_require__(611);

__webpack_require__(612);

__webpack_require__(613);

__webpack_require__(614);

__webpack_require__(615);

discoveryCtrl.$inject = ['$USER', 'BASE_URL', '$state'];

function discoveryCtrl($USER, BASE_URL, $state) {
  var vm = this;

  vm.$USER = $USER;
  vm.goPreferences = goPreferences;

  function goPreferences() {
    if (!$USER || !$USER.id) {
      window.location.href = BASE_URL + '/api/auth/login?originalUrl=' + encodeURIComponent(BASE_URL + '/mobile/preferences');
    } else {
      $state.go('preferences');
    }
  }
}

exports.default = angular.module('App').controller('discoveryCtrl', discoveryCtrl);

/***/ }),

/***/ 593:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_scrollmagic@2.0.5@scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'\n    at Error (native)");

/***/ }),

/***/ 595:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_scrollmagic@2.0.5@scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'\n    at Error (native)");

/***/ }),

/***/ 598:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_velocity-animate@1.5.0@velocity-animate/velocity.js'\n    at Error (native)");

/***/ }),

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  angular.module('App').component('qaDetail', {
    templateUrl: '/components/mobile/app/discovery/qa/detail/template.html',
    controller: qaDetailCtrl,
    controllerAs: 'vm',
    bindings: {
      show: '=',
      content: '=',
      onClose: '='
    }
  });
  qaDetailCtrl.$inject = ['$sce', 'userService', '$USER', 'authService', '$scope', '$state'];

  function qaDetailCtrl($sce, userService, $USER, authService, $scope, $state) {
    var vm = this;
    vm.hideDetail = hideDetail;
    vm.toggleFavorite = toggleFavorite;
    vm.questionId = null;
    vm.askQuestion = askQuestion;

    activate();

    function activate() {
      $scope.$watch('vm.content', function (curr, prev) {
        if (curr) {
          vm.questionId = vm.content && vm.content.id;
          userService.getQuestionDetail({
            questionId: vm.questionId
          }).then(function (result) {
            vm.isFavored = result.isFavorite;
          });
        }
      });
    }

    function hideDetail() {
      // if (vm.questionId) {
      //   window.cfGoHistory({
      //     url: '/mobile/discovery/question-list',
      //     target: '_self',
      //   });
      //   sessionStorage.removeItem('questionId');
      //   return;
      // }
      vm.show = false;
      if (vm.onClose) {
        vm.onClose();
      }
    }

    function toggleFavorite() {
      var questionParams = {
        entityId: vm.questionId,
        entityType: 'question',
        userId: $USER && $USER.id
      };
      if (!vm.isFavored) {
        if (!$USER || !$USER.id) {
          authService.wechatLogin('/mobile/discovery/question-detail/' + vm.questionId + '?favorite=true');
          return;
        }
        userService.enableFavorite(questionParams).then(function () {
          vm.isFavored = true;
        });
      } else {
        userService.disableFavorite(questionParams).then(function () {
          vm.isFavored = false;
        });
      }
    }

    function askQuestion() {
      if (!$USER || !$USER.id) {
        window.location.href = BASE_URL + '/api/auth/login?originalUrl=' + encodeURIComponent(BASE_URL + '/mobile/question');
      } else {
        $state.go('question');
      }
    }
  }
})();

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  angular.module('App').controller('qaQuestionListCtrl', qaQuestionListCtrl);

  qaQuestionListCtrl.$inject = ['danmuService', 'userService', '$timeout', '$scope', '$state', '$cacheFactory'];
  function qaQuestionListCtrl(danmuService, userService, $timeout, $scope, $state, $cacheFactory) {
    var vm = this;
    var container = document.body.querySelector('.result-wrap');
    var htmlDom = angular.element(document).find('html');
    var htmlFontSize = htmlDom.css('font-size').slice(0, -2);
    var topValue = 0;
    vm.totalItems = 0;
    vm.totalPages = 0;
    vm.questionArray = [];
    vm.keywords = ['实习', '通用', '四大/事务所', '咨询', '投行/券商', '快消', '互联网', '行业认知', '简历与网申', '单面与群面'];
    vm.params = {
      pageNum: 1,
      itemsPerPage: 10,
      keyword: '',
      all: 1
    };
    vm.keywordListStatus = false;
    vm.loadAllQuestion = false;
    vm.toolBarFixed = false;
    vm.STORE = $cacheFactory.get('STORE');

    vm.loadMoreQuestion = loadMoreQuestion;
    vm.selectHotKeyword = selectHotKeyword;
    vm.searchQuestion = searchQuestion;
    vm.hideHotKeyword = hideHotKeyword;
    vm.viewQuestionDetail = viewQuestionDetail;
    vm.gotoDiscovery = gotoDiscovery;

    activate();
    function activate() {
      var cachedData = vm.STORE.get('questionListData');
      if (cachedData) {
        vm.questionArray = cachedData.data;
        vm.params.pageNum = cachedData.pageNum;
        vm.loadAllQuestion = cachedData.allLoad;
        vm.params.keyword = cachedData.keyword;
      } else {
        getQuestions('search');
      }
    }

    container.addEventListener('scroll', function () {
      topValue = container.scrollTop;
      if (topValue > 1.1 * htmlFontSize) {
        vm.toolBarFixed = true;
        $scope.$apply();
      } else {
        vm.toolBarFixed = false;
        $scope.$apply();
      }
    });

    function searchQuestion() {
      vm.keywordListStatus = !vm.params.keyword;
      vm.params.pageNum = 1;
      vm.loadAllQuestion = false;
      getQuestions('search');
    }

    function hideHotKeyword() {
      var timer = $timeout(function () {
        vm.keywordListStatus = false;
        $timeout.cancel(timer);
      }, 200);
    }

    function viewQuestionDetail(question) {
      // sessionStorage.setItem('questionId', question.id);
      // sessionStorage.setItem('questionListParams', JSON.stringify(vm.params));
      // window.open('/mobile/discovery/qa', '_self');
      $state.go('discovery.question-detail', {
        id: question.id
      });
    }

    function selectHotKeyword(keyword) {
      vm.params.keyword = keyword;
      searchQuestion();
    }

    function loadMoreQuestion() {
      if (vm.loadAllQuestion) return;
      vm.params.pageNum++;

      getQuestions('search', 'scroll');
    }

    function buildCondition() {
      var params = Object.assign({}, vm.params);
      if (!params.keyword) {
        delete params.keyword;
      }
      return params;
    }

    function getQuestions(actionType, isScroll) {
      if (actionType === 'search') {
        userService.getQuestions(buildCondition()).then(function (result) {
          vm.loading = false;
          vm.totalItems = result.totalItems;
          parseQuestion(result.questions);
          if (result.totalItems < vm.params.itemsPerPage * vm.params.pageNum) {
            vm.loadAllQuestion = true;
          }
          if (isScroll) {
            vm.questionArray = vm.questionArray.concat(result.questions);
          } else {
            vm.questionArray = result.questions;
          }
          vm.STORE.put('questionListData', {
            data: vm.questionArray,
            pageNum: vm.params.pageNum,
            allLoad: vm.loadAllQuestion,
            keyword: vm.params.keyword
          });
        }).catch(function (error) {
          console.error(error);
        });
      } else {
        danmuService.getQuestions().then(function (result) {
          vm.questionArray = result.questions && result.questions.publishedQuestions;
          parseQuestion(vm.questionArray);
          vm.loadAllQuestion = true;
          vm.STORE.put('questionListData', {
            data: vm.questionArray,
            pageNum: vm.params.pageNum,
            allLoad: vm.loadAllQuestion
          });
        }).catch(function (error) {
          console.error(error);
        });
      }
    }

    function parseQuestion(questionArray) {
      questionArray.forEach(function (q) {
        q.answers[0].content = '' + q.answers[0].content.replace(/\n/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, '').replace(/\s/g, '').replace(/<br>/g, '').trim();
      });
    }

    function gotoDiscovery() {
      $state.go('discovery.qa');
    }
  }
})();

/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  angular.module('App').controller('qaQuestionDetailCtrl', qaQuestionDetailCtrl);

  qaQuestionDetailCtrl.$inject = ['userService', '$location', '$sce', 'wechatService', 'BASE_URL', '$state', '$stateParams', '$USER', 'authService'];

  function qaQuestionDetailCtrl(userService, $location, $sce, wechatService, BASE_URL, $state, $stateParams, $USER, authService) {
    var vm = this;

    vm.questionId = $stateParams.id;
    vm.isUserQuestion = $stateParams.userQuestion;
    vm.goBack = goBack;
    vm.toggleFavorite = toggleFavorite;
    vm.askQuestion = askQuestion;
    var questionParams = {
      entityId: vm.questionId,
      entityType: 'question',
      userId: $USER && $USER.id
    };
    vm.fromShare = document.location.href.match('from=') ? true : false;
    function goBack() {
      window.cfGoHistory({
        url: '/mobile/discovery/qa',
        target: '_self'
      });
    }
    activate();

    function activate() {
      userService.getQuestionDetail({
        questionId: vm.questionId
      }).then(function (result) {
        vm.content = result;
        var shareContent = vm.content && vm.content.answers && vm.content.answers[0] && vm.content.answers[0].content;
        vm.isFavored = vm.content.isFavorite;
        wechatService.setWxShareInfo({
          link: $location.absUrl(),
          title: vm.content && vm.content.title,
          desc: shareContent,
          imgUrl: '/images/share.jpg'
        });
        vm.content.answers.forEach(function (answer) {
          answer.content = $sce.trustAsHtml(answer.content);
        });
        // 授权回来自动给收藏
        if ($stateParams.favorite && !vm.isFavored) {
          userService.enableFavorite(questionParams).then(function () {
            vm.isFavored = true;
          });
        }
      }).catch(function (error) {
        console.error(error);
      });
    }

    function toggleFavorite() {
      if (!vm.isFavored) {
        if (!$USER || !$USER.id) {
          authService.wechatLogin('/mobile/discovery/question-detail/' + vm.questionId + '?favorite=true');
          return;
        }
        userService.enableFavorite(questionParams).then(function () {
          vm.isFavored = true;
        });
      } else {
        userService.disableFavorite(questionParams).then(function () {
          vm.isFavored = false;
        });
      }
    }

    function askQuestion() {
      if (!$USER || !$USER.id) {
        window.location.href = BASE_URL + '/api/auth/login?originalUrl=' + encodeURIComponent(BASE_URL + '/mobile/question');
      } else {
        $state.go('question');
      }
    }
  }
})();

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(610);
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
		module.hot.accept("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less", function() {
			var newContent = require("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 610:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/../../.svgo.yml'\n    at Error (native)\n    at Object.fs.openSync (fs.js:641:18)\n    at Object.fs.readFileSync (fs.js:509:33)\n    at module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/config.js:31:48)\n    at new module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo.js:21:19)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss-svgo@2.1.6@postcss-svgo/dist/index.js:95:16\n    at Object.creator [as postcssSvgo] (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:295:40\n    at Array.forEach (native)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:282:29\n    at creator (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at processCss (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/processCss.js:199:16)\n    at Object.module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/loader.js:40:2)");

/***/ }),

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  angular.module('App').controller('interviewMaterialCtrl', interviewMaterialCtrl);

  interviewMaterialCtrl.$inject = ['CF_FILE_BASE_URL', 'materialService', '$cacheFactory', 'IndustryList', '$document', '$state'];

  function interviewMaterialCtrl(CF_FILE_BASE_URL, materialService, $cacheFactory, IndustryList, $document, $state) {
    var vm = this;
    vm.$onInit = function () {
      vm.IndustryList = IndustryList;
      if (vm.IndustryList.length === 8) {
        vm.IndustryList.splice(4, 0, {
          banner: '/images/interview_material_m/industry/center.png'
        });
      }
      vm.tipsArray = [];
      vm.totalTips = 0;
      vm.materialsArray = [];
      vm.totalMaterials = 0;
      vm.loadAllMaterial = false;
      vm.container = document.querySelector('.interview-material-container');
      vm.params = {
        keyword: '',
        pageNum: 1,
        itemsPerPage: 20
      };
      vm.STORE = $cacheFactory.get('STORE');

      vm.openFilePreviewModal = openFilePreviewModal;
      vm.loadMoreMaterial = loadMoreMaterial;
      vm.viewIndustry = viewIndustry;
      vm.inputKeyword = inputKeyword;
      vm.search = search;

      activate();
    };

    function activate() {
      var status = vm.STORE.get('interviewMaterialStatus');

      if (!status) return;
      vm.params = status.params;
      vm.tipsArray = status.tipsArray;
      vm.totalTips = status.totalTips;
      vm.materialsArray = status.materialsArray;
      vm.totalMaterials = status.totalMaterials;
      vm.loadAllMaterial = status.loadAllMaterial;
      // request api, trigger keep-scroll-pos-container.
      materialService.getMaterials(vm.params);
    }

    function inputKeyword() {
      vm.params.pageNum = 1;
      vm.loadAllMaterial = false;
      search();
    }

    function search() {
      var params = Object.assign({}, vm.params);
      getList(params);
    }

    function openFilePreviewModal(material) {
      // saveStatus();
      countViewMaterial(material);
      material.viewCount++;
      $state.go('preview', {
        id: material.fileId,
        name: encodeURIComponent(material.fileName),
        isInterviewMaterial: true
      });
    }

    function countViewMaterial(material) {
      materialService.countViewMaterial(material.id);
    }

    function loadMoreMaterial() {
      if (vm.loadAllMaterial) return;
      vm.params.pageNum++;
      var params = Object.assign({}, vm.params);
      getList(params, 'scroll');
    }

    function getList(params, action) {
      materialService.getMaterials(params).then(function (result) {
        if (action === 'scroll') {
          vm.tipsArray = vm.tipsArray.concat(result.tips.items);
          vm.materialsArray = vm.materialsArray.concat(result.material.items);
        } else {
          vm.tipsArray = result.tips.items;
          vm.materialsArray = result.material.items;
        }

        vm.totalTips = result.tips.totalItems;
        vm.totalMaterials = result.material.totalItems;
        if (vm.materialsArray.length === vm.totalMaterials) {
          vm.loadAllMaterial = true;
        }
        saveStatus();
      }).catch(function (error) {
        return console.error(error);
      });
    }

    function viewIndustry(id) {
      if (!id) return;
      $state.go('discovery.industry_interview_material', { id: id });
    }

    function saveStatus() {
      var params = {
        params: Object.assign({}, vm.params),
        tipsArray: vm.tipsArray,
        totalTips: vm.totalTips,
        materialsArray: vm.materialsArray,
        totalMaterials: vm.totalMaterials,
        loadAllMaterial: vm.loadAllMaterial
      };
      vm.STORE.put('interviewMaterialStatus', params);
    }
  }
})();

/***/ }),

/***/ 612:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  angular.module('App').controller('industryInterviewMaterialCtrl', industryInterviewMaterialCtrl);

  industryInterviewMaterialCtrl.$inject = ['$USER', '$state', '$scope', '$location', 'IndustryList', 'materialService', 'CF_FILE_BASE_URL', '$cacheFactory'];

  function industryInterviewMaterialCtrl($USER, $state, $scope, $location, IndustryList, materialService, CF_FILE_BASE_URL, $cacheFactory) {
    var vm = this;
    vm.$onInit = function () {
      vm.user = $USER;
      vm.CF_FILE_BASE_URL = CF_FILE_BASE_URL;
      vm.toolBarFixed = false;
      vm.activeIndex = 0;
      vm.industryArray = IndustryList;
      vm.industryId = $location.$$url.match(/\/(\d+)/)[1];
      vm.currentIndustry = IndustryList.filter(function (indu) {
        return Number(indu.id) === Number(vm.industryId);
      })[0];
      vm.bannerStyle = {
        background: 'url("/images/interview_material_m/banner/' + vm.currentIndustry.name_en.replace(' ', '') + '.jpg") no-repeat center'
      };

      vm.container = document.querySelector('.industry-interview-material-container');
      var $container = $(vm.container);
      var $inputWrapper = $('.input-container-wrap');
      var rangeHeight = $('.banner').outerHeight() - $inputWrapper.outerHeight();
      $container.scroll(function () {
        var scrollTop = $container.scrollTop();
        var opacity = Math.min(scrollTop / rangeHeight, 1);
        $inputWrapper.css('backgroundColor', 'rgba(255,255,255,' + opacity + ')');
      });
      var topValue = 0;
      var subnavScrollTop = $('.banner').outerHeight() + $('.material-navigation').height();
      vm.container.addEventListener('scroll', function () {
        topValue = vm.container.scrollTop;
        vm.toolBarFixed = topValue > subnavScrollTop;
        $scope.$apply();
      });
      vm.STORE = $cacheFactory.get('STORE');
      vm.cachedData = vm.STORE.get('industryInterviewMaterialData');
      vm.params = {
        keyword: '',
        industryId: vm.industryId,
        pageNum: 1,
        itemsPerPage: 20
      };

      if (vm.cachedData && vm.cachedData.industryId == vm.industryId) {
        vm.params.keyword = vm.cachedData.keyword;
        vm.params.pageNu = vm.cachedData.pageNum;
      }

      vm.openFilePreviewModal = openFilePreviewModal;
      vm.loadMoreMaterial = loadMoreMaterial;
      vm.enterSearch = enterSearch;
      vm.toggleActiveIndex = toggleActiveIndex;
      vm.goBack = goBack;
      vm.search = search;

      activate();
    };

    function activate() {
      if (vm.cachedData && vm.cachedData.industryId == vm.industryId) {
        vm.materialsArray = vm.cachedData.materialsArray;
        vm.loadAllMaterial = vm.cachedData.materialAllLoad;
        vm.tipsArray = vm.cachedData.tipsArray;
        vm.preservicesArray = vm.cachedData.preservicesArray;
        vm.paperArray = vm.cachedData.paperArray;
        vm.activeIndex = vm.cachedData.activeIndex;
      } else {
        search();
      }
    }

    function search() {
      var params = Object.assign({}, vm.params);
      getList(params);
    }

    function enterSearch(event) {
      if (event.keyCode !== 13) return;
      event.target.blur();
      search();
      console.log('activeIndex', vm.activeIndex);
    }

    function loadMoreMaterial() {
      if (vm.loadAllMaterial) return;
      if (vm.params.keyword) {
        vm.params.pageNum++;
        var params = Object.assign({}, vm.params);
        getList(params, 'scroll');
      }
    }

    function getList(params, action) {
      materialService.getMaterials(params).then(function (result) {
        if (action === 'scroll') {
          vm.tipsArray = vm.tipsArray.concat(result.tips.items);
          vm.materialsArray = vm.materialsArray.concat(result.material.items);
          // vm.paperArray = vm.paperArray.concat(result.paper.items);
          // vm.preservicesArray = vm.preservicesArray.concat(result.paper.items);
        } else {
          vm.tipsArray = result.tips.items;
          vm.materialsArray = result.material.items;
          vm.paperArray = result.paper.items;
          vm.preservicesArray = result.preservices.items;
        }
        vm.totalTips = result.tips.totalItems;
        vm.totalMaterials = result.material.totalItems;
        if (vm.materialsArray.length === vm.totalMaterials) {
          vm.loadAllMaterial = true;
        }
        vm.STORE.put('industryInterviewMaterialData', {
          tipsArray: vm.tipsArray,
          materialsArray: vm.materialsArray,
          paperArray: vm.paperArray,
          preservicesArray: vm.preservicesArray,
          pageNum: params.pageNum,
          materialAllLoad: vm.loadAllMaterial,
          keyword: vm.params.keyword,
          activeIndex: vm.activeIndex,
          industryId: vm.industryId
        });
      }).catch(function (error) {
        return console.error(error);
      });
    }

    function goBack() {
      window.history.back();
      // if (document.referrer) {
      //   window.history.back();
      // } else {
      //   location.href = '/';
      // }
    }
    function toggleActiveIndex(index) {
      vm.activeIndex = index;
      var cachedData = vm.STORE.get('industryInterviewMaterialData') || {};
      cachedData.activeIndex = vm.activeIndex;
      vm.STORE.put('industryInterviewMaterialData', cachedData);
    }

    function openFilePreviewModal(material) {
      saveStatus();
      countViewMaterial(material);
      material.viewCount++;
      sessionStorage.setItem('industryInterviewPreviewModalFrom', $location.url());
      $state.go('preview', {
        id: material.fileId,
        name: encodeURIComponent(material.fileName),
        isInterviewMaterial: true
      });
    }

    function countViewMaterial(material) {
      materialService.countViewMaterial(material.id);
    }

    function saveStatus() {
      var params = Object.assign({}, vm.params);
      params.scrollTop = vm.container.scrollTop;
      sessionStorage.setItem('industryInterviewMaterialStatus', JSON.stringify(params));
    }
  }
})();

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('App').component('materialTip', {
  templateUrl: '/components/mobile/app/discovery/industry_interview_material/tip/template.html',
  controller: materialTipCtrl,
  controllerAs: 'vm',
  bindings: {
    industryId: '=',
    previewFile: '='
  }
});

materialTipCtrl.$inject = ['CF_FILE_BASE_URL', 'materialService'];

function materialTipCtrl(CF_FILE_BASE_URL, materialService) {
  var vm = this;
  vm.$onInit = function () {
    vm.tipsArray = [];

    getMaterialList({
      industryId: vm.industryId
    });
  };

  function getMaterialList(params) {
    materialService.getMaterials(params).then(function (result) {
      vm.tipsArray = result.tips.items;
    });
  }
}

/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('App').component('moreMaterial', {
	templateUrl: '/components/mobile/app/discovery/industry_interview_material/more_company_material/template.html',
	controller: moreMaterialCtrl,
	controllerAs: 'vm',
	bindings: {
		industryId: '=',
		previewFile: '='
	}
});

moreMaterialCtrl.$inject = ['CF_FILE_BASE_URL', 'materialService'];

function moreMaterialCtrl(CF_FILE_BASE_URL, materialService) {
	var vm = this;
	vm.$onInit = function () {
		vm.materialsArray = [];
		vm.params = {
			industryId: vm.industryId,
			notHot: 1,
			pageNum: 1,
			itemsPerPage: 100
		};

		getMaterialList(vm.params);
	};

	function getMaterialList(params) {
		materialService.getMaterials(params).then(function (result) {
			vm.materialsArray = result.material.items;
		});
	}
}

/***/ }),

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('App').component('hotCompanyMaterial', {
  templateUrl: '/components/mobile/app/discovery/industry_interview_material/hot_company_material/template.html',
  controller: hotCompanyMaterialCtrl,
  controllerAs: 'vm',
  bindings: {
    industryId: '=',
    previewFile: '='
  }
});

hotCompanyMaterialCtrl.$inject = ['CF_FILE_BASE_URL', 'materialService'];

function hotCompanyMaterialCtrl(CF_FILE_BASE_URL, materialService) {
  var vm = this;
  vm.$onInit = function () {
    vm.tipsArray = [];
    vm.hotCompanyArray = [];
    vm.hotCompanyMaterialsArray = [];
    vm.style = {
      transform: 'translateX(1.1rem)'
    };
    vm.currentCompanyIndex = 0;

    vm.swipeCompany = swipeCompany;

    getHotCompany(vm.industryId);
  };

  function swipeCompany(actionType) {
    if (actionType === 'left' && vm.currentCompanyIndex === vm.hotCompanyArray.length - 1 || actionType === 'right' && !vm.currentCompanyIndex) {
      return;
    }
    if (actionType === 'left') {
      vm.currentCompanyIndex++;
    } else {
      vm.currentCompanyIndex--;
    }
    vm.style.transform = 'translateX(' + (1.1 - vm.currentCompanyIndex * 7.8) + 'rem)';
    getHotCompanyMaterial(vm.hotCompanyArray[vm.currentCompanyIndex].id);
  }

  function getMaterialList(params) {
    return materialService.getMaterials(params);
  }

  function getHotCompany(id) {
    materialService.getHotCompany({
      industryId: id
    }).then(function (result) {
      vm.hotCompanyArray = result.items.map(function (c) {
        // 这是暂时的，上线初期，初始值比较大
        if (c.downloadCount > 300) {
          c.downloadCount -= 200;
        }
        return c;
      });
      if (!vm.hotCompanyArray.length) return;
      getHotCompanyMaterial(vm.hotCompanyArray[0].id);
    });
  }

  function getHotCompanyMaterial(id) {
    var params = {
      companyId: id,
      industryId: vm.industryId,
      itemsPerPage: 100,
      pageNum: 1
    };
    getMaterialList(params).then(function (result) {
      vm.hotCompanyMaterialsArray = result.material.items;
    }).catch(function (error) {
      return console.error(error);
    });
  }
}

/***/ })

});