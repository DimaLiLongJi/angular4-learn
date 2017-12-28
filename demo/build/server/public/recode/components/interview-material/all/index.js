'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _interviewMaterial = require('../../../constants/interview-material');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllMaterial = function (_Component) {
  _inherits(AllMaterial, _Component);

  function AllMaterial() {
    _classCallCheck(this, AllMaterial);

    return _possibleConstructorReturn(this, (AllMaterial.__proto__ || Object.getPrototypeOf(AllMaterial)).apply(this, arguments));
  }

  _createClass(AllMaterial, [{
    key: 'render',
    value: function render() {
      var lists = _interviewMaterial.INDUSTRY_LIST.map(function (industry) {
        return _react2.default.createElement(
          _reactRouterDom.NavLink,
          { key: industry.id, to: "/interview_material/" + industry.id, className: 'industry-wrap' },
          _react2.default.createElement(
            'li',
            { className: 'industry-tag' },
            _react2.default.createElement('img', { src: industry.banner, alt: industry.name }),
            _react2.default.createElement(
              'h1',
              null,
              industry.name
            ),
            _react2.default.createElement(
              'h2',
              null,
              '- ',
              industry.name_en,
              ' -'
            )
          )
        );
      });

      return _react2.default.createElement(
        'ul',
        { className: 'interview-material-industry-list' },
        lists
      );
    }
  }]);

  return AllMaterial;
}(_react.Component);

exports.default = AllMaterial;