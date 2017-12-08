(function() {
  'use strict';
  angular.module('App').factory('tagService', tagService);
  tagService.$inject = ['$resource', 'API_BASE_URL'];

  function tagService($resource, API_BASE_URL) {
    var tagService = {
      getTagList
    };
    return tagService;

    function getTagList(category) {
      const params = {
        category,
      };
      if (!category) {
        return Promise.reject({
          msg: 'category缺失',
        });
      }
      return $resource(API_BASE_URL + `/tags`, null, {}).query(params).$promise;
    }
  }
})();
