  import './style.less';

  export default angular.module('App').controller('feedbackCtrl', feedbackCtrl);

  feedbackCtrl.$inject = [
    'fileService',
    'userService',
    '$timeout',
    'feedbackService',
    'CF_FILE_BASE_URL'
  ];

  function feedbackCtrl(
    fileService,
    userService,
    $timeout,
    feedbackService,
    CF_FILE_BASE_URL
) {
    const vm = this;

    vm.attachments = [];
    vm.emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    vm.uploadImage = uploadImage;
    vm.deleteImage = deleteImage;
    vm.previewImage = previewImage;
    vm.submit = submit;
    vm.gotoAccount = gotoAccount;

    vm.$onInit = () => {
      if (!isUploadSupported()) {
        vm.noImageUpload = true;
      }
    };

    function isUploadSupported() {
      if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
        return false;
      }
      const elem = document.createElement('input');
      elem.type = 'file';
      return !elem.disabled;
    }

    function uploadImage(files, errFiles) {
      vm.errFile = errFiles && errFiles[0];
      console.log(files);
      if (files && files.length > 0) {
        files = files.slice(0, 3);
        angular.forEach(files, (file) => {
          file.progressArray = [];
          vm.attachments.push(file);

          fileService.upload([file]).then((response) => {
            $timeout(() => {
              file.result = response.data;
            });
          }, (response) => {
            if (response.status > 0) {
              console.error('upload err', `${response.status}: ${response.data}`);
              file.uploadFailed = true;
              file.progressArray.push(100);
            }
          }, (evt) => {
            file.progressArray.push(Math.min(100, parseInt(100.0 * evt.loaded / evt.total)))
          ;
          });
          updateProgress();
          function updateProgress() {
            setTimeout(() => {
              file.progress = file.progressArray.slice(-1).pop();
              if (!file.progress || file.progress < 100) {
                updateProgress();
              }
            }, 500);
          }
        });
      }
    }

    function deleteImage(index) {
      vm.attachments.splice(index, 1);
    }
    function previewImage(file) {
      vm.previewedImage = file;
      vm.showPreviewFlag = true;
    }

    function submit(form) {
      vm.submitted = true;
      if (!form.$valid) {
        return;
      }
      feedbackService.postFeedback({
        email: vm.email,
        comment: vm.comment,
        attachments: JSON.stringify(vm.attachments.map((attachment) => {
          if (attachment.result && attachment.result[0]) {
            const fileInfo = attachment.result[0];
            return `${CF_FILE_BASE_URL}/${fileInfo.id}?originalName=${encodeURIComponent(fileInfo.originalName)}`;
          }
          return '';
        })),
      })
      .then(() => {
        vm.feedbackSuccess = true;
      })
      .catch((err) => {
        console.error('post feedback err,', err);
        vm.feedbackSuccess = true;
      });
    }

    function gotoAccount() {
      window.location.href = '/mobile/account';
    }
  }
