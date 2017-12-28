'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LIMIT = 8;

var IndustrySelector = function (_React$Component) {
  _inherits(IndustrySelector, _React$Component);

  function IndustrySelector(props) {
    _classCallCheck(this, IndustrySelector);

    var _this = _possibleConstructorReturn(this, (IndustrySelector.__proto__ || Object.getPrototypeOf(IndustrySelector)).call(this, props));

    _this.toggleExpand = function () {
      _this.setState({
        expand: !_this.state.expand
      });
    };

    _this.state = {
      expand: 0
    };
    return _this;
  }

  _createClass(IndustrySelector, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          industries = _props.industries,
          selected = _props.selected,
          onSelect = _props.onSelect;

      if (!industries || !industries.length) return null;

      var cnames = function cnames(id, idx) {
        return (selected === id && 'active') + '\n      ' + (idx === 0 && 'allTags') + '\n      ' + (!_this2.state.expand && idx > LIMIT && 'hideTag');
      };

      var all = _react2.default.createElement(
        'dd',
        { onClick: function onClick() {
            return onSelect(undefined);
          }, className: cnames(undefined, 0) },
        _react2.default.createElement(
          'a',
          { href: 'javascript:;' },
          '\u5168\u90E8'
        )
      );
      var list = industries.map(function (i, idx) {
        return _react2.default.createElement(
          'dd',
          { key: idx, onClick: function onClick() {
              return onSelect(i.id);
            }, className: cnames(i.id, idx + 1) },
          _react2.default.createElement(
            'a',
            { href: 'javascript:;' },
            i.name
          )
        );
      });
      return _react2.default.createElement(
        'dl',
        { className: 'industry-list' },
        _react2.default.createElement(
          'dt',
          null,
          _react2.default.createElement(
            'h3',
            null,
            '\u884C\u4E1A'
          )
        ),
        all,
        list,
        !this.state.expand && _react2.default.createElement(
          'dd',
          { className: 'show-more-tag-btn', onClick: this.toggleExpand },
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-more' })
          ),
          '\u5C55\u5F00\u66F4\u591A'
        )
      );
    }
  }]);

  return IndustrySelector;
}(_react2.default.Component);

exports.default = IndustrySelector;