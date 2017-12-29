(function () {
  angular.module('App')
    .factory('userService', userService);

  userService.$inject = [
    '$resource',
    'API_BASE_URL'
  ];

  function userService(
    $resource,
    API_BASE_URL
  ) {
    const service = {
      getUserAttachments,
      apply,
      create,
      deleteAttachment,
      getLastApplyInfo,
      getApplyStatus,
      getUserInfo,
      refreshToken,
      askQuestion,
      checkCount,
      getQuestions,
      getQuestionDetail,
      getApplications,
      getCustomization,
      createCustomization,
      enableFavorite,
      disableFavorite,
      getFavoriteList,
      getUserQuestion,
      checkQuestionRead,
      updateAcceptPush,
      getListCustomizedPushByDate,
    };
    return service;

    function getQuestionDetail(params) {
      return $resource(`${API_BASE_URL}/users/questions/${params.questionId}`, null, {})
      .get().$promise;
    }

    function updateAcceptPush(acceptPush) {
      return $resource(`${API_BASE_URL}/users/accept_push`, null, {
        update: {
          method: 'PUT',
        },
      }).update({
        acceptPush
      }).$promise;
    }

    function getQuestions(params) {
      return $resource(`${API_BASE_URL}/users/questions`, null, {})
      .get(params).$promise;
    }

    function askQuestion(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/questions`, null, {})
        .save(params).$promise;
    }

    function checkCount(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/questions/checkCount`, null, {})
        .get(params).$promise;
    }

    function getUserInfo(params) {
      return $resource(`${API_BASE_URL}/auth/user_info`, null, {})
        .get(params).$promise;
    }

    function refreshToken(params) {
      return $resource(`${API_BASE_URL}/auth/${params.id}/refresh_token`, null, {})
        .get().$promise;
    }

    function getLastApplyInfo(userId) {
      return $resource(`${API_BASE_URL}/users/${userId}/applications/latest`, null, {})
        .get().$promise;
    }

    function getApplyStatus(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/applications/${params.opportunityId}/available`, null, {})
        .get().$promise;
    }

    function getUserAttachments(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/attachments`, null, {})
        .query().$promise;
    }

    function apply(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/applications`).save(params).$promise;
    }

    function create(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/attachments`, null, {})
        .save(params).$promise;
    }

    function deleteAttachment(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/attachments/${params.attachmentId}`, null, {
        delete: {
          isArray: true,
          method: 'DELETE',
        },
      })
        .delete().$promise;
    }
// /users/:userId(\\d+)/applications
    function getApplications(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/applications`).get(params).$promise;
    }

    function getCustomization(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/customize`).get(params).$promise;
    }
    function createCustomization(params) {
      return $resource(`${API_BASE_URL}/users/customize`).save(params).$promise;
    }

    function enableFavorite(params) {
      return $resource(`${API_BASE_URL}/users/favorite`).save(params).$promise;
    }

    function disableFavorite(params) {
      return $resource(`${API_BASE_URL}/users/favorite`).remove(params).$promise;
    }
    function getFavoriteList(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/favorite`).get(params).$promise;
    }

    function getUserQuestion(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/questions`).get(params).$promise;
    }
    function checkQuestionRead(params) {
      return $resource(`${API_BASE_URL}/users/${params.userId}/questions/check_read`).get(params).$promise;
    }
    function getListCustomizedPushByDate(params) {
      return $resource(`${API_BASE_URL}/customized_push`).get(params).$promise;
    }
  }
}());
