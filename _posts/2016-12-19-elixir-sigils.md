---
layout:     post
title:      "Elixir 的Sigils 小波浪线`~`"
subtitle:   ""
date:       2016-12-19
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

Thanks: [http://elixirschool.com/lessons/basics/sigils/](http://elixirschool.com/lessons/basics/sigils/)

其作用就是实现对字面量的转义。

**以下Sigils 大写表示原样输出，小写表示计算后输出**

### Char List
`~c` 和`~C`

```elixir
iex(7)> ~c/2 + 7 = #{2 + 7}/
'2 + 7 = 9'
iex(8)> ~C/2 + 7 = #{2 + 7}/
'2 + 7 = \#{2 + 7}'
```

### 正则表达式
`~r` 和`~R`

```elixir
re = ~r/elixir/
"Elixir" =~ re
# false
"elixir" =~ re
# true
```

忽略大小写:

```elixir
re = ~r/elixir/i
"elixir" =~ re
# true
"Elixir" =~ re
# true
```

**Regex API**

```elixir
s = "100_000_000"
Regex.split(~r/_/,s)
# ["100", "000", "000"]
```

### String
`~s` 和`~S`

```elixir
~s/welcome to elixir #{String.upcase "school"}/
# "welcome to elixir SCHOOL"

~S/welcome to elixir #{String.upcase "school"}/
# "welcome to elixir \#{String.upcase \"school\"}"
```

### Word List
`~w` 和`~W`

```elixir
~w/i love #{'e'}lixir school/
# ["i", "love", "elixir", "school"]
~W/i love #{'e'}lixir school/
# ["i", "love", "\#{'e'}lixir", "school"]
```

### 自定义Sigil `~u`

小写字符串转大写

```elixir
defmodule MySigils do
  def sigil_u(string, []), do: String.upcase(string)
end

import MySigils

~u/elixir school/
ELIXIR SCHOOL
```

**以上Sigils 大写表示原样输出，小写表示计算后输出**。并且list 可用以下分隔符包裹（示例中使用的是`/.../`）：

`<...>`,
`{...}`,谨慎使用会与`#{}`存在冲突
`[...]`,
`(...)`,
`|...|`,
`/.../`,
`"..."`,
`'...'`
