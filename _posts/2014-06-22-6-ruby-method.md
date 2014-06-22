---
layout: post
title: "6. Ruby method"
description: ""
category: ruby
tags: [Ruby,Rubymonk]
---
{% include JB/setup %}

###6. Ruby method

####6.1 Being Methodical

`调用对象的方法`

```ruby 
puts 1.next #2
```

`对象的method方法 参数为方法名的字符串形式返回一个对象`

```ruby
puts 1.method("next") # #<Method: Fixnum(Integer)#next>
```

```ruby
ne = 1.method("next")
ne.call         # 2 与 1.next 效果一样
```

`ruby中的i++ (i为整数)`

```ruby
i.next
```

####6.2 调用方法 Calling a method

`方法参数设置默认值`

```ruby
def hi(name="mlx")
    p "Hello, #{name}"      #Hello, mlx 
end
```

`数组化方法参数`

```ruby
def add(*numbers)
    numbers.inject(0) {|sum,num| sum+num}
end

add(1,2,3,4)  #10
```

`*numbers` 将多个参数视作一个参数 亦可将数组视作多个参数 如下例：

```ruby
def add(a,b)
    a+b
end

arr = [1,2]

add(*arr)  #3
add(arr)  #ArgumentError 参数个数不够

*arr 将数组展开 
p *arr  #换行输出结果 （不妨irb实践一下）
#1
#2
```

```ruby
def add(*numbers)
  numbers.inject(0) { |sum, number| sum + number }
end

def add_with_message(message, *numbers)
  "#{message} : #{add(*numbers)}"
end

puts add_with_message("The Sum is", 1, 2, 3)  #The Sum is : 6
```