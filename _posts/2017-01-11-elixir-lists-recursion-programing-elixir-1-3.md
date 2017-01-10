---
layout:     post
title:      "Lists and Recursion 学习摘要(4)"
subtitle:   "《Programming Elixir 1.3》p65-78"
date:       2017-01-11
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

#### Head 和 Tail
Head(头)  代表List的第一个值，Tail(尾巴) 代表了List除第一个值以外构成的子列表。例如：

```elixir
iex(1)> [ head | tail ] = [1, 2, 3]
#[1, 2, 3]
iex(2)> head
#1
iex(3)> tail
#[2, 3]
```

示例：利用递归计算list的length

```elixir
defmodule MyList do
  def len([]), do: 0
  def len([_|tail]), do: 1 + len(tail)
end

#-----------------------------------------
$iex mylist.exs
iex(1)> MyList.len([])
#0
iex(2)> MyList.len([2,5,6])
#3
```

示例2：以递归的方式实现map,比如：返回当前list元素的平方

```elixir
defmodule MyList do
  def square([]), do: []
  def square([h|t]), do: [h * h | square(t)]
end
```

#### 构建Map函数

自定义map 函数

```elixir
defmodule MyList do
  def map([],_func), do: []
  def map([h|t], func), do: [func.(h)|map(t, func)]
end

#----------------------
iex(1)> MyList.map([1,2,3],&(&1 * 3))
#[3, 6, 9]
```

#### Reduce 实现原理

List 求和函数第一种实现：

```elixir
defmodule MyList do
  def sum(list), do: _sum(list, 0)
  defp _sum([], total), do: total
  defp _sum([h|t],total), do: _sum(t,total+h)
end

iex(1)> MyList.sum([1,2,3])
#6
```

List 求和函数第二种实现：

```elixir
defmodule MyList do
  def sum([]), do: 0
  def sum([h|t]), do: h + sum(t)
end

#------------------------------------------------
iex(1)> MyList.sum([1,2,3])
#6
```

**自定义reduce函数**

```elixir
defmodule MyList do
  def reduce([], value, _), do: value
  def reduce([h|t], value, func), do: reduce(t, func.(h, value), func)
end

#------------------------------------------------
iex(1)> MyList.reduce([1,2,3,4,5], 1, &(&1 * &2))
#120
```

---

练习1：mapsum 函数，先做map再求和

```elixir
defmodule MyList do
  def mapsum([], _func), do: 0
  def mapsum([h|t], func), do: func.(h) + mapsum(t, func)
end

#------------------------------------------------
iex(1)> MyList.mapsum [1, 2, 3], &(&1 * &1)
14
```

练习2：max函数求list中的最大值

```elixir
defmodule MyList do
  def max([]), do: "Empty List"
  def max([a]), do: a
  def max([h|t]) do
    if h > max(t) do
      h
    else
      max(t)
    end
  end
end

#------------------------------------------------
iex(1)> MyList.max([12,1,3,4,13,1,12,2])
#13
iex(2)> MyList.max([])
#"Empty List"
iex(3)> MyList.max([1])
#1
```

练习3： 过滤数组的数组

```elixir
defmodule WeatherHistory do
  def for_location_27([]), do: []
  def for_location_27([ h = [_, 27, _, _ ] | tail]) do
      [ h | for_location_27(tail) ]
  end
  def for_location_27([ _ | tail]), do: for_location_27(tail)
end

#------------------------------------------------
iex(1)> MyList.for_location_27([[1366225622, 26, 15, 0.125],[1366225622, 27, 15, 0.45],[1366225622, 28, 21, 0.25],[1366229222, 26, 19, 0.081],[1366229222, 27, 17, 0.468]])
#[[1366225622, 27, 15, 0.45], [1366229222, 27, 17, 0.468]]
```

练习4：给定一个范围，返回一个列表

```elixir
MyList.span(1,5)
#[1,2,3,4,5]
```

```elixir
defmodule MyList do
  def span(from,from), do: [from]
  def span(from,to), do: [from|span(from+1,to)]
end
```

List Module 官方文档 [https://hexdocs.pm/elixir/List.html](https://hexdocs.pm/elixir/List.html)
