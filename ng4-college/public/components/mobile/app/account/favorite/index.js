import './style.less';

export default angular.module('App')
  .controller('favoriteCtrl', favoriteCtrl);

favoriteCtrl.$inject = [
  '$USER',
  'userService',
  '$state'
];

function favoriteCtrl(
  $USER,
  userService,
  $state
) {
  const vm = this;
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
  let pageShow;
  window.onpageshow = function() {
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
      userId: $USER.id,
    }).then((result) => {
      const favorites = result.favorites || [];
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
      window.location.href = `/opportunity/${opp.id}`;
    }
  }

  function goQuestion(qs) {
    sessionStorage.favoriteTab = 'question';
    $state.go('discovery.question-detail', {
      id: qs.id,
    });
  }

  function unfavorOpp(opp, index) {
    userService.disableFavorite({
      userId: $USER && $USER.id,
      entityId: opp.id,
      entityType: 'opportunity',
    }).then(() => {
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
      entityType: 'question',
    }).then(() => {
      vm.questionList.splice(index, 1);
    });
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}