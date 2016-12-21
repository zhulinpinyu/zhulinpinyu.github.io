---
layout:     post
title:      "mix 自定义Task"
subtitle:   "Elixir"
date:       2016-12-21
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

Thanks: [http://elixirschool.com/lessons/basics/mix-tasks/](http://elixirschool.com/lessons/basics/mix-tasks/)

### 创建Project, 命名为`custom_mix_task`

```elixir
mix new custom_mix_task
```

### 添加一个函数为`lib/custom_mix_task.ex`

```elixir
defmodule CustomMixTask do

  @doc """
  Output's `Hello, World!` everytime.
  """
  def hello do
    IO.puts "Hello, World!"
  end
end
```

### 定义mix task `lib/mix/tasks/hi.ex`

```elixir
defmodule Mix.Tasks.Hi do
  use Mix.Task

  @shortdoc "Simply runs the CustomMixTask.hello/0 command."
  def run(_) do
    CustomMixTask.hello
  end
end
```

### 编译代码

```elixir
mix compile
```

### 查看新建的task

```elixir
mix help

...
mix hi
...
```

### 运行task

```elixir
mix hi
# "Hello, World!"
```
