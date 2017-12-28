'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationSelector = function (_Component) {
  _inherits(LocationSelector, _Component);

  function LocationSelector(props) {
    _classCallCheck(this, LocationSelector);

    var _this = _possibleConstructorReturn(this, (LocationSelector.__proto__ || Object.getPrototypeOf(LocationSelector)).call(this, props));

    _this.groupLocation = function (params) {
      var allLocationTag = params[0];
      var countOopLocation = params[1];
      var temp = null;
      var list = countOopLocation.map(function (location) {
        temp = allLocationTag.filter(function (allLocation) {
          return allLocation.id === location.id;
        })[0];
        if (temp) {
          return { id: temp.id, initial: temp.initial, name: temp.name, parentId: temp.parentId, count: location.count };
        } else {
          return null;
        }
      }).filter(function (location) {
        return location;
      });
      allLocationTag.forEach(function (l) {
        if (l.parentId === -1) {
          list.push({ name: l.name, initial: l.initial, parentId: l.id, id: l.id, count: 10000000 });
        }
      });
      var countries = allLocationTag.filter(function (location) {
        return location.parentId === -1;
      }).map(function (country) {
        country.cityGroup = [];
        country.cityByGroup = [];

        country.cityByGroup[0] = sortByCount(/[a-g, A-G]/, list, country);
        country.cityByGroup[1] = sortByCount(/[h-n, H-N]/, list, country);
        country.cityByGroup[2] = sortByCount(/[o-t, O-T]/, list, country);
        country.cityByGroup[3] = sortByCount(/[u-z, U-Z]/, list, country);

        if (country.cityByGroup[0].length > 0) {
          country.cityGroup.push(extractInitialForGroup(country.cityByGroup[0]));
        }
        if (country.cityByGroup[1].length > 0) {
          country.cityGroup.push(extractInitialForGroup(country.cityByGroup[1]));
        }
        if (country.cityByGroup[2].length > 0) {
          country.cityGroup.push(extractInitialForGroup(country.cityByGroup[2]));
        }
        if (country.cityByGroup[3].length > 0) {
          country.cityGroup.push(extractInitialForGroup(country.cityByGroup[3]));
        }
        country.cityByGroup = country.cityByGroup.filter(function (cityArr) {
          return cityArr.length > 0;
        });

        return country;
      });

      var selectedCountry = countries.filter(function (c) {
        return c.id === _this.state.selectedCountryId;
      })[0];
      return {
        countries: countries,
        provinceList: {
          cityByGroup: selectedCountry.cityByGroup.map(function (group) {
            return groupTag(group);
          }),
          cityGroup: selectedCountry.cityGroup
        }
      };
    };

    _this.selectLocation = function (params) {
      _this.setState(params, function () {
        _this.props.changeParams(_this.state.selectedLocationId);
      });
    };

    _this.toggleList = function () {
      _this.setState({
        listStatus: !_this.state.listStatus
      });
    };

    _this.state = {
      selectedCountryId: 1000,
      selectedLocationId: props.defaultLocationId || 0,
      listStatus: false
    };
    return _this;
  }

  _createClass(LocationSelector, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var hotLocation = [{
        id: 0,
        name: '不限'
      }].concat(_toConsumableArray(this.props.hotLocationTag.slice(0, 13)));
      if (hotLocation.every(function (tag) {
        return tag.id !== _this2.state.selectedLocationId;
      })) {
        hotLocation[hotLocation.length] = this.props.locationTag.filter(function (tag) {
          return tag.id === _this2.state.selectedLocationId;
        })[0];
      }

      var _groupLocation = this.groupLocation([this.props.locationTag, this.props.hotLocationTag]),
          provinceList = _groupLocation.provinceList,
          countries = _groupLocation.countries;

      return _react2.default.createElement(
        'div',
        { className: 'location-selector' },
        _react2.default.createElement(
          'dl',
          { className: 'hot-location' },
          _react2.default.createElement(
            'dt',
            null,
            '\u5DE5\u4F5C\u5730\u70B9\uFF1A'
          ),
          hotLocation.map(function (location) {
            return _react2.default.createElement(
              'dd',
              { key: location.id, onClick: function onClick() {
                  return _this2.selectLocation({ selectedLocationId: location.id });
                } },
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: (0, _classnames2.default)({ selected: _this2.state.selectedLocationId === location.id }) },
                location.name
              )
            );
          })
        ),
        _react2.default.createElement(
          'label',
          { className: 'more' },
          _react2.default.createElement(
            'a',
            { href: 'javascript:;', onClick: this.toggleList },
            '\u66F4\u591A',
            _react2.default.createElement('i', { className: (0, _classnames2.default)('iconfont', {
                'icon-yuanxingsanjiaoxia-': !this.state.listStatus,
                'icon-yuanxingsanjiaoshang-': this.state.listStatus
              }) })
          )
        ),
        this.state.listStatus && _react2.default.createElement(
          'div',
          { className: 'more-location' },
          _react2.default.createElement(
            'dl',
            { className: 'country' },
            _react2.default.createElement(
              'dt',
              null,
              '\u5730\u533A\u9009\u62E9\uFF1A'
            ),
            countries.map(function (country) {
              return _react2.default.createElement(
                'dd',
                { key: country.name, onClick: function onClick() {
                    return _this2.selectLocation({ selectedCountryId: country.id });
                  } },
                _react2.default.createElement(
                  'a',
                  { href: 'javascript:;', className: (0, _classnames2.default)({ selected: _this2.state.selectedCountryId === country.id }) },
                  country.name
                )
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'group-list' },
            provinceList.cityGroup.map(function (city, index) {
              return provinceList.cityByGroup[index].map(function (group, groupIndex) {
                return _react2.default.createElement(
                  'dl',
                  { key: groupIndex, className: 'city-list' },
                  _react2.default.createElement(
                    'dt',
                    null,
                    !groupIndex ? city : ''
                  ),
                  group.map(function (city) {
                    return _react2.default.createElement(
                      'dd',
                      { key: city.name, onClick: function onClick() {
                          return _this2.selectLocation({ selectedLocationId: city.id });
                        } },
                      _react2.default.createElement(
                        'a',
                        { href: 'javascript:;' },
                        city.name
                      )
                    );
                  })
                );
              });
            })
          )
        )
      );
    }
  }]);

  return LocationSelector;
}(_react.Component);

