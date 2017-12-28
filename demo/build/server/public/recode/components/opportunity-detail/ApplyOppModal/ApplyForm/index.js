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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _antd = require('antd');

var _Lable = require('./Lable');

var _Lable2 = _interopRequireDefault(_Lable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;
var Option = _antd.Select.Option;

var RegistrationForm = function (_React$Component) {
  _inherits(RegistrationForm, _React$Component);

  function RegistrationForm(props) {
    _classCallCheck(this, RegistrationForm);

    var _this = _possibleConstructorReturn(this, (RegistrationForm.__proto__ || Object.getPrototypeOf(RegistrationForm)).call(this, props));

    _this.removeDetetedResume = function (resumes, attachmentIds) {
      if (resumes && attachmentIds.length) {
        var filtered = attachmentIds.filter(function (id) {
          return resumes.some(function (r) {
            return r.id === id;
          });
        });
        if (filtered.length !== attachmentIds.length) {
          _this.props.updateApplyInfo({
            attachmentIds: [].concat(_toConsumableArray(filtered))
          });
        }
      }
    };

    _this.previewResume = function (resume) {
      var pathUrl = '/resumes/' + resume.fileId + '/preview?fileName=' + encodeURIComponent(resume.originalName);
      window.open(pathUrl, '_blank');
    };

    _this.handleSubmit = function (e) {
      var _p = _this.props;
      e.preventDefault();
      _p.form.validateFieldsAndScroll(function (err, values) {
        if (err) return;
        _this.setState({
          loadingStatus: true
        });
        _this.props.toggleModal();
        _this.props.toggleSuccessModal();
        _p.applyOpp(_p.applyInfo);
      });
    };

    _this.selectPrefix = function (value) {
      if (value === 1) {
        _this.setState({
          mobileReg: /^1[34578]{1}\d{9}$/
        }, function () {
          _this.props.form.validateFields(['mobile'], {
            force: true
          });
        });
      } else {
        _this.setState({
          mobileReg: /^\d+$/
        }, function () {
          _this.props.form.validateFields(['mobile'], {
            force: true
          });
        });
      }
    };

    _this.handleSaveResume = function (file) {
      _this.props.saveResume({
        createdBy: _this.props.user.id,
        fileId: file.id,
        originalName: file.originalName,
        type: "resume",
        userId: _this.props.user.id
      });
    };

    _this.handleUploadResume = function (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file);
      }
      if (info.file.status === 'done') {
        _this.handleSaveResume(info.file.response[0]);
      } else if (info.file.status === 'error') {
        _antd.message.error(info.file.name + ' file upload failed.');
      }
    };

    _this.beforeUpload = function (file) {
      if (file.size / (1024 * 1024) > 4) {
        _antd.message.error('\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u5927\u4E8E4M');
        return false;
      }
    };

    _this.deleteResume = function (resume) {
      var _p = _this.props;
      _p.updateApplyInfo({
        attachmentIds: _p.applyInfo.attachmentIds.filter(function (id) {
          return id !== resume.id;
        })
      });
      _p.deleteResume({
        userId: resume.userId,
        attachmentId: resume.id
      });
    };

    _this.state = {
      loadingStatus: false,
      mobileReg: props.applyInfo.prefixId === 1 ? /^1[34578]{1}\d{9}$/ : /^\d+$/
    };
    return _this;
  }

  _createClass(RegistrationForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.removeDetetedResume(this.props.resumes, this.props.applyInfo.attachmentIds);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_np) {
      var _p = this.props;
      var attachmentIds = _p.applyInfo.attachmentIds;
      this.removeDetetedResume(_np.resumes, attachmentIds);
      if (_np.applyInfo.attachmentIds.length < _p.applyInfo.attachmentIds.length) {
        this.props.form.setFieldsValue({
          attachmentIds: _np.applyInfo.attachmentIds
        });
        this.props.form.validateFields(['attachmentIds'], {
          force: true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _p = this.props;
      var resumes = _p.resumes,
          prefixs = _p.prefixs,
          applyInfo = _p.applyInfo;

      if (applyInfo.attachmentIds) {
        applyInfo.attachmentIds = applyInfo.attachmentIds.filter(function (attaId) {
          return resumes.some(function (resume) {
            return resume.id === attaId;
          });
        });
      }
      var getFieldDecorator = _p.form.getFieldDecorator;

      var prefixSelector = getFieldDecorator('prefixId', {
        initialValue: applyInfo.prefixId
      })(_react2.default.createElement(
        _antd.Select,
        { style: { width: 110 }, onChange: this.selectPrefix },
        prefixs.map(function (prefix, index) {
          return _react2.default.createElement(
            Option,
            { key: prefix.name, value: prefix.id },
            '+' + prefix.value + ' ' + prefix.name
          );
        })
      ));

      var uploadProps = {
        accept: '.pdf,.doc,.docx',
        name: 'files',
        action: this.context.config.CF_FILE_BASE_URL,
        text: '上传简历',
        beforeUpload: this.beforeUpload,
        onChange: this.handleUploadResume,
        showUploadList: false
      };

      return _react2.default.createElement(
        _antd.Form,
        { onSubmit: this.handleSubmit, hideRequiredMark: true, className: 'apply-form' },
        _react2.default.createElement(
          _antd.Row,
          { align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 6, offset: 1 },
            _react2.default.createElement(_Lable2.default, { text: '\u8BF7\u8F93\u5165\u90AE\u4EF6\u6807\u9898', fontclass: '#icon-pen-' })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 13 },
            _react2.default.createElement(
              FormItem,
              { className: 'customize-title-style' },
              getFieldDecorator('title', {
                initialValue: applyInfo.title,
                rules: [{ required: true, message: '请输入邮件标题！', whitespace: true }]
              })(_react2.default.createElement(_antd.Input, null))
            )
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'title-tips' },
          _react2.default.createElement(
            _antd.Col,
            { span: 13, offset: 7, className: 'tips' },
            '\u8BF7\u8F93\u5165\u59D3\u540D+\u5B66\u6821+\u4E13\u4E1A+\u6BD5\u4E1A\u65F6\u95F4'
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'title-tips' },
          _react2.default.createElement(
            _antd.Col,
            { span: 13, offset: 7, className: 'tips' },
            '\u4F8B\uFF1A\u5F20\u4E09+\u6E05\u534E\u5927\u5B66+\u98DF\u54C1\u5DE5\u7A0B+2017\u5E747\u6708\u6BD5\u4E1A'
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { align: 'middle', className: 'selet-resume' },
          _react2.default.createElement(
            _antd.Col,
            { span: 6, offset: 1 },
            _react2.default.createElement(_Lable2.default, { text: '\u8BF7\u9009\u62E9\u4F60\u8981\u6295\u9012\u7684\u7B80\u5386', fontclass: '#icon-shubiao-' })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 6, offset: 1 },
            _react2.default.createElement(
              'p',
              { className: 'tip' },
              '\u4EC5\u652F\u6301word/pdf\u683C\u5F0F'
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 6, offset: 3 },
            _react2.default.createElement(
              _antd.Upload,
              uploadProps,
              _react2.default.createElement(
                _antd.Button,
                { className: 'upload-btn', type: 'primary' },
                uploadProps.text
              )
            )
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { span: 6 },
          _react2.default.createElement(
            FormItem,
            { className: (0, _classnames2.default)('customize-checkbox-style', {
                'no-resume': !resumes || !resumes.length
              }),
              validateStatus: this.state.resumeStatus },
            getFieldDecorator('attachmentIds', {
              initialValue: applyInfo.attachmentIds,
              rules: [{
                type: 'limit',
                validator: function validator(rule, value, callback, source, options) {
                  var error = [];
                  if (!value.length) {
                    error.push('请选择1~2份简历！');
                  }
                  callback(error);
                }
              }]
            })(_react2.default.createElement(
              _antd.Checkbox.Group,
              null,
              !!resumes && resumes.map(function (resume) {
                return _react2.default.createElement(
                  _antd.Row,
                  { key: resume.id, className: 'resume-line' },
                  _react2.default.createElement(
                    _antd.Checkbox,
                    {
                      disabled: applyInfo.attachmentIds.length >= 2 && applyInfo.attachmentIds.every(function (fileId) {
                        return fileId !== resume.id;
                      }),
                      value: resume.id
                    },
                    resume.originalName
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'actions' },
                    _react2.default.createElement(
                      'a',
                      { href: 'javascript:;', onClick: function onClick() {
                          return _this2.previewResume(resume);
                        } },
                      '\u9884\u89C8'
                    ),
                    '|',
                    _react2.default.createElement(
                      'a',
                      { href: 'javascript:;', onClick: function onClick() {
                          return _this2.deleteResume(resume);
                        } },
                      '\u5220\u9664'
                    )
                  )
                );
              })
            ))
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 6, offset: 1 },
            _react2.default.createElement(_Lable2.default, { text: '\u8BF7\u8F93\u5165\u4F60\u7684\u624B\u673A', fontclass: '#icon-pen-' })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 13 },
            _react2.default.createElement(
              FormItem,
              null,
              getFieldDecorator('mobile', {
                initialValue: applyInfo.mobile,
                rules: [{
                  pattern: this.state.mobileReg,
                  message: '请输入正确的手机号！'
                }, {
                  required: true, message: '请输入手机号！'
                }]
              })(_react2.default.createElement(_antd.Input, { addonBefore: prefixSelector, style: { width: '100%' } }))
            )
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 6, offset: 1 },
            _react2.default.createElement(_Lable2.default, { text: '\u8BF7\u8F93\u5165\u4F60\u7684\u90AE\u7BB1', fontclass: '#icon-pen-' })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 13 },
            _react2.default.createElement(
              FormItem,
              null,
              getFieldDecorator('email', {
                initialValue: applyInfo.email,
                rules: [{
                  type: 'limit',
                  validator: function validator(rule, value, callback, source, options) {
                    var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
                    var matchEmail = value.match(emailReg) || [];
                    var matchATag = value.match(/@/g) || [];
                    var errors = [];
                    if (!value) {
                      errors.push('请输入邮箱！');
                      callback(errors);
                      return;
                    }
                    if (matchEmail.length > 1 || matchATag.length > 1) {
                      errors.push('仅限填写一个邮箱!');
                      callback(errors);
                      return;
                    }
                    if (!matchEmail.length || /\s/g.test(value)) {
                      errors.push('请输入正确的邮箱！');
                    }
                    callback(errors);
                  }
                }]
              })(_react2.default.createElement(_antd.Input, null))
            )
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'warn-tip' },
          '\u5173\u4E8E\u804C\u4F4D\u7684\u540E\u7EED\u53CD\u9988\u5C06\u901A\u8FC7\u90AE\u7BB1\u901A\u77E5\uFF01\u8BF7\u786E\u8BA4\u8F93\u5165\u65E0\u8BEF\u54E6~'
        ),
        _react2.default.createElement(
          FormItem,
          null,
          _react2.default.createElement(
            _antd.Button,
            { loading: this.state.loadingStatus
              // disabled
              , className: 'apply-btn', type: 'primary', htmlType: 'submit' },
            '\u7ACB\u5373\u6295\u9012'
          )
        )
      );
    }
  }]);

  return RegistrationForm;
}(_react2.default.Component);

RegistrationForm.propTypes = {
  form: _propTypes2.default.object,
  getFieldDecorator: _propTypes2.default.func,
  resumes: _propTypes2.default.array,
  prefixs: _propTypes2.default.array,
  applyInfo: _propTypes2.default.object
};
RegistrationForm.contextTypes = {
  config: _propTypes2.default.object
};
exports.default = _antd.Form.create({
  onFieldsChange: function onFieldsChange(_p, value) {
    if (!Object.keys(value).length) return;
    var key = void 0,
        val = void 0;
    for (var k in value) {
      key = k;
      val = value[k].value;
    }
    var newParams = _extends({}, _p.applyInfo, _defineProperty({}, key, val));
    _p.updateApplyInfo(newParams);
  }
})(RegistrationForm);