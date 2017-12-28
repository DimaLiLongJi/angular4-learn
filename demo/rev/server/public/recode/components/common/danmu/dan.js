'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRenderHtml = require('react-render-html');

var _reactRenderHtml2 = _interopRequireDefault(_reactRenderHtml);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../../utils');

var _danmu = require('../../../actions/danmu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dan = function (_React$Component) {
  _inherits(Dan, _React$Component);

  function Dan(props) {
    _classCallCheck(this, Dan);

    var _this = _possibleConstructorReturn(this, (Dan.__proto__ || Object.getPrototypeOf(Dan)).call(this, props));

    _this.changeStatus = function (status) {
      if (status === _this.state.showContent) return;
      _this.setState({
        showContent: status
      });
    };

    _this.toggleContent = (0, _utils.debounce)(_this.changeStatus);

    _this.toggleFavorite = function () {
      if (!_this.props.userId) {
        _this.toggleContent(false);
        var _params = {
          group: _this.props.group,
          entityType: 'question',
          entityId: _this.props.dan.id
        };
        sessionStorage.setItem('favQuestion', JSON.stringify(_params));
        return _this.context.openLoginModal();
      }
      var params = {
        group: _this.props.group,
        userId: _this.props.userId,
        entityType: 'question',
        entityId: _this.props.dan.id
      };
      if (!_this.state.isFavorite) {
        _this.setState({
          isFavorite: 1
        });
        _this.props.addFavorite(params);
        _this.props.onAdd(_this.props.dan);
      } else {
        _this.setState({
          isFavorite: 0
        });
        _this.props.removeFavorite(params);
        // this.props.onRemove(this.props.dan);
      }
    };

    _this.askQuestion = function () {
      setTimeout(function () {
        _this.props.toggleAnim(1);
      }, 100);
      _this.setState({
        showContent: false
      });
      return _this.props.askQuestion();
    };

    _this.viewCompany = function () {
      _this.props.visitCompany({
        group: _this.props.group,
        id: _this.props.dan.id
      });
      setTimeout(_this.context.flush(), 2000);
      window.open('/pc/company/' + _this.props.dan.id + '?campus=1', '_blank');
    };

    _this.state = {
      showContent: false,
      isFavorite: _this.props.dan.isFavorite,
      toggleLing: 0
    };
    return _this;
  }

  _createClass(Dan, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.userId && nextProps.userId) {
        var favQuestion = sessionStorage.getItem('favQuestion') && JSON.parse(sessionStorage.getItem('favQuestion'));
        if (favQuestion && favQuestion.entityId === this.props.dan.id) {
          sessionStorage.removeItem('favQuestion');
          favQuestion.userId = nextProps.userId;
          this.setState({
            isFavorite: 1
          });
          console.log('setState');
          this.props.addFavorite(favQuestion);
          this.props.onAdd(this.props.dan);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _d = this.props.dan;
      var _s = this.state;
      var type = _d.opportunity ? 'recruit' : 'question';
      var question = type === 'question' && _react2.default.createElement(
        'div',
        { className: 'wrap dan' },
        _react2.default.createElement(
          'h1',
          { className: "title " + (_d.visited ? 'visited' : '') },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-wenti' })
          ),
          _d.title
        ),
        _s.showContent && _react2.default.createElement(
          'div',
          { className: 'content', onMouseOver: function onMouseOver() {
              return _this2.toggleContent(1);
            }, onMouseOut: function onMouseOut() {
              return _this2.toggleContent(false);
            } },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-yuanxingsanjiaoshang-' })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h2',
              null,
              _d.title
            ),
            _react2.default.createElement(
              'h3',
              null,
              '\u6C42\u804C\u5B66\u5802\u4E13\u4E1A\u56DE\u590D\uFF1A'
            ),
            _react2.default.createElement(
              'p',
              null,
              _d.answer ? (0, _reactRenderHtml2.default)(_d.answer.content) : '答案将第一时间在求职学堂服务号（求职学堂小助手）以模板的形式回复给你。'
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'btn-line' },
            _s.isFavorite ? _react2.default.createElement(
              'a',
              { href: 'javascript:;', onClick: this.toggleFavorite, className: 'favorite-btn favorited is-favorite' },
              _react2.default.createElement(
                'svg',
                { className: 'icon', 'aria-hidden': 'true' },
                _react2.default.createElement('use', { xlinkHref: '#icon-icon-shoucangshixin-' })
              ),
              '\u5DF2\u6536\u85CF'
            ) : _react2.default.createElement(
              'a',
              { href: 'javascript:;', onClick: this.toggleFavorite, className: 'favorite-btn is-favorite' },
              _react2.default.createElement(
                'svg',
                { className: 'icon', 'aria-hidden': 'true' },
                _react2.default.createElement('use', { xlinkHref: '#icon-icon-shoucang-' })
              ),
              '\u6536\u85CF'
            ),
            _react2.default.createElement(
              'a',
              { href: 'javascript:;', className: 'tan-btn', onClick: this.askQuestion },
              '\u6211\u4E5F\u5F39\u4E2A\u95EE\u9898'
            )
          )
        )
      );

      var recruit = type === 'recruit' && _react2.default.createElement(
        'div',
        { className: 'wrap dan', onMouseOver: function onMouseOver() {
            return _this2.toggleContent(1);
          }, onMouseOut: function onMouseOut() {
            return _this2.toggleContent(false);
          } },
        _react2.default.createElement(
          'h1',
          { className: "title " + (_d.visited ? 'visited' : ''), onClick: this.viewCompany },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-laba-' })
          ),
          _d.name,
          '\u4E8E',
          (0, _utils.fd)(_d.opportunity.applyStart),
          '\u5F00\u59CB\u7F51\u7533\u5566~'
        )
      );
      return _react2.default.createElement(
        'div',
        { className: 'dan-container', onMouseOver: function onMouseOver() {
            return _this2.toggleContent(1);
          }, onMouseOut: function onMouseOut() {
            return _this2.toggleContent(false);
          }, style: _d.styleObj },
        question,
        _react2.default.createElement('a', { href: '#' }),
        recruit
      );
    }
  }]);

  return Dan;
}(_react2.default.Component);

Dan.contextTypes = {
  openLoginModal: _propTypes2.default.func,
  flush: _propTypes2.default.func
};


var mapStoreToProps = function mapStoreToProps(store) {
  return {
    userId: store.user.id,
    userSubscribed: store.user.subscribe,
    loginSuccess: store.user.loginSuccess
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addFavorite: function addFavorite(params) {
      dispatch((0, _danmu.addFavorite)(params));
    },
    removeFavorite: function removeFavorite(params) {
      dispatch((0, _danmu.removeFavorite)(params));
    },
    visitCompany: function visitCompany(params) {
      dispatch((0, _danmu.visitCompany)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(Dan);