(() => {
	angular.module('App').component('locationSelector', {
		templateUrl: '/gadgets/location_selector/template.html',
		controller: locationSelectorCtrl,
		controllerAs: 'vm',
		bindings: {
			selectedLocation: '=',
		},
	});
	locationSelectorCtrl.$inject = ['opportunityService', 'locationTagService'];

	function locationSelectorCtrl(opportunityService, locationTagService) {
		const vm = this;

		vm.$onInit = () => {
			vm.locationList = [
				{
					name: '不限',
				}
			];
			vm.selectedLocation = vm.selectedLocation || {
				name: '不限',
			};
      vm.moreLocation = false;

			vm.selectLocation = selectLocation;
			vm.selectCountry = selectCountry;
			vm.toggleMoreLocation = toggleMoreLocation;
			vm.selectProvince = selectProvince;

			getHotLocationList();
			getLocationTagList();
		};

		function selectLocation(location) {
			vm.selectedLocation = location;
		}

    function selectProvince(province) {
      if (vm.locationList.some(l => l.id === province.id)) {
        vm.selectedLocation = province;
      } else {
        vm.selectedLocation = province;
        vm.locationList[vm.locationList.length - 1] = province;
      }
    }

    function selectCountry(c, event) {
      event.stopPropagation();
      // vm.provinceList = [c];
      vm.selectedCountry = c;
      vm.provinceList = {
        cityByGroup: c.cityByGroup,
        cityGroup: c.cityGroup,
      };
    }

    function toggleMoreLocation() {
      vm.moreLocation = !vm.moreLocation;
    }

		function getHotLocationList() {
			opportunityService.getLocationList({limit: 12}).then((result) => {
				vm.locationList = vm.locationList.concat(result);
			});
		}
		function getLocationTagList() {
			Promise.all([locationTagService.getLocationTagList(), opportunityService.getLocationList()]).then((result) => {
				const allLocationTag = result[0];
				const countOopLocation = result[1];
				let temp = null;
				const list = countOopLocation.map((location) => {
					temp = allLocationTag.filter(allLocation => allLocation.id === location.id)[0];
					if (temp) {
						return {id: temp.id, initial: temp.initial, name: temp.name, parentId: temp.parentId, count: location.count};
					}
				});
				allLocationTag.forEach((l) => {
					if (l.parentId === -1) {
						list.push({name: l.name, initial: l.initial, parentId: l.id, id: l.id, count: 10000000});
					}
				});
				const countries = allLocationTag.filter(location => location.parentId === -1).map((country) => {
					country.cityGroup = [];
					country.cityByGroup = [];

					country.cityByGroup[0] = sortByCount(/[a-g, A-G]/, list, country);
					country.cityByGroup[1] = sortByCount(/[h-n, H-N]/, list, country);
					country.cityByGroup[2] = sortByCount(/[o-t, O-T]/, list, country);
					country.cityByGroup[3] = sortByCount(/[u-z, U-Z]/, list, country);

					if (country.cityByGroup[0].length > 0) {
						country.cityGroup.push(extractInitialForGroup(country.cityByGroup[0]));
					}
					if (country.cityByGroup[1].length > 0) {
						country.cityGroup.push(extractInitialForGroup(country.cityByGroup[1]));
					}
					if (country.cityByGroup[2].length > 0) {
						country.cityGroup.push(extractInitialForGroup(country.cityByGroup[2]));
					}
					if (country.cityByGroup[3].length > 0) {
						country.cityGroup.push(extractInitialForGroup(country.cityByGroup[3]));
					}
					country.cityByGroup = country.cityByGroup.filter(cityArr => cityArr.length > 0);

					return country;
				});
				vm.allLocationTag = countries;
        vm.selectedCountry = vm.allLocationTag.filter(c => c.name === '中国')[0];
				vm.provinceList = vm.allLocationTag.filter(c => c.name === '中国');
        vm.provinceList = {
          cityByGroup: vm.selectedCountry.cityByGroup,
          cityGroup: vm.selectedCountry.cityGroup,
        };
			});
		}
		function extractInitialForGroup(array) {
			return array.map(p => p.initial).sort((a, b) => {
				if (a > b) {
					return 1;
				}
				if (a < b) {
					return -1;
				}
				return 1;
			}).filter((currentValue, index, arr) => currentValue !== arr[index + 1]).join(' ');
		}
		function sortByCount(reg, list, country) {
			let countA,
				countB;
			const arr = list.filter(l => reg.test(l.initial) && l.parentId === country.id).sort((a, b) => {
				countA = a.count;
				countB = b.count;
				if (countA <= countB) {
					return 1;
				}
				return -1;
			});
			return arr;
		}
	}
})();
