(function() {
  'use strict';
  angular.module('App').factory('professionService', professionService);
  professionService.$inject = ['$resource', 'API_BASE_URL'];

  function professionService($resource, API_BASE_URL) {
    var service = {
      getList,
    };
    return service;

    function getList() {
      return $resource(API_BASE_URL + '/professions', null, {}).query().$promise;
    }
  }
})();
