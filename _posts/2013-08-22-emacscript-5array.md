---
layout: post
title: "EMACScript 5中Array对象新增的方法"
description: ""
category: javascript
tags: [Javascript]
---


######EMACScript 5中Array对象新增的方法。

参考：《JavaScript权威指南(第六版)》淘宝团队译 -------7.9节

    1.forEach()
      forEach()方法从头至尾遍历数组。forEach()方法第一个参数是一个函数【该
      函数有三个参数：数组元素，元素的索引，数组本身。如果只关心数组元素的值
      可以忽略额外的两个参数】
      例：
      var a =  [1,2,3,4,5];
      //遍历并输出数组中的元素
      a.forEach(function(v){
          console.log(v);
      });
     
      //对数组中的元素求和
      var sum = 0;
      a.forEach(function(v){
        sum += v;
      });
     
      //数组元素加1
      a.forEach(function(v,i,a){
        a[i]=v+1
      });
      传递的函数修改了数组 a现在是[2,3,4,5,6]
     
___
    2.map()
      map()方法，同样也是传递一个函数(参数为数组的元素)作为参数，返回一
      个数组【经过函数处的过的数组】
      例：
      var a = [1,2,3,4,5]
      var b = a.map(function(v){
        return v+2;
      });
      b的值是[3,4,5,6,7]
      a的值不变还是[1,2,3,4,5]
___
    3.filter()
      filter()方法返回一个数组是调用数组的一个子集，同样也是传递一个函数作为参数。
      该函数的作用就是作为过滤条件（即起逻辑判断作用），其返回值是布尔值。不会修改
      原数组。
      具体见下例：
      var a = [5,4,3,2,1]
      //返回大于3的元素
      var b = a.filter(function(v){
        return v>3;
      });
      b的值是[5,4]
      a的值是[5,4,3,2,1]
      //返回索引为偶数的元素
      var c = a.filter(function(v,i){
        return i%2==0;
      });
      c 的值是[5,3,1]
      a的值是[5,4,3,2,1]
___

    4.every()和some()
      every()和some()是对数组做逻辑判定的。传递一个函数作为参数即为判断条件。
      every()：数组中所有元素满足条件 返回ture。
      some()：数组中存在满足条件的元素 返回ture。
      例：
      var a = [3,5,6,2,7];
      a.every(function(x){ return x>1 }); //true
      a.every(function(x){ return x>3 }); //false
      a.some(function(x){ return x>5 }); //true
      //探测数组中是否含有非数值元素
      a.some(isNaN);  //false  表示不存在非数值元素 isNaN是内置函数
___
    5.reduce()和reduceRight()
      reduce()和reduceRight()方法使用指定的函数将数组元素进行组合，生成单个值。
      例：
      var a = [1,2,3,4,5];
      //数组求和
      var sum = a.reduce(function(x,y){return x+y}, 0);
      //数组求积
      var p = a.reduce(function(x,y){return x×y}, 1);
      //数组求最大值
      var max = a.reduce(function(x,y){return (x>y)?x:y});
      
      reduce()方法需要两个参数。第一个是执行化简操作的函数。化简函数的作用就是用
      某种方法把两个值组合或化简为一个值并返回化简后的值。第二个参数是传递给第一
      参数（即函数）的初始值。第二个参数是可选的。当不指定初始值的时候，默认使用
      数组的第一个元素作为初始值。
      
      reduceRight()的工作原理和reduce()是一样的，不同的是它按照数组索引从高到低
     （从右到左）处理数组。
      
___

    6.indexOf()和lastIndexOf()
      indexOf()和lastIndexOf()搜索整个数组中具有给定值的元素，返回找到的第一个元
      素的索引如果没有找到就返回-1。indexOf()从头至尾搜索。lastIndexOf()则反向搜
      索。indexOf()和lastIndexOf()可以接受两个参数，第一个是要查找的值，第二个是
      可选的：它指定一个索引，表示从该索引处开始搜索
      例：
      var a = [1,0,2,3,2,1];
      a.indexOf(1); // 0 a[0]是1
      a.lastIndexOf(1); // 5 a[5]是1
      a.indexOf(4); // -1 没有值为4的元素
      
      //在数组a中查找所有出现的x,返回x的所有索引构成的数组。
      function findAll(a,x){
        var results = [];
        var pos = 0;
        while(pos < a.length){
          pos = a.indexOf(x,pos);
          if(pos===-1) break;
          results.push(pos);
          pos++
        }
        return results;
      }