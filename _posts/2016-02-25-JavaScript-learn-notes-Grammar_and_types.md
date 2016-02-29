---
layout:     post
title:      "JavaScript 学习摘要(一) --- 语法和数据类型"
subtitle:   ""
date:       2016-02-25
author:     "zhulinpinyu"
header-img: "img/in-post/16-02-25-javascript-array-in-deeps.jpg"
tags:
    - Javascript
---

> 记录陌生知识点加深记忆，以便更加灵活运用

### 变量的作用域

在所有函数之外声明的变量，叫全局变量，因为它可被当前文档中的其他代码所访问。在函数内部声明的变量叫局部变量，因为它只能在函数内部访问。

ES6中新增语句块作用域，也就是说语句块中用let声明的变量将成为语句块所在代码段的局部变量。

> var 声明函数级作用域的变量
>
> let 声明块范围局部变量
>
> const 声明常量

**示例**

声明一个函数级作用域的变量

```javascript
if(true){
  var x = 5;
}
console.log(x); // 5
```

ES6中声明一个块级作用域的变量

```javascript
if(true){
  let y = 5;
}
console.log(y); //ReferenceError: y is not defined
```

### 变量声明提升

变量声明提升换句话说就是，不论变量在函数的什么位置声明，JavaScript解释执行时，会先将所有变量在所在作用域顶部声明并赋值为`undefined`。看例子🌰就会明白。

```javascript
/* Example 1 */
console.log(x===undefined); //true
var x=3;

/* Example 2 */
var myvar = "my value";
(function(){
  console.log(myvar); // undefined
  var myvar = "local value";
})();
```

Example 2 就很能说明问题，局部变量myvar 在执行时先声明了并赋值为undefined.

上面的例子，也可写作：

```javascript
/* Example 1 */
var x;
console.log(x===undefined); //true
x=3;

/* Example 2 */
var myvar = "my value";
(function(){
  var myvar;
  console.log(myvar); // undefined
  myvar = "local value";
})();
```

### 常量

用关键字`const`声明一个常量。

> 常量不可以通过赋值改变其值，也不可以在脚步运行时重新声明。它必须被初始化为某个值。


>  常量的作用域规则与let块级作用域变量相同。


> 同一作用域中，变量，函数，常量不能同名。

### 数组字面值

> 数组字面值中多余的逗号,末尾逗号后面值忽略。

**示例**

```javascript
var list = ["home",,"school"];
list.length; //3
var list = [,"home",,"school",];
list.length; //4
var list = ["home",,"school",,];
list.length; //4
```

当然自己编写代码显式声明缺失的元素为undefined，将增加代码的可维护性。

### 布尔值

下列值将被计算成false:

- false
- undefined
- null
- 0
- NaN
- 空字符串("")

当传递给条件语句时，所有其他值，包括所有对象会被计算为true.

**不要混淆原始的布尔值true和false 与 布尔对象值true和false**

```javascript
var b = new Boolean(false);
if(b) // b将被计算为true,因为b是布尔对象。
```

### break和continue

- break的作用是跳出循环体
- continue的作用是跳出循环中的一次迭代


参考：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types)


[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)