import './qa';
import './style.less';
import './interview_material/index';
import './industry_interview_material/index';
import './industry_interview_material/tip';
import './industry_interview_material/more_company_material';
import './industry_interview_material/hot_company_material';


  discoveryCtrl.$inject = [
    '$USER',
    'BASE_URL',
    '$state'
  ];

function discoveryCtrl(
  $USER,
  BASE_URL,
  $state
) {
  const vm = this;

  vm.$USER = $USER;
  vm.goPreferences = goPreferences;


  function goPreferences() {
    if (!$USER || !$USER.id) {
      window.location.href = `${BASE_URL}/api/auth/login?originalUrl=${encodeURIComponent(`${BASE_URL}/mobile/preferences`)}`;
    } else {
      $state.go('preferences');
    }
  }
}


export default angular.module('App')
  .controller('discoveryCtrl', discoveryCtrl);
