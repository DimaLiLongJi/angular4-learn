(function () {
  angular.module('App')
    .component('locationFilter', {
      templateUrl: '/gadgets/location_filter/template.html',
      controller: locationFilterCtrl,
      controllerAs: 'vm',
      bindings: {
        selectedLocation: '=',
        flag: '=',
      },
    });

    locationFilterCtrl.$inject = [
      '$scope',
      'opportunityService'
    ];


    function locationFilterCtrl(
      $scope,
      opportunityService
    ) {
      const vm = this;// jshint ignore: line

      vm.locationList = [{
        name: '不限',
      }];

      vm.selectLocation = selectLocation;

      $scope.$watch('vm.selectedLocation', (n, o) => {
        if (n === o) return;
        const flag = vm.locationList.filter(l => l.name === n.name).length;
        if (!flag && n) {
          vm.locationList[vm.locationList.length - 1] = vm.selectedLocation;
        }
      });

      opportunityService.getLocationList({ limit: 12, })
        .then((result) => {
          vm.locationList = vm.locationList.concat(result);
        });

      function selectLocation(location) {
        if (location.name === '不限') {
          vm.selectedLocation = {
            name: '不限',
          };
        } else {
          vm.selectedLocation = location;
        }
      }
    }
}());
