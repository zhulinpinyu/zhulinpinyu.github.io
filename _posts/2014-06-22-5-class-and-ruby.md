---
layout: post
title: "5. Class and 面向对象的ruby"
description: ""
category: ruby
tags: [Ruby,Rubymonk]
---


###5. Class and 面向对象的ruby

####5.1 类

`输出对象的类型`

```ruby
puts 1.class                #Fixnum
puts "".class               #String
puts [].class               #Array
```

`类型判断`

```ruby
puts 1.is_a?(Integer)            #true
puts 1.is_a?(String)             #false
```

`实例化一个对象`

```ruby
Object.new
```

####5.2 Build your own class

`类： 状态（变量）和行为（method）`

```ruby
class Rectangle
    def initialize(length,breadth)
        @length = length
        @breadth = breadth
    end
    #周长
    def perimeter
        2 * (@length + @breadth)
    end
    #面积
    def area
        @length * @breadth
    end
end
```