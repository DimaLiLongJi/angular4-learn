'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _material = require('../../../../actions/material');

var Actions = _interopRequireWildcard(_material);

var _utils = require('../../../../utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreService = function (_Component) {
  _inherits(PreService, _Component);

  function PreService(props) {
    _classCallCheck(this, PreService);

    var _this = _possibleConstructorReturn(this, (PreService.__proto__ || Object.getPrototypeOf(PreService)).call(this, props));

    _this.download = function (preService, event) {
      if (!_this.props.userId) {
        event.stopPropagation();
        _this.context.openLoginModal();
        return;
      }
      preService.download = _this.context.config.CF_FILE_BASE_URL + '/' + preService.fileId + '?originalName=' + encodeURIComponent(preService.fileName) + '&download=1';
      window.location.href = preService.download;
      _this.setState({
        downloadCount: _this.state.downloadCount + 1
      });
      _this.props.countDownloadMaterial(preService.id);
    };

    _this.gotoPreview = function (preService) {
      if (!preService) return;
      _this.props.countViewMaterial(preService.id);
      _this.setState({
        viewCount: _this.state.viewCount + 1
      });
      var pathUrl = '/materials/' + preService.fileId + '/preview?fileName=' + encodeURIComponent(preService.fileName) + '&hd=1';
      window.open(pathUrl, '_blank');
    };

    _this.state = _extends({}, _this.props.preService);
    return _this;
  }

  _createClass(PreService, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'preservice' },
        _react2.default.createElement(
          'div',
          { className: 'cover' },
          ''
        ),
        _react2.default.createElement('img', { className: 'cover', src: this.state.cover, alt: '', onClick: function onClick() {
            return _this2.gotoPreview(_this2.state);
          } }),
        _react2.default.createElement(
          'dl',
          { className: 'info' },
          _react2.default.createElement(
            'dt',
            { className: 'multiline-nowrap', onClick: function onClick() {
                return _this2.gotoPreview(_this2.state);
              } },
            this.state.fileName
          ),
          _react2.default.createElement(
            'dd',
            { className: 'author' },
            '\u4F5C\u8005\uFF1A\u6C42\u804C\u5B66\u5802\u56E2\u961F'
          ),
          _react2.default.createElement(
            'dd',
            null,
            '\u66F4\u65B0\uFF1A',
            (0, _utils.fd)(this.state.updatedAt)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'summary' },
          _react2.default.createElement(
            'p',
            { className: 'multiline-nowrap' },
            this.state.summary
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'tool' },
          _react2.default.createElement(
            'span',
            { className: 'view-count' },
            _react2.default.createElement(
              'svg',
              { className: 'icon', 'aria-hidden': 'true' },
              _react2.default.createElement('use', { xlinkHref: '#icon-icon-yulan-' })
            ),
            this.state.viewCount,
            '\u6B21\u9605\u8BFB'
          ),
          _react2.default.createElement(
            'button',
            { className: 'preview-btn', onClick: function onClick() {
                return _this2.gotoPreview(_this2.state);
              } },
            '\u9884\u89C8'
          ),
          _react2.default.createElement(
            'button',
            { className: 'download-btn', onClick: function onClick(event) {
                return _this2.download(_this2.state, event);
              } },
            '\u7ACB\u5373\u4E0B\u8F7D'
          )
        )
      );
    }
  }]);

  return PreService;
}(_react.Component);

PreService.propTypes = {
  preService: _propTypes2.default.object,
  userId: _propTypes2.default.number,
  countDownloadMaterial: _propTypes2.default.func,
  countViewMaterial: _propTypes2.default.func
};
PreService.contextTypes = {
  openLoginModal: _propTypes2.default.func,
  config: _propTypes2.default.object
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    userId: state.user.id
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    countViewMaterial: function countViewMaterial(params) {
      dispatch(Actions.countViewMaterial(params));
    },
    countDownloadMaterial: function countDownloadMaterial(params) {
      dispatch(Actions.countDownloadMaterial(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PreService);