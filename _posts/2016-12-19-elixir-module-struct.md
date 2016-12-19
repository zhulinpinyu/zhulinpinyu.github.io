---
layout:     post
title:      "Elixir Module and Struct概览"
subtitle:   ""
date:       2016-12-19
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

Thanks: [http://elixirschool.com/cn/lessons/basics/modules/](http://elixirschool.com/cn/lessons/basics/modules/)

### 模块（Module）的属性

```elixir
defmodule Example do
  @reeting "Hello"

  def greeting(name) do
    ~s(Ok, #{@reeting} #{name}.)
  end
end

iex > Example.greeting("sd")
"Ok, Hello sd."
```

`@reeting "Hello"`,定义属性`@reeting`的值为`"Hello"`.

`~s(Ok, #{@reeting} #{name}.)`另一种形式的字符串拼串。

### 结构体（Struct）
要定义一个结构体，我们使用`defstruct` 关键字，后面跟着关键字列表和默认值：

```elixir
defmodule Example.User do
  defstruct name: "Sean", roles: []
end
```

初始化一个struct:

```elixir
sean = %Example.User{name: "Sean", roles: [:admin, :owner]}
```

也可以像更新`Map`那样更新`Struct`。Struct 和Map 的Pattern Matching,也是可行的。

```elixir
sean = %Example.User{name: "Sean", roles: [:admin, :owner]}

%{name: n} = sean

n #"Sean"
```

**个人理解：Struct就是一种特定类型(或者自定义类型)的Map.**
