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

var OppCount = function (_React$Component) {
	_inherits(OppCount, _React$Component);

	function OppCount(props) {
		_classCallCheck(this, OppCount);

		var _this = _possibleConstructorReturn(this, (OppCount.__proto__ || Object.getPrototypeOf(OppCount)).call(this, props));

		_this.state = {
			timer: null,
			count: 0
		};
		_this.countOpp = _this.countOpp.bind(_this);
		return _this;
	}

	_createClass(OppCount, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.countOpp();
			this.setState({
				timer: setInterval(function () {
					_this2.countOpp();
				}, 6000 * 6000)
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.state.timer);
		}
	}, {
		key: 'countOpp',
		value: function countOpp() {
			var _this3 = this;

			fetch('/api/opportunities/count', {
				credentials: 'include'
			}).then(function (response) {
				return response.json();
			}).then(function (responseJson) {
				_this3.setState({
					count: responseJson.totalItems
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'h3',
				{ className: 'opp-count' },
				_react2.default.createElement(
					'span',
					null,
					this.state.count
				),
				'\u4E2A\u540D\u4F01\u804C\u4F4D'
			);
		}
	}]);

	return OppCount;
}(_react2.default.Component);

exports.default = OppCount;