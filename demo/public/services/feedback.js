(() => {
  angular.module('App')
    .factory('feedbackService', feedbackService);

  feedbackService.$inject = ['API_BASE_URL', '$resource'];

  function feedbackService(API_BASE_URL, $resource) {
    return {
      postFeedback,
    };

    function postFeedback(params) {
      return $resource(`${API_BASE_URL}/users/feedback`).save(params).$promise;
    }
  }
})();
