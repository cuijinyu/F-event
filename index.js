class F_bus {
    constructor () {
        this.handler = {};
        this.cache = {};
    }
    on (event, cb) {
        if (this.handler[event] === undefined) {
            this.handler[event] = [];
        }
        this.handler[event].push(cb);
    }
    emit () {
        let key = Array.prototype.shift.apply(arguments);
        if (this.handler[key] && this.handler[key].length > 0){
            for (let i = 0;i < this.handler[key].length; i ++) {
                this.handler[key][i].apply(this, arguments);
            }
        }
    }
    remove (event, fun) {
        if (!event) {
            return;
        }
        if (!fun) {
            delete this.handler[event];
        }
        for (let i = 0;i < this.handler[event].length;i ++) {
            if (this.handler[event][i] === fun) {
                delete this.handler[event][i];
                return;
            }
        }
    }
}

const Fbus = (function () {
    let bus = null;
    return (() => {
        if (bus === null) {
            bus = new F_bus();
            return bus;
        }else
            return bus;
    })()
})();

module.exports = {
    Fbus,
    F_bus
};