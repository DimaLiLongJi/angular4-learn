// vendors
import 'angular';
import 'jquery';

import 'angular-resource';
import 'angular-touch';
import 'angular-animate';
import 'angular-messages';
import 'angular-cookies';
import 'angular-carousel';
import 'oclazyload';
import 'moment/locale/zh-cn';
import 'angular-scroll';
import 'ng-file-upload';
import 'angular-sessionstorage';
import 'angular-elastic';
import 'swiper';
import '/vendors/angular-ui-router.min';

import './style.less';

// main
import './main';

import './route';
import './config';
import './constants';


// directives
import '../../../gadgets/opportunity_search';
import '../../../gadgets/search_bar';
import '../../../gadgets/mobile-dropdown-selector';
import '../../../gadgets/mobile-month-selector';
import '../../../directives/scroll-load';
import '../../../directives/keep-scroll-pos';
import '../../../directives/ng-click-copy';
import '../../../gadgets/select-prefix-for-mobile';
import '../../../gadgets/progressBar';
import '../../../gadgets/page_title';

// service
import '../../../services/opportunity';
import '../../../services/company';
import '../../../services/tag';
import '../../../services/location-tag';
import '../../../services/banner';
import '../../../services/discovery';
import '../../../services/user';
import '../../../services/file';
import '../../../services/feedback';
import '../../../services/mobile-prefix';
import '../../../services/danmu';
import '../../../services/wechat';
import '../../../services/history';
import '../../../services/auth';
import '../../../services/profession';
import '../../../services/material';
