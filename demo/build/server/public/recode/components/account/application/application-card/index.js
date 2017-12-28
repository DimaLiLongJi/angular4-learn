'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplicationCard = function (_Component) {
  _inherits(ApplicationCard, _Component);

  function ApplicationCard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ApplicationCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ApplicationCard.__proto__ || Object.getPrototypeOf(ApplicationCard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      show: false,
      checkedAt: _this.props.application && _this.props.application.checkedAt ? (0, _moment2.default)(_this.props.application.checkedAt).format('YYYY-MM-DD HH:mm:ss') : '',
      createdAt: _this.props.application && _this.props.application.createdAt ? (0, _moment2.default)(_this.props.application.createdAt).format('YYYY-MM-DD HH:mm:ss') : ''
    }, _this.showArrow = function () {
      if (_this.state.show) {
        return _react2.default.createElement(
          'svg',
          { className: 'icon', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { xlinkHref: '#icon-yuanjiantoushang' })
        );
      } else {
        return _react2.default.createElement(
          'svg',
          { className: 'icon', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { xlinkHref: '#icon-yuanjiantouxia' })
        );
      }
    }, _this.showDetail = function () {
      if (_this.state.show) {
        return _react2.default.createElement(
          'div',
          { className: 'detail' },
          _react2.default.createElement('div', { className: 'yellow-circle' }),
          ' ',
          _this.state.createdAt,
          _react2.default.createElement(
            'div',
            { className: 'status border-left' },
            '\u6295\u9012\u6210\u529F'
          ),
          _react2.default.createElement('div', { className: 'yellow-circle' }),
          ' ',
          _this.state.checkedAt,
          _react2.default.createElement(
            'div',
            { className: 'status' },
            'HR\u67E5\u770B\u4E86\u4F60\u7684\u7B80\u5386'
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'tip' },
              '\u6E29\u99A8\u63D0\u793A\uFF1A\u82E5\u7B80\u5386\u901A\u8FC7\u5BA1\u6838\uFF0CHR\u5C06\u76F4\u63A5\u4E0E\u4F60\u8054\u7CFB\u3002\u82E5\u672A\u8054\u7CFB\uFF0C\u53EF\u4EE5\u518D\u8BD5\u8BD5\u5176\u4ED6\u673A\u4F1A\u54E6~'
            ),
            _react2.default.createElement(
              'button',
              { type: 'button', name: 'button', className: 'fold-btn', onClick: _this.showDetailFun },
              '\u6536\u8D77'
            )
          )
        );
      }
    }, _this.showDetailFun = function () {
      _this.setState({
        show: !_this.state.show
      });
    }, _this.status = function () {
      if (_this.props.application.checkedAt) {
        return _react2.default.createElement(
          'span',
          { className: 'status pull-right pointer', onClick: _this.showDetailFun },
          _react2.default.createElement(
            'span',
            null,
            '\u88AB\u67E5\u770B'
          ),
          _this.showArrow()
        );
      } else {
        return _react2.default.createElement(
          'span',
          { className: 'status pull-right' },
          _react2.default.createElement(
            'span',
            null,
            '\u6295\u9012\u6210\u529F'
          )
        );
      }
    }, _this.locations = function (list) {
      return list.map(function (l) {
        return _react2.default.createElement(
          'span',
          { key: l.id },
          l.name
        );
      });
    }, _this.resumes = function (list) {
      return list.map(function (l) {
        return _react2.default.createElement(
          'li',
          { key: l.id },
          l.originalName
        );
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ApplicationCard, [{
    key: 'render',
    value: function render() {
      if (!this.props.application) {
        return null;
      }
      var showDetailContent = this.showDetail();
      var statusContent = this.status();
      return _react2.default.createElement(
        'div',
        { className: 'progress-block' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _reactRouterDom.NavLink,
            { to: '/opportunity_detail/' + this.props.application.opportunity.id, className: 'position-name' },
            this.props.application.opportunity.position
          ),
          _react2.default.createElement(
            'span',
            { className: 'datetime' },
            this.state.checkedAt ? this.state.checkedAt : this.state.createdAt
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row content-wrap' },
          _react2.default.createElement(
            'span',
            { className: 'company' },
            this.props.application.opportunity.company.name
          ),
          _react2.default.createElement(
            'span',
            { className: 'location' },
            _react2.default.createElement(
              'svg',
              { className: 'icon', 'aria-hidden': 'true' },
              _react2.default.createElement('use', { xlinkHref: '#icon-zuobiao' })
            ),
            this.locations(this.props.application.opportunity.locations)
          ),
          statusContent
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'pull-left' },
            '\u6295\u9012\u7B80\u5386\uFF1A'
          ),
          _react2.default.createElement(
            'ul',
            { className: 'resume-list' },
            this.resumes(this.props.application.resumes)
          )
        ),
        showDetailContent
      );
    }
  }]);

  return ApplicationCard;
}(_react.Component);

ApplicationCard.propTypes = {
  application: _propTypes2.default.object
};
;

exports.default = ApplicationCard;