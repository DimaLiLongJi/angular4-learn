// import 'bootstrap/less/bootstrap.less';
import './logout-modal/index';
import './style.less';

export default angular.module('App').controller('accountCtrl', accountCtrl);

accountCtrl.$inject = [
  '$USER',
  'authService',
  '$state',
  'userService',
  '$cookies'
];

function accountCtrl(
  $USER,
  authService,
  $state,
  userService,
  $cookies,
) {
  const vm = this;
  vm.user = $USER;
  vm.userQuestionCheckedNotice = true;
  vm.login = login;
  vm.logout = logout;
  vm.gotoPage = gotoPage;

  if (!vm.user) {
    getUserInfo();
  } else {
    window.onpageshow = checkQuestionCheck;
  }

  function checkQuestionCheck() {
    userService.checkQuestionRead({
      userId: $USER && $USER.id,
    }).then((result) => {
      vm.userQuestionCheckedNotice = result.allChecked;
    });
  }


  function getUserInfo() {
    const echoStr = $cookies.get('echoStr');
    if (!echoStr) return;
    authService.checkLogin({
        echoStr,
      })
      .then((result) => {
        $USER = result;
        vm.user = result;
        userService.checkQuestionRead({
          userId: $USER && $USER.id,
        }).then((rs) => {
          vm.userQuestionCheckedNotice = rs.allChecked;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  function login() {
    authService.wechatLogin();
  }

  function logout() {
    vm.logoutModalStatus = true;
    // const modal = $uibModal.open({
    //   windowClass: 'logout-modal',
    //   animation: true,
    //   keyboard: false,
    //   templateUrl: '/components/mobile/app/account/logout-modal/template.html',
    //   controller: 'logoutModalCtrl',
    //   controllerAs: 'vm',
    // });
    // modal.result.then(() => {
    //   window.location.href = window.location.href;
    // });
  }

  function gotoPage(url, state) {
    if (!vm.user || !vm.user.id) {
      authService.wechatLogin(url);
    } else {
      $state.go(state);
      // window.location.href = url;
    }
  }
}
