const { Fbus,F_bus } = require('../index.js');
let bus_1 = Fbus;
let bus_2 = Fbus;
let bus_3 = new F_bus();
let bus_4 = new F_bus();

bus_1.on("test", function () {
    console.log("bus1 + bus2");
});

bus_2.emit("test");

bus_3.on("test", function () {
    console.log("bus3");
});

bus_3.emit("test");
