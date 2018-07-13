# F-event
<p align="center">
  <a><img src="https://img.shields.io/npm/v/f-event.svg?style=flat"></a>
</p>
Small but Powerful event handler

为什么要做这个呢，是因为在兼职写一个没有很好工程结构的项目的时候，需要用到这样一个模型，于是就诞生了这么一个项目，功能简单，目标明确~

have fun~
## 安装
browser
```
clone本项目，引入f-bus.es5.browser.js
```
npm
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
单次订阅事件 
```
bus.once('${eventName}', () => {
  //callback
})

```
获取选定事件的所有回调函数
```
bus.getListener('${eventName}')
```
触发事件
```
bus.emit('${eventName}', arguments)
```
删除事件
```
bus.remove('${eventName}', function, type)  //  function指代要删除的function type指定所要删除的事件类型once代表一次监听normal代表普通
```
历史事件
```
bus.history();
```
命名空间
```
bus.enablens(); //启动命名空间功能，必须！ 此时原事件命名空间为'default'
bus.ns('${namespaceName}'); //此处返回了bus本身，并且已经切换命名空间，若不存在当前命名空间，则创建
```
命名空间eg:
```
bus.enablens();
bus.ns('ns1').on('ns1Test', () => {});
bus.emit('ns1Test');
```
## 待完成API
  - 在想
