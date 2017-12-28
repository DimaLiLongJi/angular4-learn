'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _danmu = require('../../../actions/danmu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = function (_Component) {
  _inherits(Controller, _Component);

  function Controller(props) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this, props));

    _this.track = function () {
      var tracking = setInterval(function () {
        var progress = sessionStorage.getItem('animProgress');
        // console.log(progress);
        _this.setState({
          progress: progress || 0
        });
      }, 500);
      _this.setState({
        tracking: tracking
      });
    };

    _this.retrack = function () {
      clearTimeout(_this.state.retracking);
      _this.setState({
        retracking: setTimeout(_this.track, 1000)
      });
    };

    _this.toggleStatus = function () {
      var animationStatus = 1 - _this.state.animationStatus;
      _this.props.toggleAnim(animationStatus);
      _this.setState({
        animationStatus: animationStatus
      });
    };

    _this.handleChange = function (evt) {
      // console.log('on progress change');
      clearInterval(_this.state.tracking);
      _this.props.seekAnim(evt.target.value);
      _this.setState({
        progress: evt.target.value
      });
      _this.retrack();
    };

    _this.state = {
      progress: sessionStorage.getItem('animProgress') || 0,
      tracking: false,
      retracking: false,
      animationStatus: 1
    };
    return _this;
  }

  _createClass(Controller, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (global.window) {
        this.track();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.state.tracking);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'danmu-control-container', onBlur: this.props.hide },
        _react2.default.createElement('input', { className: 'progress', step: '0.1', type: 'range', min: '0', max: '100',
          value: this.state.progress, onChange: this.handleChange }),
        this.state.animationStatus ? _react2.default.createElement(
          'a',
          { href: 'javascript:;', target: '_blank', className: 'btn', onClick: this.toggleStatus },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-zanting' })
          )
        ) : _react2.default.createElement(
          'a',
          { href: 'javascript:;', target: '_blank', className: 'btn active', onClick: this.toggleStatus },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-bofang-' })
          )
        ),
        _react2.default.createElement(
          'a',
          { href: '/pc/question', target: '_blank', className: 'btn' },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-sousuo-' })
          )
        ),
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', className: 'btn', onClick: this.props.askQuestion },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-dangewenti-' })
          )
        )
      );
    }
  }]);

  return Controller;
}(_react.Component);

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    userId: store.user.id
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    submitQuestion: function submitQuestion(params) {
      dispatch((0, _danmu.submitQuestion)(params));
    },
    updateAnimProgress: function updateAnimProgress(params) {
      dispatch((0, _danmu.updateAnimProgress)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(Controller);