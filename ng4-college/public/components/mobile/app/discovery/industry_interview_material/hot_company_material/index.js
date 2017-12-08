angular.module('App')
.component('hotCompanyMaterial', {
	templateUrl: '/components/mobile/app/discovery/industry_interview_material/hot_company_material/template.html',
	controller: hotCompanyMaterialCtrl,
	controllerAs: 'vm',
	bindings: {
    industryId: '=',
    previewFile: '=',
	},
});

hotCompanyMaterialCtrl.$inject = [
  'CF_FILE_BASE_URL',
  'materialService'
];

function hotCompanyMaterialCtrl(
  CF_FILE_BASE_URL,
  materialService
) {
  const vm = this;
  vm.$onInit = () => {
    vm.tipsArray = [];
    vm.hotCompanyArray = [];
    vm.hotCompanyMaterialsArray = [];
		vm.style = {
			transform: 'translateX(1.1rem)',
		};
		vm.currentCompanyIndex = 0;


    vm.swipeCompany = swipeCompany;

    getHotCompany(vm.industryId);
  };

	function swipeCompany(actionType) {
		if ((actionType === 'left' && vm.currentCompanyIndex === vm.hotCompanyArray.length - 1) ||
				(actionType === 'right' && !vm.currentCompanyIndex)) {
				return;
		}
		if (actionType === 'left') {
			vm.currentCompanyIndex++;
		} else {
			vm.currentCompanyIndex--;
		}
		vm.style.transform = `translateX(${1.1 - (vm.currentCompanyIndex * 7.8)}rem)`;
		getHotCompanyMaterial(vm.hotCompanyArray[vm.currentCompanyIndex].id);
	}

  function getMaterialList(params) {
    return materialService.getMaterials(params);
  }

  function getHotCompany(id) {
    materialService.getHotCompany({
      industryId: id,
    })
    .then((result) => {
      vm.hotCompanyArray = result.items
      .map((c) => {
        // 这是暂时的，上线初期，初始值比较大
        if (c.downloadCount > 300) {
          c.downloadCount -= 200;
        }
        return c;
      });
      if (!vm.hotCompanyArray.length) return;
      getHotCompanyMaterial(vm.hotCompanyArray[0].id);
    });
  }

  function getHotCompanyMaterial(id) {
    const params = {
      companyId: id,
      industryId: vm.industryId,
      itemsPerPage: 100,
      pageNum: 1,
    };
    getMaterialList(params)
    .then((result) => {
			vm.hotCompanyMaterialsArray = result.material.items;
    })
    .catch(error => console.error(error));
  }
}
