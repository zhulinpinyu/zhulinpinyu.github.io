---
layout:     post
title:      "Elixir Enum和Pattern Matching概览"
subtitle:   ""
date:       2016-12-16
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

## Enum Module

Thanks: [http://elixirschool.com/cn/lessons/basics/enum/](http://elixirschool.com/cn/lessons/basics/enum/)

本文摘录部分易混淆的函数予以说明，详细api请参考[Enum文档](http://elixir-lang.org/docs/stable/elixir/Enum.html)

### chunk/2
把集合拆分成小的分组，
分组原理：list的length与期待小组中元素个数进行`div/2`运算，取整数运算结果作为分组的个数。

```elixir
Enum.chunk([1, 2, 3, 4], 2)
# div(4,2) = 2 两个元素一组: [[1, 2], [3, 4]]
Enum.chunk([1, 2, 3, 4], 3)
# div(4,3) = 1 三个元素一组: [[1, 2, 3]]
iex(8)> Enum.chunk([1, 2, 3, 4], 1)
# div(4,1) = 4 一个元素一组: [[1], [2], [3], [4]]
iex(9)> Enum.chunk([1, 2, 3, 4], 5)
# div(4,5) = 0 五个元素一组: []
```

### chunk_by/2
把**邻近的满足函数条件的**分为一组

```elixir
Enum.chunk_by(["one", "two", "three", "four", "five"], fn(x) -> String.length(x) end)
# [["one", "two"], ["three"], ["four", "five"]]
Enum.chunk_by(["one","three","four","five","six"], fn(x) -> String.length(x) end)
# [["one"], ["three"], ["four", "five"], ["six"]]
```

---

## Pattern Matching

Thanks: http://elixirschool.com/cn/lessons/basics/pattern-matching/

**有变量赋值的匹配中：**能匹配则变量赋值，不能匹配则报错

List、Map示例：

```elixir
a = %{s: 1, p: 3, n: "mlx"}
%{s: bn} = a
bn #1
m = [1,2,3]
[nc|_] = m
nc #1
```

Tuple 示例：

```elixir
{:ok, result} = {:ok, 13}
result #13

{:ok, result} = {:error, :oops}
** (MatchError) no match of right hand side value: {:error, :oops}
```
