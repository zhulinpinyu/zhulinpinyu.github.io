---
layout: post
title: "8. module intro"
description: ""
category: ruby
tags: [ruby,rubymonk]
---



###8. module intro

####8.1 Getting Modular

`module only hold behaviour,unlike class which hold both behaviour and state`
`a module can not be instantiated, but can be included in a class`

```ruby
module WarmUp
  def push_ups
    "Ha Ha Ha,I am learning !"
  end
end

class Gym
  include WarmUp
  def pp
    "I am pp"
  end
end

class Dojo
  include WarmUp

  def teng
    "Bo zi Teng!"
  end
end

p Gym.new.push_ups      #Ha Ha Ha,I am learning !
p Dojo.new.push_ups     #Ha Ha Ha,I am learning !
```

`Module is the superclass of Class, so this means that all classes are also modules, and can be used as such`

```ruby
module WarmUp
end

puts WarmUp.class           #Module
puts Class.superclass       #Module
puts Module.superclass      #Object
```

```ruby
module Perimeter
  def perimeter
    sides.inject(0) { |sum, side| sum + side }
  end
end

class Rectangle
  include Perimeter
  
  def initialize(length, breadth)
    @length = length
    @breadth = breadth
  end

  def sides
    [@length, @breadth, @length, @breadth]
  end
end

class Square
  include Perimeter
  
  def initialize(side)
    @side = side
  end

  def sides
    [@side, @side, @side, @side]
  end
end
```

####8.2 Modules as Namespaces

`利用namespace避免命名冲突`

```ruby
Module Perimeter
  class Array
    def initialize
      @size = 400
    end
  end
end

our_array = Perimeter::Array.new
ruby_array = Array.new

p our_array.class       #Perimeter::Array
p ruby_array.class      #Array
```

**Constant lookup (module 中的常量访问)**

```ruby
module Dojo
  A = 4
  module Kata
    B = 6
    module Rou
      class ScopeIn
        def push
          8
        end
      end
    end
  end
end

A = 14
B = 16
C = 18

puts "A - #{A}"                           # A - 14
puts "Dojo::A - #{Dojo::A}"               # Dojo::A - 4

puts "B - #{B}"                           # B - 16
puts "Dojo::Kata::B - #{Dojo::Kata::B}"   # Dojo::Kata::B - 6

puts "C - #{C}"                           # C - 18
puts "Dojo::Kata::Rou::ScopeIn.new.push - #{Dojo::Kata::Rou::ScopeIn.new.push}"  # Dojo::Kata::Rou::ScopeIn.new.push - 8
```

```ruby
module Kata
  A = 5
  module Dojo
    p A
    B = 9
    A = 7
    
    class ScopeIn
      def push
        A
      end
    end
  end
end
p Kata::Dojo::ScopeIn.new.push          #先输出5  然后输出7
Kata::Dojo::ScopeIn::A = 10
p Kata::Dojo::ScopeIn.new.push          #10
```