(function() {
    'use strict';

    angular.module('blocks.utils')
    .factory('FormatUtils', FormatUtilsFactory);

    FormatUtilsFactory.$inject = [];

    function FormatUtilsFactory() {
        var set = {
            format: formatChinaTime,
            formatDate: formatDate,
            fromNow: fromNow
        };
        return set;

        function formatChinaTime(times) {
            var days = Math.floor(times / (24 * 3600 * 1000));
            var hours = Math.floor(times % (24 * 3600 * 1000) / (3600 * 1000));
            var minutes = Math.floor(times % (3600 * 1000) / (60 * 1000));
            var seconds = Math.floor(times % (60 * 1000) / 1000);
            if (seconds == 0) {
                return days + "天" + hours + "小时" + minutes + "分钟";
            }
            return days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
        }

        function formatDate(time, format) {
            if (!time) {
                return "";
            }
            return moment(time).format(format);
        }

        function fromNow(time) {
            if(!time) {
                return "";
            }
            var text = moment(time).fromNow();
            return text.replace(/\s/ig, '');
        }
    }


    angular
        .module('blocks.utils')
        .factory('Set', ArraySetFactory);

    ArraySetFactory.$inject = [];

    function ArraySetFactory() {
        var set = {
            create: createHashSet
        };
        return set;

        function createHashSet() {
            var _values = [];
            var set = {
                add: add,
                remove: remove,
                values: values,
                size: size,
                contains: contains
            };

            return set;

            function add(value) {
                if (!contains(value)) {
                    _values.push(value);
                }
            }

            function remove(value) {
                if (contains(value)) {
                    for (var i = 0; i < _values.length; i++) {
                        if (_values[i] == value) {
                            _values.splice(i, 1);
                            break;
                        }
                    }
                }
            }

            function contains(value) {
                for (var i = 0; i < _values.length; i++) {
                    if (_values[i] == value) {
                        return true;
                    }
                }
                return false;
            }

            function values() {
                return _values;
            }

            function size() {
                return _values.length;
            }
        }
    }

    angular
        .module('blocks.utils')
        .factory('Queue', QueueFactory);

    QueueFactory.$inject = [];

    function QueueFactory() {
        var que = {
            create: ArrayQueue
        }
        return que;


        function ArrayQueue() {
            var _data = [];
            var service = {
                isEmpty: isEmpty,
                size: size,
                add: add,
                pop: pop
            }
            return service;

            function isEmpty() {
                return _data == null || _data.length == 0;
            }

            function size() {
                return _data.length;
            }

            function add(ele) {
                _data.push(ele);
            }

            function pop() {
                if (isEmpty()) {
                    return null;
                } else {
                    return _data.shift();
                }
            }
        }
    }

    angular
        .module('blocks.utils')
        .factory('Map', MapFactory);

    MapFactory.$inject = [];

    function MapFactory() {
        var m = {
            create: HashMap
        }
        return m;

        function HashMap() {
            var _len = 0;
            var _data = {};
            var service = {
                isEmpty: isEmpty,
                size: size,
                contains: contains,
                put: put,
                get: get,
                remove: remove,
                values: values,
                forEach: forEach
            };
            return service;

            function isEmpty() {
                return _len == 0;
            }

            function size() {
                return _len;
            }

            function contains(key) {
                if (_data[key]) {
                    return true;
                } else {
                    return false;
                }
            }

            function put(key, value) {
                _data[key] = value;
            }

            function get(key) {
                if (contains(key)) {
                    return _data[key];
                } else {
                    return null;
                }
            }

            function remove(key) {
                if (contains(key)) {
                    delete _data[key];
                }
            }

            function values() {
                return _data;
            }

            function forEach(fn) {
                for (var k in _data) {
                    if (fn) {
                        fn(_data[k]);
                    }
                }
            }
        }
    }



})();
