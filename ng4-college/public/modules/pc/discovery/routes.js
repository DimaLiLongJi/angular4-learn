(() => {
  angular
    .module('App')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      '$locationProvider',
      'IndustryList',
      (
        $stateProvider,
        $urlRouterProvider,
        $locationProvider,
        IndustryList,
      ) => {
        $locationProvider
          .html5Mode(false)
          .hashPrefix('');

        $stateProvider
        .state('index', {
          url: '',
          controller: ['$state', function ($state) {
            $state.go('industry', {
              id: IndustryList[0].id,
            });
          }],
        })
        .state('industry', {
					url: '/industry/:id',
					templateUrl: '/components/pc/discovery/industry-baike/template.html',
					controller: 'industryBaikeCtrl',
					controllerAs: 'vm',
				});

        // when no match route
        $urlRouterProvider
          .otherwise(() => {
            window.location = '/404';
          });
      }
    ]);
})();
