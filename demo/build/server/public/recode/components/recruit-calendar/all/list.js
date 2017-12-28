'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../../utils');

var _paginationLink = require('../../common/paginationLink');

var _paginationLink2 = _interopRequireDefault(_paginationLink);

var _recruitCalendar = require('../../../actions/recruitCalendar');

var _user = require('../../../actions/user');

var _dateSelector = require('../common/dateSelector');

var _dateSelector2 = _interopRequireDefault(_dateSelector);

var _statusSelector = require('../common/statusSelector');

var _statusSelector2 = _interopRequireDefault(_statusSelector);

var _industrySelector = require('../common/industrySelector');

var _industrySelector2 = _interopRequireDefault(_industrySelector);

var _subscribeSuccessModal = require('../common/subscribe-success-modal');

var _subscribeSuccessModal2 = _interopRequireDefault(_subscribeSuccessModal);

var _companyCard = require('../common/company-card');

var _companyCard2 = _interopRequireDefault(_companyCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllCompanyList = function (_Component) {
  _inherits(AllCompanyList, _Component);

  function AllCompanyList(props) {
    _classCallCheck(this, AllCompanyList);

    var _this = _possibleConstructorReturn(this, (AllCompanyList.__proto__ || Object.getPrototypeOf(AllCompanyList)).call(this, props));

    _this.listParamChange = function (key) {
      return function (newVal) {
        var _p = _this.props;
        if (_p.listParams[key] !== newVal) {
          var newParams = _extends({}, _p.listParams, _defineProperty({}, key, newVal));
          if (key !== 'pageNum') newParams.pageNum = 1;
          _p.getCompanyList(newParams);
        }
      };
    };

    _this.checkAndsubscribeIndustry = function (company) {
      event.preventDefault();
      if (_this.props.userId) {
        _this.props.subscribeIndustry({
          industryId: company.industry.id,
          userId: _this.props.userId
        });
      } else {
        _this.context.openLoginModal({
          title: _this.props.userId ? "扫码关注并订阅" : "扫码登录",
          qrcodeDescription: [_react2.default.createElement(
            'h3',
            { key: 1 },
            '\u5173\u6CE8\u670D\u52A1\u53F7\u6C42\u804C\u5B66\u5802\u5C0F\u52A9\u624B\uFF0C\u4E00\u952E\u8BA2\u9605\u6821\u62DB\u65E5\u5386'
          ), _react2.default.createElement(
            'h3',
            { key: 2 },
            '\u82E5\u4F60\u60F3\u4FEE\u6539\u8BA2\u9605\u5185\u5BB9\uFF0C\u8BF7\u5728\u670D\u52A1\u53F7\u64CD\u4F5C\u3002'
          )],
          qrcodeType: 1
          // width: 412,
        });
      }
    };

    var params = (0, _utils.parseUrlParams)(props);
    if (!_this.props.companyList.companies) {
      _this.props.getCompanyList(_extends({}, _this.props.listParams, params));
    }
    if (!_this.props.userSubscription && _this.props.userId) {
      _this.props.getUserSubscription({
        userId: _this.props.userId
      });
    }
    _this.state = {
      showSubscribeSuccessModal: false
    };
    return _this;
  }

  _createClass(AllCompanyList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextState) {
      var currSubLength = this.props.userSubscription && this.props.userSubscription.length;
      var nextSubLength = nextProps.userSubscription && nextProps.userSubscription.length;
      if (currSubLength && nextSubLength && currSubLength !== nextSubLength) {
        this.setState({
          showSubscribeSuccessModal: true
        });
      }
      if (!this.props.userSubscription && nextProps.userId && !nextProps.userSubscription) {
        this.props.getUserSubscription({
          userId: nextProps.userId
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // console.log('render list');
      var _p = this.props;
      var list = _p.companyList;
      var sideBar = _react2.default.createElement(
        'div',
        { className: 'tool-side-bar' },
        _react2.default.createElement(_dateSelector2.default, { onSelect: this.listParamChange('applyStart'), selected: _p.listParams.applyStart }),
        _react2.default.createElement(_statusSelector2.default, { onSelect: this.listParamChange('applyStatus'), selected: _p.listParams.applyStatus }),
        _p.industries && _react2.default.createElement(_industrySelector2.default, { industries: _p.industries, onSelect: this.listParamChange('industryId'), selected: _p.listParams.industryId })
      );
      var cardList = list.companies && list.companies.map(function (c) {
        return _react2.default.createElement(_companyCard2.default, { key: c.id, company: c, onSubsClick: _this2.checkAndsubscribeIndustry, userSubscription: _this2.props.userSubscription });
      });

      var listCnames = 'main-list clearfix ' + (!list.totalItems ? 'result-is-null' : '');
      var pagination = list.totalItems / list.itemsPerPage > 1 && _react2.default.createElement(
        'div',
        { className: 'pagination-wrap' },
        _react2.default.createElement(_paginationLink2.default, {
          onChange: this.listParamChange('pageNum'),
          defaultCurrent: 1,
          pageSize: list.itemsPerPage,
          current: list.pageNum,
          total: list.totalItems
        })
      );
      var subscribeSuccessModal = _react2.default.createElement(_subscribeSuccessModal2.default, { visible: this.state.showSubscribeSuccessModal, title: '\u626B\u7801\u5173\u6CE8\u5E76\u8BA2\u9605', closeModal: function closeModal() {
          _this2.setState({ showSubscribeSuccessModal: false });
        } });

      return _react2.default.createElement(
        'section',
        { className: 'main-content clearfix' },
        sideBar,
        _react2.default.createElement(
          'div',
          { className: listCnames },
          _react2.default.createElement(
            'p',
            { className: 'list-count' },
            '\u7B26\u5408\u7B5B\u9009\u7ED3\u679C\u7684\u6709',
            _react2.default.createElement(
              'span',
              null,
              list.totalItems
            ),
            '\u5BB6'
          ),
          cardList,
          pagination,
          subscribeSuccessModal
        )
      );
    }
  }]);

  return AllCompanyList;
}(_react.Component);

AllCompanyList.propTypes = {
  companyList: _propTypes2.default.shape({
    itemsPerPage: _propTypes2.default.number,
    totalItems: _propTypes2.default.number,
    pageNum: _propTypes2.default.number,
    companies: _propTypes2.default.array
  }),
  listParams: _propTypes2.default.shape({
    applyStart: _propTypes2.default.string,
    applyStatus: _propTypes2.default.number,
    industryId: _propTypes2.default.number,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number
  }),
  industries: _propTypes2.default.array,
  userSubscription: _propTypes2.default.array,
  getCompanyList: _propTypes2.default.func,
  getStatistics: _propTypes2.default.func,
  subscribeIndustry: _propTypes2.default.func,
  getUserSubscription: _propTypes2.default.func,
  userId: _propTypes2.default.number
};
AllCompanyList.contextTypes = {
  openLoginModal: _propTypes2.default.func
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    companyList: store.recruitCalendar.companyList,
    listParams: store.recruitCalendar.listParams,
    industries: store.recruitCalendar.industries,
    userId: store.user && store.user.id,
    userSubscription: store.user && store.user.subscription
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getStatistics: function getStatistics(params) {
      dispatch((0, _recruitCalendar.getStatistics)(params));
    },
    getCompanyList: function getCompanyList(params) {
      dispatch((0, _recruitCalendar.getCompanyList)(params));
    },
    subscribeIndustry: function subscribeIndustry(params) {
      dispatch((0, _user.subscribeIndustry)(params));
    },
    getUserSubscription: function getUserSubscription(params) {
      dispatch((0, _user.getUserSubscription)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(AllCompanyList);