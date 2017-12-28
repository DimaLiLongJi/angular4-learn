'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _recruitCalendar = require('../../../../actions/recruitCalendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var monthArray = [{
  month: 'Jan.'
}, {
  month: 'Feb.'
}, {
  month: 'Mar.'
}, {
  month: 'Apr.'
}, {
  month: 'May.'
}, {
  month: 'Jun.'
}, {
  month: 'Jul.'
}, {
  month: 'Aug.'
}, {
  month: 'Sep.'
}, {
  month: 'Oct.'
}, {
  month: 'Nov.'
}, {
  month: 'Dec.'
}];

var DateSelector = function (_React$Component) {
  _inherits(DateSelector, _React$Component);

  function DateSelector(props) {
    _classCallCheck(this, DateSelector);

    var _this = _possibleConstructorReturn(this, (DateSelector.__proto__ || Object.getPrototypeOf(DateSelector)).call(this, props));

    _this.addYear = function (diff) {
      var selectedYear = _this.state.selectedYear + diff;

      if (selectedYear === _this.state.currentYear || selectedYear - _this.state.currentYear === 1) {
        _this.setState({
          selectedYear: selectedYear
        });
        console.log(selectedYear);
        _this.props.getStatistics({
          date: selectedYear
        });
      }
    };

    _this.selectMonth = function (idx) {
      var selectedMonth = {
        year: _this.state.selectedYear,
        month: idx + 1
      };
      _this.setState({
        selectedMonth: selectedMonth
      });
      var date = selectedMonth.year + '-' + selectedMonth.month;
      _this.props.onSelect(date);
    };

    _this.clearDate = function () {
      _this.props.onSelect(undefined);
    };

    _this.isMonthselected = function (m, idx) {
      return _this.state.selectedMonth.year === _this.state.selectedYear && _this.props.selected === _this.state.selectedYear + '-' + (idx + 1);
    };

    _this.state = generateDates(_this.props.selected);
    return _this;
  }

  _createClass(DateSelector, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.props.dates.forEach(function (m, index) {
        monthArray[index].companies = m.companies;
      });
      return _react2.default.createElement(
        'div',
        { className: 'calendar' },
        _react2.default.createElement(
          'h1',
          { className: 'choose-year' },
          _react2.default.createElement(
            'svg',
            { onClick: function onClick() {
                return _this2.addYear(-1);
              }, className: 'icon ' + (this.state.yearsArray[0] === this.state.selectedYear ? 'disabled' : ''), 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-zuojiantou-' })
          ),
          _react2.default.createElement(
            'span',
            null,
            this.state.selectedYear
          ),
          _react2.default.createElement(
            'svg',
            { onClick: function onClick() {
                return _this2.addYear(1);
              }, className: 'icon ' + (this.state.yearsArray[1] === this.state.selectedYear ? 'disabled' : ''), 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-youjiantou-' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'months-wrap' },
          _react2.default.createElement(
            'ul',
            { className: 'months' },
            monthArray.map(function (m, idx) {
              return _react2.default.createElement(
                'li',
                { key: m.month, onClick: function onClick() {
                    return _this2.selectMonth(idx);
                  },
                  className: _this2.isMonthselected(m, idx) ? 'acvtive' : ''
                },
                m.month,
                _react2.default.createElement('div', { className: 'point ' + (m.companies > 0 ? 'show-point' : '') })
              );
            })
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'clear-btn', onClick: this.clearDate },
          '\u5F00\u59CB\u65F6\u95F4\u4E0D\u9650'
        )
      );
    }
  }]);

  return DateSelector;
}(_react2.default.Component);

function generateDates(initDate) {
  var data = {};
  data.currentYear = new Date().getFullYear();
  data.yearsArray = [data.currentYear, data.currentYear + 1];
  data.selectedYear = initDate ? (0, _moment2.default)(initDate, 'yyyy-M MM').year() : data.currentYear;
  data.selectedMonth = {
    year: data.selectedYear,
    month: initDate ? (0, _moment2.default)(initDate, 'yyyy-M MM').month() + 1 : ''
  };
  return data;
}

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    dates: store.recruitCalendar.dates
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getStatistics: function getStatistics(params) {
      dispatch((0, _recruitCalendar.getStatistics)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(DateSelector);