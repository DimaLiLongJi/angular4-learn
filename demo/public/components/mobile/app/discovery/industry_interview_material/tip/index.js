angular.module('App')
.component('materialTip', {
	templateUrl: '/components/mobile/app/discovery/industry_interview_material/tip/template.html',
	controller: materialTipCtrl,
	controllerAs: 'vm',
	bindings: {
    industryId: '=',
    previewFile: '=',
	},
});

materialTipCtrl.$inject = [
  'CF_FILE_BASE_URL',
  'materialService'
];

function materialTipCtrl(
  CF_FILE_BASE_URL,
  materialService,
) {
  const vm = this;
  vm.$onInit = () => {
    vm.tipsArray = [];

    getMaterialList({
      industryId: vm.industryId,
    });
  };

  function getMaterialList(params) {
    materialService.getMaterials(params)
    .then((result) => {
      vm.tipsArray = result.tips.items;
    });
  }
}
