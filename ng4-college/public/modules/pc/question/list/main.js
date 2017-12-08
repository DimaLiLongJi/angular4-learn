(() => {
  angular.module('App', [
    'ngCookies',
    'ngResource',
    'duScroll',
    'ui.bootstrap'
  ]).run();
})();
(() => {
  angular.module('App')
  .controller('questionListCtrl', questionListCtrl);

  questionListCtrl.$inject = [
    'userService',
    '$uibModal',
    '$USER'
  ];

  function questionListCtrl(
    userService,
    $uibModal,
    $USER,
  ) {
    const vm = this;
    vm.user = $USER;
    vm.$onInit = () => {
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
      };

      vm.selectkeyword = selectkeyword;
      vm.search = search;
      vm.pageChanged = pageChanged;
      vm.openLoginModal = openLoginModal;
      vm.toggleFavorite = toggleFavorite;

      getQuestions();
    };

    function search() {
      getQuestions();
    }

    function toggleFavorite(question) {
      if (!vm.user) {
        openLoginModal(`question?fq=${question.id}`);
        return;
      }
      if (question.isFavorite) {
        cancelFavorite(question);
      } else {
        favorite(question);
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
        if (/fq=\d+/.test(location.search)) {
          window.location.href = location.pathname;
        }
        question.isFavorite = 1;
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
      });
    }

    function buildCondition() {
      const params = Object.assign({}, vm.params);
      if (vm.user) {
        params.userId = vm.user.id;
      }
      params.all = 1;
      return params;
    }

    function getQuestions() {
      userService.getQuestions(buildCondition())
        .then((result) => {
          vm.questionArray = result.questions;
          vm.totalItems = result.totalItems;
          vm.totalPages = Math.ceil(result.totalItems / vm.params.itemsPerPage);
          if (location.search && /fq=\d+/.test(location.search)) {
            favorite({
              id: location.search.match(/fq=(\d+)/)[1],
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function selectkeyword(k) {
      vm.params.keyword = k;
      vm.params.pageNum = 1;
      search();
    }

    function pageChanged() {
      search();
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
