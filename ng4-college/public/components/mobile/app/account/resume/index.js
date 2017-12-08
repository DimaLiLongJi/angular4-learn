import './resume-delete-modal';
import './style.less';

export default angular.module('App')
  .controller('resumeCtrl', resumeCtrl);

resumeCtrl.$inject = [
  '$USER',
  '$state',
  'CF_FILE_BASE_URL',
  'userService'
];

function resumeCtrl(
  $USER,
  $state,
  CF_FILE_BASE_URL,
  userService,
) {
  const vm = this;

  vm.user = $USER;
  vm.openResumeDeleteModal = openResumeDeleteModal;
  vm.openFilePreviewModal = openFilePreviewModal;
  vm.gotoAccount = gotoAccount;

  activate();

  function activate() {
    getUserResume();
  }

  function getUserResume() {
    const params = {
      userId: vm.user.id,
    };
    userService.getUserAttachments(params)
      .then((result) => {
        vm.resumeArray = result;
        resumeExist();
        console.log(vm.resumeExist);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function resumeExist() {
    vm.resumeExist = vm.resumeArray.length > 0;
  }

  function openResumeDeleteModal(resume) {
    vm.deleteReume = resume;
    vm.showDeleteModal = true;
  }

  function openFilePreviewModal(resume) {
    $state.go('preview', {
      id: resume.fileId,
      name: encodeURIComponent(resume.originalName),
    });
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}
