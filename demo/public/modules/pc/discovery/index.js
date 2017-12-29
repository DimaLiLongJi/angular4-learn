// styles
import 'bootstrap/less/bootstrap.less';
import './style.less';

// vendors
import 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-ui-bootstrap/dist/ui-bootstrap-tpls';
import 'angular-touch';
import 'angular-animate';
import 'moment';
import 'moment/locale/zh-cn';
import 'angular-scroll';
import 'angular-cookies';
import 'ng-file-upload';
import 'angular-messages';
import 'jquery';
import 'animejs';

// main
import './main';
import './routes';
import './industry-config';

import '../../../components/pc/discovery/company/index';
import '../../../components/pc/discovery/industry-baike/index';

// services
import '../../../services/auth';
import '../../../services/company';
import '../../../services/tag';
import '../../../services/industry';
import '../../../services/discovery';
import '../../../services/file';
import '../../../services/feedback';
import '../../../services/danmu';
import '../../../services/user';

// gadgets
import '../../../gadgets/industry_search';
import '../../../gadgets/wechat-login-modal';
import '../../../gadgets/user-feedback-pc';
import '../../../gadgets/swich';
import '../../../gadgets/danMu';
import '../../../gadgets/tip-modal';
import '../../../gadgets/dan';
import '../../../gadgets/nav';
import '../../../directives/ng-enter';
import '../../../gadgets/scrollToTop';
import '../../../gadgets/qrCode';
