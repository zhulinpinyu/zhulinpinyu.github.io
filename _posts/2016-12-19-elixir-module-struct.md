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

updated: 2016-12-19, 2017-07-24

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

Struct 是map,可以使用map 的工具函数，反之map可不一定是Struct。

Struct的更新：可以使用map相同的更新方式

```elixir
def route(%Conv{ method: "GET", path: "/wildthings" } = conv) do
  %{ conv | status: 200, resp_body: "Bears, Lions, Tigers" }
end
```

需要注意的是：Struct 更新以后还是Struct.为明确更新结果还是Struct。

```elixir
%Conv{ conv | status: 200, resp_body: "Bears, Lions, Tigers" }
```

最后Map是不能更新成Struct。

```elixir
iex> map = %{method: "GET", path: "/wildthings"}

> %Servy.Conv{ map | status: 200, resp_body: "Bears, Lions, Tigers" }
** (BadStructError) expected a struct named Servy.Conv, got: %{method: "GET", path: "/wildthings"}
```