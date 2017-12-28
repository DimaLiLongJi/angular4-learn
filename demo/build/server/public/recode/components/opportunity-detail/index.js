'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _opportunityDetail = require('../../actions/opportunityDetail');

var OppDetailActions = _interopRequireWildcard(_opportunityDetail);

var _OpportunityMainInfo = require('./OpportunityMainInfo');

var _OpportunityMainInfo2 = _interopRequireDefault(_OpportunityMainInfo);

var _CompanyCard = require('./CompanyCard');

var _CompanyCard2 = _interopRequireDefault(_CompanyCard);

var _WechatCard = require('./WechatCard');

var _WechatCard2 = _interopRequireDefault(_WechatCard);

var _ApplyOppModal = require('./ApplyOppModal');

var _ApplyOppModal2 = _interopRequireDefault(_ApplyOppModal);

var _ApplySuccessModal = require('./ApplySuccessModal');

var _ApplySuccessModal2 = _interopRequireDefault(_ApplySuccessModal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import createHistory from 'history/createBrowserHistory';

// const history = createHistory();

// Actions

// components


var OpportunityDetail = function (_React$Component) {
  _inherits(OpportunityDetail, _React$Component);

  function OpportunityDetail(props) {
    _classCallCheck(this, OpportunityDetail);

    var _this = _possibleConstructorReturn(this, (OpportunityDetail.__proto__ || Object.getPrototypeOf(OpportunityDetail)).call(this, props));

    _this.initData = function () {
      var _p = _this.props;
      var oppId = _p.match.params.id;
      var params = {
        id: _p.user.id
      };
      _p.getOppDetail({ oppId: oppId });
      _p.updateApplyInfo({
        opportunityId: oppId
      });
      if (!_p.prefixs.length) _p.getMobilePrefix();
      if (_p.resumes && !_p.resumes.length && params.id) _p.getUserReusmes(params);
      if (!_p.applyInfo.title && params.id) _p.getUserLastApplyInfo(params);
      if (_p.user.id) {
        _p.updateApplyInfo({
          createdBy: params.id,
          userId: params.id
        });
        _p.checkOppAvailable({ userId: params.id, oppId: oppId });
      }
    };

    _this.toggleSuccessModal = function () {
      _this.setState({
        successModalVisiable: !_this.state.successModalVisiable
      });
    };

    _this.goBack = function () {
      window.history.back();
    };

    _this.state = {
      successModalVisiable: false
    };
    _this.initData();
    return _this;
  }

  _createClass(OpportunityDetail, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_np) {
      var _p = this.props;
      var oppId = _p.match.params.id;
      if (_np.user.id && _np.opp.id && !_p.opp.id) {
        _np.checkOppAvailable({ userId: _np.user.id, oppId: oppId });
        _np.updateApplyInfo({
          userId: _np.user.id,
          createdBy: _np.user.id,
          opportunityId: oppId
        });
      }
      if (_np.user.id && _np.user.id && !_p.user.id) {
        _np.checkOppAvailable({ userId: _np.user.id, oppId: oppId });
        _p.updateApplyInfo({
          createdBy: _np.user.id,
          userId: _np.user.id
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
      var _p = this.props;
      var opp = _p.opp;
      if (!opp.id) return null;
      opp.__html = opp.description.replace(emailReg, '');
      // opp.available = false;
      opp.available = _p.oppAvailable;
      var _Breadcrumb = _react2.default.createElement(
        _antd.Breadcrumb,
        { separator: '>' },
        _react2.default.createElement(
          _antd.Breadcrumb.Item,
          { className: 'goback-btn' },
          _react2.default.createElement(
            _reactRouterDom.NavLink,
            { to: '/pc/opportunity' },
            '\u540D\u4F01\u5B9E\u4E60'
          )
        ),
        _react2.default.createElement(
          _antd.Breadcrumb.Item,
          null,
          opp.company.name,
          '-',
          opp.position
        )
      );
      return _react2.default.createElement(
        'div',
        { className: 'opportunity-detail-container' },
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            opp.company.name,
            '-',
            opp.position,
            ' \u62DB\u8058\u4FE1\u606F_\u6C42\u804C\u5B66\u5802_\u804C\u4E1A\u86D9'
          ),
          _react2.default.createElement('meta', { name: 'description', content: opp.company.name + '-' + opp.position + ' \u62DB\u8058\u4FE1\u606F,\u804C\u4E1A\u86D9' }),
          _react2.default.createElement('meta', { name: 'keywords', content: '\u6C42\u804C\u5B66\u5802,\u804C\u4E1A\u86D9,\u62DB\u8058\u4FE1\u606F,' + opp.company.name + ',' + opp.position })
        ),
        _Breadcrumb,
        _react2.default.createElement(
          'div',
          { className: 'main-content' },
          _react2.default.createElement(
            'div',
            { className: 'top-bar' },
            _react2.default.createElement(_OpportunityMainInfo2.default, { opp: opp, toggleFavorite: _p.toggleFavorite, user: _p.user }),
            _react2.default.createElement(_ApplyOppModal2.default, { opp: opp,
              deleteResume: _p.deleteResume,
              saveResume: _p.saveResume,
              updateApplyInfo: _p.updateApplyInfo,
              applyOpp: _p.applyOpp,
              applyInfo: _p.applyInfo,
              toggleSuccessModal: this.toggleSuccessModal,
              resumes: _p.resumes, prefixs: _p.prefixs, user: _p.user }),
            _react2.default.createElement(_ApplySuccessModal2.default, {
              toggleSuccessModal: this.toggleSuccessModal,
              visiable: this.state.successModalVisiable,
              oppAvailable: _p.oppAvailable })
          ),
          _react2.default.createElement(
            'div',
            { className: 'content' },
            _react2.default.createElement('div', { className: 'introduction', dangerouslySetInnerHTML: { __html: opp.__html } }),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_CompanyCard2.default, { company: opp.company }),
              _react2.default.createElement(_WechatCard2.default, null)
            )
          )
        )
      );
    }
  }], [{
    key: 'fetchData',
    value: function fetchData(store, params) {
      return store.dispatch(OppDetailActions.getOppDetail({
        oppId: params.id
      }));
    }
  }]);

  return OpportunityDetail;
}(_react2.default.Component);

