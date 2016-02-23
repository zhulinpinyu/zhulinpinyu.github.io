---
layout: post
title: "1. String 基本使用"
description: ""
category: ruby
tags: [ruby,rubymonk]
---


#1. String 基本使用

####字符检测

***例1：***

```ruby
"mlx brj and love!".include?("brj")  #true
"mlx brj and love!".start_with?("mlx") #true
"mlx brj and love!".end_with?("!") #true
"mlx brj and love!".index("b") #4
```

####英文字符大小写转换

***例2：***

```ruby
"mlx".upcase                # MLX
"SAP".downcase              # sap
"mlx LOVE BRJ".swapcase     # MLX love brj 
```
####分割字符串
***例3：***

```ruby
"m l x".split(" ") #["m","l","x"]  
```
tips: `join` 方法

####字符串连接
***例4：***

```ruby
"qwe" + "qaz"       #"qweqaz"
"Ruby" << "Monk"    #"RubyMonk"
```

####子串替换
***例5：***

```ruby
"I have a metting I".sub("I", "We")
```

输出结果：

> We have a metting I

Tips: 只替换第一个出现的

***例6：***

```ruby
"I have a lover,I love her".gsub("I","my")
```
输出结果：

>my have a lover,my love her

Tips: 替换所有出现的

***例7：正则匹配替换***

```ruby
'RubyMonk'.gsub(/[aeiou]/,'1')  #R1byM1nk
'RubyMonk Is Pretty Brilliant'.gsub(/[A-Z]/,'0') #0uby0onk 0s 0retty 0rilliant
```
***例8：正则匹配查找***

```ruby
#第一匹配即返回
'RubyMonk Is Pretty Brilliant'.match(/ ./) # I
#设定匹配的起始位置为10
'RubyMonk Is Pretty Brilliant'.match(/ ./, 10) # P
```
