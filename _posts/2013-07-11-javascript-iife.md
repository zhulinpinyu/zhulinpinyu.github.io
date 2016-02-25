---
layout: post
title: "javascript立即调用 IIFE"
description: ""
category: javascript
tags: [Javascript]
---


javascript IIFE 立即调用

参考链接:[http://nuysoft.com/2013/04/15/angry-birds-of-javascript-red-bird-iife/](http://nuysoft.com/2013/04/15/angry-birds-of-javascript-red-bird-iife/)

#####代码示例

    var bird = (function(){
        var type = "red"，
        power = "IIFE"，
        attack = function(){
            console.log(type + " XXX " + power + "!");
        }；
        return {
            type: type,
            attack: attack
        }
    }());
    
    console.log(bird.type); //输出red
    console.log(bird.power);//undefined
    console.log(bird.attack()); //输出red XXX IIFE!

######Refactor
    (function(bird){
        var power = "IIFE";
        bird.type = "mlx";
        bird.attack = function(){
            console.log(bird.type + " XXX " + power + "!");
        };
    }(window.bird = window.bird || {}));
    
    console.log(bird.type);
    console.log(bird.power);
    console.log(bird.attack());

####变量作用域 
    在 JavaScript 中，变量的作用域由函数作用域决定，而不是块级作用域。（所谓块级作用域就是大括号包裹的部分，这个特性和java 等语言是有区别的）

#####代码示例

    var fn = function(){
        if(3>2){
        var a = 3;
        }
        else{
        }
        alert(a);
    }
    fn(); //输出 3
  ⟺