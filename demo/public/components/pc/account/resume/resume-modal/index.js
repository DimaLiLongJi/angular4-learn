(() => {
  angular.module('App').controller('resumeModalCtrl',
    resumeModalCtrl);
  resumeModalCtrl.$inject = [
    '$uibModalInstance',
    'userService',
    'resume',
    'type',
    'user',
  ];

  function resumeModalCtrl(
    $uibModalInstance,
    userService,
    resume,
    type,
    user,
  ) {
    var vm = this;

    vm.user = user;
    vm.type = type;
    vm.resume = resume;

    vm.confirm = confirm;
    vm.cancel = cancel;

    function confirm() {
      if (type === 'delete') {
        const params = {
          userId: vm.user.id,
          attachmentId: vm.resume.id,
        };
        const data = {
          type: 'delete',
          id: vm.resume.id,
        };
        userService.deleteAttachment(params)
          .then((result) => {
            vm.cancel(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    function cancel(data) {
      $uibModalInstance.close(data);
    }

  }
})();
