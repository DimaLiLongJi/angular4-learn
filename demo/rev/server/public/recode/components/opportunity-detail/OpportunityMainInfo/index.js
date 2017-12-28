'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components

// import cn from 'classnames';
var OpportunityMainInfo = function (_React$Component) {
  _inherits(OpportunityMainInfo, _React$Component);

  function OpportunityMainInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OpportunityMainInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OpportunityMainInfo.__proto__ || Object.getPrototypeOf(OpportunityMainInfo)).call.apply(_ref, [this].concat(args))), _this), _this.toggleFavorite = function () {
      // toggleFavorite
      var _p = _this.props;
      var isFavorite = _p.opp.isFavorite;
      if (!_p.user.id) {
        var _params = {
          entityType: 'opportunity',
          entityId: _p.opp.id
        };
        sessionStorage.setItem('favOpp', JSON.stringify(_params));
        _this.context.openLoginModal();
        return;
      }
      var params = {
        entityId: _p.opp.id,
        entityType: 'opportunity',
        userId: _p.user.id
      };
      if (isFavorite) {
        params.method = 'DELETE';
      } else {
        params.method = 'POST';
      }
      _p.toggleFavorite(params);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OpportunityMainInfo, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _p = this.props;
      if (!_p.user.id && nextProps.user.id) {
        var favOpp = sessionStorage.getItem('favOpp') && JSON.parse(sessionStorage.getItem('favOpp'));
        if (favOpp && favOpp.entityId === _p.opp.id) {
          sessionStorage.removeItem('favOpp');
          favOpp.userId = nextProps.user.id;
          favOpp.method = 'POST';
          this.setState({
            isFavorite: 1
          });
          _p.toggleFavorite(favOpp);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var opp = this.props.opp;
      return _react2.default.createElement(
        'div',
        { className: 'main-info' },
        _react2.default.createElement(
          'ul',
          { className: 'info-list' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'h1',
              null,
              opp.position
            ),
            _react2.default.createElement(
              'time',
              null,
              opp.publishDate
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'div',
              { className: 'lable-wrap' },
              _react2.default.createElement(
                'span',
                { className: 'location' },
                _react2.default.createElement(
                  'svg',
                  { className: 'icon', 'aria-hidden': 'true' },
                  _react2.default.createElement('use', { xlinkHref: '#icon-zuobiao' })
                ),
                opp.locationText
              ),
              _react2.default.createElement(
                'span',
                { className: 'industry' },
                opp.industry.name
              )
            ),
            _react2.default.createElement(
              'span',
              { className: 'category' },
              opp.category.name
            )
          )
        ),
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', className: 'favorite-btn', onClick: this.toggleFavorite },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: opp.isFavorite ? '#icon-icon-shoucangshixin-' : '#icon-icon-shoucang-' })
          ),
          opp.isFavorite ? '已收藏' : '收藏'
        )
      );
    }
  }]);

  return OpportunityMainInfo;
}(_react2.default.Component);

OpportunityMainInfo.propTypes = {};
OpportunityMainInfo.contextTypes = {
  openLoginModal: _propTypes2.default.func
};
exports.default = OpportunityMainInfo;