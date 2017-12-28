'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = statusSeletor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _campusRecruit = require('../../../constants/campus-recruit');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function statusSeletor(_ref) {
  var onSelect = _ref.onSelect,
      selected = _ref.selected;

  var list = _campusRecruit.STATUSES.map(function (st) {
    var txt = st.text;
    var id = st.id;
    return _react2.default.createElement(
      'dd',
      { key: txt, onClick: function onClick() {
          return onSelect(id);
        }, className: selected === id ? 'active' : '' },
      _react2.default.createElement(
        'a',
        { href: 'javascript:;' },
        txt,
        id === 1 && _react2.default.createElement(
          'svg',
          { className: 'icon kedingyue', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { xlinkHref: '#icon-kedingyue-' })
        )
      )
    );
  });
  return _react2.default.createElement(
    'dl',
    null,
    _react2.default.createElement(
      'dt',
      null,
      _react2.default.createElement(
        'h3',
        null,
        '\u6821\u62DB\u72B6\u6001'
      )
    ),
    list
  );
}

statusSeletor.propTypes = {
  onSelect: _propTypes2.default.func
  // selected: _t.number,
};