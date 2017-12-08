(function () {
    angular.module('App').factory('httpInterceptor', ['$q', '$rootScope',
        function ($q, $rootScope) {
            let loadingCount = 0;

            return {
                request(config) {
                    if (++loadingCount === 1) $rootScope.$broadcast('loading:progress');
                    return config || $q.when(config);
                },

                response(response) {
                    if (--loadingCount === 0) {
                        $rootScope.$broadcast('loading:finish');
                    }
                    return response || $q.when(response);
                },

                responseError(response) {
                    if (--loadingCount === 0) {
                        $rootScope.$broadcast('loading:finish');
                    }
                    return $q.reject(response);
                },
            };
        }
    ]).config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
}());


(function () {
    angular
        .module('App')
        .directive('keepScrollPos', keepScrollPos)
        .directive('keepScrollPosContainer', keepScrollPosContainer);

    keepScrollPos.$inject = ['$window', '$timeout', '$location', '$anchorScroll', '$state', '$rootScope', '$transitions', '$cacheFactory'];


    function keepScrollPos($window, $timeout, $location, $anchorScroll, $state, $rootScope, $transitions) {
        // cache scroll position of each route's templateUrl
        const scrollPosCache = {};

        let timer,
            pageScrolled = false,
            stateChangeSuccess = false;

        // compile function
        const directive = function () {
            let scrollContainer = null;
            
            this.registerElement = (childElement) => {
                scrollContainer = childElement;
            };


            $transitions.onStart({}, () => {
                // 页面跳转把overflowhidden去掉
                // $('html').css('overflow', 'auto');
                // store scroll position for the current view
                if ($state.$current && $state.current.templateUrl) {
                    scrollPosCache.prevPage = $state.current.templateUrl;
                    if (scrollContainer) {
                        scrollPosCache[$state.current.templateUrl] = [scrollContainer[0].scrollLeft, scrollContainer[0].scrollTop];
                    } else {
                        scrollPosCache[$state.current.templateUrl] = [$window.pageXOffset, $window.pageYOffset];
                    }

                    stateChangeSuccess = false;
                    pageScrolled = false;
                }
            });

            $transitions.onSuccess({}, () => {
                stateChangeSuccess = true;

            });

            // scope.$on('$stateChangeSuccess', function() {
            //
            // });

            // $rootScope.$on('loading:progress', function (){
            // });

            $rootScope.$on('loading:finish', () => {
                if (pageScrolled || !stateChangeSuccess) {
                    return;
                }
                // if hash is specified explicitly, it trumps previously stored scroll position
                if ($location.hash()) {
                    $anchorScroll();
                    // else get previous scroll position; if none, scroll to the top of the page
                } else {
                    let scrollPos;
                    // 同一页或者初次加载不跳转
                    if (scrollPosCache.prevPage === $state.current.templateUrl) {
                        scrollPos = [0, 0];
                    } else {
                        scrollPos = scrollPosCache[$state.current.templateUrl];
                    }

                    if (!scrollPos) return;
                    $timeout(() => {
                        if (scrollContainer) {
                            scrollContainer[0].scrollLeft = scrollPos[0];
                            scrollContainer[0].scrollTop = scrollPos[1];
                            if (scrollContainer[0].scrollLeft === scrollPos[0] && scrollContainer[0].scrollTop === scrollPos[1]) {
                                pageScrolled = true;
                            }
                        } else {
                            $window.scrollTo(scrollPos[0], scrollPos[1]);
                            if (scrollPos[0] === $window.pageXOffset && scrollPos[1] === $window.pageYOffset) {
                                pageScrolled = true;
                            }
                        }
                    }, 1);
                }
            });
        };

        return {
            controller: directive,
            controllerAs: 'keepScrollPos',
            //transclude: true,
            //scope: {},
        };
        // directive;
    }

    function keepScrollPosContainer() {
        return {
            require: '^keepScrollPos',
            restrict: 'A',
            link: (scope, iElement, iAttrs, parentController) => {
                parentController.registerElement(iElement);
            },
        };
    }
}());
