---
layout:     post
title:      "Elixir 基础语法概览"
subtitle:   ""
date:       2016-12-16
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

Thanks:  [http://elixirschool.com/cn/lessons/basics/basics](http://elixirschool.com/cn/lessons/basics/basics)

#### 浮点类型
在 Elixir 语言中，浮点数要求小数点之前必须有至少一个数字；

#### 布尔类型
Elixir 支持 true 和 false 两种布尔值，**除了 false 和 nil 之外所有的值都为真。**

#### 原子类型
原子类型是 **名字** 和 **代表的值** 相同的常量
注意：布尔值 true 和 false 实际上就是对应的原子 :true 和 :false

```elixir
iex(1)> true |> is_atom
true
iex(2)> true |> is_boolean
true
iex(3)> true === :true
true
```

Elixir 模块的名字也是原子，即使实际上还不存在这个模块，MyApp.MyModule 是一个合法的原子名称。

```elixir
iex(4)> MyApp.MyModule |> is_atom
true
```

**原子也可以用来直接引用 Erlang 标准库的模块，包括内置的模块。**

```elixir
iex(8)> :crypto.rand_bytes 3
<<2, 200, 173>>
```

#### 字符串
**Elixir 中单双引号的区别？**

> 单引号是字符列表，双引号是字符串。

#### 算术运算

注意：加、减、乘、除中，**除法的运算结果为浮点**。（这与一些语言是有差异的）

```elixir
iex(9)> 10/5
2.0
```

整除、求余:

```elixir
iex> div(10, 5)
2
iex> rem(10, 3)
1
```

#### 布尔运算

Elixir 提供了 `||`、`&&` 和 `!` 布尔操作符，这与其他语言类似。

*注意：*还有三个操作符（**and、or、not**），**它们的第一个参数必须是布尔类型（true 和 false）**

```elixir
iex(23)> true and 'a'
'a'
iex(24)> false and 'a'
false
iex(25)> not false
true
iex(26)> false or 'a'
'a'
iex(26)> 12 and 3
** (ArgumentError) argument error: 12
iex(26)> not 12
** (ArgumentError) argument error
    :erlang.not(12)
```

也就是说：`not` 操作符的参数必须为布尔值`true 和 false`

#### 字符串插值拼串

**插值**: 和ruby用法一样。

```elixir
iex(27)> a = "wlw"
"wlw"
iex(28)> b = "I am #{a}"
"I am wlw"
```

**拼串**: 使用 <> 操作符进行字符串拼接

```elixir
iex(29)> n = "jerry"
"jerry"
iex(30)> m = "Hello" <> n
"Hellojerry"
iex(31)> m = "Hello " <> n
"Hello jerry"
```
