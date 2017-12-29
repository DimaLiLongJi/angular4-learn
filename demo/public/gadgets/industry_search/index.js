(() => {
  angular.module('App')
    .component('industrySearch', {
      templateUrl: '/gadgets/industry_search/template.html',
      controller: industrySearchCtrl,
      controllerAs: 'vm',
      bindings: {
        selectedIndustry: '=',
        limit: '@',
        onSearch: '&',
      },
    });
  industrySearchCtrl.$inject = [
    'industryService',
  ];

  function industrySearchCtrl(
    industryService,
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.industryArray = [];
      vm.minLimit = 8;
      vm.maxLimit = 8;
      vm.limit = Number(vm.limit);
      // function
      vm.toggle = toggle;
      vm.selectIndutryTag = selectIndutryTag;
    };

    function toggle() {
      vm.limit = Number(vm.limit) === vm.minLimit ? vm.maxLimit : vm.minLimit;
    }

    function selectIndutryTag(selectedIndustry) {
      vm.selectedIndustry = selectedIndustry;
      vm.onSearch({ selectedIndustry, });
    }

    industryService.getList()
      .then((result) => {
        vm.industryArray = result;
        vm.industryArray.unshift({
          name: '不限',
          category: 'industry',
          id: 0,
        });
        vm.maxLimit = vm.industryArray.length;
      })
      .catch((error) => {
        console.error(error);
      });
  }
})();
