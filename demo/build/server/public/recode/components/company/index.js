'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _card = require('./card');

var _card2 = _interopRequireDefault(_card);

var _tab = require('./tab');

var _tab2 = _interopRequireDefault(_tab);

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

var _oppList = require('./oppList');

var _oppList2 = _interopRequireDefault(_oppList);

var _utils = require('../../utils');

var _company = require('../../actions/company');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompanyDetail = function (_React$Component) {
  _inherits(CompanyDetail, _React$Component);

  function CompanyDetail(props) {
    _classCallCheck(this, CompanyDetail);

    var _this = _possibleConstructorReturn(this, (CompanyDetail.__proto__ || Object.getPrototypeOf(CompanyDetail)).call(this, props));

    var params = (0, _utils.parseUrlParams)(props);
    _this.state = params;
    return _this;
  }

  _createClass(CompanyDetail, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.companyId !== (this.props.company && this.props.company.id)) {
        var companyId = this.state.companyId;
        this.props.getCompanyDetail({ companyId: companyId });
        this.props.getCampusOppList({ companyId: companyId });
        this.props.getOpportunityList({ companyId: companyId });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // if (!this.props.company || !this.props.company.id === this.state.companyId) return null;
      var _p = this.props;
      if (this.state.companyId && this.state.companyId !== (this.props.company && this.props.company.id)) return null;

      var backgroundStyle = {
        backgroundImage: _p.backgroundImage
      };
      var status = !!_p.company.officialUrl && !!_p.company.introduction;
      var count = (_p.opportunityList.opps && _p.opportunityList.opps.length) + _p.campusOpportunityList.length;
      var oppList = !!count && _react2.default.createElement(_oppList2.default, { count: count, company: _p.company, opportunityList: _p.opportunityList, campusOpportunityList: _p.campusOpportunityList });

      var card = _p.company && _p.company.id && _react2.default.createElement(_card2.default, { company: _p.company, status: status });
      var info = _p.company && _p.company.id && _react2.default.createElement(_info2.default, { company: _p.company });
      return _react2.default.createElement(
        'div',
        { className: 'background-wrap company-detail-page', style: backgroundStyle },
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            '\u516C\u53F8\u4FE1\u606F_\u6C42\u804C\u5B66\u5802_\u804C\u4E1A\u86D9'
          ),
          _react2.default.createElement('meta', { name: 'description', content: '\u8FD9\u91CC\u6536\u5F55\u4E8610000+\u70ED\u95E8\u516C\u53F8\u4FE1\u606F,\u5305\u62EC\u4E86\u8BE6\u7EC6\u7684\u516C\u53F8\u4ECB\u7ECD\u548C\u5728\u62DB\u804C\u4F4D,\u5E2E\u52A9\u5B66\u751F\u9009\u62E9\u5408\u9002\u7684\u516C\u53F8\u548C\u804C\u4F4D,\u8D70\u51C6\u804C\u4E1A\u7B2C\u4E00\u6B65' }),
          _react2.default.createElement('meta', { name: 'keywords', content: '\u516C\u53F8\u4FE1\u606F,\u54A8\u8BE2,\u91D1\u878D,\u4E92\u8054\u7F51,500\u5F3A,\u5B9E\u4E60,\u5E94\u5C4A\u751F,\u4F01\u4E1A,\u540D\u4F01,\u516C\u53F8\u7B80\u4ECB,\u516C\u53F8\u8BE6\u60C5,\u5B98\u7F51,\u5728\u62DB\u804C\u4F4D,\u7C7B\u4F3C\u516C\u53F8' })
        ),
        card,
        _react2.default.createElement(
          'section',
          { className: 'company-container clearfix' },
          _react2.default.createElement(_tab2.default, { totalItems: count, status: status }),
          _react2.default.createElement(
            'div',
            { className: 'position-list clearfix' },
            info,
            oppList
          )
        )
      );
    }
  }], [{
    key: 'fetchData',
    value: function fetchData(store, params) {
      var companyId = params.companyId;
      return Promise.all([_company.getCompanyDetail, _company.getOpportunityList, _company.getCampusOppList].map(function (fn) {
        return store.dispatch(fn({ companyId: companyId }));
      }));
    }
  }]);

  return CompanyDetail;
}(_react2.default.Component);

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    company: store.company.company,
    similarCompanies: store.company.similarCompanies,
    opportunityList: store.company.opportunityList,
    campusOpportunityList: store.company.campusOpportunityList,
    backgroundImage: store.company.backgroundImage
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getCompanyDetail: function getCompanyDetail(params) {
      dispatch((0, _company.getCompanyDetail)(params));
    },
    getOpportunityList: function getOpportunityList(params) {
      dispatch((0, _company.getOpportunityList)(params));
    },
    getCampusOppList: function getCampusOppList(params) {
      dispatch((0, _company.getCampusOppList)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(CompanyDetail);