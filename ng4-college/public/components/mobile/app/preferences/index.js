import './style.less';

export default angular.module('App')
  .controller('preferencesCtrl', preferencesCtrl);

preferencesCtrl.$inject = [
  'opportunityService',
  'tagService',
  'userService',
  'professionService',
  '$USER',
  '$scope',
  '$timeout',
  '$cacheFactory'
];

function preferencesCtrl(
  opportunityService,
  tagService,
  userService,
  professionService,
  $USER,
  $scope,
  $timeout,
  $cacheFactory
) {
  const vm = this;
  vm.$USER = $USER;
  vm.back = back;
  vm.pickNext = pickNext;
  vm.preferenceList = ['industryIds', 'positionIds', 'locationIds', 'stageIds'];
  vm.preferenceObject = {
    industryIds: [],
    positionIds: [],
    locationIds: [],
    stageIds: [],
  };

  // 某些版本safari竖向flex布局高度问题
  $('.pick-entry').height($('.pick-list').height());
  $('.preference-btns').height($('.preference-pickers').height());

  vm.locationList = [{
      id: 1,
      name: '上海',
    }, {
      id: 13,
      name: '广州',
    },
    {
      id: -1,
      name: '其他',
    },
    {
      id: 9,
      name: '深圳',
    },
    {
      id: 8,
      name: '北京',
    }
  ];
  vm.currentIndex = 0;
  vm.animateTrigger = [];
  vm.nextTouched = false;

  vm.pickReference = pickReference;
  activate();

  function activate() {
    vm.$onInit = () => {
      userService.getCustomization({
        userId: $USER && $USER.id,
      }).then((result) => {
        $USER.preferences = result;
        $USER.isPreferenced = result.industries.length || result.stages.length || result.positions.length || result.locations.length;
        vm.preferenceObject = {
          industryIds: result ? result.industries.map(entry => entry.id) : [],
          positionIds: result ? result.positions.map(entry => entry.id) : [],
          locationIds: result ? result.locations.map(entry => entry.id) : [],
          stageIds: result ? result.stages.map(entry => entry.id) : [],
        };
        if ($USER.preferences) {
          findAndSelect(vm.locationList, $USER.preferences.locations);
        }
        opportunityService.getIndustryStatistics({
          type: 0,
        }).then((result) => {
          const otherIndustry = [24, 53, 76, 15, 73, 70, 68, 79];
          vm.industryList = (result || []).filter(industry => !otherIndustry.includes(industry.id));
          vm.industryList.push({
            id: -1,
            name: '其他',
          });
          // 初始化数据
          vm.industryList = vm.industryList.map((industry) => {
            industry.selected = false;
            return industry;
          });
          if ($USER.preferences) {
            findAndSelect(vm.industryList, $USER.preferences.industries);
          }
          $timeout(() => {
            vm.animateTrigger[vm.currentIndex] = true;
          }, 1);
        });
        professionService.getList()
          .then((position) => {
            vm.positionList = position;
            if ($USER.preferences) {
              findAndSelect(vm.positionList, $USER.preferences.positions);
            }
          });

        tagService.getTagList('college_qa_type').then((result) => {
          vm.stageList = result;
          if ($USER.preferences) {
            findAndSelect(vm.stageList, $USER.preferences.stages);
          }
        });
      });
    };
  }

  function findAndSelect(source, selectedList) {
    if (!source || !selectedList) {
      return;
    }
    selectedList.forEach((entry) => {
      const index = source.findIndex(temp => temp.id === entry.id);
      if (index > -1) {
        source[index].selected = true;
      }
    });
  }


  function back() {
    window.history.back();
  }

  function pickNext() {
    vm.nextTouched = true;
    if (!vm.preferenceObject[vm.preferenceList[vm.currentIndex]].length) {
      return;
    }
    vm.nextTouched = false;
    if (vm.currentIndex === 3) {
      userService.createCustomization(vm.preferenceObject).then(() => {
        $USER.isPreferenced = true;
        $cacheFactory.get('STORE').put('prefOppList', null);
        $cacheFactory.get('STORE').put('prefOppPageNum', null);
        sessionStorage.setItem('customizedStatus', 'loading');
        back();
      });
    } else {
      vm.currentIndex++;
      vm.animateTrigger[vm.currentIndex] = true;
    }
  }

  function pickReference(entry, categoryIndex) {
    entry.selected = !entry.selected;
    const categoryIds = vm.preferenceObject[vm.preferenceList[categoryIndex]];
    if (entry.selected) {
      categoryIds.push(entry.id);
    } else {
      vm.preferenceObject[vm.preferenceList[categoryIndex]] = categoryIds.filter(ele => ele !== entry.id);
    }
  }
}
angular.module('App')
  .directive('roundCircleLayout', roundCircleLayout);
roundCircleLayout.$inject = ['$timeout'];

function roundCircleLayout($timeout) {
  function _link(scope, elm, attr) {
    scope.$watch('roundCircleLayout', (prev, curr) => {
      if (prev == curr) {
        return;
      }
      const pickers = elm.find('li');
      if (pickers.length) {
        const htmlDom = angular.element(document).find('html');
        const htmlFontSize = htmlDom.css('font-size').slice(0, -2);
        const angle = 360 / pickers.length;
        const radius = pickers.length > 5 ? htmlFontSize * (468 / 124) : htmlFontSize * (408 / 124);
        let rotate = -90;
        $timeout(() => {
          angular.forEach(pickers, (picker) => {
            const transform = `rotate(${rotate * 1}deg)
          translate(${radius}px)
          rotate(${rotate * -1}deg)
          translate3d(0, 0, 0)`;
            angular.element(picker).css('transform', transform);
            angular.element(picker).css('opacity', 1);
            rotate += angle;
          });
        }, 10, false);
      }
    });
  }
  return {
    restrict: 'A',
    scope: {
      roundCircleLayout: '=',
    },
    link: _link,
  };
}