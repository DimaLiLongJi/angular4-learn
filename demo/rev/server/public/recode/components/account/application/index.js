'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _account = require('../../../actions/account');

var _antd = require('antd');

var _applicationCard = require('./application-card');

var _applicationCard2 = _interopRequireDefault(_applicationCard);

var _List = require('../../common/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Application = function (_Component) {
  _inherits(Application, _Component);

  function Application(props) {
    _classCallCheck(this, Application);

    var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this, props));

    _this.onPageChange = function (page, pageSize) {
      _this.setState({ pageNum: page });
      _this.getItems(_this.state.type, page);
    };

    _this.redCircle = function () {
      if (_this.props.user.applicationCheckedNotice) {
        return _react2.default.createElement('span', { className: 'tab-red-circle' });
      }
    };

    _this.gotoDeliver = function () {
      window.location.href = "/";
    };

    _this.genApplicationList = function () {
      if (_this.props.applicationList.items.length > 0) {
        return _react2.default.createElement(
          _List2.default,
          {
            split: false,
            dataSource: _this.props.applicationList.items,
            pagination: {
              pageSize: _this.state.itemsPerPage,
              total: _this.props.applicationList.totalItems || 0,
              current: _this.state.pageNum,
              onChange: _this.onPageChange
            } },
          _react2.default.createElement(_applicationCard2.default, { dataSet: 'application' })
        );
      }
      return _react2.default.createElement(
        'div',
        { className: 'no-items' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('img', { src: 'http://static.careerfrog.com.cn/cf-college/images/no-application.6a5aa1a6.png' })
        ),
        _this.state.type === 'all' && _react2.default.createElement(
          _antd.Button,
          { type: 'primary', className: 'apply-btn', onClick: _this.gotoDeliver },
          '\u6295\u9012\u540D\u4F01\u804C\u4F4D'
        )
      );
    };

    _this.state = {
      section: 0,
      itemsPerPage: 10,
      pageNum: 1,
      type: 'all',
      totalItems: 0
    };
    return _this;
  }

  _createClass(Application, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getItems('all');
    }
  }, {
    key: 'getItems',
    value: function getItems(status) {
      var pageNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.pageNum;

      this.setState({
        type: status
      });
      var params = {
        userId: this.props.user.id,
        itemsPerPage: this.state.itemsPerPage,
        pageNum: pageNum
      };
      if (status === 'success') {
        params.checked = 0;
      }
      if (status === 'checked') {
        params.checked = 1;
      }
      this.props.getApplicationList(params);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var redCircleContent = this.redCircle();
      var applicationListContent = this.genApplicationList();
      var navContent = _react2.default.createElement(
        'ul',
        { className: 'tab-list' },
        _react2.default.createElement(
          'li',
          {
            className: this.state.type === 'all' ? 'active' : '',
            onClick: function onClick() {
              return _this2.getItems('all');
            } },
          '\u5168\u90E8\uFF08',
          this.props.totalCount,
          '\uFF09'
        ),
        _react2.default.createElement(
          'li',
          {
            className: this.state.type === 'success' ? 'active' : '',
            onClick: function onClick() {
              return _this2.getItems('success');
            } },
          '\u6295\u9012\u6210\u529F'
        ),
        _react2.default.createElement(
          'li',
          {
            className: this.state.type === 'checked' ? 'active' : '',
            onClick: function onClick() {
              return _this2.getItems('checked');
            } },
          '\u88AB\u67E5\u770B ',
          redCircleContent
        )
      );

      return _react2.default.createElement(
        'section',
        { className: 'application-page' },
        _react2.default.createElement(
          'h1',
          { className: 'title-tip' },
          '\u6295\u9012\u8FDB\u7A0B'
        ),
        _react2.default.createElement(
          'p',
          { className: 'warn-tip' },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-icon-zhuyi-' })
          ),
          '\u6C42\u804C\u5B66\u5802\u4E0E\u4F01\u4E1AHR\u5EFA\u7ACB\u5408\u4F5C\u5173\u7CFB\uFF0C\u5728\u6C42\u804C\u5B66\u5802\u5E73\u53F0\u6295\u9012\u7684\u804C\u4F4D\uFF0C\u7B80\u5386\u5C06\u76F4\u8FBEHR\u90AE\u7BB1\uFF01'
        ),
        navContent,
        _react2.default.createElement(
          'div',
          { className: 'progress-wrap' },
          applicationListContent
        )
      );
    }
  }]);

  return Application;
}(_react.Component);

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    user: store.user,
    applicationList: store.userApplications.applicationList,
    totalCount: store.userApplications.totalCount
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getApplicationList: function getApplicationList(params) {
      dispatch((0, _account.getApplicationList)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(Application);