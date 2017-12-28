'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CompanyCard = function CompanyCard(_ref) {
  var company = _ref.company;

  var averageSalary = company.averageSalary;
  var imageUrl = company.imageUrl;
  if (/default/.test(imageUrl)) {
    imageUrl = 'http://static.careerfrog.com.cn/cf-college/images/default-logo.cdd3f41a.jpg';
  }
  if (/\d+/.test(averageSalary)) {
    averageSalary = company.averageSalary + '  \u5143';
  }
  return _react2.default.createElement(
    'a',
    { href: '/pc/company/' + company.id, className: 'company-info', target: '_blank' },
    _react2.default.createElement('img', { src: imageUrl, alt: company.name }),
    _react2.default.createElement(
      'h2',
      null,
      company.name
    ),
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        { className: 'industry' },
        company.industry.name
      ),
      _react2.default.createElement(
        'li',
        { className: 'size' },
        _react2.default.createElement(
          'label',
          null,
          '\u89C4\u6A21\uFF1A'
        ),
        company.size.name
      ),
      _react2.default.createElement(
        'li',
        { className: 'salary' },
        _react2.default.createElement(
          'label',
          null,
          '\u5E73\u5747\u85AA\u8D44\uFF1A'
        ),
        averageSalary
      )
    ),
    _react2.default.createElement(
      'p',
      { className: 'tag' },
      company.companyLabel
    )
  );
};

CompanyCard.propTypes = {
  company: _propTypes2.default.object
};

exports.default = CompanyCard;