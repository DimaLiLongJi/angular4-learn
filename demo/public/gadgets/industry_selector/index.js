(() => {
	angular.module('App').component('industrySelector', {
		templateUrl: '/gadgets/industry_selector/template.html',
		controller: industrySelectorCtrl,
		controllerAs: 'vm',
		bindings: {
			selectedIndustry: '=',
		},
	});
	industrySelectorCtrl.$inject = ['industryService'];

	function industrySelectorCtrl(industryService) {
		const vm = this;

		vm.$onInit = () => {
			vm.moreIndustry = false;
			vm.selectedIndustry = vm.selectedIndustry || {
				name: '不限',
				category: 'industry',
				id: 0,
			};

			vm.toggleMoreIndustry = toggleMoreIndustry;
			vm.selectIndustry = selectIndustry;

			getIndustryList();
		};

		function toggleMoreIndustry() {
			vm.moreIndustry = !vm.moreIndustry;
		}

		function selectIndustry(industry) {
			vm.selectedIndustry = industry;
		}

		function getIndustryList() {
			industryService.getList()
			.then((result) => {
				vm.industryArray = result;
				vm.industryArray.unshift({
					name: '不限',
					category: 'industry',
					id: 0,
				});
			})
			.catch((error) => {
				console.error(error);
			});
		}
	}
})();
