(() => {
  angular.module('App').config(['$sceDelegateProvider', ($sceDelegateProvider) => {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://static.careerfrog.com.cn/**'
    ]);

    // The blacklist overrides the whitelist so the open redirect here is blocked.
    // $sceDelegateProvider.resourceUrlBlacklist([
    //   'http://myapp.example.com/clickThru**'
    // ]);
  }]);
})();
