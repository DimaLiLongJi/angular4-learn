  import './style.less';
  
  export default angular.module('App').controller('applyCtrl', applyCtrl);

  applyCtrl.$inject = [
    '$USER',
    'userService',
    '$state',
    '$stateParams',
    '$scope',
    'mobilePrefixService',
    '$location',
    'BASE_URL',
    '$timeout'
  ];

  function applyCtrl(
    $USER,
    userService,
    $state,
    $stateParams,
    $scope,
    mobilePrefixService,
    $location,
    BASE_URL,
    $timeout
  ) {
    const vm = this;
    if (!$USER || !$USER.id) {
      window.location.href = `${BASE_URL}/opportunity/${$stateParams.opportunityId}`;
    }
    vm.$onInit = () => {
      vm.noResume = false;
      vm.applySuccess = false;
      vm.copyed = false;
      vm.emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      vm.mobileReg = /^1[34578]{1}\d{9}$/;
      vm.pasteUrl = $stateParams.pasteUrl || `${BASE_URL}/opportunity/${$stateParams.opportunityId}`;
      vm.isUKTour = $stateParams.pasteUrl;
      vm.resumeAnimationStatus = true;
      vm.attachmentIds = [];

      vm.toggleResume = toggleResume;
      vm.goBack = goBack;
      vm.submit = submit;
      vm.selectPrefix = selectPrefix;
      vm.copyLink = copyLink;
      vm.saveParamsToSession = saveParamsToSession;

      vm.prefix = JSON.parse(sessionStorage.getItem('selectPrefix'));
      vm.applyParams = JSON.parse(sessionStorage.getItem('applyParams'));
      sessionStorage.clear('selectPrefix');
      if (!vm.prefix) {
        vm.prefix = {
          enName: 'China',
          id: 1,
          name: '中国',
          value: '86',
        };
      }
      if (vm.applyParams && vm.applyParams.title) {
        vm.title = vm.applyParams.title;
      }
      if (vm.applyParams) {
        for (let key in vm.applyParams) {
          vm[key] = vm.applyParams[key];
        }
      }
      sessionStorage.clear('applyParams');

      Promise.all([
        getResumeList(),
        getLatestInfo()
      ]).then(() => {
        vm.attachmentIds = vm.attachmentIds
          .filter(id => vm.resumeList.some(r => r.id === id));

        vm.resumeList.forEach((r) => {
          if (vm.attachmentIds.some(id => id === r.id)) {
            r.checked = true;
          }
        });
      });
    };

    function copyLink() {
      vm.copyed = true;
    }

    $scope.$watch('vm.prefix', (n) => {
      if (n && n.name === '中国') {
        vm.mobileReg = /^1[34578]{1}\d{9}$/;
      } else {
        vm.mobileReg = /^\d+$/;
      }
    });
    function selectPrefix() {
      saveParamsToSession();
      $state.go('prefix');
    }

    function saveParamsToSession() {
      const params = {};
      if (vm.title) {
        params.title = vm.title;
      }
      if (vm.resume) {
        params.resume = vm.resume;
      }
      if (vm.email) {
        params.email = vm.email;
      }

      if (vm.mobile) {
        params.mobile = vm.mobile;
      }
      if (vm.attachmentIds.length) {
        params.attachmentIds = vm.attachmentIds;
      }
      sessionStorage.setItem('applyParams', JSON.stringify(params));
    }

    function getResumeList() {
      return userService.getUserAttachments({ userId: $USER.id, }).then((result) => {
        vm.resumeList = result;
        if (vm.resumeList.length <= 0) {
          vm.noResume = true;
        }
      }).catch((err) => {
        vm.noResume = true;
        console.error('get resume list failed', err);
      });
    }

    function getLatestInfo() {
      return userService.getLastApplyInfo($USER.id).then((result) => {
        if (result && !vm.applyParams) {
          vm.title = result.title;
          vm.email = result.email;
          if (result.attachmentId) {
            vm.resume = {
              id: result.attachmentId,
            };
            // vm.attachmentIds = [result.attachmentId];
          }
          if (result.attachmentIds && result.attachmentIds.length) {
            vm.attachmentIds = result.attachmentIds;
          }
          vm.mobile = result.mobile;
          if (result.prefixId) {
            getPrefixList(result.prefixId);
          }
        }
      });
    }

    function toggleResume(resume) {
      if (vm.attachmentIds.length >= 2 && !resume.checked) return;
      resume.checked = !resume.checked;
      if (resume.checked) {
        vm.attachmentIds.push(resume.id);
      } else {
        vm.attachmentIds = vm.attachmentIds.filter(id => id !== resume.id);
      }
    }

    function submit() {
      vm.submitted = true;
      if (vm.email && vm.email.split('@').length > 2) {
        vm.multiple = true;
        return;
      } else {
        vm.multiple = false;
      }
      if (!vm.resume || !vm.resume.originalName) {
        vm.resumeAnimationStatus = false;
				$timeout(() => {
          vm.resumeAnimationStatus = true;
				}, 1);
      }
      if (!vm.title || !vm.email || !vm.attachmentIds.length || vm.title.length > 60 ||
          !vm.emailReg.test(vm.email)
      ) {
        return;
      }
      if (vm.prefix.name !== '中国' && !/^\d+$/.test(vm.mobile)) {
        return;
      }
      if (vm.prefix.name === '中国' && !/^1[34578]{1}\d{9}$/.test(vm.mobile)) {
        return;
      }
      userService.apply({
        userId: $USER.id,
        title: vm.title,
        email: vm.email,
        mobile: vm.mobile,
        prefixId: vm.prefix.id,
        opportunityId: $stateParams.opportunityId,
        attachmentIds: vm.attachmentIds,
        // attachmentId: vm.resume.id,
      })
        .then(() => {
          vm.applySuccess = true;
        })
        .catch(() => {
          vm.applySuccess = true;
        });
    }

    function getPrefixList(prefix) {
      mobilePrefixService.getPrefixList()
        .then((result) => {
          vm.prefixArray = result;
          vm.prefix = vm.prefixArray
            .filter(p => Number(p.id) === Number(prefix))[0];
        })
        .catch(error => console.error(error));
    }

    function goBack() {
      window.history.back();
    }

    // function goBack() {
    //   const prevHistoryLen = localStorage.historyLen;
    //   if (prevHistoryLen) {
    //     localStorage.removeItem('historyLen');
    //     if (!document.referrer) {
    //       console.log(1, '没登陆，没简历');
    //       console.log('document.referrer', document.referrer);
    //       return;
    //       window.history.go(-1);
    //     } else {
    //       console.log(2);
    //       console.log('document.referrer', document.referrer);
    //       return;
    //       window.history.go(-3);
    //     }
    //   } else {
    //     console.log(3);
    //     console.log('document.referrer', document.referrer);
    //     return;
    //   window.history.back();
    //   }
    // }
  }
