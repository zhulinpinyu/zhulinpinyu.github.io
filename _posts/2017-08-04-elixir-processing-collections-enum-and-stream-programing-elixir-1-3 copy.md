---
layout:     post
title:      "Processing Collections—Enum and Stream 学习摘要(6)"
subtitle:   "《Programming Elixir 1.3》p95-111"
date:       2017-08-04
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

#### Enum—Processing Collections

```elixir
#========================================
# 集合转为list
#========================================
iex> list = Enum.to_list 1..5
#[1, 2, 3, 4, 5]

#========================================
# 集合拼接
#========================================
iex> Enum.concat([1,2,3], [4,5,6]) 
#[1, 2, 3, 4, 5, 6]
iex> Enum.concat [1,2,3], 'abc'
#[1, 2, 3, 97, 98, 99]

#========================================
#map 函数
#========================================
iex> Enum.map(list, &String.duplicate("*", &1)) 
#["*", "**", "***", "****", "*****"]

#========================================
#根据下标读取元素值
#========================================
iex> Enum.at(10..20, 3)
#13

#========================================
#过滤filter / 反向过滤reject
#========================================
iex> require Integer
iex> Enum.filter(list, &Integer.is_even/1)
#[2, 4]

iex> Enum.reject(list, &Integer.is_even/1)
#[1, 3, 5]

#========================================
# 排序 比较
#========================================
iex> Enum.sort ["there", "was", "a", "crooked", "man"]
#["a", "crooked", "man", "there", "was"]
iex> Enum.sort ["there", "was", "a", "crooked", "man"], &(String.length(&1) <= String.length(&2)) 
#["a", "was", "man", "there", "crooked"]

iex(4)> Enum.max ["there", "was", "a", "crooked", "man"]
#"was"
iex(5)> Enum.max_by ["there", "was", "a", "crooked", "man"], &String.length/1 
#"crooked"

#========================================
# 集合切分截取
#========================================
# 截取前三个元素
iex> Enum.take(list, 3)
#[1, 2, 3]

# 每两个读取一次（包含起始元素）
iex> Enum.take_every list, 2
#[1, 3, 5]

# 每三个读取一次（包含起始元素）
iex> Enum.take_every list, 3
#[1, 4]

#按函数条件读取
iex> Enum.take_while(list, &(&1 < 4))
#[1, 2, 3]

#三个一组切分
iex> Enum.split(list, 3)
#{[1, 2, 3], [4, 5]}

#按函数条件切分：小于4的分一组，剩下的分一组
iex> Enum.split_while(list, &(&1 < 4))
#{[1, 2, 3], [4, 5]}

#========================================
#元素拼接
#========================================
iex> Enum.join(list)
#"12345"
iex> Enum.join(list, ", ")
#"1, 2, 3, 4, 5"

#========================================
#判断操作
#========================================
iex> Enum.all?(list, &(&1 < 4))
#false
iex> Enum.any?(list, &(&1 < 4))
#true
iex> Enum.member?(list, 4)
#true
iex> Enum.empty?(list)
#false

#========================================
#Merge 合并集合
#========================================
iex> Enum.zip(list, [:a, :b, :c])
#[{1, :a}, {2, :b}, {3, :c}]

iex> Enum.with_index(["once", "upon", "a", "time"])
#[{"once", 0}, {"upon", 1}, {"a", 2}, {"time", 3}]

#========================================
#集合Reduce运算
#========================================
iex> Enum.reduce(1..100, &(&1+&2))
#5050

#根据函数reducer
Enum.reduce(["now", "is", "the", "time"], 0, fn word, longest ->
  if String.length(word) > longest,
  do: String.length(word),
  else: longest
end)
# 4

#根据函数reducer
Enum.reduce(["now", "is", "the", "time"],fn word, longest ->
  if String.length(word) > String.length(longest) do
    word
  else
    longest
  end
end)
#time
```

**需要注意的是：**sort排序时，作比较 要用 `<=` 而不是 `<` ,目的是为了程序更健壮stable.


#### Streams—Lazy Enumerables

示例：

```elixir
[1,2,3,4]
|> Stream.map(&(&1*&1))
|> Stream.map(&(&1+1))
|> Stream.filter(fn x -> rem(x,2) == 1 end)
|> Enum.to_list
```

