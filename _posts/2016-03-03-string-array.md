---
layout:     post
title:      "JavaScript 学习摘要(三) --- String & Array"
subtitle:   ""
date:       2016-03-03
author:     "zhulinpinyu"
header-img: "img/in-post/16-02-25-javascript-array-in-deeps.jpg"
tags:
    - Javascript
---

### String 嵌入表达式

**直接看示例**

一般字符串拼接

```javascript
var a = 5,b = 10;
console.log("Fifteen is a + b = " + (a+b) + ", you known.");
//Fifteen is a + b = 15, you known.
```

模板字符串

```javascript
var a = 5,b = 10;
console.log(`Fifteen is a + b = ${a+b}, you known.`);
//Fifteen is a + b = 15, you known.
```

### Array

#### 当个数字元素初始化数组

> 单个数字元素，初始化数组.不能使用Array(length).因为这样会被解释为数组的length.

```javascript
var arr = [42] //length: 1
var arr = Array(42) //length: 42
```

#### 理解数组的length

> 数组的length 其实就是数组最大的索引值加1.
>
> 那么你就可以修正数组的length值，缩短数组或清空数组。

```javascript
var arr = ["c","d","e"];
console.log(arr);
//["c","d","e"]
arr.length = 1;
console.log(arr);
//["c"]
arr.length = 0;
console.log(arr);
//[]
arr.length = 2;
console.log(arr); //[] & length is 2
```

### 遍历

在数组定义时省略的元素不会再forEach遍历时被列出，但是手动赋值为undefined的元素是会被列出的

### 数组的方法

**splice(index, count_to_remove[,addElement1,addElement2])**

> 从数组移除一些元素。index即从哪一个元素开始；count_to_remove移除元素的数量;
>
> 后面的参数表示要在移除的位置添加的元素


```javascript
var myArray = new Array ("1", "2", "3", "4", "5");
console.log(myArray);//["1", "2", "3", "4", "5"]
myArray.splice(1, 3, "a", "b");
console.log(myArray); //["1", "a", "b", "5"]
myArray.splice(0, 2);
console.log(myArray); //["b", "5"]
```

**every(callback)**

> 数组中每一个元素在callback中被返回为true时就返回true

```javascript
var a = [1,2,3]
a.every(function(e){return e > 2;})  //false
```

**some(callback)**

> 数组中只要有一个元素在callback中被返回为true时,就返回true

```javascript
var a = [1,2,3]
a.some(function(e){return e > 2;})  //true
```

参考：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections)

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Text_formatting](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Text_formatting)

