# F-event
Small but Powerful event handler
## 安装
```
npm install f-event
```
## API
目前共有两种创建事件的方法

第一种(单例)   推荐用于解决全局事件
```
const { Fbus } = require('F-event');
let bus_1 = Fbus;
```
第二种(多个)
```
const { F_bus } = require('F-event');
let bus_3 = new F_bus();
```
订阅事件
```
bus.on('${eventName}', () => {
  //callback
})
```
触发事件
```
bus.emit('${eventName}', arguments)
```
删除事件
```
bus.remove('${eventName}', function)  //  function指代要删除的function
```
## 待完成API
  - 事件触发历史
  - 消息订阅
  - 命名空间
