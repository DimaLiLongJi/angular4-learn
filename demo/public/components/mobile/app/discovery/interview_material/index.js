(() => {
  angular.module('App')
    .controller('interviewMaterialCtrl', interviewMaterialCtrl);

  interviewMaterialCtrl.$inject = [
    'CF_FILE_BASE_URL',
    'materialService',
    '$cacheFactory',
    'IndustryList',
    '$document',
    '$state'
  ];

function interviewMaterialCtrl(
  CF_FILE_BASE_URL,
  materialService,
  $cacheFactory,
  IndustryList,
  $document,
  $state
) {
  const vm = this;
  vm.$onInit = () => {
    vm.IndustryList = IndustryList;
    if (vm.IndustryList.length === 8) {
      vm.IndustryList.splice(4, 0, {
        banner: '/images/interview_material_m/industry/center.png',
      });
    }
    vm.tipsArray = [];
    vm.totalTips = 0;
    vm.materialsArray = [];
    vm.totalMaterials = 0;
    vm.loadAllMaterial = false;
    vm.container = document.querySelector('.interview-material-container');
    vm.params = {
      keyword: '',
      pageNum: 1,
      itemsPerPage: 20,
    };
    vm.STORE = $cacheFactory.get('STORE');

    vm.openFilePreviewModal = openFilePreviewModal;
    vm.loadMoreMaterial = loadMoreMaterial;
    vm.viewIndustry = viewIndustry;
    vm.inputKeyword = inputKeyword;
    vm.serach = serach;

    activate();
  };

  function activate() {
    const status = vm.STORE.get('interviewMaterialStatus');

    if (!status) return;
    vm.params = status.params;
    vm.tipsArray = status.tipsArray;
    vm.totalTips = status.totalTips;
    vm.materialsArray = status.materialsArray;
    vm.totalMaterials = status.totalMaterials;
    vm.loadAllMaterial = status.loadAllMaterial;
    // request api, trigger keep-scroll-pos-container.
    materialService.getMaterials(vm.params);
  }

  function inputKeyword() {
    vm.params.pageNum = 1;
    vm.loadAllMaterial = false;
    serach();
  }

  function serach() {
    const params = Object.assign({}, vm.params);
    getList(params);
  }

  function openFilePreviewModal(material) {
    // saveStatus();
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

  function loadMoreMaterial() {
    if (vm.loadAllMaterial) return;
    vm.params.pageNum++;
    const params = Object.assign({}, vm.params);
    getList(params, 'scroll');
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
      saveStatus();
    })
    .catch(error => console.error(error));
  }

  function viewIndustry(id) {
    if (!id) return;
    $state.go('discovery.industry_interview_material', { id, });
  }

  function saveStatus() {
    const params = {
      params: Object.assign({}, vm.params),
      tipsArray: vm.tipsArray,
      totalTips: vm.totalTips,
      materialsArray: vm.materialsArray,
      totalMaterials: vm.totalMaterials,
      loadAllMaterial: vm.loadAllMaterial,
    };
    vm.STORE.put('interviewMaterialStatus', params);
  }
}
})();
