---
layout: post
title: "7. Lambdas and Blocks"
description: ""
category: ruby
tags: [ruby,rubymonk]
---
{% include JB/setup %}

###7.Lambdas and Blocks
####7.1 Lambdas in Ruby

`a lambda is just a function peculiarly(特别的) without a name`
`lambda 就是个匿名函数 lambdas in ruby are also objects`
`the last expression of a lambda is its return value`

```ruby
 say = lambda { "To Be Or Not To Be" }
 puts say.call      #To Be Or Not To Be
```

`lambda 可以接收参数`

```ruby
say  = lambda do |str|
    if str == "HaHaHa"
        return str
    else
        return "No Arguments"
    end
end

puts say.call("HaHaHa") #HaHaHa
```

```ruby
say  = lambda do |str=nil|
    if str
        return str
    else
        return "No Arguments"
    end
end
puts say.call() #No Arguments
puts say.call("Ha") #Ha
```

####7.2 Blocks in Ruby

` The simplest explanation for a block is that it is a piece of code that can't be stored in a variable and isn't an object.`

```ruby
def add(number)
    yield(number)
end

add(2) {|num| num+1}            #3
```

`带block参数`

```ruby
def add(num, &block)
    if block
        yield(num)
    else
        num * 3
    end
end

add(2)                          #6
add(2) {|num| num + 1 }         #3
```