**经典对比：凸显流处理stream的高效**

```elixir
#Enum 一千万个元素的list,取前五个元素 耗时约8s
iex> Enum.map(1..10_000_000, &(&1+1)) |> Enum.take(5) 
#[2, 3, 4, 5, 6]

#Stream 一千万个元素的list,取前五个元素 立即出结果
iex> Stream.map(1..10_000_000, &(&1+1)) |> Enum.take(5) 
#[2, 3, 4, 5, 6]
```

**Stream.cycle**

使用可枚举的list,构造无限循环的流数据。遍历结束又从头开始。

```elixir
iex> stream = Stream.cycle([1, 2, 3])
iex> Enum.take(stream, 5)
#[1, 2, 3, 1, 2]
```

**Stream.repeatedly**

返回一个Stream

```elixir
iex> Stream.repeatedly(fn -> true end) |> Enum.take(3)
#[true, true, true]
iex> Stream.repeatedly(&:random.uniform/0) |> Enum.take(3)
#[0.7230402056221108, 0.94581636451987, 0.5014907142064751]
```

**Stream.iterate(start_value, next_fun)**

根据一个初始值，和一个创建下一个值的函数 创建一个无限循环的Stream

```elixir
iex> Stream.iterate(0, &(&1+1)) |> Enum.take(5) #[0, 1, 2, 3, 4]
iex> Stream.iterate(2, &(&1*&1)) |> Enum.take(5) #[2, 4, 16, 256, 65536]
iex> Stream.iterate([], &[&1]) |> Enum.take(5) 
#[[], [[]], [[[]]], [[[[]]]], [[[[[]]]]]]
```

**Stream.unfold**

可以理解为`Stream.iterate`的加强版

```elixir
#next_func
fn state -> { stream_value, new_state } end
```

直接看示例：**极其高效**计算Fibonacci 

```elixir
iex> Stream.unfold({0,1}, fn {f1,f2} -> {f1, {f2, f1+f2}} end) |> Enum.take(15)
#[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
```

**Stream.resource**

不甚理解，待后续深入

#### Comprehensions
函数式编程的时候你常常要对集合进行 map、filter处理，Elixir提供了一些通用的办法来简化这种处理，统称为Comprehension

**语法概述**

```elixir
result = for generator or filter... [, into: value ], do: expression
```

来看几个简单的例子：

```elixir
iex> for x <- [ 1, 2, 3, 4, 5 ], do: x * x
#[1, 4, 9, 16, 25]
iex> for x <- [ 1, 2, 3, 4, 5 ], x < 4, do: x * x
#[1, 4, 9]

iex>for x<-[1,2], y<-[5,6], do: x*y
#[5, 6, 10, 12]
iex> for x <- [1,2], y <- [5,6], do: {x, y} 
#[{1, 5}, {1, 6}, {2, 5}, {2, 6}]

iex> min_maxes = [{1,4}, {2,3}, {10, 15}]
#[{1, 4}, {2, 3}, {10, 15}]
iex> for {min,max} <- min_maxes, n <- min..max, do: n 
#[1, 2, 3, 4, 2, 3, 10, 11, 12, 13, 14, 15]
```

comprehension 对bits也是有效的，原因就是：Bits本质也是collection

#### comprehension 中变量作用域只限于comprehension

```elixir
iex> name = "Dave"
#"Dave"
iex> for name <- [ "cat", "dog" ], do: String.upcase(name)
#["CAT", "DOG"]
iex> name
#"Dave"
```

#### comprehension 的返回值

默认是返回 list,但是也是可以自定义的 使用 `into`

示例：

```elixir
iex> for x <- ~w{ cat dog }, into: %{}, do: { x, String.upcase(x) }
#%{"cat" => "CAT", "dog" => "DOG"}

iex> for x <- ~w{ cat dog }, into: Map.new, do: { x, String.upcase(x) }
#%{"cat" => "CAT", "dog" => "DOG"}

iex> for x <- ~w{ cat dog }, into: %{"ant" => "ANT"}, do: { x, String.upcase(x) } 
#%{"ant" => "ANT", "cat" => "CAT", "dog" => "DOG"}
```