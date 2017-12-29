(() => {
  /* global wx */
  angular.module('App', [
    'ngResource',
    'ui.router',
    'duScroll',
    'ngSessionStorage',
    'ngFileUpload',
    'ngCookies',
    'monospaced.elastic',
    'ngMessages',
    // 'ui.bootstrap',
    'ngClickCopy',
    'oc.lazyLoad',
    'ngTouch',
    'angular-carousel'
  ]).run([
    '$transitions',
    '$timeout',
    '$location',
    ($transitions, $timeout, $location) => {
      // FastClick.attach(document.body);
      let link;
      let title;
      let desc;
      let imgUrl;
      const configObject = {
        recruitCalendar: {
          title: '2018校招日历，优质求职机会等你来',
          desc: '毕业=失业？，NO！求职学堂-校招日历帮你Say-NO！覆盖主流行业各大名企，实时为你更新优质校招机会',
          imgUrl: '/images/recruit-share.jpg',
        },
        internOpportunity: {
          title: '名企实习-【求职学堂-职业蛙】',
          desc: '求职学堂，职业蛙精心打造的机会信息共享平台。这里有精选的名企职位……',
          imgUrl: '/images/discovery-share.jpg',
        },
        discovery: {
          title: '求职探索-【求职学堂-职业蛙】',
          desc: '求职学堂，职业蛙精心打造的机会信息共享平台。这里有精选的名企职位……',
          imgUrl: '/images/discovery-share.jpg',
        },
        questionList: {
          title: '求职学堂弹幕问答',
          desc: '免费的求职问答平台。提出你的职场疑问，资深职场专家会在48小时内回复。',
          imgUrl: '/images/share.jpg',
        },
        question: {
          title: '求职学堂弹幕提问',
          desc: '专业团队为你解答求职上的疑惑和难点',
          imgUrl: '/images/share.jpg',
        },
        default: {
          title: document.title,
          desc: document.head.querySelector('[name=description]').content,
          imgUrl: '/images/share.jpg',
        },
      };

      $transitions.onSuccess({}, (trans) => {
        $timeout(() => reConfig(trans.$to().name), 1);
      });

      function reConfig(toState) {
        const xhr = new XMLHttpRequest();
        if (toState === 'discovery.question-detail') {
          return;
        }
        switch (toState) {
          case 'recruit-calendar':
            ({ title, desc, imgUrl, } = configObject.recruitCalendar);
            break;
          case 'intern-opportunity':
            ({ title, desc, imgUrl, } = configObject.internOpportunity);
            break;
          case 'discovery':
            ({ title, desc, imgUrl, } = configObject.discovery);
            break;
          case 'discovery.question-list':
            ({ title, desc, imgUrl, } = configObject.questionList);
            break;
          case 'discovery.qa':
            ({ title, desc, imgUrl, } = configObject.questionList);
            break;
          case 'discovery.question':
            ({ title, desc, imgUrl, } = configObject.question);
            break;
          default:
            ({ title, desc, imgUrl, } = configObject.default);
        }
        xhr.addEventListener('load', configWX);
        link = $location.absUrl();
        xhr.open('GET', `http://careerfrog.com.cn/api/wechat/signature?pageUrl=${encodeURIComponent(link)}`);
        xhr.send();
      }

      function configWX() {
        const config = JSON.parse(this.responseText);
        // config.debug = true;
        config.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline'];

        wx.config(config);
        if (link.indexOf('?') < 0) {
          link += '?safari=true';
        }
        wx.ready(() => {
          wx.onMenuShareAppMessage({
            title,
            desc,
            link,
            imgUrl,
            type: 'link',
            success() {},
            cancel() {},
          });

          wx.onMenuShareTimeline({
            title,
            desc,
            link,
            imgUrl,
            success() {},
            cancel() {},
          });
        });
      }
    }
  ]);
  (() => {
    angular.module('App').controller('collegeCtrl', collegeCtrl);
    const dpr = Number(document.getElementsByTagName('html')[0].attributes['data-dpr'].value);
    if (dpr === 3) {
      angular.module('App').value('duScrollOffset', 325);
    }
    if (dpr === 2) {
      angular.module('App').value('duScrollOffset', 196);
    }
    if (dpr === 1) {
      angular.module('App').value('duScrollOffset', 94);
    }
    collegeCtrl.$inject = ['$state', '$scope', '$rootScope', '$cookies', '$cacheFactory', '$transitions', 'userService', '$USER'];

    function collegeCtrl($state, $scope, $rootScope, $cookies, $cacheFactory, $transitions, userService, $USER) {
      $scope.state = $state;
      const vm = this;
      $cacheFactory('STORE');
    }
  })();
})();
