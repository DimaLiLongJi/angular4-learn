/* global $ */
import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import 'velocity-animate';
// import TweenMax from 'gsap/src/uncompressed/TweenMax';
// import TimelineMax from 'gsap/src/uncompressed/TimelineMax';
import './detail/index';
import './question/index';
import './question-list/index';
import './question-detail/index';

 export default angular.module('App').controller('discoveryQaCtrl', discoveryQaCtrl);

  discoveryQaCtrl.$inject = [
    'danmuService',
    'userService',
    '$timeout',
    '$scope',
    'BASE_URL',
    '$USER',
    '$state',
    '$location',
    'wechatService',
    '$sce'
  ];

  function discoveryQaCtrl(
    danmuService,
    userService,
    $timeout,
    $scope,
    BASE_URL,
    $USER,
    $state,
    $location,
    wechatService,
    $sce
  ) {
    const htmlDom = angular.element(document).find('html')[0];
    const dpr = Number(htmlDom.attributes['data-dpr'].nodeValue) || 1;
    let scrollMagicCtrl = null;
    const scrollMagicScenes = [];
    let scrollTimer = null;
    const discoveryHeaderHeight = $('.discovery-header').height();
    const $danmuContainer = $('#danmu-container');
    const danmuHeight = $danmuContainer.height();

    const vm = this;
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


    vm.$onInit = () => {
      let danmuPromise = null;
      if (!$USER || !$USER.isPreferenced) {
        danmuPromise = danmuService.getQuestions();
      } else {
        danmuPromise = danmuService.getCustomizedQuestions();
      }
      danmuPromise.then((result) => {
        if ($USER && $USER.isPreferenced) {
          vm.questions = result.questions;
        } else {
          vm.questions = result.questions && result.questions.publishedQuestions;
        }
        // 添加一条空的数据，可以滚到最后一条
        vm.questions.push({});
        $timeout(() => {
          scrollMagicCtrl = new ScrollMagic.Controller({
            container: '.danmu-container',
            vertical: true,
          });

          vm.questions.forEach((question, index) => {
            const tween = new TimelineLite();
            tween.add(TweenLite.to(`#danmu${index}`, 1, {
              opacity: 1,
              transform: 'scale(1.2)',
              ease: Linear.easeNone,
            }));
            tween.add(TweenLite.to(`#danmu${index}`, 2, {
              opacity: 1,
              transform: 'scale(1.2)',
              ease: Linear.easeNone,
            }));
            tween.add(TweenLite.to(`#danmu${index}`, 1, {
              opacity: 0.5,
              transform: 'scale(1)',
              ease: Linear.easeNone,
            }));
            const myscene = new ScrollMagic.Scene({
              duration: $(`#danmu${index}`).height() + 15 * dpr, // the scene should last for a scroll distance of 100px
              offset: -discoveryHeaderHeight / 2,
              triggerElement: `#danmu${index}`,
            }).setTween(tween).on('enter', (event) => {
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
        $timeout(() => {
          autoScroll();
          $danmuContainer.on('touchstart', () => {
            if (scrollTimer) $timeout.cancel(scrollTimer);
          });
          $danmuContainer.on('touchend', () => {
            if (vm.autoplay) {
              scrollTimer = $timeout(() => {
                autoScroll();
              }, 500);
            }
          });
        }, 1);
      });
      const questionId = sessionStorage.getItem('questionId');
      if (questionId) {
        userService.getQuestionDetail({
            questionId,
          })
          .then((result) => {
            wechatService.setWxShareInfo({
              link: `${BASE_URL}/mobile/discovery/question-detail/${result.id}`,
              title: result.title,
              desc: result.answers[0].content,
              imgUrl: '/images/share.jpg',
            });
            showDetail(result);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    $scope.$on('$destroy', () => {
      if (scrollTimer) $timeout.cancel(scrollTimer);
      scrollMagicScenes.forEach((scene) => {
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
        link: `${BASE_URL}/mobile/discovery/question-detail/${question.id}`,
        title: question.title,
        desc: question.answers[0].content,
        imgUrl: '/images/share.jpg',
      });
      console.log('question', question);
      console.log('link',`${BASE_URL}/mobile/discovery/question-detail/${question.id}`);
      question.answers = question.answers.map((answer) => {
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
        window.location.href = `${BASE_URL}/api/auth/login?originalUrl=${encodeURIComponent(`${BASE_URL}/mobile/discovery/question`)}`;
      } else {
        $state.go('discovery.question');
      }
    }

    let prevScene = null;

    function autoScroll() {
      scrollDanmu();

      function scrollDanmu() {
        if (scrollMagicCtrl) {
          const currentScene = parseInt(vm.currentScene, 10);
          const offset = prevScene === currentScene ? 3 : 2;
          const nextScene = currentScene + offset;
          if (scrollMagicScenes[nextScene]) {
            prevScene = currentScene;
            const nextSceneElm = $(scrollMagicScenes[nextScene].triggerElement());
            // const nextSceneElmHeight = nextSceneElm.height();

            nextSceneElm.velocity('scroll', {
              offset: -(danmuHeight + discoveryHeaderHeight + scrollMagicScenes[nextScene - 1]
                .duration()) / 2,
              container: $danmuContainer,
            });
          }
          scrollTimer = $timeout(() => {
            scrollDanmu();
          }, vm.autoplayInterval);
        }
      }
    }

  }
