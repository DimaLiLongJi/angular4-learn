(() => {
  angular
    .module('App')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      '$locationProvider',
      (
        $stateProvider,
        $urlRouterProvider,
        $locationProvider,
      ) => {
        $locationProvider
          .html5Mode(false);

        $stateProvider
        .state('/', {
          url: '',
          controller: ['$state', '$USER', ($state, $USER) => {
            const goOnCustomize = localStorage.getItem('customize');
            const rpSession = sessionStorage.getItem('recommendOppParams');
            const apSession = sessionStorage.getItem('allOppParams');
            if (apSession) {
              $state.go('opportunities');
            } else if (($USER && $USER.isPreferenced) || goOnCustomize || rpSession) {
              $state.go('opportunity-recommended');
            } else {
              $state.go('opportunities');
            }
          }],
        })
        .state('opportunity-recommended', {
					url: '/opportunity-recommended',
					templateUrl: '/components/pc/app/opportunity-recommended/template.html',
					controller: 'opportunityRecommendedCtrl',
					controllerAs: 'vm',
				})
        .state('opportunities', {
					url: '/opportunities',
					templateUrl: '/components/pc/app/opportunities/template.html',
					controller: 'opportunitiesCtrl',
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
