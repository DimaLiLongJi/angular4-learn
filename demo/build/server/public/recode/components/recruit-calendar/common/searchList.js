'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _paginationLink = require('../../common/paginationLink');

var _paginationLink2 = _interopRequireDefault(_paginationLink);

var _companyCard = require('../common/company-card');

var _companyCard2 = _interopRequireDefault(_companyCard);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchList = function (_Component) {
  _inherits(SearchList, _Component);

  function SearchList(props) {
    _classCallCheck(this, SearchList);

    var _this = _possibleConstructorReturn(this, (SearchList.__proto__ || Object.getPrototypeOf(SearchList)).call(this, props));

    _initialiseProps.call(_this);

    var newParams = _extends({}, _this.props.params, {
      keyword: _this.props.keyword
    });
    _this.props.getCompanyList(newParams);
    _this.keywordChange = _this.paramChange('keyword');
    return _this;
  }

  _createClass(SearchList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _p = this.props;
      if (newProps.keyword !== _p.keyword) {
        this.keywordChange(newProps.keyword);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log('render');
      var _p = this.props;
      var list = _p.companyList;
      // console.log('listlist', list);
      var companies = list.companies || list.opportunities && list.opportunities.map(function (opp) {
        var company = Object.assign({}, opp.companies[0]);
        delete opp.comapnies;
        company.opportunity = opp;
        company.countdown = opp.countdown;
        return company;
      });
      var cardList = companies && companies.map(function (c) {
        return _react2.default.createElement(_companyCard2.default, { key: c.id + '_' + c.opportunity.id, company: c });
      });

      var listCnames = '\n    main-list clearfix search-status\n    ' + (!list.totalItems && 'result-is-null') + '\n    ';

      var pagination = list.totalItems / list.itemsPerPage > 1 && _react2.default.createElement(
        'div',
        { className: 'pagination-wrap' },
        _react2.default.createElement(_paginationLink2.default, {
          dontChangeUrl: true,
          onChange: this.paramChange('pageNum'),
          defaultCurrent: 1,
          pageSize: list.itemsPerPage,
          current: list.pageNum,
          total: list.totalItems
        })
      );

      return _react2.default.createElement(
        'section',
        { className: 'main-content clearfix' },
        _react2.default.createElement(
          'div',
          { className: listCnames },
          _react2.default.createElement(
            'p',
            { className: 'list-count' },
            '\u7B26\u5408\u7B5B\u9009\u7ED3\u679C\u7684\u6709',
            _react2.default.createElement(
              'span',
              null,
              list.totalItems
            ),
            '\u5BB6'
          ),
          cardList,
          pagination
        )
      );
    }
  }]);

  return SearchList;
}(_react.Component);

SearchList.propTypes = {
  companyList: _propTypes2.default.shape({
    itemsPerPage: _propTypes2.default.number,
    totalItems: _propTypes2.default.number,
    pageNum: _propTypes2.default.number,
    companies: _propTypes2.default.array
  }),
  keyword: _propTypes2.default.string,
  params: _propTypes2.default.shape({
    keyword: _propTypes2.default.string,
    pageNum: _propTypes2.default.number,
    itemsPerPage: _propTypes2.default.number
  }),
  getCompanyList: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.paramChange = function (key) {
    return (0, _utils.debounce)(function (newVal) {
      var _p = _this2.props;
      if (_p.params[key] !== newVal) {
        var newParams = _extends({}, _p.params, _defineProperty({}, key, newVal));
        if (key !== 'pageNum') newParams.pageNum = 1;
        _p.getCompanyList(newParams);
      }
    }, 300);
  };
};

exports.default = SearchList;