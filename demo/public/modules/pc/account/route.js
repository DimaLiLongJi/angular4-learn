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
        $locationProvider
      ) => {
        $locationProvider
          .html5Mode(false);

        $stateProvider
        .state('account', {
          url: '',
          redirectTo: 'account.resume',
        })
        .state('account.resume', {
					url: '/resume',
					templateUrl: '/components/pc/account/resume/template.html',
					controller: 'resumeCtrl',
					controllerAs: 'vm',
				})
        .state('account.application', {
					url: '/application',
					templateUrl: '/components/pc/account/application/template.html',
					controller: 'applicationCtrl',
					controllerAs: 'vm',
				})
        .state('account.favorite', {
					url: '/favorite',
					templateUrl: '/components/pc/account/favorite/template.html',
					controller: 'favoriteCtrl',
					controllerAs: 'vm',
				})
        .state('account.favorite.question', {
					url: '/question',
					templateUrl: '/components/pc/account/favorite/question/template.html',
					controller: 'favoriteQuestionCtrl',
					controllerAs: 'vm',
				})
        .state('account.favorite.position', {
					url: '/position',
					templateUrl: '/components/pc/account/favorite/position/template.html',
					controller: 'favoritePositionCtrl',
					controllerAs: 'vm',
				})
        .state('account.question', {
					url: '/question',
					templateUrl: '/components/pc/account/question/template.html',
					controller: 'questionCtrl',
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
