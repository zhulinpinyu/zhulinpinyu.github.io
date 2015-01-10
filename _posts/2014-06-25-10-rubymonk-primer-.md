---
layout: post
title: "10. RubyMonk Primer 习题知识点汇总"
description: ""
category: ruby
tags: [ruby,rubymonk]
---
{% include JB/setup %}


####1.计算数组中某个元素出现的次数

```ruby
[9,3,4,9,5].count(9)    #2
```

####2. 随机数rand

```ruby
rand(9) #返回小于9的（0到8）随机整数
```

####3. 检测某个元素是否包含与数组`include?`

```ruby
[9,3,4,9,5].include?(9)         #true
[9,3,4,9,5].include?(7)         #false
```

####4. 求给定数值范围的立方和

```ruby
def sum_of_cubes(a, b)
  (a..b).inject(0) { |sum, x| sum += (x*x*x) }
end

#求： 从1到3的立方和
sum_of_cubes(1,3)               #1×1×1+2×2×2+3×3×3 = 36
```

####5. 返回数组中不重复的元素

```ruby
def non_duplicated_values(values)
  values.find_all { |x| values.count(x) == 1 }
end
```

####6. 检测一个数组所有元素都是数字

```ruby
arr.all?{|x| x.is_a? Fixnum }
all? 所有元素均满足条件返回true 否则返回false 
```
####7. 检测一个数组含有数字元素

```ruby
arr.any?{|x| x.is_a? Fixnum }
any? 存在即返回true  
```

####8. 数组元素随机排列`shuffle 方法`

```ruby
arr = [1,2,3]
#每次产生一个随机的排列
p arr.shuffle       # [1,3,2]
p arr.shuffle       # [3,1,2]
```

####9. 检测是否传入block `block_given?`
