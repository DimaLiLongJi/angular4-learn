(() => {
  angular.module('App', [
    'ngResource',
    'ui.bootstrap',
    'duScroll'
  ]).run();
})();

(() => {
  angular.module('App')
  .controller('companyDetailMobileCtrl', companyDetailMobileCtrl);

  companyDetailMobileCtrl.$inject = [
    'opportunityService',
    'company',
    'similarCompany',
    '$window',
    '$location'
  ];

  function companyDetailMobileCtrl(
    opportunityService,
    company,
    similarCompany,
    $window,
    $location
  ) {
    const vm = this;
    vm.infoStatus = $location.search().infoStatus || 'introduction';
    vm.similarCompany = similarCompany;
    vm.tabInfo = tabInfo;
    vm.goBack = goBack;
    vm.oppsCount = 0;
    vm.goOppDetail = goOppDetail;
    vm.goCampusDetail = goCampusDetail;
    vm.gocompanyDetail = gocompanyDetail;
    vm.$onInit = (() => {
      if (getParameterByName('positions', window.location.href)) {
        scrollToRecruit();
      }
    });

    getOpportunityList();
    getCampusRecruitList();

    function tabInfo(status) {
      $location.search('infoStatus', status);
      vm.infoStatus = status;
    }

    function goBack() {
      window.cfGoHistory({
        url: '/mobile/recruit-calendar',
        target: '_self',
      });
    }

    function goOppDetail(opp) {
      window.location.href = `/opportunity/${opp.id}?source=companyDetail`;
    }
    function goCampusDetail(opp) {
      window.location.href = opp.applyLink;
    }

    function gocompanyDetail(c) {
      window.location.href = `/company/${c.id}`;
    }

    function getOpportunityList() {
      opportunityService.getOpportunityList({
        companyId: company.id,
        itemsPerPage: 100,
      }).then((result) => {
        vm.totalItems = result.totalItems;
        vm.oppArray = result.opps;
        vm.oppArray = vm.oppArray.filter(opp => opp.category.id !== 48);
        if(vm.oppArray) vm.oppsCount += vm.oppArray.length;
      }).catch((error) => {
        console.error(error);
      });
    }

    function getCampusRecruitList() {
      opportunityService.getCompanyCampusOpportunities(company.id).then((result) => {
        const rawData = result || [];
        const filteredData = rawData
        .filter(item => item.applyStart)
        .sort((a, b) => new Date(a.applyStart) < new Date(b.applyStart));
        vm.campusRecruitArray = filteredData;
        if (vm.campusRecruitArray) vm.oppsCount += vm.campusRecruitArray.length;
      }).catch((error) => {
        console.error(error);
      });
    }
    function scrollToRecruit() {
      window.location.href = '#positions';
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  }
})();
