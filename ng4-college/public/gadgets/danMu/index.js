/* global $ */
import anime from 'animejs';

(() => {
  angular.module('App').component('danMu', {
    templateUrl: '/gadgets/danMu/template.html',
    controller: danMuCtrl,
    controllerAs: 'vm',
    bindings: {
      danMuStatus: '=',
      imgSrc: '=',
    },
  });
  danMuCtrl.$inject = [
    'danmuService',
    'userService',
    '$rootScope',
    '$interval',
    '$uibModal',
    '$timeout',
    '$scope',
    '$USER',
    '$sce'
  ];

  function danMuCtrl(
    danmuService,
    userService,
    $rootScope,
    $interval,
    $uibModal,
    $timeout,
    $scope,
    $USER,
    $sce
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.user = $USER;
      vm.askStatus = false;
      vm.animationStatus = false;
      vm.statusStore = null;
      vm.questionCount = 0;
      vm.danMuArray = [];
      vm.questionArray = [];
      vm.newQuestionArray = [];
      vm.newQuestion = '';
      vm.spacingFactor = 300;
      vm.speed = 90;
      vm.groupA = [];
      vm.groupB = [];
      vm.groupC = [];
      vm.groupD = [];

      $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'myPopoverTemplate.html',
        title: 'Title',
      };

      vm.askQuestion = askQuestion;
      vm.submitQuestion = submitQuestion;
      vm.hideAskInput = hideAskInput;
      vm.toggleFavorite = toggleFavorite;

      init();
    };

    function init() {
      if ($rootScope.reloadDanmu) {
        sessionStorage.removeItem('animProgress');
        sessionStorage.removeItem('danmuDisplayArray');
        vm.danmuDisplayArray = [
          {
            danArray: [],
            loopTime: 50,
          },
          {
            danArray: [],
            loopTime: 50,
          },
          {
            danArray: [],
            loopTime: 50,
          },
          {
            danArray: [],
            loopTime: 50,
          }];
          vm.animProgress = 0;
          getCustomizedDanmu();
          return;
      }

      vm.animProgress = sessionStorage.getItem('animProgress');
      vm.danmuDisplayArray = JSON.parse(sessionStorage.getItem('danmuDisplayArray'));
      let initTimer = null;
      if (!vm.danmuDisplayArray) {
        vm.danmuDisplayArray = [
          {
            danArray: [],
            loopTime: 50,
          },
          {
            danArray: [],
            loopTime: 50,
          },
          {
            danArray: [],
            loopTime: 50,
          },
          {
            danArray: [],
            loopTime: 50,
          }

      ];
      }
      if (!vm.danmuDisplayArray[0].danArray.length || !vm.animProgress) {
        getDanmu();
      } else {
        vm.danmuDisplayArray.forEach((group) => {
          group.danArray.forEach((dan) => {
            if (dan.answer) {
              dan.answer.content = $sce.trustAsHtml(dan.answer.originalContent.replace(/\n/g, '<br>'));
            }
          });
        });
        initTimer = $timeout(() => {
          addAnimation(productAnimaParams());
          $timeout.cancel(initTimer);
          initTimer = null;
        }, 10);
      }
      checkCount();
      if (/action=askQuestion/.test(window.location.href)) {
        askQuestion();
      }
      if (sessionStorage.getItem('favoriteId')) {
        favorite({
          id: Number(sessionStorage.getItem('favoriteId')),
        });
      }
    }

    $scope.$watch('vm.danMuStatus', () => {
      if (vm.danMuStatus) {
        vm.imgPath = vm.imgSrc.on;
      } else {
        vm.imgPath = vm.imgSrc.off;
      }
    });

    function askQuestion() {
      if (!$USER || !$USER.subscribe) {
        openSubscriptionModal(false);
        return;
      }
      if (vm.questionCount >= 5) {
        openTipModal();
        return;
      }
      vm.askStatus = true;
      let timer = $timeout(() => {
        $('#ask-input').focus();
        $timeout.cancel(timer);
        timer = null;
      }, 100);
    }

    function submitQuestion() {
      if (!$USER.subscribe) {
        openSubscriptionModal(false);
        return;
      }
      const params = {
        userId: $USER.id,
        title: vm.question,
      };
      if (!params.title || params.title.length > 150) return;
      userService.askQuestion(params)
        .then((result) => {
          vm.askStatus = false;
          vm.newQuestion = result;
          vm.newQuestionArray.push(vm.newQuestion);
          vm.questionCount++;
          vm.newQuestion.visited = true;
          vm.groupA.push(Object.assign({}, vm.newQuestion));
          vm.groupA.sort(randomsort);
          vm.question = '';
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function hideAskInput() {
      let timer = $timeout(() => {
        vm.askStatus = false;
        $timeout.cancel(timer);
        timer = null;
      }, 200);
    }

    function checkCount() {
      if (!$USER) return;
      userService.checkCount({
        userId: $USER.id,
      })
        .then((result) => {
          vm.questionCount = result.count;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function getDanmu() {
      const params = {};
      if ($USER) {
        params.userId = $USER.id;
      }
      danmuService.getDanmu(params)
        .then((result) => {
          parseDanmuData(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function parseDanmuData(result) {
      if (result.questions.userQuestions) {
          result.questions.userQuestions.forEach((q) => {
            q.visited = true;
          });
        vm.questionArray = [...vm.questionArray, ...result.questions.userQuestions];
      }
      if (result.questions.publishedQuestions) {
        vm.questionArray = [...vm.questionArray, ...result.questions.publishedQuestions];
      }
      const qas = [];
      vm.questionArray.forEach((q) => {
        if (q.answers.length) {
          q.answers.forEach((a) => {
            const qa = Object.assign({}, q);
            a.originalContent = a.content;
            if (a.content) {
              a.content = $sce.trustAsHtml(a.content.replace(/\n/g, '<br>'));
            }
            qa.answer = a;
            qas.push(qa);
          });
        } else {
          q.answer = null;
          qas.push(q);
        }
      });
      vm.questionArray = qas;
      if (result.companies) {
        vm.danMuArray = [...vm.danMuArray, ...result.companies];
      }
      vm.danMuArray = [...vm.danMuArray, ...vm.questionArray];
      vm.danMuArray = vm.danMuArray.filter(d => d);
      vm.danMuArray.sort(randomsort);
      vm.danMuArray.forEach((elt, i) => {
        const index = i % 4;
        const group = vm.danmuDisplayArray[index];
        group.danArray.push(elt);
        if (!(i % 4)) {
          vm.groupA.push(elt);
        }
        if (!((i - 1) % 4)) {
          vm.groupB.push(elt);
        }
        if (!((i - 2) % 4)) {
          vm.groupC.push(elt);
        }
        if (!((i - 3) % 4)) {
          vm.groupD.push(elt);
        }
      });
      addAnimation(setSpeed());
    }

    function addAnimation(option) {
      const controlsProgressEl = document.querySelector('#TLcontrols .progress');
      let animTimer = null;
      const TLcontrols = anime.timeline({
        loop: true,
        easing: 'linear',
        update: (anim) => {
          controlsProgressEl.value = anim.progress * 100;

          if (animTimer) return;
          animTimer = $timeout(() => {
            sessionStorage.setItem('animProgress', anim.progress);
            $timeout.cancel(animTimer);
            animTimer = null;
          }, 1000);
        },
      });

      TLcontrols
      .add({
        targets: '#TLcontrols .dan-group',
        left: [{
          value: `-${option.width}px`,
        }],
        easing: 'linear',
        duration: option.duration,
      });

      // document.querySelector('#TLcontrols .play').onclick = TLcontrols.play;
      // document.querySelector('#TLcontrols .pause').onclick = TLcontrols.pause;
      // document.querySelector('#TLcontrols .restart').onclick = TLcontrols.restart;
      controlsProgressEl.addEventListener('input', () => {
        TLcontrols.pause();
        TLcontrols.seek(TLcontrols.duration * (controlsProgressEl.value / 10000));
        if (!vm.animationStatus) {
          TLcontrols.play();
        }
      });

      if (vm.animProgress) {
        TLcontrols.pause();
        TLcontrols.seek(TLcontrols.duration * (vm.animProgress / 100));
        TLcontrols.play();
        // $scope.$apply();
      }

      $('.dan-group').mouseover(() => {
        vm.statusStore = !vm.animationStatus;
        TLcontrols.pause();
        $scope.$apply(() => {
          vm.animationStatus = true;
        });
      });
      $('.dan-group').mouseout(() => {
        if (vm.statusStore) {
          TLcontrols.play();
          $scope.$apply(() => {
            vm.animationStatus = false;
            vm.statusStore = null;
          });
        } else {
          TLcontrols.pause();
          $scope.$apply(() => {
            vm.animationStatus = true;
            vm.statusStore = null;
          });
        }
      });
      vm.toggleAnimation = () => {
        vm.animationStatus = !vm.animationStatus;
        if (!vm.animationStatus) {
          TLcontrols.play();
        } else {
          TLcontrols.pause();
        }
      };
    }

    function setSpeed() {
      for (let i = 0; i < vm.danmuDisplayArray.length; i++) {
        const group = vm.danmuDisplayArray[i];
        let totalWidth = 0;
        for (let j = 0; j < group.danArray.length; j++) {
          const dan = group.danArray[j];
          dan.styleObj = {
            'margin-left': (Math.random() * vm.spacingFactor).toFixed(0),
          };
          if (dan.title) {
            totalWidth = totalWidth + (dan.title.length * 18.3) + 130 + Number(dan.styleObj['margin-left']);
          } else {
            totalWidth = totalWidth + (dan.name.length * 18.3) + 310 + Number(dan.styleObj['margin-left']);
          }
          dan.styleObj['margin-left'] += 'px';
        }
        group.loopTime = (totalWidth / vm.speed);
        group.totalWidth = totalWidth;
      }
      sessionStorage.setItem('danmuDisplayArray', JSON.stringify(vm.danmuDisplayArray));
      return productAnimaParams();
    }

    function productAnimaParams() {
      let key;
      const widthArray = [];
      const durationArray = [];
      for (key in vm.danmuDisplayArray) {
        if ({}.hasOwnProperty.call(vm.danmuDisplayArray, key)) {
            widthArray.push(parseInt(vm.danmuDisplayArray[key].totalWidth, 10));
            durationArray.push(parseInt(vm.danmuDisplayArray[key].loopTime * 1000, 10));
        }
      }
      return {
        width: Math.max(...widthArray),
        duration: Math.max(...durationArray),
      };
    }

    function randomsort() {
      return Math.random() > 0.5 ? -1 : 1;
    }

    function openSubscriptionModal(subscribe) {
      const modalInstance = $uibModal.open({
        windowClass: 'small-modal subscription-modal',
        animation: true,
        backdrop: 'static',
        templateUrl: '/gadgets/subscription-modal/template.html',
        controller: 'subscriptionCtrl',
        controllerAs: 'vm',
        resolve: {
          subscribe: () => subscribe,
          scene: () => 'qa',
        },
      });

      modalInstance.result
        .then((result) => {
          if (result && result.subscribe) {
            vm.askStatus = true;
          }
          if (!$USER) {
            window.location.href += '?action=askQuestion';
            window.location.reload();
          }
        })
        .catch(() => {
        });
    }

    function openTipModal() {
      $uibModal.open({
        windowClass: 'small-modal tip-modal',
        animation: true,
        backdrop: 'static',
        templateUrl: '/gadgets/tip-modal/template.html',
        controller: 'tipCtrl',
        controllerAs: 'vm',
        resolve: {
        },
      });
    }

    function getCustomizedDanmu() {
      const params = {};
      if ($USER) {
        params.userId = $USER.id;
      }
      danmuService.getCustomizedDanmu(params)
        .then((result) => {
          parseDanmuData(result);
        })
        .catch(error => console.error(error));
    }

    function toggleFavorite(dan) {
      let urlParams = '';
      if (location.pathname === '/recruit_calendar') {
        urlParams = 'recruit_calendar';
      } else if (location.pathname === '/discovery') {
        urlParams = 'discovery';
      } else if (location.pathname === '/' && location.hash) {
        urlParams = '';
      }
      sessionStorage.setItem('favoriteId', dan.id);
      if (!vm.user) {
        openLoginModal(urlParams);
        return;
      }
      if (dan.isFavorite) {
        cancelFavorite(dan);
      } else {
        favorite(dan);
      }
    }

    function favorite(question) {
      const params = {
        userId: vm.user.id,
        entityType: 'question',
        entityId: question.id,
      };
      userService.enableFavorite(params)
      .then(() => {
        question.isFavorite = 1;
        sessionStorage.setItem('danmuDisplayArray', JSON.stringify(vm.danmuDisplayArray));

        if (sessionStorage.getItem('favoriteId')) {
          vm.favoriteStatus = true;
          sessionStorage.removeItem('favoriteId');
        }
        $timeout(() => {
          vm.favoriteStatus = false;
        }, 2800);
      });
    }

    function cancelFavorite(question) {
      const params = {
        userId: vm.user.id,
        entityType: 'question',
        entityId: question.id,
      };
      userService.disableFavorite(params)
      .then(() => {
        question.isFavorite = 0;
        sessionStorage.setItem('danmuDisplayArray', JSON.stringify(vm.danmuDisplayArray));
      });
    }

    function openLoginModal(urlParams) {
      const modalInstance = $uibModal.open({
        windowClass: 'small-modal login-modal',
        animation: true,
        backdrop: 'static',
        templateUrl: '/gadgets/wechat-login-modal/template.html',
        controller: 'wechatLoginCtrl',
        controllerAs: 'vm',
        resolve: {
          urlParams: () => urlParams,
        },
      });

      modalInstance.result
        .then(() => {
        })
        .catch(() => {
        });
    }
  }
})();
