// styles
import './style.less';

// vendors
import 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-touch';
import 'angular-animate';
import 'moment';
import 'moment/locale/zh-cn';
import 'ng-file-upload';
import 'angular-messages';
import 'angular-cookies';
import 'jquery';
import 'animejs';
import 'angular-ui-bootstrap/dist/ui-bootstrap-tpls';

// main
import './main';
import './route';

import '../../../components/pc/account/application';
import '../../../components/pc/account/resume';
import '../../../components/pc/account/resume/resume-modal';
import '../../../components/pc/account/favorite';
import '../../../components/pc/account/favorite/question';
import '../../../components/pc/account/favorite/position';
import '../../../components/pc/account/question';

// services
import '../../../services/auth';
import '../../../services/file';
import '../../../services/user';
import '../../../services/wechat';
import '../../../services/feedback';

// gadgets
import '../../../gadgets/wechat-login-modal';
import '../../../gadgets/user-feedback-pc';
import '../../../gadgets/nav';
