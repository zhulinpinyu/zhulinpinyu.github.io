---
layout: post
title: "3. Array ruby数组"
description: ""
category: ruby
tags: [Ruby,Rubymonk]
---


###3.Array ruby数组
####3.1 Array简介
#####init empty array

```ruby
[] 
Array.new
```

#####非空数组

```ruby    
a = [1,2,3]
a[2]            # 3
a[-2]           # 2
a.last          # 3
a[-1]           # 3 
```

#####向数组添加元素

```ruby
a = [1,2,3]
a << "qwe"
a # [1,2,3,"qwe"]

a.push("ewq")
a # [1,2,3,"qwe","ewq"]
```

####3.2数组基础使用

#####转化数组

```ruby
a = [1,2,3]
b = a.map {|i| i+2}  #不会修改原数组a, map后返回一个新数组
a #[1,2,3]
b #[3,4,5]
```
    
#####数组元素过滤

```ruby
a = [1,2,3]
b = a.select{|i| i%2==0}      
a #[1,2,3]
b #[2]
```
    
#####数组元素删除

```ruby
a = ["x","y","z"]
b = a.delete("x")               #b的值是 "x"
a                               # ["y","z"]
a.delete_if{|i| i=="y"}      
a                               #["z"]
```
    
####3.3 Iteration 迭代

##### for 循环

```ruby
arr = ["w","m","d","y","b"]

for c in arr
    puts c
end
```
    
##### each 循环

```ruby
arr = ["w","m","d","y","b"]

arr.each do |c|
    puts c
end
```