---
layout: post
title: "ruby中String和Symbol的区别"
description: ""
category: ruby
tags: [Ruby]
---


####Ruby中String对象与Symbol对象的区别

`符号不是轻量的字符串` 

符号的定义    
    
    :a
    :"b"
    值得注意的是创建 Symbol 对象的字符串中不能含有'\0'字符，而 String 对象是可以的。
`符号最好的描述是身份证。一个符号代表了它是“谁”，而不是代表了它是“什么”。`

    puts :a.object_id        //176248
    puts :a.object_id        //176248
    puts :'a'.object_id     //176248
    puts :"a".object_id     //176248

`由此可见只要名字一样 符号就表示一个东西`

    object_id 函数返回的是对象的身份标识。如果两个对象有相同的 object_id， 那么他们就是相同的（指向同一个内存地址）。 可以看出，当符号在使用过一次后，任何相同字符的符号都会在内存中指向同一个对象地址。 也就是说任何相同字符的符号的object_id 都是相同的。

![str](/article_images/str_syb.png)

    puts "a".object_id     //69810560
    puts "a".object_id     //69738330

`字符串内容相同不代表就是同一个对象`

    "a" 的字符串的 object_id 并不相同，这表示他们在内存种指向不同对象地址。每当您创建一个新的字符串的时候，Ruby会在内存中为它分配新的空间。

`每当您创建一个新的字符串的时候，Ruby会在内存中为它分配新的空间。`

####String和Symbol都是对象
`但Symbol 对象和 String 对象是完全不同的东西，对象标识符很明确的说明了这一点。`

我们还可以从两种对象的方法上区分。查看 Ruby 库参考，你会发现 String 类有非常多的方法，包括 Mixed-in 方法（Ruby中一个类通过 include 其他模块而得到的方法，实现多重继承的效果）、类方法和实例方法；而 Symbol 类只有一个类方法 all_symbols 和7个实例方法。

#####string 转化为 symbol 用to_sym
`"m".to_sym  //:m`

#####symbol 转化为 string 用to_s
`:m.to_sym  //"m"`

    其实Ruby内部一直在使用Symbol,比如Ruby程序中的各种名字，Symbol本质上是Ruby符号表中的东西。使用Symbol处理名字可以降低Ruby内存消耗，提高执行速度，这点我们在下一篇文章中会看到。那么 Symbol 对我们有什么用呢？当然也是内存。使用String的开销太大了，因为每一个String都是一个对象。想想前边的例子，一个字符串每出现一次Ruby就会创建一个String对象。
    
`使用 Symbol 处理名字可以降低 Ruby 内存消耗，提高执行速度`

    通常来讲，当你面临 String 还是 Symbol 的选择时，可以参考以下标准：
        1.如果使用字符串的内容，这个内容可能会变化，使用 String
        2.如果使用固定的名字或者说是标识符，使用 Symbol

`那么什么时候我们会用到名字呢？很多时候都会，比如枚举值、关键字（哈希表关键字、方法的参数）等等`

    当您犹豫该用符号还是字符串的时候，想一下究竟字符的标识更重要（比如 Hash key）还是内容更重要 （比如前面例子里的 “m” ）   
    
参考:        
[http://www.ibm.com/developerworks/cn/opensource/os-cn-rubysbl/](http://www.ibm.com/developerworks/cn/opensource/os-cn-rubysbl/)    
[http://kim27149.iteye.com/blog/651042](http://kim27149.iteye.com/blog/651042)    
[http://www.ruby-lang.org/zh_cn/documentation/ruby-from-other-languages/](http://www.ruby-lang.org/zh_cn/documentation/ruby-from-other-languages/)