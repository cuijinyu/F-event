# F-event
<p align="center">
  <a><img src="https://img.shields.io/npm/v/f-event.svg?style=flat"></a>
  <a><img src="https://www.travis-ci.org/cuijinyu/F-event.svg?branch=master"></a>
  <a href="https://www.npmjs.com/package/san"><img src="https://img.shields.io/npm/dm/f-event.svg?style=flat-square" alt="Downloads"></a>
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

第一种(单例)   推荐用于解决全局事件,单例模式，全局引用相同
```
const { Fbus } = require('F-event');
let bus_1 = Fbus;
```
第二种(多个)   可以用于创建多个eventBus
```
const { F_bus } = require('F-event');
let bus_3 = new F_bus();
```
订阅事件    监听事件，如果启动命名空间，默认为default
```
bus.on('${eventName}', () => {
  //callback
})
```
单次订阅事件 当事件发生时，销毁该监听
```
bus.once('${eventName}', () => {
  //callback
})

```
获取选定事件的所有回调函数
```
bus.getListener('${eventName}')
```
触发事件 在arguments里写入要发送的消息或者为要给监听事件传入的参数
```
bus.emit('${eventName}', arguments)
```
删除事件 如果不加type，默认全部删除
```
bus.remove('${eventName}', function, type)  //  function指代要删除的function type指定所要删除的事件类型once代表一次监听normal代表普通
```
历史事件 返回历史触发事件，带时间
```
bus.history();
```
历史事件返回值 
```
{
    type:once/normal,   //  once代表单次监听，normal正常
    function:fun,   //  fun所调用的函数
    time:time   //  触发时间
}

```
命名空间 用于解决单命名空间变量冲突冗余问题
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
