---
layout:     post
title:      "JavaScript 学习摘要(二) --- 函数"
subtitle:   ""
date:       2016-02-29
author:     "zhulinpinyu"
header-img: "img/in-post/16-02-25-javascript-array-in-deeps.jpg"
tags:
    - Javascript
    - ES6
---

### 原始参数&对象参数

原始值被作为参数传递给函数，也就是值传递给函数，如果被调用的函数改变了这个参数的值，这样的改变不会影响到全局或调用的函数。

如果你传递一个对象作为函数参数，而函数改变了这个对象的属性，这样的改变对函数外部是可见的。

### 嵌套函数&闭包

嵌套函数可以继承容器函数的参数和变量。即内部函数包含外部函数的作用域。

- 内部函数只可以在外部函数中访问
- 内部函数形成了一个闭包：它可以访问外部函数的参数和变量，但是外部函数却不能使用它的参数和变量

**示例**

```javascript
function addSquares(a,b){
  function square(x){
    return x*x;
  }
  return square(a) + square(b);
}
a = addSquares(2,3); //13
b = addSquares(3,4); //25
c = addSquares(4,5); //41
```

### 闭包

当内部函数以某种方式被任何一个外部函数作用于访问时，一个闭包就产生了。

- 避免内部函数变量名与外部函数变量名重名

### [ES6]函数参数默认值

**示例**

```javascript
function multi(a,b=1){
  return a*b;
}
multi(3); // 3
```

### [ES6]剩余参数

剩余参数语法允许将不确定数量的参数表示为数组。

**示例**

```javascript
function f1(a,...args){
  return args.map(x => a * x);
}
f1(2,3,4,5);//[6,8,10]
```

### [ES6]箭头函数

更简洁的函数

**示例**

```javascript
var a = ["Shenzhen","Hefei","Dongguan"];
var a1 = a.map(function(e){return e.length;});
var a2 = a.map(e => e.length);
```



参考：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)

