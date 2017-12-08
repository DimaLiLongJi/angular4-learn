angular.module('App')
  .directive('ngEnter', () => function (scope, element, attrs) {
        element.bind('keydown keypress', (event) => {
            if (event.which === 13) {
                scope.$apply(() => {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    });
