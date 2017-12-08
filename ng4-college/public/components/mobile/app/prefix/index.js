import './style.less';

 export default angular.module('App')
    .controller('prefixCtrl', prefixCtrl);

  prefixCtrl.$inject = ['mobilePrefixService'];

  function prefixCtrl(mobilePrefixService) {
    const vm = this;

    vm.$onInit = () => {
      getPrefixList();
    };

    vm.select = (p) => {
      sessionStorage.setItem('selectPrefix', JSON.stringify(p));
      window.history.back();
    };

    function getPrefixList() {
      mobilePrefixService.getPrefixList()
        .then((result) => {
          vm.prefixArray = result;
          vm.selectPrefix = vm.prefixArray
            .filter(p => Number(p.id) === Number(vm.prefix))[0];
        })
        .catch(error => console.error(error));
    }
  }
