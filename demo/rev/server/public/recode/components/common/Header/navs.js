'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _danmuSwitch = require('./danmu-switch');

var _danmuSwitch2 = _interopRequireDefault(_danmuSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navs = function (_React$Component) {
  _inherits(Navs, _React$Component);

  function Navs(props) {
    _classCallCheck(this, Navs);

    var _this = _possibleConstructorReturn(this, (Navs.__proto__ || Object.getPrototypeOf(Navs)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Navs, [{
    key: 'render',
    value: function render() {
      var navList = this.props.navs.map(function (n) {
        return _react2.default.createElement(
          'li',
          { key: n.to, className: 'kit' },
          _react2.default.createElement(
            _reactRouterDom.NavLink,
            { activeClassName: 'active', to: n.to },
            n.name
          ),
          n.to === '/interview_material' && _react2.default.createElement('img', { src: 'http://static.careerfrog.com.cn/cf-college/images/interview-material/kit.e2f8d7af.png' })
        );
      });

      return _react2.default.createElement(
        'ul',
        { className: 'clearfix nav' },
        navList,
        _danmuSwitch2.default && _react2.default.createElement(_danmuSwitch2.default, null)
      );
    }
  }]);

  return Navs;
}(_react2.default.Component);

exports.default = Navs;