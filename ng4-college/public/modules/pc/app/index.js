// styles
import 'bootstrap/less/bootstrap.less';
import './style.less';

// vendors
import 'angular';
import 'angular-resource';
import 'angular-ui-bootstrap/dist/ui-bootstrap-tpls';
import 'angular-touch';
import 'angular-animate';
import 'moment';
import 'moment/locale/zh-cn';
import 'ng-file-upload';
import 'angular-messages';
import 'angular-cookies';
import 'jquery';
import 'animejs';
import 'angular-scroll';
// import 'angular-ui-router';
import '../../../vendors/angular-ui-router.min';

// main
import './main';
import './route';


// services
import '../../../services/auth';
import '../../../services/opportunity';
import '../../../services/location-tag';
import '../../../services/tag';
import '../../../services/industry';
import '../../../services/file';
import '../../../services/feedback';
import '../../../services/user';
import '../../../services/danmu';
import '../../../services/wechat';
import '../../../services/profession';

// gadgets
import '../../../gadgets/location_selector';
import '../../../gadgets/industry_selector';
import '../../../gadgets/subscription-modal';
import '../../../gadgets/wechat-login-modal/index';
import '../../../gadgets/user-feedback-pc';
import '../../../gadgets/swich';
import '../../../gadgets/danMu';
import '../../../gadgets/dan';
import '../../../gadgets/tip-modal';
import '../../../gadgets/nav';
import '../../../directives/ng-enter';
import '../../../gadgets/scrollToTop';
import '../../../gadgets/qrCode';
import '../../../gadgets/progressBar';
import '../../../gadgets/wechat-login-subscribe-modal';
import '../../../gadgets/wechat-subscribe-modal';

import '../../../components/pc/app/opportunities';
import '../../../components/pc/app/opportunity-recommended';
import '../../../components/pc/app/customize-modal';
