(() => {
  angular.module('App', [
    'ngCookies',
    'ngResource',
    'ui.bootstrap'
  ]).run();

  angular.module('App')
    .controller('industryInterviewMaterialCtrl', industryInterviewMaterialCtrl);

  industryInterviewMaterialCtrl.$inject = [
    '$USER',
    '$uibModal',
    'IndustryList',
    'materialService',
    'CF_FILE_BASE_URL'
  ];

  function industryInterviewMaterialCtrl(
    $USER,
    $uibModal,
    IndustryList,
    materialService,
    CF_FILE_BASE_URL
  ) {
    const vm = this;
    vm.user = $USER;
    vm.CF_FILE_BASE_URL = CF_FILE_BASE_URL;
    vm.industryArray = IndustryList;
    vm.industryId = location.pathname.match(/\/(\d+)/)[1];
    vm.searchMaterialsArray = [];
    vm.searchTipsArray = [];
    vm.tipArray = [];
    vm.hotCompanyMaterial = [];
    vm.moreCompanyMaterial = [];
    vm.hotCompanyArray = [];
    vm.params = {
      keyword: '',
      pageNum: 1,
      materialTotalItems: 0,
      itemsPerPage: 20,
      industryId: vm.industryId,
    };
    vm.moreCompanyPageParams = {
      industryId: vm.industryId,
      notHot: 1,
      pageNum: 1,
      itemsPerPage: 10,
      totalItems: 0,
    };
    vm.hotCompanyPageParams = {
      industryId: vm.industryId,
      pageNum: 1,
      itemsPerPage: 5,
      totalItems: 0,
    };
    vm.selectCompanyId = null;
    vm.currentIndustry = IndustryList
    .filter(indu => Number(indu.id) === Number(vm.industryId))[0];
    vm.bannerStyle = {
      background: `url("/images/interview-material/industry_banner/${vm.currentIndustry.id}.jpg") no-repeat center`,
    };

    vm.getHotCompanyMaterial = getHotCompanyMaterial;
    vm.openLoginModal = openLoginModal;
    vm.pageChanged = pageChanged;
    vm.gotoPreview = gotoPreview;
    vm.download = download;
    vm.search = search;

    activate();

    function activate() {
      let sessionParams = sessionStorage.getItem('industry_interview_materialParams');

      if (sessionParams) {
        sessionParams = JSON.parse(sessionParams);
        sessionStorage.removeItem('industry_interview_materialParams');
        vm.params = sessionParams.params;
        vm.moreCompanyPageParams = sessionParams.moreCompanyPageParams;
        vm.hotCompanyPageParams = sessionParams.hotCompanyPageParams;
        search();
      }
      getMaterialList({
        industryId: vm.industryId,
      })
      .then((result) => {
        vm.tipArray = addDownloadToProperty(result.tips.items);
      });
      getMaterialList(vm.moreCompanyPageParams)
      .then((result) => {
        vm.moreCompanyMaterial = addDownloadToProperty(result.material.items);
        vm.moreCompanyPageParams.totalItems = result.material.totalItems;
      });
      getHotCompany(vm.industryId);
    }

    function search() {
      const params = Object.assign({}, vm.params);
      getMaterialList(params)
        .then((result) => {
          console.log('result', result);
          vm.searchMaterialsArray = result.material.items;
          vm.params.materialTotalItems = result.material.totalItems;
          vm.searchTipsArray = result.tips.items;
        });
    }

    function pageChanged(type) {
      if (type === 'hotCompanyMaterial') {
        getHotCompanyMaterial(vm.selectCompanyId);
      }

      if (type === 'moreCompany') {
        getMoreCompanyMaterial();
      }

      if (type === 'search') {
        search();
      }
    }

    function gotoPreview(material) {
      if (!material) return;
      materialService.countViewMaterial(material.id);
      const pathUrl =
        `/materials/${material.fileId}/preview?fileName=${encodeURIComponent(material.fileName)}&hd=1`;
      window.open(pathUrl, '_blank');
    }

    function getMoreCompanyMaterial() {
      const params = Object.assign({}, vm.moreCompanyPageParams);
      getMaterialList(params)
      .then((result) => {
        vm.moreCompanyMaterial = addDownloadToProperty(result.material.items);
        vm.moreCompanyPageParams.totalItems = result.material.totalItems;
      });
    }

    function getHotCompanyMaterial(id, type) {
      vm.selectCompanyId = id;
      if (type) {
        vm.hotCompanyPageParams.pageNum = 1;
      }
      const params = Object.assign({}, vm.hotCompanyPageParams);
      params.companyId = id;
      delete params.totalItems;
      getMaterialList(params)
      .then((result) => {
        vm.hotCompanyMaterial = addDownloadToProperty(result.material.items);
        vm.hotCompanyPageParams.totalItems = result.material.totalItems;
      })
      .catch(error => console.error(error));
    }

    function getMaterialList(params) {
      return materialService.getMaterials(params);
    }

    function addDownloadToProperty(array) {
      return array.map((item) => {
        item.download = `${vm.CF_FILE_BASE_URL}/${item.fileId}?originalName=${encodeURIComponent(item.fileName)}&download=1`;
        return item;
      });
    }


    function getHotCompany(id) {
      materialService.getHotCompany({
        industryId: id,
      })
      .then((result) => {
        const companyArray = result.items
        .map((c) => {
          // 这是暂时的，上线初期，初始值比较大
          if (c.downloadCount > 300) {
            c.downloadCount -= 200;
          }
          return c;
        });
        groupingHotCompany(companyArray);
        if (companyArray[0]) {
          vm.selectCompanyId = companyArray[0].id;
          vm.hotCompanyPageParams.pageNum = 1;
          getHotCompanyMaterial(vm.selectCompanyId);
        }
      });
    }

    function groupingHotCompany(array) {
      if (!array.length) return;
      let temp = [];
      if (array.length <= 3) {
        vm.hotCompanyArray.push(array);
        return;
      }
      array.forEach((item, index) => {
        temp.push(item);
        if (temp.length === 3 || index === array.length - 1) {
          vm.hotCompanyArray.push(temp);
          temp = [];
        }
      });
    }

    function download(material) {
      if (!vm.user) {
        saveStatus();
        openLoginModal(location.pathname.replace(/^\/?/, ''));
        return;
      }
      window.location.href = material.download;
      materialService.countDownloadMaterial(material.id);
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
      sessionStorage.setItem('industry_interview_materialParams', JSON.stringify({
        params: vm.params,
        moreCompanyPageParams: vm.moreCompanyPageParams,
        hotCompanyPageParams: vm.hotCompanyPageParams,
      }));
    }
  }
})();
