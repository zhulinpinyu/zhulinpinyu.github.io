---
layout: post
title: "activesupport 学习笔记"
description: ""
category: ruby
tags: [ruby]
---



#activesupport
    require 'active_support/all'
  
###对ruby core的扩展数组Array
![Array](/article_images/Array.png)    

###日期时间处理相关 
![date](/article_images/date.png)
###对hash的扩展
     require "active_support/all"
     opts={name: "mlx", age:23}
     new_opts={name: "mlx", age:23, pwd: "brj"}
    
     puts opts.diff(new_opts)
     #// {:pwd=>"brj"}
     
     puts new_opts.diff(opts)
     #// {:pwd=>"brj"}
     
     puts opts.stringify_keys
     #//{"name"=>"mlx", "age"=>23}

####牛逼的 merge 对Hash的扩展
    require 'active_support/all'
    opts={name: "mlx", age:23}
    new_opts={name: "mlx", pwd: "brj"}
    
    puts opts.merge(new_opts)
    #//{:name=>"mlx", :age=>23, :pwd=>"brj"}
    
    puts opts.reverse_merge(new_opts)
    #//{:name=>"mlx", :pwd=>"brj", :age=>23}

#####注意区别 同key 不同value时 merge 结果的区别    

    opts={name: "brj", age:23}
    new_opts={name: "mlx", pwd: "123"}
    
    puts opts.merge(new_opts)
    #//{:name=>"mlx", :age=>23, :pwd=>"123"}
    
    puts opts.reverse_merge(new_opts)
    #//{:name=>"brj", :pwd=>"123", :age=>23}
    
    ***Hash的except方法不会对hash本身做修改如下例***
    h1=new_opts.except(:pwd)
    
    puts h1
    #//{:name=>"mlx"}
    
    puts new_opts
    #//{:name=>"mlx", :pwd=>"123"}

###Integer的扩展
    比如判断奇偶数(?是方法名称的一部分)
    puts 1.odd? //true
    puts 2.even? //true
###Other
![Other](/article_images/other.png)