webpackJsonp([2],{

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
          imgUrl: 'http://static.careerfrog.com.cn/cf-college/images/share.06b6e3ab.jpg'
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
      imgUrl: 'http://static.careerfrog.com.cn/cf-college/images/share.06b6e3ab.jpg'
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
          imgUrl: 'http://static.careerfrog.com.cn/cf-college/images/share.06b6e3ab.jpg'
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

/***/ })

});