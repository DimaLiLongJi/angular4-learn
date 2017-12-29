(() => {
  angular.module('App', [
    'ngCookies',
    'ngResource',
    'ui.bootstrap'
  ]).run();

  angular.module('App')
    .controller('interviewMaterialCtrl', interviewMaterialCtrl);

  interviewMaterialCtrl.$inject = [
    '$USER',
    '$uibModal',
    'IndustryList',
    'materialService',
    'CF_FILE_BASE_URL'
  ];

  function interviewMaterialCtrl(
    $USER,
    $uibModal,
    IndustryList,
    materialService,
    CF_FILE_BASE_URL
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.user = $USER;
      vm.industryArray = IndustryList;
      vm.CF_FILE_BASE_URL = CF_FILE_BASE_URL;
      vm.materialsArray = [];
      vm.tipsArray = [];
      vm.params = {
        keyword: '',
        pageNum: 1,
        itemsPerPage: 20,
      };
      vm.totalMaterials = 0;
      vm.materialTotalPages = 0;
      vm.totalTips = 0;
      vm.search = search;
      vm.pageChanged = pageChanged;
      vm.gotoPreview = gotoPreview;
      vm.download = download;
      vm.viewIndustry = viewIndustry;

      activate();
    };

    function activate() {
      const sessionParams = sessionStorage.getItem('interview_materialParams');
      if (sessionParams) {
        vm.params = JSON.parse(sessionParams);
        sessionStorage.removeItem('interview_materialParams');
        search();
      }
    }

    function viewIndustry(industry) {
      window.location = `/interview_material/${industry.id}`;
    }

    function gotoPreview(material) {
      if (!material) return;
      materialService.countViewMaterial(material.id);
      const pathUrl =
        `/materials/${material.fileId}/preview?fileName=${encodeURIComponent(material.fileName)}&hd=1`;
      window.open(pathUrl, '_blank');
    }

    function download(material, event) {
      // 下载权限
      if (!vm.user) {
        event.stopPropagation();
        saveStatus();
        openLoginModal(location.pathname.replace(/^\/?/, ''));
        return;
      }
      window.location.href = material.download;
      materialService.countDownloadMaterial(material.id);
    }

    function search(type) {
      if (type) {
        vm.params.pageNum = 1;
      }
      const params = Object.assign({}, vm.params);
      getList(params);
    }

    function pageChanged() {
      search();
    }

    function getList(params) {
      materialService.getMaterials(params)
      .then((result) => {
        console.log(result);
        vm.tipsArray = result.tips.items
        .map((item) => {
          item.download = `${vm.CF_FILE_BASE_URL}/${item.fileId}?originalName=${encodeURIComponent(item.fileName)}&download=1`;
          return item;
        });
        vm.totalTips = result.tips.totalItems;

        vm.materialsArray = result.material.items
        .map((item) => {
          item.download = `${vm.CF_FILE_BASE_URL}/${item.fileId}?originalName=${encodeURIComponent(item.fileName)}&download=1`;
          return item;
        });
        vm.totalMaterials = result.material.totalItems;
        vm.materialTotalPages = Math.ceil(vm.totalMaterials / vm.params.itemsPerPage);
      })
      .catch(error => console.error(error));
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

    function saveStatus() {
      sessionStorage.setItem('interview_materialParams', JSON.stringify(vm.params));
    }
  }
})();
