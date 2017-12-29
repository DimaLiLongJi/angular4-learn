(() => {
  angular.module('App').factory('articleService', articleService);
  articleService.$inject = ['API_BASE_URL', '$resource'];

  function articleService(API_BASE_URL, $resource) {
    const service = {
      getArticles,
    };
    return service;

    function getArticles(params) {
      params.orderBy = 'pinned DESC, article_publish_datetime DESC';
      return $resource(`${API_BASE_URL}/articles`, null, {}).get(params).$promise;
    }
  }
})();
