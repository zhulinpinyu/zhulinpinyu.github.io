---
layout: post
title: "学习概览"
description: ""
category: javascript权威指南(第六版)学习笔记
tags: [Javascript]
---



- javascript中最重要的类型是对象（理解javascript的对象）

- 数组同样重要。

- javascript没有块级作用域 只有函数级作用域。（块级作用域指：{}包裹的代码段）

    > 函数级作用域：变量在声明他们的函数体及其子函数内是可见的。

- javascript通过 `.` 或 `[]` 来访问对象属性。（注意：  `.` 和 `[]` 访问属性的区别）

- 注意语法细节，比如 4 中 提到的。

- 数组的元素可以是对象，对象的属性值也可以是数组。

- 当函数赋值给对象的属性时，就把这个函数叫方法;  当对象的属性值是一个函数的时候，称其为方法

- javascript中prototype定义的是类的实例方法。类实例化后方可调用

- 事件注册 （addEventListener）

示例：贷款计算器 [https://bitbucket.org/zhulinpinyu/calculate](https://bitbucket.org/zhulinpinyu/calculate)