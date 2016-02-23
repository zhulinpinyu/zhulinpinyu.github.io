---
layout: post
title: "0.2 特定方法的语法糖"
description: ""
category: ruby
tags: [ruby,rubymonk]
---


>2+3 与 2.+(3)  其实是一样的
> +是数字对象的一个方法而已 
类似的还有 +   -   *   /   =   ==    !=    >   <   >=    <=    []

***例1：***

```ruby
2+3 #结果为 5
2.+(3) #结果也为 5
```

***例2：***

```ruby
arr = ["xm","wm","qy"]
arr[1]   #"wm"
#调用数组的 [] 方法
arr.[](1)   #"wm"
```
