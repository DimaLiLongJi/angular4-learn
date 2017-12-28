'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _account = require('../../../actions/account');

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resume = function (_Component) {
  _inherits(Resume, _Component);

  function Resume(props) {
    _classCallCheck(this, Resume);

    var _this = _possibleConstructorReturn(this, (Resume.__proto__ || Object.getPrototypeOf(Resume)).call(this, props));

    _this.gotoPreview = function (resume) {
      var pathUrl = '/resumes/' + resume.fileId + '/preview?fileName=' + encodeURIComponent(resume.originalName);
      window.open(pathUrl, '_blank');
    };

    _this.openResumeModal = function (resume) {
      _this.setState({ visible: true, resumeId: resume.id });
    };

    _this.handleOk = function (e) {
      _this.props.removeResume({ userId: _this.props.userId, resumeId: _this.state.resumeId });
      _this.setState({ visible: false, resumeId: null });
    };

    _this.handleCancel = function (e) {
      _this.setState({ visible: false });
    };

    _this.handleCancelError = function (e) {
      _this.setState({ errorVisible: false });
    };

    _this.handleSaveResume = function (file) {
      _this.props.saveResume({ createdBy: _this.props.userId, fileId: file.id, originalName: file.originalName, type: "resume", userId: _this.props.userId });
    };

    _this.beforeUpload = function (file) {
      if (file.size / (1024 * 1024) > 4) {
        // message.error(`文件大小不能大于4M`);
        _this.setState({
          errorVisible: true
        });
        return false;
      }
    };

    _this.handleUpdateResume = function (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        _this.handleSaveResume(info.file.response[0]);
      } else if (info.file.status === 'error') {
        _antd.message.error(info.file.name + ' file upload failed.');
      }
    };

    _this.state = {
      visible: false,
      errorVisible: false,
      resumeId: null
    };
    if (_this.props.resumeList.length === 0) {
      _this.props.getResumeList({ userId: _this.props.userId });
    }
    return _this;
  }

  _createClass(Resume, [{
    key: 'componnetWillReceiveProps',
    value: function componnetWillReceiveProps(nextProps) {
      console.log('nextProps', nextProps);
      if (nextProps.resumeList.length !== this.props.resumeList.length) {
        this.props.getResumeList({ userId: this.props.userId });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var resumeExist = this.props.resumeList.length > 0;
      var resumeListContent = this.props.resumeList.map(function (r) {
        return _react2.default.createElement(
          'div',
          { className: 'resume-wrap clearfix', key: r.id },
          _react2.default.createElement('div', { className: 'resume-img' }),
          _react2.default.createElement(
            'div',
            { className: 'resume-show' },
            _react2.default.createElement(
              'p',
              { className: 'resume-name' },
              r.originalName
            ),
            _react2.default.createElement(
              'div',
              { className: 'btn-wrap' },
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return _this2.gotoPreview(r);
                  }, className: 'preview-btn' },
                '\u9884\u89C8'
              ),
              '|',
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return _this2.openResumeModal(r);
                  }, className: 'delete-btn' },
                '\u5220\u9664'
              )
            )
          )
        );
      });

      var uploadProps = {
        accept: '.pdf,.doc,.docx',
        name: 'files',
        action: this.context.config.CF_FILE_BASE_URL,
        text: '一键上传简历',
        beforeUpload: this.beforeUpload,
        onChange: this.handleUpdateResume,
        showUploadList: false
      };

      var modalProps = {
        title: "提示",
        visible: this.state.visible,
        onCancel: this.handleCancel,
        wrapClassName: 'delete-resume-modal size-error-modal',
        footer: [_react2.default.createElement(
          _antd.Button,
          { key: 'submit', type: 'primary', onClick: this.handleOk },
          ' \u5220\u9664 '
        ), _react2.default.createElement(
          _antd.Button,
          { className: 'delete-btn', key: 'back', onClick: this.handleCancel },
          '\u53D6\u6D88'
        )]
      };

      var errModalProps = {
        title: "提示",
        visible: this.state.errorVisible,
        onCancel: this.handleCancelError,
        wrapClassName: 'delete-resume-modal size-error-modal',
        footer: [_react2.default.createElement(
          _antd.Button,
          { className: 'default-btn', key: 'back', onClick: this.handleCancelError },
          '\u597D\u7684'
        )]
      };

      return _react2.default.createElement(
        'section',
        { className: 'resume-page clearfix' },
        _react2.default.createElement(
          'div',
          { className: 'resume-head' },
          _react2.default.createElement(
            'div',
            { className: 'title-wrap clearfix' },
            _react2.default.createElement(
              'h1',
              { className: 'title-tip' },
              '\u6211\u7684\u7B80\u5386'
            ),
            _react2.default.createElement(
              _antd.Upload,
              uploadProps,
              _react2.default.createElement(
                _antd.Button,
                { type: 'primary' },
                uploadProps.text
              )
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'warn-tip' },
            _react2.default.createElement(
              'svg',
              { className: 'icon', 'aria-hidden': 'true' },
              _react2.default.createElement('use', { xlinkHref: '#icon-weixiao-' })
            ),
            '\u6E29\u99A8\u63D0\u793A\uFF1A\u4EC5\u652F\u6301word/pdf\u683C\u5F0F\uFF0C\u6587\u4EF6\u9700\u5C0F\u4E8E4m\uFF0C\u7B80\u5386\u540D\u79F0\u683C\u5F0F\u5EFA\u8BAE\uFF1A\u59D3\u540D+\u5B66\u6821+\u4E13\u4E1A+\u6BD5\u4E1A\u65F6\u95F4'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: resumeExist ? 'resume-content has-resume' : 'resume-content no-resume' },
          resumeListContent
        ),
        _react2.default.createElement(
          _antd.Modal,
          modalProps,
          _react2.default.createElement(
            'p',
            { className: 'tips' },
            '\u786E\u5B9E\u8981\u5220\u9664\u8BE5\u7B80\u5386\u5417\uFF1F'
          )
        ),
        _react2.default.createElement(
          _antd.Modal,
          errModalProps,
          _react2.default.createElement(
            'p',
            { className: 'tips' },
            '\u4E0A\u4F20\u7B80\u5386\u9700\u5C0F\u4E8E4m'
          )
        )
      );
    }
  }]);

  return Resume;
}(_react.Component);

Resume.contextTypes = {
  config: _propTypes2.default.object
};


var mapStoreToProps = function mapStoreToProps(store) {
  return { userId: store.user.id, resumeList: store.userResumes.resumeList };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getResumeList: function getResumeList(params) {
      dispatch((0, _account.getResumeList)(params));
    },
    removeResume: function removeResume(params) {
      dispatch((0, _account.removeResume)(params));
    },
    saveResume: function saveResume(params) {
      dispatch((0, _account.saveResume)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(Resume);