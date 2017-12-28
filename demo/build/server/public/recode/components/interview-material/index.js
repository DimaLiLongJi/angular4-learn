'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _all = require('./all');

var _all2 = _interopRequireDefault(_all);

var _detail = require('./detail');

var _detail2 = _interopRequireDefault(_detail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Material = function (_React$Component) {
  _inherits(Material, _React$Component);

  function Material() {
    _classCallCheck(this, Material);

    return _possibleConstructorReturn(this, (Material.__proto__ || Object.getPrototypeOf(Material)).apply(this, arguments));
  }

  _createClass(Material, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'body-content Material' },
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            '\u8D44\u6599\u4E2D\u5FC3_\u6C42\u804C\u5B66\u5802'
          ),
          _react2.default.createElement('meta', { name: 'description', content: '\u516B\u5927\u884C\u4E1A\u72EC\u5BB6\u6700\u65B0\u8D44\u6599\uFF0C\u5165\u804C\u7A8D\u95E8\u6D41\u7A0B\u5168\u89E3\u6790' }),
          _react2.default.createElement('meta', { name: 'keywords', content: '\u5165\u884C\u8D44\u6599,\u7B14\u7ECF,\u9762\u7ECF,\u6C42\u804C\u9526\u56CA,\u9762\u8BD5\u7ECF\u9A8C,\u6C42\u804C\u793C\u5305,\u5165\u804C\u51C6\u5907,\u54A8\u8BE2,\u6295\u884C\u5238\u5546,\u56DB\u5927,\u57FA\u91D1\u7BA1\u7406,\u5FEB\u6D88,\u94F6\u884C,\u4E92\u8054\u7F51,\u623F\u5730\u4EA7' })
        ),
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/interview_material', component: _all2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/interview_material/:industryId', component: _detail2.default })
        )
      );
    }
  }]);

  return Material;
}(_react2.default.Component);

exports.default = Material;