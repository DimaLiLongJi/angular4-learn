(() => {
  angular.module('App').controller('customizeModalCtrl', customizeModalCtrl);

  customizeModalCtrl.$inject = [
    'opportunityService',
    'customizationInfo',
    '$uibModalInstance',
    'userService',
    'tagService',
    'options',
    'user'
  ];

  function customizeModalCtrl(
    opportunityService,
    customizationInfo,
    $uibModalInstance,
    userService,
    tagService,
    options,
    user
  ) {
    const vm = this;

    vm.$onInit = () => {
      vm.user = user;
      vm.customizationInfo = customizationInfo;
      vm.customizeSteps = [{
        id: 1,
        name: 'Step 1',
        title: '你对哪些行业感兴趣？（必选）',
        list: [],
      }, {
        id: 2,
        name: 'Step 2',
        title: '你对哪些职能感兴趣？（必选）',
        list: [],
      }, {
        id: 3,
        name: 'Step 3',
        title: '你想要的职位在哪些城市？（必选）',
        list: [{
            id: 8,
            name: '北京',
          }, {
            id: 1,
            name: '上海',
          }, {
            id: 13,
            name: '广州',
          }, {
            id: 9,
            name: '深圳',
          }, {
            id: -1,
            name: '其他',
          }],
      }, {
        id: 4,
        name: 'Step 4',
        title: '你在哪些求职阶段存在疑惑？（必选）',
        list: [],
      }];

      vm.step = {
        number: 1,
        1: [],
        2: [],
        3: [],
        4: [],
      };

      vm.nextStep = nextStep;
      vm.goStep = goStep;
      vm.toggleSelectTag = toggleSelectTag;
      vm.submit = submit;
      vm.closeModal = closeModal;

      if (options.length) {
        vm.customizeSteps[0].list =
        matchSelectedTag(options[0], vm.customizationInfo.industries, vm.step[1]);
        vm.customizeSteps[1].list =
        matchSelectedTag(options[1], vm.customizationInfo.positions, vm.step[2]);
        vm.customizeSteps[2].list =
        matchSelectedTag(vm.customizeSteps[2].list, vm.customizationInfo.locations, vm.step[3]);
        vm.customizeSteps[3].list =
        matchSelectedTag(options[2], vm.customizationInfo.stages, vm.step[4]);
      }
    };

    function toggleSelectTag(tag) {
      if (!tag.selected) {
        vm.step[vm.step.number].push(tag);
      } else {
        vm.step[vm.step.number] = vm.step[vm.step.number].filter(option => option.id !== tag.id);
      }
      tag.selected = !tag.selected;
    }

    function nextStep() {
      if (!vm.step[vm.step.number].length) {
        return;
      }
      if (vm.step.number < 4) {
        vm.step.number++;
      } else {
        submit();
      }
    }

    function goStep(step) {
      if ((vm.step.number > step.id) || (vm.step.number < step.id && vm.step[vm.step.number].length)) {
        vm.step.number = step.id;
      }
    }

    function closeModal(data) {
      vm.customizeSteps[0].list =
      reomveNoSubmitSelectedTag(vm.customizeSteps[0].list, vm.customizationInfo.industries);
      vm.customizeSteps[1].list =
      reomveNoSubmitSelectedTag(vm.customizeSteps[1].list, vm.customizationInfo.positions);
      vm.customizeSteps[2].list =
      reomveNoSubmitSelectedTag(vm.customizeSteps[2].list, vm.customizationInfo.locations);
      vm.customizeSteps[3].list =
      reomveNoSubmitSelectedTag(vm.customizeSteps[3].list, vm.customizationInfo.stages);
      $uibModalInstance.close(data);
    }

    function reomveNoSubmitSelectedTag(sourceArray, tagArray) {
      return sourceArray.map((tag) => {
        if (tag.selected && tagArray.every(id => id !== tag.id)) {
          tag.selected = false;
        }
        return tag;
      });
    }

    function matchSelectedTag(wholeTag, selectedTag, pushArray) {
      return wholeTag
      .map((Tag) => {
        if (selectedTag.some(cTag => cTag.id === Tag.id)) {
          Tag.selected = true;
          pushArray.push(Tag);
        }
        return Tag;
      });
    }

    function submit() {
      userService.createCustomization(buildCondition())
      .then(() => {
        // 定制成功
        $uibModalInstance.close('recustomize');
      })
      .catch((error) => {
        $uibModalInstance.close('error');
        console.error(error);
      });
    }

    function buildCondition() {
      const params = {
        userId: user.id,
        industryIds: getIds(vm.step[1]),
        positionIds: getIds(vm.step[2]),
        locationIds: getIds(vm.step[3]),
        stageIds: getIds(vm.step[4]),
      };
      return params;
    }

    function getIds(tagArray) {
      return tagArray.filter(tag => tag.selected).map(tag => tag = tag.id);
    }
  }
})();
