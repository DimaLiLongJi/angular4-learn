(() => {
    angular.module('App')
    .controller('industryBaikeCtrl', industryBaikeCtrl)
    .value('duScrollOffset', 56);
    industryBaikeCtrl.$inject = [
      'discoveryService',
      '$state',
      '$sce',
      '$scope',
      'IndustryList',
    ];

    function industryBaikeCtrl(
      discoveryService,
      $state,
      $sce,
      $scope,
      IndustryList,
    ) {
      const vm = this;
      vm.industryId = Number($state.params.id);
      vm.mainCompany = [];
      vm.infoCategory = 'introduction';
      vm.bannerUrl = '';
      vm.switchInfo = switchInfo;
      activate();

      function activate() {
        getIndustryData();
        vm.industry = IndustryList.find(i => i.id === Number(vm.industryId));
      }

      function switchInfo(category) {
        vm.infoCategory = category;
      }

      function getIndustryData() {
        const params = {
          industryId: vm.industryId,
        };
        Promise.all([
          discoveryService.getIntroductionOfIndustry(params),
          discoveryService.getMainCompanyOfIndustry(params),
          discoveryService.getPositionsOfIndustry(params)
        ])
        .then((result) => {
          vm.intro = $sce.trustAsHtml(result[0].intro);
          vm.mainCompany = result[1].industryCompanies;
          vm.positionArray = result[2].industryPositions
          .map((p) => {
            p.desc = $sce.trustAsHtml(p.desc);
            return p;
          });
          $scope.$apply();
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }
})();
