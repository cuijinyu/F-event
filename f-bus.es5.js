"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var F_bus = function () {
    function F_bus() {
        _classCallCheck(this, F_bus);

        this.handler = {};
        this.cache = {};
    }

    _createClass(F_bus, [{
        key: "on",
        value: function on(event, cb) {
            if (this.handler[event] === undefined) {
                this.handler[event] = [];
            }
            this.handler[event].push(cb);
        }
    }, {
        key: "emit",
        value: function emit() {
            var key = Array.prototype.shift.apply(arguments);
            if (this.handler[key] && this.handler[key].length > 0) {
                for (var i = 0; i < this.handler[key].length; i++) {
                    this.handler[key][i].apply(this, arguments);
                }
            }
        }
    }, {
        key: "remove",
        value: function remove(event, fun) {
            if (!event) {
                return;
            }
            if (!fun) {
                delete this.handler[event];
            }
            for (var i = 0; i < this.handler[event].length; i++) {
                if (this.handler[event][i] === fun) {
                    delete this.handler[event][i];
                    return;
                }
            }
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

module.exports = {
    Fbus: Fbus,
    F_bus: F_bus
};
