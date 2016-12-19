---
layout:     post
title:      "Elixir 控制语句 "
subtitle:   ""
date:       2016-12-19
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

Thanks: [http://elixirschool.com/cn/lessons/basics/control-structures/](http://elixirschool.com/cn/lessons/basics/control-structures/)

`if/else，unless`不推荐使用

### 如果需要匹配多个模式，我们可使用 `case`

```elixir
iex> case {:ok, "Hello World"} do
...>   {:ok, result} -> result
...>   {:error} -> "Uh oh!"
...>   _ -> "Catch all"
...> end
"Hello World"
```
`_` 变量是 `case` 语句重要的一项，如果没有 `_`，所有模式都无法匹配的时候会抛出异常。这个就类似于其他语言中default.

### 当我们需要匹配条件而不是值的时候，可以使用 `cond`

```elixir
iex> cond do
...>   2 + 2 == 5 ->
...>     "This will not be true"
...>   2 * 2 == 3 ->
...>     "Nor this"
...>   1 + 1 == 2 ->
...>     "But this will"
...> end
"But this will"
```
这类似于一连串的`if/else`

`cond `语句如果没有任何匹配会抛出异常。我们可以定义一个 true 的条件放到最后，来处理这种意外,也就是设置默认选项。

```elixir
iex> cond do
...>   7 + 1 == 0 -> "Incorrect"
...>   true -> "Catch all"
...> end
"Catch all"
```
