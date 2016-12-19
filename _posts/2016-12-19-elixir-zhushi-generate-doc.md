---
layout:     post
title:      "Elixir 使用 ex_doc 将注释生成文档"
subtitle:   ""
date:       2016-12-19
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

依赖库：`ex_doc`

**生成module的文档: 在module中添加文档注释**

```elixir
defmodule Cards do
  @moduledoc """
    Provide some methods for handing deck. 这是一些随便的注释
    运行 mix docs就会生成 doc/index.html
  """
  def create_deck do
	  ...
  end
  ...
end
```

运行命令：`mix docs`

当路径项目根目录下 `doc/index.html` 直接访问即可

---

**为method添加注释生成文档：**

```elixir
defmodule Cards do
  @moduledoc """
    Provide some methods for handing deck. 这是一些随便的注释
    运行 `mix docs`就会生成 doc/index.html
  """

  @doc """
    method `create_deck`, return list with string
  """
  def create_deck do
    values = ["Ace","Two","Three"]
    suits = ["mlx","brj","tsf"]
    for v <- values,s <- suits  do
      "#{v} of #{s}"
    end
  end
	.
	.
	.

```

执行命令`mix docs` 就会生成相应文档

---

**在注释中显示method的示例**

```elixir
defmodule Cards do
  @moduledoc """
    Provide some methods for handing deck. 这是一些随便的注释
    运行 `mix docs`就会生成 doc/index.html
  """

...

  @doc """
   return two part, one is hand specific by count argument

  ## Example

     iex> deck = Cards.create_deck
     iex> {hand,_deck} = Cards.deal(deck,1)
     iex> hand
     ["Ace of mlx"]

  """
  def deal(deck,count) do
    Enum.split(deck,count)
  end

...

end
```
执行命令`mix docs` 就会生成相应文档

**注意：**示例书写的语法细节基本是markdown语法

PS: 样式和elixir官方文档一样
