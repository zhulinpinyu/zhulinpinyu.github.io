---
layout: post
title: "第三章：类型、值、变量"
description: ""
category: javascript权威指南(第六版)学习笔记
tags: [javascript]
---


----------
![javascript类型转换](/article_images/javascript类型转换.jpg)
####**1.**javascript数据类型分为原始类型和对象类型。

  >原始类型有：数字、字符串、布尔值、null和undefined       
  >null和undefined是两个特殊的原始类型 值就是其本身。   
  >对象类型：除原始类型之外的都是对象类型。   
 
####**2.**javascript对象是属性的集合。

  >普通javascript对象是“属性值”的无序集合。  

####**3.**如果使用函数初始化一个对象（使用new运算符），那么称该函数为构造函数。

  >每个构造函数定义了一类对象———构造函数初始化的对象组成的集合。

####**4.**类可视为对象类型的子类型。

####**5.**javascript解释器有自己的内存管理机制，可以自动对内存进行垃圾回收。

####**6.**只有null和undefined是无法拥有方法的值。

####**7.**字符串是不可变类型，可以读取字符串中每个字符的值 但无法修改。

####**8.**javascript采用词法作用域。

####**9.**全局变量：不在任何函数内声明的变量称为全局变量。

  >如果代码声明了一个全局变量，这个全局变量就是全局对象的一个属性。

####**10.**javascript支持十进制、十六进制。八进制是否支持目前不明确。

####**11.**溢出时用Infinity表示
```javascript
    例如： 2/0 = Infinity     -2/0 = -Infinity    
```
  >下溢时，返回0或者-0    （-0）很少用到。

####**12.**返回NaN

   >0/0 -> NaN      
    无穷/无穷 -> NaN      
    负数开方 -> NaN    
    数字运算符与非数字运算 -> NaN (加号除外)    
    Infinity,NaN为系统预定义的全局变量    

####**13.**NaN是一个特殊的值：它和任何值都不相等，包括自身。无法通过 x==NaN 判断x是NaN。然而 x!=x 当x是NaN时返回true
```javascript
    isNaN(x)     //x为NaN或非数字时返回true,x为数字时返回false    
    isNaN(NaN)   //-> true    
    isNaN(6)     //-> false    
    isFinite(x)  //当x不是NaN, Infinity, -Infinity时返回true.    
```
  >正负0的区别    
  >0 === -0           //true    
  >1/0 === 1/-0     //正无穷不等于负无穷    
    
####**14.**浮点数在数学运算过程中存在误差，必要时转化为幂次形式的整数再运算
```javascript
    0.123 转化为 123E-3   //123乘以10的-3次
```
####**15.**字符串长度：字符串中的空格也算在长度内。
```javascript
    “mlx mlx”   //length是7
```
####**16.**ECMAScript 5中 支持如下方式读取字符串中的字符
```javascript
    var str = “mlxbrj”;    
    str[0] // "m"    
```
####**17.**任意javascript值都可以转化为布尔值
    
  >null, undefined, 0, -0, NaN, ""(空字符串) 会转化为false    
  >所有其他值会转化为true,包括对象 数组。

####**18.**全局对象的属性是全局定义的符号，javascript程序可以直接使用。

####**19.**当javascript解释器启动时，它将创建一个新的全局对象，并给它一组已定义的初始属性、方法。

- 全局属性，比如 undefined，Infinity和NaN.
- 全局函数，比如 isNaN(), parseInt(), parseFloat(), eval()
    >关于parseInt(), parseFloat() ：   
     它们会忽略参数任意数量的前导空格，尽可能解析更多数值字符，    
     并忽略后面内容。  
     若第一个非空格字符是非法数字直接量，返回NaN.    

    >对于parseInt()可指定第二个参数，设置转换基数。(二，八，十，十六进制)   
    
    ```javascript
        例:    
        parseInt("3AB");  // 3   
        parseFloat("0.3EC"); // 0.3   
        parseFloat(".3EC");  // 0.3   
    ```
- 构造函数，比如 Date(), RegExp(), String(). Object(),  Array()
- 全局对象，比如 Math, JSON

####**20.**浏览器窗口中Window对象充当着全局对象，该对象有一个window属性引用其自身，可代替this引用全局对象。

####**21.**包装对象： 字符串， 数字， 布尔值 均可隐式转换（当调用对应的方法时） 也可显式创建。    

  >String()   
  >Number()   
  >Boolean()

