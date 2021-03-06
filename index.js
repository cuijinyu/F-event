class F_bus {
    constructor () {
        this.handler = {};
        this.handlerOnce = {};
        this.cache = [];
        this.nameSpace = {};
        this.nameSpaceState = false;
        this.selectedNameSpace = '';
    }
    on (event, cb) {
        if (this.handler[event] === undefined) {
            this.handler[event] = [];
        }
        this.handler[event].push(cb);
    }
    once (event, cb) {
        if (this.handlerOnce[event] === undefined) {
            this.handlerOnce[event] = [];
        }
        this.handlerOnce[event].push(cb);
    }
    emit () {
        let key = Array.prototype.shift.apply(arguments);
        if (this.handler[key] && this.handler[key].length > 0){
            for (let i = 0;i < this.handler[key].length; i ++) {
                this.handler[key][i].apply(this, arguments);
                this.cache.push({
                    type:'once',
                    func:this.handler[key][i],
                    time:Date()
                })
            }
        }
        if (this.handlerOnce[key] && this.handlerOnce[key].length > 0) {
            for (let i = 0;i < this.handlerOnce[key].length; i ++) {
                this.handlerOnce[key][i].apply(this, arguments);
                this.cache.push({
                    type:'once',
                    func:this.handlerOnce[key][i],
                    time:Date()
                })
            }
            delete this.handlerOnce[key];
        }
    }
    remove (event, fun, type) {
        if (!event) {
            return;
        }
        if (!fun) {
            delete this.handler[event];
            delete this.handlerOnce[event];
        }
        if (type === 'once') {
            for (let i = 0;i < this.handlerOnce[event].length;i ++) {
                if (this.handlerOnce[event][i] === fun) {
                    delete this.handlerOnce[event][i];
                    return;
                }
            }
        } else if (type === 'normal') {
            for (let i = 0;i < this.handler[event].length;i ++) {
                if (this.handler[event][i] === fun) {
                    delete this.handler[event][i];
                    return;
                }
            }
        } else {
            for (let i = 0;i < this.handlerOnce[event].length;i ++) {
                if (this.handlerOnce[event][i] === fun) {
                    delete this.handlerOnce[event][i];
                    return;
                }
            }
            for (let i = 0;i < this.handler[event].length;i ++) {
                if (this.handler[event][i] === fun) {
                    delete this.handler[event][i];
                    return;
                }
            }
        }
    }
    getListener (event) {
        let result = [];
        if (this.handlerOnce[event]) {
            result.push({
                type:'once',
                callbackArray:this.handlerOnce[event]
            })
        }
        if (this.handler[event]) {
            result.push({
                type:'normal',
                callbackArray:this.handler[event]
            })
        }
        return result;
    }
    history () {
        return this.cache;
    }
    enablens () {
        this.nameSpaceState = true;
        this.nameSpace['default'] = {
            handler:{},
            handlerOnce:{}
        };
        this.nameSpace['default'].handler = this.handler;
        this.nameSpace['default'].handlerOnce = this.handlerOnce;
        this.handler = this.nameSpace['default'].handler;
        this.handlerOnce = this.nameSpace['default'].handlerOnce;
    }
    ns (namespace) {
        if (!this.nameSpaceState) {
            console.error("[ERROR]namespace is not open");
            throw "[ERROR]namespace is not open";
        }
        this.selectedNameSpace = namespace;
        if (this.nameSpace[namespace] === undefined) {
            this.nameSpace[namespace] = {
                handler:{},
                handlerOnce:{}
            };
            this.handler = this.nameSpace[namespace].handler;
            this.handlerOnce = this.nameSpace[namespace].handlerOnce;
        } else {
            this.handler = this.nameSpace[namespace].handler;
            this.handlerOnce = this.nameSpace[namespace].handlerOnce;
        }
        return this;
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