'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

var _ApplyForm = require('./ApplyForm');

var _ApplyForm2 = _interopRequireDefault(_ApplyForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplyOppModal = function (_React$Component) {
  _inherits(ApplyOppModal, _React$Component);

  function ApplyOppModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ApplyOppModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ApplyOppModal.__proto__ || Object.getPrototypeOf(ApplyOppModal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      modalVisible: false
    }, _this.toggleModal = function () {
      _this.setState({
        modalVisible: !_this.state.modalVisible
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // componentWillReceiveProps(_np) {
  //   const _npAv = _np.opp.available;
  //   if (!_npAv) {
  //     this.setState({
  //       modalVisible: false,
  //     });
  //   }
  // }


  _createClass(ApplyOppModal, [{
    key: 'setModalVisible',
    value: function setModalVisible(modalVisible) {
      var _p = this.props;
      if (!_p.user.id) {
        this.context.openLoginModal();
        return;
      }
      this.setState({ modalVisible: modalVisible });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          resumes = _props.resumes,
          prefixs = _props.prefixs,
          applyInfo = _props.applyInfo,
          applyOpp = _props.applyOpp,
          opp = _props.opp,
          updateApplyInfo = _props.updateApplyInfo,
          deleteResume = _props.deleteResume,
          saveResume = _props.saveResume,
          user = _props.user;

      var applyBtnDisabled = user.id && !opp.available;
      return _react2.default.createElement(
        'div',
        { className: 'apply-opportunity-modal' },
        _react2.default.createElement(
          _antd.Button,
          { type: 'primary', disabled: applyBtnDisabled,
            onClick: function onClick() {
              return _this2.setModalVisible(true);
            },
            className: (0, _classnames2.default)('apply-btn', { 'apply-btn-disabled': applyBtnDisabled }) },
          '\u7ACB\u5373\u6295\u9012'
        ),
        _react2.default.createElement(
          _antd.Modal,
          { className: 'apply-modal',
            title: '\u7B80\u5386\u6295\u9012',
            footer: null,
            wrapClassName: 'vertical-center-modal',
            visible: this.state.modalVisible,
            onOk: function onOk() {
              return _this2.setModalVisible(false);
            },
            onCancel: function onCancel() {
              return _this2.setModalVisible(false);
            } },
          _react2.default.createElement(_ApplyForm2.default, {
            toggleModal: this.toggleModal,
            toggleSuccessModal: this.props.toggleSuccessModal,
            updateApplyInfo: updateApplyInfo,
            deleteResume: deleteResume,
            saveResume: saveResume,
            applyOpp: applyOpp,
            applyInfo: applyInfo,
            user: user,
            resumes: resumes, prefixs: prefixs })
        )
      );
    }
  }]);

  return ApplyOppModal;
}(_react2.default.Component);

ApplyOppModal.propTypes = {
  resumes: _propTypes2.default.array,
  prefixs: _propTypes2.default.array,
  opp: _propTypes2.default.object };
ApplyOppModal.contextTypes = {
  openLoginModal: _propTypes2.default.func
};
exports.default = ApplyOppModal;