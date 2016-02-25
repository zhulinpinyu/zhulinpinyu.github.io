---
layout: post
title: "0.1 更多的对象和method"
description: ""
category: ruby
tags: [Ruby,Rubymonk]
---



> Ruby objects are happy to tell you what methods they provide. You simply call the `methods` method on them.

###调用`methods`方法显示当前对象所有的方法

***例1***

```ruby
#显示数字一有哪些方法 并把结果排序
1.methods.sort
```
输出结果：
>  [:!, :!=, :!~, :%, :&, :*, :**, :+, :+@, :-, :-@, :/, :<, :<<, :<=, :<=>, :==, :===, :=~, :>, :>=, :>>, :[], :^, :__id__, :__send__, :abs, :abs2, :angle, :arg, :between?, :bit_length, :ceil, :chr, :class, :clone, :coerce, :conj, :conjugate, :define_singleton_method, :denominator, :display, :div, :divmod, :downto, :dup, :enum_for, :eql?, :equal?, :even?, :extend, :fdiv, :floor, :freeze, :frozen?, :gcd, :gcdlcm, :hash, :i, :imag, :imaginary, :inspect, :instance_eval, :instance_exec, :instance_of?, :instance_variable_defined?, :instance_variable_get, :instance_variable_set, :instance_variables, :integer?, :is_a?, :kind_of?, :lcm, :magnitude, :method, :methods, :modulo, :next, :nil?, :nonzero?, :numerator, :object_id, :odd?, :ord, :phase, :polar, :pred, :private_methods, :protected_methods, :public_method, :public_methods, :public_send, :quo, :rationalize, :real, :real?, :rect, :rectangular, :remainder, :remove_instance_variable, :respond_to?, :round, :send, :singleton_class, :singleton_method, :singleton_method_added, :singleton_methods, :size, :step, :succ, :taint, :tainted?, :tap, :times, :to_c, :to_enum, :to_f, :to_i, :to_int, :to_r, :to_s, :truncate, :trust, :untaint, :untrust, :untrusted?, :upto, :zero?, :|, :~] 
 
###调用带参数的方法
***例2***
```
["mlx","brj","xj"].index("xj")
```

输出结果：
>2

***例3***

```ruby
#判断2是否位于1和3之间
2.between?(1,3)
```
输出结果：
>true

