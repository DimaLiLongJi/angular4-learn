(() => {
  angular.module('App').controller('applyOppCtrl', applyOppCtrl);

  applyOppCtrl.$inject = [
    'mobilePrefixService',
    '$uibModalInstance',
    'fileService',
    'userService',
    '$timeout',
    '$scope',
    '$USER',
    '$oppId'
  ];

  function applyOppCtrl(
    mobilePrefixService,
    $uibModalInstance,
    fileService,
    userService,
    $timeout,
    $scope,
    $USER,
    $oppId
  ) {
    const vm = this;

    vm.$onInit = () => {
      vm.emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      vm.resumeArray = [];
      vm.applyParams = {
        userId: $USER.id,
        opportunityId: $oppId,
        // attachmentId: '',
        attachmentIds: [],
        title: '',
        email: '',
        createdBy: $USER.id,
        mobile: '',
      };
      vm.paramsStatus = {
        title: false,
        email: false,
        resume: false,
        mobile: false,
      };
      vm.selectedPrefix = {
        name: '中国',
        value: '86',
        id: 1,
      };
      vm.applyStatus = false;
      vm.filerErrorModalStatus = false;
      vm.filerErrorModalStatus = false;
      vm.loading = false;
      vm.init = true;
      vm.resumeAnimationStatus = true;

      vm.closefilerErrorModal = closefilerErrorModal;
      vm.uploadResume = uploadResume;
      vm.deleteResume = deleteResume;
      vm.validateForm = validateForm;
      vm.gotoPreview = gotoPreview;
      vm.closeModal = closeModal;
      vm.apply = apply;
      vm.closePrefixList = closePrefixList;
      vm.selectResume = selectResume;
      vm.saveForm = saveForm;

      getUserResume();
    };

    function saveForm() {
      sessionStorage.setItem('applyParams', JSON.stringify(vm.applyParams));
      sessionStorage.setItem('applyParamsPrefix', JSON.stringify(vm.selectedPrefix));
    }

    function getLastApplyInfo() {
      userService.getLastApplyInfo($USER.id)
        .then((result) => {
          if (sessionStorage.getItem('applyParams')) {
            getParamsFromSession();
            return;
          }
          if (result && result.title) {
            vm.applyParams.title = result.title;
          }
          if (result && result.email) {
            vm.applyParams.email = result.email;
          }
          if (result && result.mobile) {
            vm.applyParams.mobile = result.mobile;
          }
          if (result.attachmentIds && result.attachmentIds.length) {
            vm.applyParams.attachmentIds = result.attachmentIds;
            vm.applyParams.attachmentIds = vm.applyParams.attachmentIds
              .filter(id => vm.resumeArray.some(r => r.id === id));
            vm.resumeArray = vm.resumeArray.map((r) => {
              if (vm.applyParams.attachmentIds.some(id => id === r.id)) {
                r.checked = true;
              }
              return r;
            });
          }
          if (result && result.prefixId) {
            vm.selectedPrefix = result.prefixId;
            getPrefixList();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function closePrefixList(event) {
      const classNameArray = ['prefix-detail ng-scope', 'country-name ng-binding', 'prefix-value ng-binding'];
      const targetClassName = event.target.className;
      if (targetClassName === 'prefix clearfix' || targetClassName === 'selected-prefix-value ng-binding' || typeof targetClassName === 'object') {
        vm.prefixListStatus = !vm.prefixListStatus;
        return;
      }
      if (classNameArray.find(c => c !== targetClassName)) {
        vm.prefixListStatus = false;
      }
    }

    function closeModal() {
      $uibModalInstance.dismiss();
    }

    function closefilerErrorModal() {
      vm.filerErrorModalStatus = false;
    }

    function selectResume(r, event) {
      const checkboxStatus = event.target.checked;
      event.stopPropagation();
      if (checkboxStatus === undefined) return;
      if (checkboxStatus && vm.applyParams.attachmentIds.length >= 2) {
        event.target.checked = false;
      } else {
        vm.applyParams.attachmentIds.push(r.id);
      }
      if (!checkboxStatus) {
        vm.applyParams.attachmentIds = vm.applyParams.attachmentIds.filter(id => id !== r.id);
      }
      saveForm();
      validateForm();
    }

    function apply() {
      vm.applyStatus = true;
      if (!validateForm()) {
        vm.resumeAnimationStatus = false;
        $timeout(() => {
          vm.resumeAnimationStatus = true;
        }, 200);
        return;
      }
      if (!vm.applyParams.title) {
        return;
      }
      vm.loading = true;
      userService.apply(buildCondition())
        .then(() => {
          vm.loading = false;
          $uibModalInstance.close();
        })
        .catch((error) => {
          vm.loading = false;
          console.error(error);
          $uibModalInstance.close();
        });
    }

    function getParamsFromSession() {
      const sessionParams = sessionStorage.getItem('applyParams');
      const sessionPrefix = sessionStorage.getItem('applyParamsPrefix');
      if (sessionParams) {
        vm.applyParams = JSON.parse(sessionParams);
      }
      if (sessionPrefix) {
        vm.selectedPrefix = JSON.parse(sessionPrefix);
      }
      checkResumeArray(vm.resumeArray, vm.applyParams.attachmentIds);
    }

    function checkResumeArray(resumes, ids) {
      vm.applyParams.attachmentIds = ids
        .filter(id => resumes.some(r => r.id === id));
      vm.resumeArray = resumes.map((r) => {
        if (ids.some(id => id === r.id)) {
          r.checked = true;
        }
        return r;
      });
    }

    function validateForm() {
      if (!vm.init) {
        saveForm();
      } else {
        // getParamsFromSession();
        vm.init = false;
      }
      if (!vm.applyStatus) return false;
      if (vm.applyParams.title && vm.applyParams.title.length >= 60) {
        vm.paramsStatus.title = false;
      } else {
        vm.paramsStatus.title = true;
      }
      if (!vm.applyParams.attachmentIds.length) {
        vm.paramsStatus.resume = false;
      } else {
        vm.paramsStatus.resume = true;
      }
			if (vm.applyParams.email && !vm.emailReg.test(vm.applyParams.email)) {
        vm.paramsStatus.email = false;
      } else {
				vm.paramsStatus.email = true;
			}
			if (!vm.applyParams.email) {
        vm.paramsStatus.email = false;
      }
			if (vm.applyParams.email && vm.applyParams.email.split('@').length > 2) {
        vm.multiple = true;
			} else {
				vm.multiple = false;
			}
      if (
        vm.applyParams.mobile &&
        ((vm.selectedPrefix.name !== '中国' && !/^\d+$/.test(vm.applyParams.mobile)) ||
          (vm.selectedPrefix.name === '中国' && !/^1[34578]{1}\d{9}$/.test(vm.applyParams.mobile)))
      ) {
        vm.paramsStatus.mobile = false;
      } else {
        vm.paramsStatus.mobile = true;
      }
      if (vm.paramsStatus.email &&
        vm.paramsStatus.resume &&
        vm.paramsStatus.title &&
        vm.paramsStatus.mobile &&
        vm.applyParams.mobile
      ) {
        return true;
      }
      return false;
    }

    function buildCondition() {
      const params = Object.assign({}, vm.applyParams);
      if (vm.selectedPrefix) {
        params.prefixId = vm.selectedPrefix.id;
      }
      return params;
    }

    function gotoPreview(resume) {
      const pathUrl = `/resumes/${resume.fileId}/preview?fileName=${encodeURIComponent(resume.originalName)}`;
      window.open(pathUrl, '_blank');
    }

    function uploadResume(files) {
      if (!files || !files.length) {
        return;
      }
      const size = 4 * 1024 * 1024;
      if (files[0].size > size) {
        vm.filerErrorModalStatus = true;
        return;
      }
      const fileNameReg = /(.doc)|(.pdf)/;
      if (!fileNameReg.test(files[0].name) || !/.\../.test(files[0].name)) {
        vm.filerErrorModalStatus = true;
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
          createAtta(resume);
        })
        .catch((error) => {
          vm.loading = false;
          console.error('uploadResume error: ', error);
        });
    }

    function deleteResume(attachment) {
      const params = {
        userId: $USER.id,
        attachmentId: attachment.id,
      };
      userService.deleteAttachment(params)
        .then(() => {
          vm.resumeArray = vm.resumeArray.filter(r => r.fileId !== attachment.fileId);
          vm.applyParams.attachmentIds = vm.applyParams.attachmentIds
            .filter(id => id !== attachment.id);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function getUserResume() {
      const params = {
        userId: $USER.id,
      };
      userService.getUserAttachments(params)
        .then((result) => {
          checkResumeArray(result, vm.applyParams.attachmentIds);
          getLastApplyInfo();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function createAtta(resume) {
      const params = {
        userId: $USER.id,
        fileId: resume.id,
        originalName: resume.originalName,
        type: 'resume',
        createdBy: $USER.id,
      };
      return userService.create(params)
        .then((result) => {
          if (vm.applyParams.attachmentIds.length >= 2) {
            result.checked = false;
          } else {
            result.checked = true;
            vm.applyParams.attachmentIds.push(result.id);
          }
          vm.resumeArray.push(result);
          validateForm();
          return result;
        });
    }

    function getPrefixList() {
      mobilePrefixService.getPrefixList()
        .then((result) => {
          vm.prefixArray = result;
          vm.selectedPrefix = vm.prefixArray
            .filter(p => Number(p.id) === Number(vm.selectedPrefix))[0];
        })
        .catch(error => console.error(error));
    }
  }
})();
