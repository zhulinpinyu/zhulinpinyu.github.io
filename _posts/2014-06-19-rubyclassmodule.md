---
layout: post
title: "ruby的class与module的区别"
description: ""
category: ruby
tags: [ruby]
---
{% include JB/setup %}

```
1. 模块不能实例化，类不能include

2. 如果模块和类不在同一个文件中，如果要使用include，先使用require把文件引入

3. include不是简单的将模块的实例变量和方法拷贝到类中，而是建立一个由类到所包含模块的引用

4. 如果有多个include，将依次生成代理类，最后一个include的将是该类的直接超类，依次向上衍生

5. 含有include的模块或者类定义，可以访问它所包含的常量，类变量和实例方法。如果一个模块被包含，改模块的常量，类变量，实例方法都被绑定到该类的一个匿名超类中，类的对象会响应发送给模块实例方法的消息

6. 模块里可以定义一个initialize方法，当创建包括模块的类的对象时，满足一下条件之一，则模块的该方法将被调用：a、类没有定义他自己的initialize方法，b、类的initialize方法中调用了super

```