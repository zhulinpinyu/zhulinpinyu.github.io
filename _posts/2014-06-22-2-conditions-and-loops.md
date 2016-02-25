---
layout: post
title: "2. 控制结构 Conditions and Loops: Control Structures in Ruby"
description: ""
category: ruby
tags: [Ruby,Rubymonk]
---


####2.1.Boolean Expressions（布尔运算）

 `==` `<=` `<=` `!=` `&&` `||` `!`
 
####2.2条件表达式
 
   `if ... else`
   `unless`
   `boolean ? a : b` #三元运算符
   
Tips:
> nil or false are equal to false, object such as 1, 0, "" is equal to true
Every other object like say 1, 0, "" are all evaluated to be true.

####2.3循环 loop

`Array#each` `Array#select`

***例1***

```ruby
[1,2,3,4].select{ |e| e.odd? } #[1,3]
```

`N.times` N代表数字

***例2: 输出"mlx"五次***

```ruby
5.times do
    puts "mlx"
end
```