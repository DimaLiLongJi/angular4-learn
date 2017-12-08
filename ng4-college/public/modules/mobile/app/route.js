  angular.module('App').config([
      '$stateProvider',
      '$urlRouterProvider',
      '$locationProvider',
      (
        $stateProvider,
        $urlRouterProvider,
        $locationProvider,
      ) => {
        $locationProvider
          .html5Mode(true);

        $stateProvider
          .state('index', {
            url: '/',
            // controller: ['$state', ($state) => {
            //   $state.go('company');
            // }],
            controller: ['$state', ($state) => {
              $state.go('intern-opportunity');
            }],
          })
          .state('intern-opportunity', {
            url: '/intern-opportunity',
            templateUrl: '/components/mobile/app/intern-opportunity/template.html',
            controller: 'internOpportunityCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/intern-opportunity',
            // resolve: {
            //   load: ['$ocLazyLoad', $ocLazyLoad =>
            //     import('../../../components/mobile/app/intern-opportunity/index.js')
            //     .then(m => $ocLazyLoad.load(m.default))
            //   ]
            // },
          })
          .state('discovery', {
            abstract: true,
            url: '/discovery',
            templateUrl: '/components/mobile/app/discovery/template.html',
            controller: 'discoveryCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/discovery',
          })
          .state('discovery.interview_material', {
            url: '/interview_material',
            templateUrl: '/components/mobile/app/discovery/interview_material/template.html',
            controller: 'interviewMaterialCtrl',
            controllerAs: 'vm',
          })
          .state('discovery.industry_interview_material', {
            url: '/industry_interview_material/:id',
            templateUrl: '/components/mobile/app/discovery/industry_interview_material/template.html',
            controller: 'industryInterviewMaterialCtrl',
            controllerAs: 'vm',
          })
          .state('discovery.qa', {
            url: '/qa',
            templateUrl: '/components/mobile/app/discovery/qa/template.html',
            controller: 'discoveryQaCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/discovery/qa',
          })
          .state('discovery.question', {
            url: '/question?commit',
            templateUrl: '/components/mobile/app/discovery/qa/question/template.html',
            controller: 'qaQuestionCtrl',
            controllerAs: 'vm',
          })
          .state('discovery.question-list', {
            url: '/question-list',
            templateUrl: '/components/mobile/app/discovery/qa/question-list/template.html',
            controller: 'qaQuestionListCtrl',
            controllerAs: 'vm',
          })
          .state('discovery.question-detail', {
            url: '/question-detail/:id?favorite&userQuestion',
            templateUrl: '/components/mobile/app/discovery/qa/question-detail/template.html',
            controller: 'qaQuestionDetailCtrl',
            controllerAs: 'vm',
          })
          .state('account', {
            url: '/account',
            templateUrl: '/components/mobile/app/account/template.html',
            controller: 'accountCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/account',
            // resolve: {
            //   accountCtrl: ($q, $ocLazyLoad) => $q((resolve) => {
            //     import ('../../../components/mobile/app/account').then((module) => {
            //       console.log(module);
            //       $ocLazyLoad.load({
            //         name: 'accountCtrl'
            //       });
            //       resolve(module.controller);
            //     })
            //   }),
            // },
          })
          .state('resume', {
            url: '/resume',
            templateUrl: '/components/mobile/app/account/resume/template.html',
            controller: 'resumeCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/account/resume',
          })
          .state('application', {
            url: '/application',
            templateUrl: '/components/mobile/app/account/application/template.html',
            controller: 'applicationCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/account/application',
          })
          .state('favorite', {
            url: '/favorite',
            templateUrl: '/components/mobile/app/account/favorite/template.html',
            controller: 'favoriteCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/account/favorite',
          })
          .state('user-question', {
            url: '/user-question',
            templateUrl: '/components/mobile/app/account/user-question/template.html',
            controller: 'userQuestionCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/account/user-question',
          })
          .state('recruit-calendar', {
            url: '/recruit-calendar',
            templateUrl: '/components/mobile/app/recruit-calendar/template.html',
            controller: 'recruitCalendarCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/recruit-calendar',
          })
          .state('recruit-calendar.deadline', {
            url: '/deadline',
            templateUrl: '/components/mobile/app/recruit-calendar/deadline/template.html',
            controller: 'deadlineRecruitCtrl',
            controllerAs: 'vm',
          })
          .state('recruit-calendar.all', {
            url: '/all',
            templateUrl: '/components/mobile/app/recruit-calendar/all/template.html',
            controller: 'allRecruitCtrl',
            controllerAs: 'vm',
          })
          .state('prefix', {
            url: '/prefix',
            templateUrl: '/components/mobile/app/prefix/template.html',
            controller: 'prefixCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/prefix',
          })
          .state('apply', {
            url: '/apply?opportunityId&pasteUrl',
            templateUrl: '/components/mobile/app/apply/template.html',
            controller: 'applyCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/apply',
          })
          .state('feedback', {
            url: '/feedback',
            templateUrl: '/components/mobile/app/account/feedback/template.html',
            controller: 'feedbackCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/account/feedback',
          })
          .state('preferences', {
            url: '/preferences',
            templateUrl: '/components/mobile/app/preferences/template.html',
            controller: 'preferencesCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/preferences',
          })
          .state('preview', {
            url: '/preview/:id/:name',
            templateUrl: '/components/mobile/app/preview/template.html',
            controller: 'previewCtrl',
            controllerAs: 'vm',
            controllerUrl: '/components/mobile/app/preview',
          });

        // when no match route
        $urlRouterProvider
          .otherwise(() => {
            window.location = '/404';
          });
      }
    ]);
