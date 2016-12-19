---
layout:     post
title:      "Elixir 函数概览"
subtitle:   ""
date:       2016-12-19
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

Thanks: [http://elixirschool.com/cn/lessons/basics/functions/](http://elixirschool.com/cn/lessons/basics/functions/)

### 匿名函数

关键字 `fn`,`end`;分隔符`->`,示例：

```elixir
sum = fn(a, b) -> a+b end
sum.(1, 2) # 3
```

### &操作符，匿名函数的快捷方式

```elixir
sum = &(&1 + &2)
sum.(1, 2) # 3
```
&1, &2就是用来获取函数的参数值

### 命名函数
命名函数通过 def 关键字定义在某个模块中;定义在模块内部的函数可以被其他模块使用

```elixir
defmodule Greeter do
  def hello(name) do
    "Hello, " <> name
  end
end

iex> Greeter.hello("Sean")
"Hello, Sean"
```

函数体只有一行，我们可以缩写成 do:

```elixir
defmodule Greeter do
  def hello(name), do: "Hello, " <> name
end

iex> Greeter.hello("Sean")
"Hello, Sean"
```

**函数的定义：** [http://elixir-lang.org/getting-started/modules.html#named-functions](http://elixir-lang.org/getting-started/modules.html#named-functions)

> 在module中,使用def定义普通函数，使用defp定义私有函数。也就是说defp定义的函数只能在当前module中调用，不能被其他外部module调用。而def定义的函数则可以被外部module调用。

示例：

```elixir
defmodule Greeter do
  def hello(name, country \\ "en") do
    phrase(country) <> name
  end

  defp phrase("en"), do: "Hello, "
  defp phrase("es"), do: "Hola, "
end

iex> Greeter.hello("Sean", "en")
"Hello, Sean"

iex> Greeter.hello("Sean")
"Hello, Sean"

iex> Greeter.hello("Sean", "es")
"Hola, Sean"
```
---

### 函数参数默认值
给参数设置默认值，我们可以用 `argument \\ value` 语法，如示例所述。[http://elixirschool.com/cn/lessons/basics/functions/#section-7](http://elixirschool.com/cn/lessons/basics/functions/#section-7)

```elixir
def hello(name, country \\ "en") do
  phrase(country) <> name
end
```

### 卫兵
当 Elixir 匹配某个函数之后，后面的卫兵都会被检测。下例中，我们定义了两个有相同签名的函数，而依赖判断参数类型的卫兵来确定调用哪个函数：

```elixir
defmodule Greeter do
  def hello(names) when is_list(names) do
    names
    |> Enum.join(", ")
    |> hello
  end

  def hello(name) when is_binary(name) do
    phrase <> name
  end

  defp phrase, do: "Hello, "
end

iex> Greeter.hello ["Sean", "Steve"]
"Hello, Sean, Steve"
```

**使用卫兵时不要同时使用函数默认参数，否则编译出错**
