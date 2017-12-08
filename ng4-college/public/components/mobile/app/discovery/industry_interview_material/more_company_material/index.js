angular.module('App').component('moreMaterial', {
	templateUrl: '/components/mobile/app/discovery/industry_interview_material/more_company_material/template.html',
	controller: moreMaterialCtrl,
	controllerAs: 'vm',
	bindings: {
    industryId: '=',
    previewFile: '=',
	},
});

moreMaterialCtrl.$inject = [
  'CF_FILE_BASE_URL',
  'materialService'
];

function moreMaterialCtrl(
  CF_FILE_BASE_URL,
  materialService,
) {
	const vm = this;
	vm.$onInit = () => {
		vm.materialsArray = [];
		vm.params = {
      industryId: vm.industryId,
      notHot: 1,
      pageNum: 1,
      itemsPerPage: 100,
    };


		getMaterialList(vm.params);
	};

	function getMaterialList(params) {
		materialService.getMaterials(params).then((result) => {
			vm.materialsArray = result.material.items;
		});
	}
}
