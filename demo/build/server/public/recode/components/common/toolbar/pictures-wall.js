'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;

var PicturesWall = function (_React$Component) {
  _inherits(PicturesWall, _React$Component);

  function PicturesWall() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PicturesWall);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PicturesWall.__proto__ || Object.getPrototypeOf(PicturesWall)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }, _this.handleCancel = function () {
      return _this.setState({ previewVisible: false });
    }, _this.handlePreview = function (file) {
      _this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    }, _this.normFile = function (e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PicturesWall, [{
    key: 'render',
    value: function render() {
      if (!global.window) return null;
      var _state = this.state,
          previewVisible = _state.previewVisible,
          previewImage = _state.previewImage;

      var getFieldDecorator = this.props.getFieldDecorator;
      var uploadButton = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'plus' }),
        _react2.default.createElement(
          'div',
          { className: 'ant-upload-text' },
          '\u4E0A\u4F20'
        )
      );
      return _react2.default.createElement(
        FormItem,
        { className: 'clearfix' },
        getFieldDecorator('uploads', {
          valuePropName: 'fileList',
          getValueFromEvent: this.normFile
        })(_react2.default.createElement(
          _antd.Upload,
          {
            action: this.context.config.CF_FILE_BASE_URL,
            listType: 'picture-card',
            name: 'files',
            onPreview: this.handlePreview
          },
          this.props.uploads && this.props.uploads.length >= 3 ? null : uploadButton
        )),
        _react2.default.createElement(
          _antd.Modal,
          { visible: previewVisible, footer: null, onCancel: this.handleCancel },
          _react2.default.createElement('img', {
            alt: 'example',
            style: {
              width: '100%'
            },
            src: previewImage })
        )
      );
    }
  }]);

  return PicturesWall;
}(_react2.default.Component);

PicturesWall.contextTypes = {
  config: _propTypes2.default.object
};
exports.default = PicturesWall;