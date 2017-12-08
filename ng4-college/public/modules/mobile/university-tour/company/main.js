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
    '$location',
    '$document',
    'companyService',
    '$scope'
  ];

  function companyDetailMobileCtrl(
    opportunityService,
    company,
    similarCompany,
    $window,
    $location,
    $document,
    companyService,
    $scope
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

    const container = document.body;
    const htmlDom = angular.element(document).find('html')[0];
    let topValue = 0;
    let dpr = 3;
    vm.$onInit = (() => {
      if (getParameterByName('positions', window.location.href)) {
        scrollToRecruit();
      }
    });
    getOpportunityList();

    function tabInfo(status) {
      $location.search('infoStatus', status);
      vm.infoStatus = status;
    }

    function goBack() {
      window.cfGoHistory({
        url: '/university_tour',
        target: '_system',
      });
    }

    function goOppDetail(opp) {
      window.location.href = `/university_tour/opportunity/${opp.id}?source=companyDetail`;
    }
    function goCampusDetail(opp) {
      window.location.href = opp.applyLink;
    }

    function gocompanyDetail(c) {
      window.location.href = `/company/${c.id}`;
    }

    function getOpportunityList() {
      companyService.getUniversityTourCompanyDetail({
        companyId: company.id,
      }).then((result) => {
        vm.oppArray = result.opportunities || [];
        vm.totalItems = vm.oppArray.length;
        vm.oppsCount = vm.oppArray.length;
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


(() => {
    //FastClick.attach(document.body);
    // const shareImage = '/images/recruit-share.jpg';
    let link;
    let title;
    let desc;
    let imgUrl;

    company.desc = `${company.introduction.replace(/\n/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, '')
    .replace(/\s/g, '')
    .replace(/<\/?[^>]*>/g, '')
    .trim()
    .substr(0, 200)}……`;
    reConfig();
    function reConfig() {
      const xhr = new XMLHttpRequest();
      title = `【环英嘉年华】${company.name}`;
      desc = company.desc;
      imgUrl = /default/.test(company.imageUrl) ? '/images/share.jpg' : company.imageUrl;
      imgUrl = encodeURI(imgUrl);
      xhr.addEventListener('load', configWX);
      link = location.href;
      xhr.open('GET', `http://careerfrog.com.cn/api/wechat/signature?pageUrl=${encodeURIComponent(link)}`);
      xhr.send();
    }

    function configWX() {
      const config = JSON.parse(this.responseText);
      // config.debug = true;
      config.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline'];
      wx.config(config);

      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title,
          desc,
          link,
          imgUrl,
          type: 'link',
          success() {},
          cancel() {},
        });

        wx.onMenuShareTimeline({
          title,
          desc,
          link,
          imgUrl,
          success() {},
          cancel() {},
        });
      });
    }
})();