####**22.**`==` 是值比较;  `===` 是引用的值比较且引用的类型比较

####**23.**原始值不可变。即使是字符串被方法处理 返回的也是一个新的字符串

  >对象的引用是可变的
    
####**24.**原始值的比较是值的比较，值相等则相等 (`==`)

  >字符串： length相等且每个索引对应的字符相等 javascript才认为其相等
    
####**25.**对象是可变的---它的值是可修改的(比如修改对象的属性值)

####**26.**对象的比较并非值的比较，而是对象引用的比较，通常对象称为引用类型（两个单独的对象永不相等）

  >当且仅当它们引用同一个基对象时才相等。

####**27.**复制对象副本，要将其所有属性、方法遍历赋给另外的新对象。
  
  >比较对象，即要遍历比较对象的所有属性

####**28.**对于期待转化为数字的非数字类型，若转化结果无意义，则返回 NaN

####**29.**Number类提供toString()方法进行进制转换
  
```javascript  
    例： 
    var n = 17;
    n.toString(2);      // "10001"
    "0" + n.toString(8);  //"021"
    "0X" + n.toString(16);  //"0X11"
```
  下列方法也返回字符串    
  >toFixed(x) // x为返回值小数的位数   默认四舍五入取整。
  
```javascript
  例: 
  6.56.toFixed();  // "7"
  6.36.toFixed();  // "6"
  6.56.toFixed(1);  // "6.6"
```

  >toExponential(x) //默认返回指数表示的数值  若传入参数x，x表示返回值中小数的位数

```javascript
    例：
    var n = 1234;
    n.toExponential();   //"1.234E+3"
    n.toExponential(2);  //"1.23E+3"
```
  >toPrecision(x) //根据x(有效数字的位数)，取数字x位有效数字。 x小于数字整数部分位数返回指数形式

```javascript
    例：
    var n = 1234;
    n.toPrecision();   //"1234"
    n.toPrecision(2);  //"1.2E+3"
    n.toPrecision(5);  //"1234.0"
```
####**30.**对象转化为布尔值均为true。尤其是包装对象 Boolean。

```javascript
    例： var f = new Boolean（false）
        f 转化为布尔值依然是true
```
####**31.**javascript中对象--->字符串的转化

- 有toString() 即调用 toString()
- 没有toString()或toString()不返回一个原始值，则调用valueOf()若返回原始值则返回原始值的字符串形式
- 否则，javascript无法从toString()或valueOf()中获得一个原始值，此时抛出类型错误异常。

####**32.**javascript中对象--->数字的转化

- 有valueOf()且返回一个原始值，返回原始值数字形式
- 否则调用toString(),返回一个原始值，转化为数字形式并返回
- 否则抛出类型错误异常

####**33.**变量声明但未初始赋值，则其初始值为undefined

####**34.**局部变量的使用优先级高于同名全局变量。

####**35.**函数级作用域，对于for中的变量的声明也是为了将其限制于函数级作用域中，否则就变成了全局变量。

####**36.**声明提前：只要在函数内声明即可访问。
  
  >深刻理解局部变量在整个函数级作用域中是有定义的 其实就是声明提前。

```javascript
    例：
    var name = "mlx";
    function f(){
      console.log(name);  // undefined, 而不是"mlx"
      var name = "brj";
      console.log(name);  // "brj"  
    }

    等价于
    
    var name = "mlx";
    function f(){
      var name; 
      console.log(name);  // undefined, 而不是"mlx"
      name = "brj";
      console.log(name);  // "brj"  
    }
```
  >javascript函数中所有变量的声明(不涉及赋值)都被提前至函数的顶部。    
  >局部变量在整个函数级作用域中是有定义的

####**37.**var声明的变量是不可配置的，即无法用delete干掉

```javascript
    例：
    var name = "mlx";   //声明一个不可配置的全局变量
    age = 24;       //创建全局对象的一个可配置属性
    this.addr = "nanshan";  //同上
    
    delete name // false 变量并未被删除
    delete age  // true  变量被删除
    delete addr // true  变量被删除
```
  >全局变量是全局对象的属性

####**38.**作用域链 参考 [http://www.cnblogs.com/dolphinX/p/3280876.html](http://www.cnblogs.com/dolphinX/p/3280876.html "http://www.cnblogs.com/dolphinX/p/3280876.html")

2014/1/25 10:46:14 