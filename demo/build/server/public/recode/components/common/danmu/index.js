'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _danmu = require('../../../actions/danmu');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dan = require('./dan');

var _dan2 = _interopRequireDefault(_dan);

var _askQ = require('./askQ');

var _askQ2 = _interopRequireDefault(_askQ);

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

var _Preferencing = require('../../opportunity/recommend/Preference/Preferencing');

var _Preferencing2 = _interopRequireDefault(_Preferencing);

var _antd = require('antd');

var _utils = require('../../../utils');

var _animate = require('./animate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Danmu = function (_Component) {
  _inherits(Danmu, _Component);

  function Danmu(props) {
    _classCallCheck(this, Danmu);

    var _this = _possibleConstructorReturn(this, (Danmu.__proto__ || Object.getPrototypeOf(Danmu)).call(this, props));

    _this.onAddFav = function () {
      _this.setState({
        favoriteStatus: 1
      });
      setTimeout(function () {
        _this.setState({
          favoriteStatus: 0
        });
      }, 2800);
    };

    _this.showTip = function () {
      _this.setState({ tipVisible: true });
    };

    _this.tipModalCancel = function (e) {
      _this.setState({ tipVisible: false });
    };

    _this.toggleAskStatus = function (askStatus) {
      if (!_this.props.userId || !_this.props.userSubscribed) {
        return _this.context.openLoginModal({
          title: _this.props.userId ? "扫码关注公众号" : "扫码登录",
          qrcodeDescription: [_react2.default.createElement(
            'h3',
            { key: 1 },
            '\u7B54\u6848\u5C06\u5728 \u6C42\u804C\u5B66\u5802\u5C0F\u52A9\u624B \u670D\u52A1\u53F7'
          ), _react2.default.createElement(
            'h3',
            { key: 2 },
            '\u56DE\u590D\u4F60\uFF01\u5373\u523B\u626B\u7801\u5173\u6CE8'
          )],
          qrcodeType: 1
        });
      }
      if (askStatus === 1 && _this.props.questionCount >= 5) {
        return _this.showTip();
      }
      _this.setState({
        askStatus: !!askStatus
      });
    };

    _this.initAnim = _animate.initAnim.bind(_this);
    _this.toggleAnim = _animate.toggleAnim.bind(_this);
    _this.seekAnim = _animate.seekAnim.bind(_this);
    _this.terminate = _animate.terminate.bind(_this);
    _this.toggleAnimD = (0, _utils.debounce)(_animate.toggleAnim);
    _this.state = {
      danmuLoaded: !!_this.props.danmuDisplayArray[0].danArray.length,
      animStarted: false,
      askStatus: _this.props.askingQuestion || false,
      favoriteStatus: false,
      tipVisible: false
    };
    if (_this.props.questionCount === undefined && _this.props.userId) _this.props.checkCount(_this.props.userId);
    return _this;
  }

  _createClass(Danmu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (global.window) {
        if (!this.state.danmuLoaded) {
          this.props.getDanmuList({ userId: this.props.userId });
        } else {
          this.initAnim(this.props);
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(n) {
      var _this2 = this;

      var danmuLoaded = this.state.danmuLoaded;
      if (!danmuLoaded) {
        danmuLoaded = !!n.danmuDisplayArray[0].danArray.length;
        if (danmuLoaded) {
          this.initAnim(_extends({}, this.props, n));
          this.setState({
            danmuLoaded: danmuLoaded
          });
        }
      }
      if (n.questionCount === undefined && n.userId) this.props.checkCount(n.userId);
      console.log('n.customizing', n.customizing);
      if (n.customizing && !this.props.customizing) {
        this.seekAnim(0);
        setTimeout(this.terminate, 100);
        this.props.getDanmuList({ userId: this.props.userId });
      }
      if (!n.customizing && this.props.customizing) {
        setTimeout(function () {
          _this2.initAnim(_extends({}, _this2.props), 1);
        }, 100);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _animate.terminate)();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // console.log('rendering');
      var _p = this.props;
      var groupStyle = 'dan-group microsoft marquee clearfix ' + (_p.animationStatus ? '' : 'transformStyle');
      var danmuWrap = _react2.default.createElement(
        'div',
        { className: 'wrap', id: 'danMuWrap' },
        _p.danmuDisplayArray.map(function (group, idx) {
          return _react2.default.createElement(
            'div',
            { key: idx, className: groupStyle, onMouseOver: function onMouseOver() {
                return _this3.toggleAnimD(0);
              }, onMouseOut: function onMouseOut() {
                return _this3.toggleAnimD(1);
              } },
            group.danArray.map(function (d, idx2) {
              return _react2.default.createElement(
                'span',
                { key: idx2, style: { marginRight: '50px' } },
                _react2.default.createElement(_dan2.default, {
                  group: idx,
                  onAdd: _this3.onAddFav,
                  toggleAnim: _this3.toggleAnimD,
                  askQuestion: function askQuestion() {
                    return _this3.toggleAskStatus(1);
                  },
                  questionCount: _this3.props.questionCount,
                  dan: d
                })
              );
            })
          );
        })
      );
      var newQuestions = _p.newQuestionArray.length > 0 && _p.newQuestionArray.map(function (nq) {
        var className = 'title moveAnimation ' + (_this3.props.animationStatus ? 'puse-animation' : '');
        return _react2.default.createElement(
          'h1',
          { key: nq.id, className: className },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-wenti' })
          ),
          nq.title
        );
      });

      var askQ = this.state.askStatus && _react2.default.createElement(_askQ2.default, { hide: function hide() {
          return _this3.toggleAskStatus(0) && _this3.toggleAnim(1);
        } });

      var control = global.window && !this.state.askStatus && _react2.default.createElement(_control2.default, {
        started: this.state.started,
        seekAnim: this.seekAnim,
        toggleAnim: function toggleAnim(status) {
          return (0, _animate.toggleAnim)(status, 1);
        },
        askQuestion: function askQuestion() {
          return _this3.toggleAskStatus(1);
        },
        hide: function hide() {
          return _this3.toggleAskStatus(0);
        }
      });

      var modalProps = {
        title: "提示信息",
        visible: this.state.tipVisible,
        onCancel: this.tipModalCancel,
        wrapClassName: 'danmu-tip-modal',
        footer: [_react2.default.createElement(
          _antd.Button,
          { key: 'back', type: 'primary', onClick: this.handleCancel },
          '\u597D\u7684'
        )]
      };

      if (this.props.customizing) {
        return _react2.default.createElement(
          'div',
          { id: 'TLcontrols', className: 'dan-mu-container' },
          _react2.default.createElement(_Preferencing2.default, { duration: this.props.animationDuration })
        );
      }

      return _react2.default.createElement(
        'div',
        { id: 'TLcontrols', className: 'dan-mu-container' },
        _react2.default.createElement(
          'div',
          { className: 'bg' },
          danmuWrap,
          _react2.default.createElement(
            'div',
            { className: 'ask-question-wrap' },
            askQ,
            newQuestions,
            control
          )
        ),
        this.state.favoriteStatus === 1 && _react2.default.createElement(
          'div',
          { className: 'favorite-tip-wrap' },
          _react2.default.createElement(
            'p',
            { className: 'favorite-tip' },
            '\u6536\u85CF\xA0\xA0\xA0+1'
          )
        ),
        _react2.default.createElement(
          _antd.Modal,
          modalProps,
          _react2.default.createElement('div', { className: 'bg' }),
          _react2.default.createElement(
            'p',
            null,
            '\u6BCF\u4EBA\u6BCF\u5929\u53EA\u80FD\u5F39\u4E94\u4E2A\u95EE\u9898\u54E6~',
            _react2.default.createElement('br', null),
            '\u660E\u5929\u518D\u6765\u5427\uFF01'
          )
        )
      );
    }
  }]);

  return Danmu;
}(_react.Component);

Danmu.contextTypes = {
  openLoginModal: _propTypes2.default.func
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    userId: state.user.id,
    userSubscribed: state.user.subscribe,
    danmuOn: state.danmu.danmuOn,
    questionCount: state.danmu.questionCount,
    danmuDisplayArray: state.danmu.danmuDisplayArray,
    newQuestionArray: state.danmu.newQuestionArray,
    customizing: state.commonOpp.customizeStatus === 'customizing',
    animationDuration: state.commonOpp.animationDuration
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getDanmuList: function getDanmuList(params) {
      dispatch((0, _danmu.getDanmuList)(params));
    },
    updateAnimProgress: function updateAnimProgress(params) {
      dispatch((0, _danmu.updateAnimProgress)(params));
    },
    checkCount: function checkCount(params) {
      dispatch((0, _danmu.checkCount)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Danmu);