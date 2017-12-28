'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mainCompany = require('./mainCompany');

var _mainCompany2 = _interopRequireDefault(_mainCompany);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndustryIntro = function (_React$Component) {
  _inherits(IndustryIntro, _React$Component);

  function IndustryIntro(props) {
    _classCallCheck(this, IndustryIntro);

    var _this = _possibleConstructorReturn(this, (IndustryIntro.__proto__ || Object.getPrototypeOf(IndustryIntro)).call(this, props));

    _this.onTabClick = function (idx) {
      _this.setState({ selectedTab: idx });
    };

    _this.setInnerHtml = function (html) {
      return {
        __html: html || ''
      };
    };

    _this.renderToggle = function () {
      return _react2.default.createElement(
        'ul',
        { className: 'tab-list' },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-ziliao' })
          ),
          _react2.default.createElement(
            'a',
            { href: 'javascript:;', onClick: _this.onTabClick.bind(_this, 0), className: _this.state.selectedTab === 0 ? 'active' : '' },
            '\u884C\u4E1A\u6982\u8FF0'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'svg',
            { className: 'icon', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-gangwei' })
          ),
          _react2.default.createElement(
            'a',
            { href: 'javascript:;', onClick: _this.onTabClick.bind(_this, 1), className: _this.state.selectedTab === 1 ? 'active' : '' },
            '\u5177\u4F53\u5C97\u4F4D'
          )
        )
      );
    };

    _this.renderPosition = function () {
      return _this.props.industry.positions.map(function (p, idx) {
        return _react2.default.createElement(
          'div',
          { key: idx, className: 'position' },
          _react2.default.createElement(
            'h3',
            { className: 'position-name' },
            _react2.default.createElement('span', null),
            p.name
          ),
          _react2.default.createElement('div', { className: 'position-desc', dangerouslySetInnerHTML: _this.setInnerHtml(p.desc) })
        );
      });
    };

    _this.renderIntro = function () {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: '' },
          _react2.default.createElement('img', { src: _this.props.industry.banner, alt: '' })
        ),
        _react2.default.createElement('div', { dangerouslySetInnerHTML: _this.setInnerHtml(_this.props.industry.intro && _this.props.industry.intro.intro),
          className: 'introduction' })
      );
    };

    _this.state = {
      selectedTab: 0
    };
    return _this;
  }

  _createClass(IndustryIntro, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.industry.id !== this.props.industry.id) {
        this.setState({ selectedTab: 0 });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'industry-baike-container clearfix' },
        _react2.default.createElement(
          'div',
          { className: 'main-content clearfix' },
          this.renderToggle(),
          this.state.selectedTab === 0 ? this.renderIntro() : this.renderPosition()
        ),
        _react2.default.createElement(_mainCompany2.default, { companyList: this.props.industry.companies })
      );
    }
  }]);

  return IndustryIntro;
}(_react2.default.Component);

exports.default = IndustryIntro;