LocationSelector.propTypes = {
  locationTag: _propTypes2.default.array.isRequired,
  hotLocationTag: _propTypes2.default.array.isRequired,
  changeParams: _propTypes2.default.func.isRequired
};
exports.default = LocationSelector;


function sortByCount(reg, list, country) {
  var countA = void 0,
      countB = void 0;
  var arr = list.filter(function (l) {
    return reg.test(l.initial) && l.parentId === country.id;
  }).sort(function (a, b) {
    countA = a.count;
    countB = b.count;
    if (countA <= countB) {
      return 1;
    }
    return -1;
  });
  return arr;
}

function extractInitialForGroup(array) {
  return array.map(function (p) {
    return p.initial;
  }).sort(function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 1;
  }).filter(function (currentValue, index, arr) {
    return currentValue !== arr[index + 1];
  }).join(' ');
}

function groupTag(tagArray) {
  var newArr = [];
  var tempArr = [];
  var width = 850;
  var currentLineWidth = 0;
  var nameWidth = 0;
  tagArray.forEach(function (tag, index, array) {
    nameWidth = 30 + tag.name.length * 13;
    if (currentLineWidth + nameWidth <= width) {
      currentLineWidth += nameWidth;
      tempArr.push(tag);
    } else {
      currentLineWidth = 0;
      newArr.push(tempArr);
      tempArr = [];
    }
    if (index === array.length - 1) {
      newArr.push(tempArr);
    }
  });
  return newArr;
}