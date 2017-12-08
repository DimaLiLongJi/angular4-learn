(function() {
  angular.module('App')
    .controller('resumeCtrl', resumeCtrl);
  resumeCtrl.$inject = [
    '$USER',
    '$uibModal',
    'fileService',
    'userService',
  ];

  function resumeCtrl(
    $USER,
    $uibModal,
    fileService,
    userService,
  ) {
    const vm = this;
    vm.user = $USER;

    vm.gotoPreview = gotoPreview;
    vm.uploadResume = uploadResume;
    vm.openResumeModal = openResumeModal;

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
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function resumeExist() {
      vm.resumeExist = vm.resumeArray.length > 0 ? true : false;
    }

    function gotoPreview(resume) {
      const pathUrl =
        `/resumes/${resume.fileId}/preview?fileName=${encodeURIComponent(resume.originalName)}`;
      window.open(pathUrl, '_blank');
    }

    function uploadResume(files) {
      if (!files || !files.length) {
        return;
      }
      if (vm.resumeArray.length >= 5) {
        vm.openResumeModal('wrongAdd', files);
        return;
      }
      const fileNameReg = /(.doc)|(.pdf)/;
      if (!fileNameReg.test(files[0].name) || !/.\../.test(files[0].name)) {
        vm.openResumeModal('wrongType', files);
        return;
      }
      const size = 4 * 1024 * 1024;
      if (files[0].size > size) {
        vm.openResumeModal('wrongSize', files);
        return;
      }
      vm.resumeUploading = true;
      files[0].originalName = encodeURIComponent(files[0].name);
      vm.loading = true;
      fileService.upload(files).then((result) => {
          vm.loading = false;
          const resume = result.data[0];
          return resume;
        })
        .then((resume) => {
          createResume(resume);
        })
        .catch((error) => {
          vm.loading = false;
          console.error('uploadResume error: ', error);
        });
    }

    function createResume(resume) {
      const params = {
        userId: $USER.id,
        fileId: resume.id,
        originalName: resume.originalName,
        type: 'resume',
        createdBy: $USER.id,
      };
      return userService.create(params)
        .then((result) => {
          vm.resumeArray.push(result);
          resumeExist();
          return result;
        });
    }

    function openResumeModal(type, resume) {
      const modal = $uibModal.open({
        windowClass: 'delete-apply-resume-modal',
        animation: true,
        keyboard: false,
        templateUrl: '/components/pc/account/resume/resume-modal/template.html',
        size: 'lg',
        controller: 'resumeModalCtrl',
        controllerAs: 'vm',
        resolve: {
          resume: () => resume,
          type: () => type,
          user: () => vm.user,
        },
      });
      modal.result.then((data) => {
        resumeExist();
        if (type === 'delete') {
          if (data.type === 'delete') {
            vm.resumeArray = vm.resumeArray.filter(i => i.id !== data.id);
            getUserResume();
          }
        }
      })
    }

  }
})();
