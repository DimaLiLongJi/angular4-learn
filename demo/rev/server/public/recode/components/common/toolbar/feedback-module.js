'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _picturesWall = require('./pictures-wall');

var _picturesWall2 = _interopRequireDefault(_picturesWall);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = _antd.Input.TextArea;

var FormItem = _antd.Form.Item;

var FeedbackModule = function (_Component) {
  _inherits(FeedbackModule, _Component);

  function FeedbackModule(props) {
    _classCallCheck(this, FeedbackModule);

    var _this = _possibleConstructorReturn(this, (FeedbackModule.__proto__ || Object.getPrototypeOf(FeedbackModule)).call(this, props));

    _this.openFeedbackModal = function () {
      _this.setState({
        isFeedbackModalOpen: true,
        isFeedbackSuccess: false
      });
    };

    _this.closeFeedbackModal = function () {
      _this.setState({
        isFeedbackModalOpen: false,
        isFeedbackSuccess: false
      });
    };

    _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.props.form.validateFields(function (err, values) {
        var uploadError = values && values.uploads.find(function (upload) {
          return upload.status === 'error';
        });
        if (!err && !uploadError) {
          fetch('/api/users/feedback', {
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
              comment: values.comment,
              email: values.email,
              attachments: values.uploads && values.uploads.map(function (upload) {
                return _this.context.config.CF_FILE_BASE_URL + '/' + upload.response[0].id + '?originalName=' + encodeURIComponent(upload.response[0].originalName);
              })
            })
          }).then(function () {
            _this.setState({
              isFeedbackSuccess: true
            });
            _this.props.form.resetFields();
          });
          console.log('values', values);
        }
      });
    };

    _this.state = {
      isFeedbackModalOpen: false
    };
    return _this;
  }

  _createClass(FeedbackModule, [{
    key: 'render',
    value: function render() {
      var getFieldDecorator = this.props.form.getFieldDecorator;

      var feedbackModal = _react2.default.createElement(
        _antd.Form,
        { className: 'user-feedback-form',
          style: {
            display: this.state.isFeedbackModalOpen ? 'block' : 'none'
          }, onSubmit: this.handleSubmit,
          name: 'feedbackForm', noValidate: true },
        _react2.default.createElement(
          'div',
          { className: 'feedback-form-header' },
          _react2.default.createElement(
            'svg',
            { className: 'icon close-feedback-btn', onClick: this.closeFeedbackModal },
            _react2.default.createElement('use', { xlinkHref: '#icon-icon-delete' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'feedback-form-content' },
          _react2.default.createElement(
            'div',
            { className: 'feedback-entry' },
            _react2.default.createElement(
              'div',
              { className: 'feedback-entry-title' },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '\u4F60\u7684\u5EFA\u8BAE\u548C\u5410\u69FD'
                )
              )
            ),
            _react2.default.createElement(
              FormItem,
              null,
              getFieldDecorator('comment', {
                rules: [{ required: true, message: '必填' }, { max: 300, message: '字数不超过300字' }]
              })(_react2.default.createElement(TextArea, {
                className: 'feedback-input comment',
                name: 'comment',
                autosize: { minRows: 5, maxRows: 6 },
                placeholder: '\u4EB2\u7231\u7684\u7528\u6237\u4F60\u597D\uFF0C\u5982\u679C\u4F60\u5BF9\u6211\u4EEC\u7F51\u7AD9\u6709\u4EFB\u4F55\u7684\u7591\u95EE\u6216\u5EFA\u8BAE\uFF0C\u90FD\u53EF\u4EE5\u544A\u8BC9\u6211\u4EEC\u3002\u62B1\u6B49\u6211\u4EEC\u65E0\u6CD5\u9010\u4E00\u56DE\u590D\uFF0C\u4F46\u6211\u4EEC\u4E00\u5B9A\u4F1A\u8BA4\u771F\u9605\u8BFB\u3002'
              }))
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'feedback-entry' },
            _react2.default.createElement(
              'div',
              { className: 'feedback-entry-title' },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '\u56FE\u7247\u4E0A\u4F20\uFF08\u6700\u591A\u4E0A\u4F203\u5F20\u56FE\uFF09'
                )
              )
            ),
            _react2.default.createElement(_picturesWall2.default, { getFieldDecorator: getFieldDecorator, uploads: this.props.form.getFieldValue('uploads') })
          ),
          _react2.default.createElement(
            'div',
            { className: 'feedback-entry' },
            _react2.default.createElement(
              'div',
              { className: 'feedback-entry-title' },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '\u8054\u7CFB\u90AE\u7BB1'
                )
              )
            ),
            _react2.default.createElement(
              FormItem,
              null,
              getFieldDecorator('email', {
                rules: [{ pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '格式不对' }]
              })(_react2.default.createElement(_antd.Input, { className: 'feedback-input', name: 'email', placeholder: '\u4F60\u53EF\u4EE5\u5728\u6B64\u8F93\u5165\u90AE\u7BB1\u65B9\u4FBF\u6211\u4EEC\u8054\u7CFB\u4F60', autoComplete: 'off' }))
            )
          ),
          _react2.default.createElement(
            _antd.Button,
            { className: 'feedback-btn', htmlType: 'submit' },
            ' \u7559\u8A00 '
          ),
          _react2.default.createElement(
            'div',
            { className: 'feedback-success', style: {
                display: this.state.isFeedbackSuccess ? 'block' : 'none'
              } },
            _react2.default.createElement('div', { className: 'little-sister' }),
            _react2.default.createElement(
              'div',
              null,
              '\u6211\u4EEC\u5DF2\u7ECF\u6536\u5230\u4F60\u7684\u53CD\u9988\uFF0C\u540E\u671F\u4F1A\u7528\u90AE\u7BB1\u56DE\u590D\u4F60\u3002',
              _react2.default.createElement('br', null),
              '\u611F\u8C22\u4F60\u7684\u5B9D\u8D35\u5EFA\u8BAE\u3002'
            )
          )
        )
      );
      return _react2.default.createElement(
        'div',
        { className: 'feedback-widget' },
        _react2.default.createElement(
          'div',
          { className: 'open-feedback-btn', onClick: this.openFeedbackModal },
          _react2.default.createElement('a', { href: 'javascript:;', className: 'btn' })
        ),
        feedbackModal
      );
    }
  }]);

  return FeedbackModule;
}(_react.Component);

FeedbackModule.propTypes = {};
FeedbackModule.contextTypes = {
  config: _propTypes2.default.object
};


var WrappedFeedbackModule = _antd.Form.create()(FeedbackModule);

exports.default = WrappedFeedbackModule;