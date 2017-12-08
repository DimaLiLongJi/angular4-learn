(() => {
  angular.module('App')
  .controller('qaQuestionListCtrl', qaQuestionListCtrl);

qaQuestionListCtrl.$inject = [
  'danmuService',
  'userService',
  '$timeout',
  '$scope',
  '$state',
  '$cacheFactory'
];
  function qaQuestionListCtrl(
    danmuService,
    userService,
    $timeout,
    $scope,
    $state,
    $cacheFactory
  ) {
    const vm = this;
    const container = document.body.querySelector('.result-wrap');
    const htmlDom = angular.element(document).find('html');
    const htmlFontSize = htmlDom.css('font-size').slice(0, -2);
    let topValue = 0;
    vm.totalItems = 0;
    vm.totalPages = 0;
    vm.questionArray = [];
    vm.keywords = [
      '四大/事务所',
      '咨询',
      '投行/券商',
      '快消',
      '互联网',
      '行业认知',
      '简历与网申',
      '单面与群面'
    ];
    vm.params = {
      pageNum: 1,
      itemsPerPage: 10,
      keyword: '',
      all: 1,
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
      const cachedData = vm.STORE.get('questionListData');
      if (cachedData) {
        vm.questionArray = cachedData.data;
        vm.params.pageNum = cachedData.pageNum;
        vm.loadAllQuestion = cachedData.allLoad;
        vm.params.keyword = cachedData.keyword;
      } else {
        getQuestions('search');
      }
    }

    container.addEventListener('scroll', () => {
      topValue = container.scrollTop;
      if (topValue > (1.1) * htmlFontSize) {
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
      const timer = $timeout(() => {
        vm.keywordListStatus = false;
        $timeout.cancel(timer);
      }, 200);
    }

    function viewQuestionDetail(question) {
      // sessionStorage.setItem('questionId', question.id);
      // sessionStorage.setItem('questionListParams', JSON.stringify(vm.params));
      // window.open('/mobile/discovery/qa', '_self');
      $state.go('discovery.question-detail', {
        id: question.id,
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
      const params = Object.assign({}, vm.params);
      if (!params.keyword) {
        delete params.keyword;
      }
      return params;
    }

    function getQuestions(actionType, isScroll) {
      if (actionType === 'search') {
        userService.getQuestions(buildCondition()).then((result) => {
          vm.loading = false;
          vm.totalItems = result.totalItems;
          parseQuestion(result.questions);
          if (result.totalItems < (vm.params.itemsPerPage * vm.params.pageNum)) {
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
            keyword: vm.params.keyword,
          });
        }).catch((error) => {
          console.error(error);
        });
      } else {
        danmuService.getQuestions().then((result) => {
          vm.questionArray = result.questions && result.questions.publishedQuestions;
          parseQuestion(vm.questionArray);
          vm.loadAllQuestion = true;
          vm.STORE.put('questionListData', {
            data: vm.questionArray,
            pageNum: vm.params.pageNum,
            allLoad: vm.loadAllQuestion,
          });
        }).catch((error) => {
          console.error(error);
        });
      }
    }

    function parseQuestion(questionArray) {
      questionArray.forEach((q) => {
        q.answers[0].content = `${q.answers[0].content
        .replace(/\n/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, '').replace(/\s/g, '')
        .replace(/<br>/g, '')
        .trim()}`;
      });
    }

    function gotoDiscovery() {
      $state.go('discovery.qa');
    }
  }
})();
