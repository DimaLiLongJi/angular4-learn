'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _reactRouterDom = require('react-router-dom');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationLink = function (_React$Component) {
  _inherits(PaginationLink, _React$Component);

  function PaginationLink() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PaginationLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaginationLink.__proto__ || Object.getPrototypeOf(PaginationLink)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (page) {
      _this.props.onChange(page);
      if (_this.props.dontChangeUrl) return;
      _this.props.history.push('?pageNum=' + page);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PaginationLink, [{
    key: 'render',
    value: function render() {
      var newProps = _extends({}, this.props, {
        itemRender: itemRender,
        onChange: this.onChange
      });
      return _react2.default.createElement(_antd.Pagination, newProps);
    }
  }]);

  return PaginationLink;
}(_react2.default.Component);

function itemRender(page, type, originalElement) {
  var search = '?pageNum=' + page;
  if (type === 'page') {
    return _react2.default.createElement(
      _reactRouterDom.NavLink,
      { to: search },
      page
    );
  }
  return originalElement;
}

exports.default = (0, _reactRouter.withRouter)(PaginationLink);