OpportunityDetail.propTypes = {
  opp: _propTypes2.default.object,
  resumes: _propTypes2.default.array,
  prefixs: _propTypes2.default.array,
  applyInfo: _propTypes2.default.shape({
    id: _propTypes2.default.number,
    userId: _propTypes2.default.number,
    title: _propTypes2.default.string
  }),
  getOppDetail: _propTypes2.default.func,
  getUserReusmes: _propTypes2.default.func,
  getMobilePrefix: _propTypes2.default.func,
  getUserLastApplyInfo: _propTypes2.default.func
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user,
    opp: state.opportunityDetail.opp,
    oppAvailable: state.opportunityDetail.available,
    resumes: state.opportunityDetail.resumes,
    prefixs: state.opportunityDetail.prefixs,
    applyInfo: state.opportunityDetail.applyInfo
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getOppDetail: function getOppDetail(params) {
      dispatch(OppDetailActions.getOppDetail(params));
    },
    getUserReusmes: function getUserReusmes(params) {
      dispatch(OppDetailActions.getUserReusmes(params));
    },
    getUserLastApplyInfo: function getUserLastApplyInfo(params) {
      dispatch(OppDetailActions.getUserLastApplyInfo(params));
    },
    getMobilePrefix: function getMobilePrefix(params) {
      dispatch(OppDetailActions.getMobilePrefix(params));
    },
    checkOppAvailable: function checkOppAvailable(params) {
      dispatch(OppDetailActions.checkOppAvailable(params));
    },
    updateApplyInfo: function updateApplyInfo(params) {
      dispatch(OppDetailActions.updateApplyInfo(params));
    },
    applyOpp: function applyOpp(params) {
      dispatch(OppDetailActions.applyOpp(params));
    },
    deleteResume: function deleteResume(params) {
      dispatch(OppDetailActions.deleteResume(params));
    },
    saveResume: function saveResume(params) {
      dispatch(OppDetailActions.saveResume(params));
    },
    toggleFavorite: function toggleFavorite(params) {
      dispatch(OppDetailActions.toggleFavorite(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OpportunityDetail);