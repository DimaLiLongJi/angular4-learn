'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _danmu = require('../../../actions/danmu');

var danmuActions = _interopRequireWildcard(_danmu);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var labels = {
  checkedLabel: '弹幕开启',
  uncheckedLabel: '弹幕已关闭'
};

var Navs = function (_React$Component) {
  _inherits(Navs, _React$Component);

  function Navs(props) {
    _classCallCheck(this, Navs);

    var _this = _possibleConstructorReturn(this, (Navs.__proto__ || Object.getPrototypeOf(Navs)).call(this, props));

    _this.toggle = function () {
      var danmuOn = !_this.props.danmuOn;
      _this.setState({
        danmuOn: danmuOn,
        label: danmuOn ? labels.checkedLabel : labels.uncheckedLabel
      });
      setTimeout(_this.props.toggleDanmu, 400);
    };

    _this.state = {
      danmuOn: _this.props.danmuOn,
      label: _this.props.danmuOn ? labels.checkedLabel : labels.uncheckedLabel
    };
    return _this;
  }

  _createClass(Navs, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'li',
        { className: 'swich-wrap' },
        _react2.default.createElement(_antd.Switch, { checked: this.state.danmuOn, onChange: this.toggle }),
        _react2.default.createElement(
          'strong',
          null,
          this.state.label
        )
      );
    }
  }]);

  return Navs;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    danmuOn: state.danmu.danmuOn,
    label: state.danmu.label
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleDanmu: function toggleDanmu() {
      dispatch(danmuActions.toggleDanmu());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Navs);