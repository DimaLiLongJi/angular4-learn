"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var company = _ref.company;
  return _react2.default.createElement(
    "div",
    { className: "company-wrap clearfix" },
    _react2.default.createElement(
      "div",
      { className: "company-main-info clearfix" },
      _react2.default.createElement(
        "a",
        { href: "", className: "img-link" },
        company.imageUrl && _react2.default.createElement("img", { src: company.imageUrl, alt: "" })
      ),
      _react2.default.createElement(
        "dl",
        { className: "" },
        _react2.default.createElement(
          "dt",
          null,
          company.name
        ),
        _react2.default.createElement(
          "dd",
          { className: "clearfix" },
          _react2.default.createElement(
            "strong",
            null,
            company.industry && company.industry.name
          ),
          "|",
          _react2.default.createElement(
            "strong",
            null,
            company.city && company.city.name
          ),
          "|",
          company.size && _react2.default.createElement(
            "strong",
            null,
            company.size.name
          )
        ),
        _react2.default.createElement(
          "dd",
          null,
          _react2.default.createElement(
            "strong",
            null,
            "\u5E73\u5747\u85AA\u8D44\uFF1A",
            company.averageSalary,
            "\u5143"
          )
        )
      )
    )
  );
};