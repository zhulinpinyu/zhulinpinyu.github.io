---
layout:     post
title:      "Elixir Regex 正则表达式"
subtitle:   ""
date:       2017-07-10
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

```elixir
iex> path = "/bears?id=1"
iex> regex = ~r{\/(\w+)\?id=(\d+)}

iex> Regex.match?(regex, path) # true
```

此处正则表达式的括弧似乎意义不大。

`~r{}`声明正则表达式。

```elixir
iex> path = "/bears?id=1"
iex> regex = ~r{\/(?<thing>\w+)\?id=(?<id>\d+)}
iex> Regex.named_captures(regex, path)
%{"id" => "1", "thing" => "bears"}
```

`?<thing>`  用于存储匹配 `\w+`的结果
`?<id>` 用于存储匹配 `\d+`的结果

另，注意括号`()`的使用,作用是界定匹配的范围。

```elixir
iex> regex = ~r{\/?<thing>\w+\?id=?<id>\d+}
iex> Regex.named_captures(regex, path)
#nil
```

使用`=~`做正则匹配判断

```elixir
iex> str = "once upon a time"
"once upon a time"
iex> str =~ ~r/u..n/
true
iex> str =~ ~r/u..m/
false
```

tips:  一个点`.`表示一个字符。上述的解释是：str中是否包含以`u`开头以`n`结尾，length为4(u, n 外加两个点)的字符串。str中`upon`符合要求所以运算结果为`true`