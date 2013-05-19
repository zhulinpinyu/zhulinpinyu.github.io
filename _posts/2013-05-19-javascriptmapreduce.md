---
layout: post
title: "用javascript阐述MapReduce原理"
description: ""
category: 算法
tags: [javascript, 算法]
---
{% include JB/setup %}
MapReduce理解  
感谢[地瓜哥](http://www.diguage.com/).    
原文链接：[http://www.diguage.com/archives/75.html](http://www.diguage.com/archives/75.html)
#####MapReduce简介

　　MapReduce是一个编程模型，也是一个处理和生成超大数据集的算法模型的相关实现。用户首先创建一个Map函数处理一个基于key/value pair的数据集合，输出中间的基于key/value pair的数据集合；然后再创建一个Reduce函数用来合并所有的具有相同中间key值的中间value值。
    
　　  
　　一图胜千言，下面我们用一张图来说明一下MapReduce：
　　![一图胜千言，下面我们用一张图来说明一下MapReduce：](http://www.diguage.com/images/2012/11/MapReduce.png)    
　　
#####编程实践(javascript实现)

    var Job = {
      //待处理的数据
      data : [
              "We are glad to see you here. This site is dedicated to",
              "poetry and to the people who make poetry possible",
              "poets and their readers. FamousPoetsAndPoems.com is",
              "a free poetry site. On our site you can find a large",
              "collection of poems and quotes from over 631 poets",
              "Read and Enjoy Poetry",
              "I, too, sing America",
              "I am the darker brother",
              "They send me to eat in the kitchen",
              "When company comes",
              "But I laugh",
              "And eat well",
              "And grow strong",
              "Tomorrow",
              "Ill be at the table",
              "When company comes",
              "Nobodyll dare",
              "Say to me",
              "Eat in the kitchen",
              "Then",
              "Besides", 
              "Theyll see how beautiful I am",
              "And be ashamed",
              "I, too, am America"
            ],
            
      //将数据中的每行字符串用空格分隔开，
      //并"重组"成诸如{key: 单词, value: 1}格式的对象，返回对象数组
      map : function(line) {
        var splits = line.split(" ");
        var temp = [];
        for(var i=0; i<splits.length; i++) {
          temp.push({key : splits[i], value : 1});
        }
        return temp;
      },
      
      //计算每个单词在"数据"（data）中出现的次数
      reduce : function(allSteps) {
        var result = {};
        for(var i=0; i<allSteps.length; i++) {
          var step = allSteps[i];
          result[step.key] = result[step.key] ? (result[step.key] + 1) : 1;
        }
        return result;
      },
    
      //初始化，同时是运行的入口。
      init : function() {
        var allSteps = [];
        for(var i=0; i<Job.data.length; i++) {
          //如果这里能多线程调用Job.map函数就更逼真了。？？
          allSteps = allSteps.concat(Job.map(Job.data[i])); 
      }
        //美中不足，这里不能多线程调用Job.reduce函数？？
        var result = Job.reduce(allSteps)
        console.log(JSON.stringify(result));
      }
    
    }; // Job
    
    //开始执行
    Job.init();  
   
  复制这些代码，直接粘贴到浏览器的控制台（Console）中，或者放到一个HTML文件中，用浏览器打开，就可以在控制台输出中，看到效果如下：  
  
    {"631":1,"We":1,"are":1,"glad":1,"to":5,"see":2,"you":2,"here.":1,"This":1,"site":2,"is":2,"dedicated":1,"poetry":3,"and":4,"the":5,"people":1,"who":1,"make":1,"possible":1,"poets":2,"their":1,"readers.":1,"FamousPoetsAndPoems.com":1,"a":2,"free":1,"site.":1,"On":1,"our":1,"can":1,"find":1,"large":1,"collection":1,"of":1,"poems":1,"quotes":1,"from":1,"over":1,"Read":1,"Enjoy":1,"Poetry":1,"I,":2,"too,":2,"sing":1,"America":2,"I":3,"am":3,"darker":1,"brother":1,"They":1,"send":1,"me":2,"eat":2,"in":2,"kitchen":2,"When":2,"company":2,"comes":2,"But":1,"laugh":1,"And":3,"well":1,"grow":1,"strong":1,"Tomorrow":1,"Ill":1,"be":2,"at":1,"table":1,"Nobodyll":1,"dare":1,"Say":1,"Eat":1,"Then":1,"Besides":1,"Theyll":1,"how":1,"beautiful":1,"ashamed":1}
      
作 者： [D瓜哥，http://www.diguage.com/](http://www.diguage.com/)  
原文链接：[http://www.diguage.com/archives/75.html](http://www.diguage.com/archives/75.html)