(() => {
  angular.module('App').component('opportunitySearch', {
    templateUrl: '/gadgets/opportunity_search/template.html',
    controller: opportunitySearchCtrl,
    controllerAs: 'vm',
    bindings: {
      opportunityCategory: '@',
      selectedCategory: '=?',
      selectedIndustry: '=',
      selectedLocation: '=',
      listStatus: '=',
      callBack: '&',
    },
  });
  opportunitySearchCtrl.$inject = [
    'opportunityService',
    'locationTagService',
    'tagService',
    '$timeout',
    '$scope'
  ];

  function opportunitySearchCtrl(
    opportunityService,
    locationTagService,
    tagService,
    $timeout,
    $scope
  ) {
    const vm = this;
    vm.listStatus = {
      category: false,
      location: false,
      industry: false,
    };
    vm.selectedCategory = {
      id: 0,
      name: '默认不限',
      category: 'all',
    };
    vm.selectedIndustry = {
      id: 0,
      name: '不限',
      category: 'all',
    };
    vm.selectedLocation = {
      id: 0,
      name: '不限',
      category: 'all',
    };
    vm.selectedCountry = {
      id: 1000,
      initial: 'Q',
      name: '全国',
    };
    vm.otherLocationListStatus = false;
    vm.categoryArray = [];
    vm.industryArray = [];
    vm.showCategoryList = showCategoryList;
    vm.closeList = closeList;
    vm.toggleMoreLocation = toggleMoreLocation;
    vm.tagCountry = tagCountry;
    vm.selectProvince = selectProvince;
    vm.selectTag = selectTag;

    vm.$onInit = () => {
      getCategoryList();
      getIndustryStatistics({
        type: 0,
      });
      getHotLocantonList();
      getLocationTagList();
    };

    function selectTag(tag, type) {
      let timer = null;
      if (type === 'category') {
        vm.selectedCategory = tag;
      }
      if (type === 'industry') {
        vm.selectedIndustry = tag;
      }
      if (type === 'location') {
        vm.selectedLocation = tag;
      }
      vm.listStatus = {
        category: false,
        location: false,
        industry: false,
      };
      timer = $timeout(() => {
        vm.callBack();
        $timeout.cancel(timer);
      }, 100);
    }

    function selectProvince(province) {
      vm.selectedLocation = province;
      vm.otherLocationListStatus = !vm.otherLocationListStatus;
      if (!vm.hotLocationArray.filter(hl => hl.id === province.id).length) {
        vm.hotLocationArray[vm.hotLocationArray.length - 1] = province;
      }
      selectTag(province, 'location');
    }

    function tagCountry(c) {
      vm.selectedCountry = c;
      vm.provinceList = [c];
    }

    function toggleMoreLocation() {
      vm.otherLocationListStatus = !vm.otherLocationListStatus;
    }

    function closeList(event) {
      event.stopPropagation();
      if (event.target.className !== 'wrap') return;
      for (const key in vm.listStatus) {
        vm.listStatus[key] = false;
      }
    }

    function showCategoryList(list) {
      for (const key in vm.listStatus) {
        if (key === list) {
          vm.listStatus[key] = !vm.listStatus[list];
        } else {
          vm.listStatus[key] = false;
        }
      }
    }

    // init get list
    function getHotLocantonList() {
      opportunityService.getLocationList({
        limit: 11,
      }).then((result) => {
        vm.hotLocationArray = result;
        vm.hotLocationArray.unshift({
          id: 0,
          name: '不限',
        });
      });
    }

    function getCategoryList() {
      tagService.getTagList('opportunity_category').then((result) => {
        vm.categoryArray = result.map((cate) => {
          if (/实习/.test(cate.name)) {
            cate.category = 'intern';
          } else {
            cate.category = 'fullTime';
          }
          return cate;
        });
        vm.categoryArray.unshift({
          id: 0,
          name: '默认不限',
          category: 'all',
        });
      });
    }

    function getIndustryStatistics(params) {
      if (params) {
        delete params.pageNum;
        delete params.itemsPerPage;
      }
      opportunityService.getIndustryStatistics(params).then((result) => {
        vm.industryArray = [{
          id: 0,
          name: '不限',
          count: result.map(r => r.count).reduce((c, n) => c + n),
        }];
        vm.industryArray = vm.industryArray.concat(result);
        vm.industryArray.forEach((i) => {
          if (i.name.length > 6) {
            i.name = `${i.name.slice(0, 6)}…`;
            if (i.name.lastIndexOf('/') === 5) {
              i.name = `${i.name.slice(0, 5)}…`;
            }
          }
        });
        if (vm.theLastTime && (vm.industryArray.length >= vm.limit)) {
          vm.expandIndustryList = true;
          vm.theLastTime = false;
        }
      });
    }
    function getLocationTagList() {
      Promise.all([
        locationTagService.getLocationTagList(),
        opportunityService.getLocationList()
      ])
        .then((result) => {
          const allLocationTag = result[0];
          const countOopLocation = result[1];
          let temp = null;
          const list = countOopLocation.map((location) => {
            temp = allLocationTag.filter(allLocation => allLocation.id === location.id)[0];
            if (temp) {
              return {
                id: temp.id,
                initial: temp.initial,
                name: temp.name,
                parentId: temp.parentId,
                count: location.count,
              };
            }
          });
          allLocationTag.forEach((l) => {
            if (l.parentId === -1) {
              list.push({
                name: l.name,
                initial: l.initial,
                parentId: l.id,
                id: l.id,
                count: 10000000,
              });
            }
          });
          const countries = allLocationTag.filter(location => location.parentId === -1)
            .map((country) => {
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
          vm.allLocationTag = countries
            .map((c) => {
              for (let i = 0; i < c.cityGroup.length; i++) {
                c.cityGroup[i] = `${c.cityGroup[i]}（${c.name}）`;
              }
              return c;
            });
            vm.provinceList = vm.allLocationTag.filter(c => c.name === '全国');
          $scope.$apply();
        });
    }

    function extractInitialForGroup(array) {
      return array.map(p => p.initial)
        .sort((a, b) => {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          return 1;
        })
        .filter((currentValue, index, arr) => currentValue !== arr[index + 1]).join(' ');
    }

    function sortByCount(reg, list, country) {
      let countA,
        countB;
      const arr = list.filter(l => reg.test(l.initial) && l.parentId === country.id)
        .sort((a, b) => {
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
