(() => {
  angular.module('App')
    .component('cfcarousel', {
      templateUrl: '/gadgets/cf_carousel/template.html',
      controller: cfcarouselCtrl,
      controllerAs: 'vm',
      bindings: {
        list: '=',
        companyId: '=',
        selectcompanycallbcak: '&',
      },
    });
  cfcarouselCtrl.$inject = [

  ];

  function cfcarouselCtrl(
  ) {
    const vm = this;
    vm.$onInit = () => {
      vm.hotCompany = vm.list;
      vm.sectionNum = 0;
      vm.carouselStyle = {
        left: 0,
      };
      vm.selectedMaterial = '0.0';

      vm.swip = swip;
      vm.selectCompany = selectCompany;

      // activate();
    };

    // function activate() {
    //   console.log(vm.hotCompany);
    //   // selectCompany(vm.hotCompany[0][0], 0, 0);
    // }

    function swip(action) {
      if ((action === 'left' && vm.sectionNum === 0) ||
          (action === 'right' && vm.sectionNum === vm.hotCompany.length - 1)
      ) {
        return;
      }
      if (action === 'left') {
        vm.sectionNum--;
      } else {
        vm.sectionNum++;
      }
      vm.selectedMaterial = `${vm.sectionNum}.0`;
      vm.carouselStyle.left = `-${1020 * vm.sectionNum}px`;
      vm.companyId = vm.hotCompany[vm.sectionNum][0].id;
      if (vm.selectcompanycallbcak) {
        vm.selectcompanycallbcak(vm.hotCompany[vm.sectionNum][0]);
      }
    }

    function selectCompany(material, parentIndex, index) {
      vm.selectedMaterial = `${parentIndex}.${index}`;
      if (vm.selectcompanycallbcak) {
        vm.selectcompanycallbcak({ id: material.id, type: 're', });
      }
    }
  }
})();
