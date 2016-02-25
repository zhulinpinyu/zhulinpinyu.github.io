---
layout:     post
title:      "JavaScript Array Methods 深入学习"
subtitle:   "JavaScript Array 常用 Methods小结。"
date:       2016-02-25 13:27
author:     "zhulinpinyu"
header-img: "img/in-post/16-02-25-javascript-array-in-deeps.jpg"
tags:
    - Javascript
---

### join

> 数组元素拼接，默认以`,`作为连接符号，也可自定义。

#### 示例：
```javascript
var items = [1,2,3];
console.log(items.join());
//output: 1,2,3

var items = [1,2,3];
console.log(items.join("---"));
//output: 1---2---3
```

### concat

> 数组合并。

#### 示例
```javascript
var items = [1,2,3];
var newItems1 = items.concat(4,5);
console.log(newItems1);
//output: [1,2,3,4,5]

var newItems2 = items.concat([4,5]);
console.log(newItems2);
//output: [1,2,3,4,5]

var newItems3 = items.concat([4,[5,6]]);
console.log(newItems3);
//output: [1,2,3,4,[5,6]]

var department_a = [
  {name: "test"},
  {name: "dev"},
  {name: "opt"}
];
var department_b = [
  {name: "marketing"},
  {name: "fanciance"}
];

department_a.concat(department_b).forEach(function(e){
  console.log(e.name);
});
/*output:
  test
  dev
  opt
  marketing
  fanciance
*/
```

### indexof

> 读取数组元素位置，返回元素下标值；元素不存在时返回 `-1`

#### 示例
```javascript
var names = ["brj","mlx","cc","xb","mm"];
console.log(names.indexOf("cc"));
//output: 2

console.log(names.indexOf("lx"));
//output: -1

var brj = {name: "brj"};
var mlx = {name: "mlx"};
var cc = {name: "cc"};
var family = [
  brj,
  mlx,
  cc
];
console.log(family.indexOf(brj));
//output: 0

var whiteList = [".css",".js"];
var files = [
  {file: "assets/a.js"},
  {file: "assets/a.css"},
  {file: "assets/index.html"}
];

files.filter(function(e){
  var ext = "." + e.file.split(".")[1];
  return whiteList.indexOf(ext) > -1;
}).forEach(function(f){
  console.log(f.file);
});
/*output:
assets/a.js
assets/a.css
*/
```

### Sort

>sort 默认是按照字符顺序排列的，即使数字数组也是先转为字符串然后再排序的.并且sort会改变原数组的值

#### 示例
```javascript
var numbers = [10,30,2]
numbers.sort();
console.log(numbers);
//output: [10,2,30]

/* 按数值大小排序 */
var numbers = [10,30,2]
numbers.sort(function(a,b){
  return b - a;
});
console.log(numbers);
//output: [30,10,2]

/*sort by string length*/
var titles = ["How are you?","logs is not empty,you know?","Hi","o"]
titles.sort(function(a,b){
  return b.length - a.length
});
console.log(titles);
//output: ["logs is not empty,you know?","How are you?","Hi","o"]

/*sort by hash value (sort by date)*/
var lessons = [{
  title: "drive",
  viewers: 20,
  settings:{
    last_active_date: "2016-02-22 09:53:02 +0800"
  }
}, {
  title: "drink",
  viewers: 26,
  settings:{
    last_active_date: "2016-02-25 09:23:08 +0800"
  }
}, {
  title: "drag",
  viewers: 3,
  settings:{
    last_active_date: "2016-02-24 09:35:08 +0800"
  }
}];

var list = lessons.sort(function(a, b) {
  /*FireFox下Date.parse(a.settings.last_active_date) 输出结果为：NaN*/
  var a_date = Date.parse(a.settings.last_active_date);
  var b_date = Date.parse(b.settings.last_active_date);
  return a_date - b_date;
});

list.map(function(l) {
  return l.title + "(" + l.viewers + ")"
}).join("|");
console.log(list);
//output: drive(20)|drag(3)|drink(26)  (Chrome 下的测试结果)
```

### reduce

>简单理解为聚合函数

#### 示例
```javascript
var arr = [3,1,2]
var total = arr.reduce(function(a,b){return a+b});
console.log(total);
//output: 6
```

