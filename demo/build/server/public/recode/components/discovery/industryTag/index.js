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

var IndustryTag = function (_React$Component) {
  _inherits(IndustryTag, _React$Component);

  function IndustryTag() {
    _classCallCheck(this, IndustryTag);

    return _possibleConstructorReturn(this, (IndustryTag.__proto__ || Object.getPrototypeOf(IndustryTag)).apply(this, arguments));
  }

  _createClass(IndustryTag, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _p = this.props;
      var selectedIndustry = _p.selectedIndustry || _p.industryList[0];
      return _react2.default.createElement(
        'ul',
        { className: 'discovery-industry-list' },
        _p.industryList.map(function (industry, idx) {
          return _react2.default.createElement(
            'li',
            { key: idx, onClick: _p.onSelect.bind(_this2, industry), style: { backgroundImage: 'url(' + industry.icon + ')' } },
            _react2.default.createElement(
              'a',
              { className: selectedIndustry.id === industry.id ? 'active' : '' },
              _react2.default.createElement(
                'svg',
                { className: 'icon', 'aria-hidden': 'true' },
                _react2.default.createElement('use', { xlinkHref: '#icon-yuanjiaosanjiaojiantoushang-' })
              )
            )
          );
        })
      );
    }
  }]);

  return IndustryTag;
}(_react2.default.Component);

exports.default = IndustryTag;