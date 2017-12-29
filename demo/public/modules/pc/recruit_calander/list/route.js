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
          redirectTo: 'deadline',
        })
        .state('all', {
          url: '/all',
          templateUrl: '/components/pc/recruit_calander/all/template.html',
          controller: 'allRecruitCtrl',
          controllerAs: 'vm',
        })
        .state('deadline', {
          url: '/deadline',
          templateUrl: '/components/pc/recruit_calander/deadline/template.html',
          controller: 'deadlineRecruitCtrl',
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
