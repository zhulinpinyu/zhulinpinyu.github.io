---
layout:     post
title:      "Elixir Test概览"
subtitle:   ""
date:       2016-12-19
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

Thanks: [http://elixirschool.com/cn/lessons/basics/testing/](http://elixirschool.com/cn/lessons/basics/testing/)

在根目录下运行测试：

```
mix test
```

另：同时doctest 也可以 自动测试method注释中的示例 比如

```elixir
@doc """
return two part, one is hand specific by count argument

## Example

   iex> deck = Cards.create_deck
   iex> {hand,_deck} = Cards.deal(deck,1)
   iex> hand
   ["Ace of mlx"]

  """
```

**简单的测试code示例：**

```elixir
defmodule CardsTest do
  use ExUnit.Case
  doctest Cards

  test "create_deck should return 9 cards" do
    deck_size = length(Cards.create_deck)
    assert deck_size == 9
  end

  test "shuffle should return random list of deck" do
    deck = Cards.create_deck
    refute deck == Cards.shuffle(deck)
  end
end
```

注：由于`!=`不能用会出现警告说 `!=`不会生效。所以采用`refute` 具体细节有待考证。实际效果就是不等于。

### refute
`refute` 和 `assert` 的关系就像 unless 和 if 的关系一样，如果要保证某个表达式一定是假的，请使用 refute。

### Test 配置
有时候我们需要在执行真正的测试之前做一下配置工作，我们可以使用 setup 和 setup_all 这两个宏。**setup 在某个测试用例之前都会被运行**，**setup_all 只会在整套测试之前运行一次**。它们两个的**返回值是元组：`{:ok, state}`**，其中 state 可以再后续的测试中被使用。

为了方便举例子，我们把测试代码修改一下，添加上 setup_all：

```elixir
defmodule ExampleTest do
  use ExUnit.Case
  doctest Example

  setup_all do
    {:ok, number: 2}
  end

  test "the truth", state do
    assert 1 + 1 == state[:number]
  end
end
```
