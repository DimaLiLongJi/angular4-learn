(() => {
  angular.module('App')
    .controller('industryInterviewMaterialCtrl', industryInterviewMaterialCtrl);

  industryInterviewMaterialCtrl.$inject = [
    '$USER',
    '$state',
    '$scope',
    '$location',
    'IndustryList',
    'materialService',
    'CF_FILE_BASE_URL',
    '$cacheFactory'
  ];

function industryInterviewMaterialCtrl(
  $USER,
  $state,
  $scope,
  $location,
  IndustryList,
  materialService,
  CF_FILE_BASE_URL,
  $cacheFactory
) {
  const vm = this;
  vm.$onInit = () => {
    vm.user = $USER;
    vm.CF_FILE_BASE_URL = CF_FILE_BASE_URL;
    vm.toolBarFixed = false;
    vm.industryArray = IndustryList;
    vm.industryId = $location.$$url.match(/\/(\d+)/)[1];
    vm.currentIndustry = IndustryList
    .filter(indu => Number(indu.id) === Number(vm.industryId))[0];
    vm.bannerStyle = {
      background: `url("/images/interview_material_m/banner/${vm.currentIndustry.name_en.replace(' ', '')}.jpg") no-repeat center`,
    };

    vm.container = document.querySelector('.industry-interview-material-container');
    vm.STORE = $cacheFactory.get('STORE');
    vm.cachedData = vm.STORE.get('industryInterviewMaterialData');
    vm.params = {
      keyword: vm.cachedData && vm.cachedData.keyword,
      industryId: vm.industryId,
      pageNum: (vm.cachedData && vm.cachedData.pageNum) || 1,
      itemsPerPage: 20,
    };

    vm.openFilePreviewModal = openFilePreviewModal;
    vm.loadMoreMaterial = loadMoreMaterial;
    vm.enterSearch = enterSearch;
    vm.goBack = goBack;
    vm.search = search;

    activate();
  };
  const container = document.body.querySelector('.industry-interview-material-container');
  const htmlDom = angular.element(document).find('html');
  const htmlFontSize = htmlDom.css('font-size').slice(0, -2);
  let topValue = 0;

  function activate() {
    if (vm.cachedData) {
      vm.materialsArray = vm.cachedData.materialsArray;
      vm.loadAllMaterial = vm.cachedData.materialAllLoad;
      vm.tipsArray = vm.cachedData.tipsArray;
    } else {
      search();
    }
  }

  container.addEventListener('scroll', () => {
    topValue = container.scrollTop;
    if (topValue > 2.74 * htmlFontSize) {
      vm.toolBarFixed = true;
      $scope.$apply();
    } else {
      vm.toolBarFixed = false;
      $scope.$apply();
    }
  });

  function search() {
    const params = Object.assign({}, vm.params);
    getList(params);
  }

  function enterSearch(event) {
    if (event.keyCode !== 13) return;
    event.target.blur();
    search();
  }

  function loadMoreMaterial() {
    if (vm.loadAllMaterial) return;
    if (vm.params.keyword) {
      vm.params.pageNum++;
      const params = Object.assign({}, vm.params);
      getList(params, 'scroll');
    }
  }

  function getList(params, action) {
    materialService.getMaterials(params)
    .then((result) => {
      if (action === 'scroll') {
        vm.tipsArray = vm.tipsArray.concat(result.tips.items);
        vm.materialsArray = vm.materialsArray.concat(result.material.items);
      } else {
        vm.tipsArray = result.tips.items;
        vm.materialsArray = result.material.items;
      }
      vm.totalTips = result.tips.totalItems;
      vm.totalMaterials = result.material.totalItems;
      if (vm.materialsArray.length === vm.totalMaterials) {
        vm.loadAllMaterial = true;
      }
      vm.STORE.put('industryInterviewMaterialData', {
        tipsArray: vm.tipsArray,
        materialsArray: vm.materialsArray,
        pageNum: params.pageNum,
        materialAllLoad: vm.loadAllMaterial,
        keyword: vm.params.keyword,
      });
    })
    .catch(error => console.error(error));
  }

  function goBack() {
    window.history.back();
    // if (document.referrer) {
    //   window.history.back();
    // } else {
    //   location.href = '/';
    // }
  }

  function openFilePreviewModal(material) {
    saveStatus();
    countViewMaterial(material);
    material.viewCount++;
    $state.go('preview', {
      id: material.fileId,
      name: encodeURIComponent(material.fileName),
    });
  }

  function countViewMaterial(material) {
    materialService.countViewMaterial(material.id);
  }

  function saveStatus() {
    const params = Object.assign({}, vm.params);
    params.scrollTop = vm.container.scrollTop;
    sessionStorage.setItem('industryInterviewMaterialStatus', JSON.stringify(params));
  }
}
})();
