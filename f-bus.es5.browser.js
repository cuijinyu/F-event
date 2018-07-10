'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var F_bus = function () {
    function F_bus() {
        _classCallCheck(this, F_bus);

        this.handler = {};
        this.handlerOnce = {};
        this.cache = [];
        this.nameSpace = {};
    }

    _createClass(F_bus, [{
        key: 'on',
        value: function on(event, cb) {
            if (this.handler[event] === undefined) {
                this.handler[event] = [];
            }
            this.handler[event].push(cb);
        }
    }, {
        key: 'once',
        value: function once(event, cb) {
            if (this.handlerOnce[event] === undefined) {
                this.handlerOnce[event] = [];
            }
            this.handlerOnce[event].push(cb);
        }
    }, {
        key: 'emit',
        value: function emit() {
            var key = Array.prototype.shift.apply(arguments);
            if (this.handler[key] && this.handler[key].length > 0) {
                for (var i = 0; i < this.handler[key].length; i++) {
                    this.handler[key][i].apply(this, arguments);
                    this.cache.push({
                        type: 'once',
                        func: this.handler[key][i],
                        time: Date()
                    });
                }
            }
            if (this.handlerOnce[key] && this.handlerOnce[key].length > 0) {
                for (var _i = 0; _i < this.handlerOnce[key].length; _i++) {
                    this.handlerOnce[key][_i].apply(this, arguments);
                    this.cache.push({
                        type: 'once',
                        func: this.handlerOnce[key][_i],
                        time: Date()
                    });
                }
                delete this.handlerOnce[key];
            }
        }
    }, {
        key: 'remove',
        value: function remove(event, fun, type) {
            if (!event) {
                return;
            }
            if (!fun) {
                delete this.handler[event];
                delete this.handlerOnce[event];
            }
            if (type === 'once') {
                for (var i = 0; i < this.handlerOnce[event].length; i++) {
                    if (this.handlerOnce[event][i] === fun) {
                        delete this.handlerOnce[event][i];
                        return;
                    }
                }
            } else if (type === 'normal') {
                for (var _i2 = 0; _i2 < this.handler[event].length; _i2++) {
                    if (this.handler[event][_i2] === fun) {
                        delete this.handler[event][_i2];
                        return;
                    }
                }
            } else {
                for (var _i3 = 0; _i3 < this.handlerOnce[event].length; _i3++) {
                    if (this.handlerOnce[event][_i3] === fun) {
                        delete this.handlerOnce[event][_i3];
                        return;
                    }
                }
                for (var _i4 = 0; _i4 < this.handler[event].length; _i4++) {
                    if (this.handler[event][_i4] === fun) {
                        delete this.handler[event][_i4];
                        return;
                    }
                }
            }
        }
    }, {
        key: 'getListener',
        value: function getListener(event) {
            var result = [];
            if (this.handlerOnce[event]) {
                result.push({
                    type: 'once',
                    callbackArray: this.handlerOnce[event]
                });
            }
            if (this.handler[event]) {
                result.push({
                    type: 'normal',
                    callbackArray: this.handler[event]
                });
            }
            return result;
        }
    }, {
        key: 'history',
        value: function history() {
            return this.cache;
        }
    }]);

    return F_bus;
}();

var Fbus = function () {
    var bus = null;
    return function () {
        if (bus === null) {
            bus = new F_bus();
            return bus;
        } else return bus;
    }();
}();
