(() => {
  angular.module('App')
    .factory('authService', authService);

  authService.$inject = ['$resource', 'API_BASE_URL'];

  function authService($resource, API_BASE_URL) {

    return {
      login,
      signin,
      logout,
      getVerifyCode,
      checkMobile,
      checkVerifyCode,
      updatePassword,
      checkLogin,
      wechatLogin,
    };

    function login() {
      return $resource(`${API_BASE_URL}/auth/login`).save().$promise;
    }

    function wechatLogin(url) {
      window.location.href = `/api/auth/login?originalUrl=${encodeURIComponent(url || window.location.href)}`;
    }

    function signin(params) {
      return $resource(`${API_BASE_URL}/auth/sign_in`).save(params).$promise;
    }

    function checkMobile(params) {
      return $resource(`${API_BASE_URL}/auth/mobile_check`).get(params).$promise;
    }

    function checkVerifyCode(params) {
      return $resource(`${API_BASE_URL}/auth/check_verify_code`).save(params).$promise;
    }

    function updatePassword(params) {
      return $resource(`${API_BASE_URL}/auth/pw_recover`, null, {
        update: {
          method: 'PUT',
          isArray: true,
        },
      }).update(params).$promise;
    }

    function logout() {
      return $resource(`${API_BASE_URL}/auth/logout`).get().$promise;
    }

    function getVerifyCode(params) {
      return $resource(`${API_BASE_URL}/auth/send_verify_code_sms`).save(params).$promise;
    }

    function checkLogin(params) {
      return $resource(`${API_BASE_URL}/auth/check_login`).get(params).$promise;
    }
  }
})();
