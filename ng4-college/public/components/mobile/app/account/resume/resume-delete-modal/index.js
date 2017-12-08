angular.module('App')
  .component('resumeDeleteModal', {
    templateUrl: '/components/mobile/app/account/resume/resume-delete-modal/template.html',
    controller: resumeDeleteModalCtrl,
    controllerAs: 'vm',
    bindings: {
      showModal: '=',
      resume: '=',
    },
  });
angular.module('App')
    .controller('resumeDeleteModalCtrl',
      resumeDeleteModalCtrl);

  resumeDeleteModalCtrl.$inject = [
    'userService',
    '$USER',
    '$state'
  ];

  function resumeDeleteModalCtrl(
    userService,
    $USER,
    $state
  ) {
    const vm = this;

    vm.user = $USER;

    vm.confirm = confirm;
    vm.cancel = cancel;

    function confirm() {
      const params = {
        userId: vm.user.id,
        attachmentId: vm.resume.id,
      };
      userService.deleteAttachment(params)
        .then((result) => {
          $state.reload();
          // vm.cancel(vm.resume.id);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function cancel() {
      vm.showModal = false;
    }
  }
