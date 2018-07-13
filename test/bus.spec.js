var expect = require('chai').expect;
const { Fbus,F_bus } = require('../index.js');
describe('listener count', function () {

    it('should be same', function () {
       let bus_2 = Fbus;
       let bus_1 = Fbus;
       expect(bus_2 === bus_1).to.be.equal(true);
    });

    it('should have zero listener', function () {
        let bus_3 = new F_bus();
        bus_3.once("test", () => {});
        bus_3.emit("test");
        expect(bus_3.getListener("test").length).to.be.equal(0);
    });

    it('should many times', function () {
        let bus_4 = new F_bus();
        let count = 0;
        bus_4.on('use', () => {
            count ++;
        });
        bus_4.emit('use');
        bus_4.emit('use');
        bus_4.emit('use');
        bus_4.emit('use');
        expect(count).to.be.equal(4);
    })
});

describe('namespace', function () {
    it('should be default namespace', function () {
        let ns_bus1 = new F_bus();
        ns_bus1.on('test', () => {});
        ns_bus1.enablens();
        ns_bus1.ns('test');
        expect(ns_bus1.ns('default').getListener('test').length).to.be.equal(1);
    });
});