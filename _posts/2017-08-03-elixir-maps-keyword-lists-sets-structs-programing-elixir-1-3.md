---
layout:     post
title:      "Maps, Keyword Lists, Sets, and Structs  学习摘要(5)"
subtitle:   "《Programming Elixir 1.3》p79-91"
date:       2017-08-03
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

#### Map和Keyword List，如何抉择？

**注：** 顺序排列 优先靠前的选项

- 要用到pattern match，用Map
- 相同的key 要存不同的值，用Keyword
- 保证元素有序，用Keyword
- 其他情况用Map

#### Keyword Lists

Keyword List典型用途就是作为函数的可选参数. 
模块Keyword和Enum中所有的函数均可用于Keyword List

#### Maps

一些简单的示例：

```elixir
iex(1)> map = %{also_likes: "Ruby", likes: "Programming", name: "Dave", where: "Dallas"}
#%{also_likes: "Ruby", likes: "Programming", name: "Dave", where: "Dallas"}
iex(2)> { value, updated_map } = Map.pop map, :also_likes
#{"Ruby", %{likes: "Programming", name: "Dave", where: "Dallas"}}
iex(3)> map
#%{also_likes: "Ruby", likes: "Programming", name: "Dave", where: "Dallas"}
iex(4)> value
#"Ruby"
iex(5)> updated_map
#%{likes: "Programming", name: "Dave", where: "Dallas"}
```

强大的for:  实现filter功能

```elixir
people = [
  %{ name: "Grumpy",    height: 1.24 },
  %{ name: "Dave",      height: 1.88 },
  %{ name: "Dopey",     height: 1.32 },
  %{ name: "Shaquille", height: 2.16 },
  %{ name: "Sneezy",    height: 1.28 }
]

IO.inspect(for person = %{ height: height } <- people, height > 1.5, do: person)
#[%{height: 1.88, name: "Dave"}, %{height: 2.16, name: "Shaquille"}]
```

**Pattern Matching Can’t Bind Keys**

key的值不能动态绑定, 否则会报错。

```elixir
iex(13)> %{ 2 => state } = %{ 1 => :ok, 2 => :error }
#%{1 => :ok, 2 => :error}
iex(14)> %{ item => :error } = %{ 1 => :ok, 2 => :error }
#** (CompileError) iex:14: illegal use of variable item inside map key match, maps can only match on existing variables by using ^item
#   (stdlib) lists.erl:1354: :lists.mapfoldl/3
```

**Pattern Matching 能够匹配变量值**
具体操作如下，本质还是与常量做匹配， 因为 `^`

```elixir
iex> data = %{ name: "Dave", state: "TX", likes: "Elixir" } 
#%{likes: "Elixir", name: "Dave", state: "TX"}
iex> for key <- [ :name, :likes ] do
...>   %{ ^key => value } = data
...>   value
...> end
#["Dave", "Elixir"]
```

必须`^key`, 否则会执行报错，其实本质就是map的pattern matching key不能是变量。`^key`实质上是常量

**更新Map**

更新map中已有的key， 采用

```elixir
%{ old_map | old_key: new_value }

#or

Map.put(old_map, :old_key, new_value)
```

在已有的map 中添加新key, **只能采用** 

```elixir
Map.put_new(old_map, :new_key, new_value) #只对新key有效

#or

Map.put(old_map, :new_key, new_value) #对新key,已有的key均有效
```

示例：

```elixir
iex> map = %{a: 1}
#%{a: 1}
iex> %{map | a: 11}
#%{a: 11}

iex> Map.put(%{a: 1}, :b, 2)
#%{a: 1, b: 2}
iex> Map.put(%{a: 1, b: 2}, :a, 3)
#%{a: 3, b: 2}

iex> Map.put_new(%{a: 1}, :b, 2)
#%{a: 1, b: 2}
iex> Map.put_new(%{a: 1, b: 2}, :a, 3)
#%{a: 1, b: 2}
```

#### Structs

**Struct 固定字段的map 或者 定制的map**

#### 嵌套的字典结构

简而言之，map的字段值还是map结构

示例：

```elixir
defmodule Customer do
  defstruct name: "", company: ""
end

defmodule BugReport do
  defstruct owner: %Customer{}, details: "", severity: 1
end

report = %BugReport{owner: %Customer{name: "Dave", company: "Pragmatic"}, details: "broken"}

#访问company值
report.owner.company

#更新嵌套的company,显然比较麻烦
report = %BugReport{ report | owner: %Customer{ report.owner | company: "PragProg" }}

#幸好，Elixir 默认提供解决办法
put_in(report.owner.company, "PragProg")

#update_in 传一个函数作为参数
update_in(report.owner.name, &("Mr. " <> &1))

#另外还有get_in以及get_and_update_in， 详见api文档
```

在普通的map中对嵌套字段值更新得用 **原子类型的字段名**，如下图所示：

```elixir
iex> report = %{ owner: %{ name: "Dave", company: "Pragmatic" }, severity: 1} 
#%{owner: %{company: "Pragmatic", name: "Dave"}, severity: 1}
iex> put_in(report[:owner][:company], "PragProg")
#%{owner: %{company: "PragProg", name: "Dave"}, severity: 1}
iex> update_in(report[:owner][:name], &("Mr. " <> &1))
#%{owner: %{company: "Pragmatic", name: "Mr. Dave"}, severity: 1}
```

动态访问嵌套结构中的字段值

```elixir
nested = %{
    buttercup: %{ 
      actor: %{
        first: "Robin",
        last:  "Wright"
      },
      role: "princess"
    },
    westley: %{
      actor: %{
        first: "Cary",
        last:  "Ewles"     # typo!
      },
      role: "farm boy"
    }
}

IO.inspect get_in(nested, [:buttercup])
# => %{actor: %{first: "Robin", last: "Wright"}, role: "princess"}

IO.inspect get_in(nested, [:buttercup, :actor])
# => %{first: "Robin", last: "Wright"}

IO.inspect get_in(nested, [:buttercup, :actor, :first])  
# => "Robin"

IO.inspect put_in(nested, [:westley, :actor, :last], "Elwes")
# => %{buttercup: %{actor: %{first: "Robin", last: "Wright"}, role: "princess"},
# =>     westley: %{actor: %{first: "Cary", last: "Elwes"}, role: "farm boy"}}


#---

authors = [
  %{ name: "JosÃ©",  language: "Elixir" },
  %{ name: "Matz",  language: "Ruby" },
  %{ name: "Larry", language: "Perl" }
]

languages_with_an_r = fn (:get, collection, next_fn) ->
   for row <- collection do
     if String.contains?(row.language, "r") do
       next_fn.(row)
     end
   end
end

#next_fn 就是 get_in

IO.inspect get_in(authors, [languages_with_an_r]) 
#=> [%{language: "Elixir", name: "JosÃ©"}, nil, %{language: "Perl", name: "Larry"}]

IO.inspect get_in(authors, [languages_with_an_r, :name]) 
#=> [ "JosÃ©", nil, "Larry" ]

#由此例可知，get_in 对于有map构成的list也是可访问的
```

**Access 模块**

为`get, get_in, update_in, get_and_update_in`提供预定义函数作为参数使用。

比如用于list的 Access.all/0 和 Access.at/1

```elixir
cast = [
  %{
    character: "Buttercup",
    actor: %{
      first: "Robin",
      last:  "Wright"
    },
    role: "princess"
  },
  %{
    character: "Westley",
    actor: %{
      first: "Cary",
      last:  "Elwes"
    },
    role: "farm boy"
  }
]

IO.inspect get_in(cast, [Access.all(), :character])
#=> ["Buttercup", "Westley"]

IO.inspect get_in(cast, [Access.at(1), :role])
#=> "farm boy"

IO.inspect get_and_update_in(cast, [Access.all(), :actor, :last],
                             fn (val) -> {val, String.upcase(val)} end)
#=> {["Wright", "Ewes"],
#    [%{actor: %{first: "Robin", last: "WRIGHT"}, character: "Buttercup",
#       role: "princess"},
#     %{actor: %{first: "Cary", last: "EWES"}, character: "Westley",
#       role: "farm boy"}]}
```

另外值得注意的是`get_and_update_in`的返回结果是元组，元组的第一个元素为 get的返回结果，第二个元素为update的返回结果（update是基于get定的，也就是get那个就update那个）

Access.elem/1 函数只用于元组

```elixir
cast = [
  %{
    character: "Buttercup",
    actor:    {"Robin", "Wright"},
    role:      "princess"
  },
  %{
    character: "Westley",
    actor:    {"Carey", "Elwes"},
    role:      "farm boy"
  }
]

IO.inspect get_in(cast, [Access.all(), :actor, Access.elem(1)])
#=> ["Wright", "Elwes"]
```

Access.key/1 和 Access.key!/1 只用于字典类型（Map和Struct）

```elixir
cast = %{
  buttercup: %{
    actor:    {"Robin", "Wright"},
    role:      "princess"
  },
  westley: %{
    actor:    {"Carey", "Elwes"},
    role:      "farm boy"
  }
}

IO.inspect get_in(cast, [Access.key(:westley), :actor, Access.elem(1)])
#=> "Elwes"

等价于

IO.inspect get_in(cast, [:westley, :actor, Access.elem(1)])
#=> "Elwes"
```

Access.pop 用于 Map 和 Keyword List
(返回值为元组，第一个元素为key对应的值没有则返回nil,第二个元素为pop后剩余的值)
```elixir
iex> Access.pop(%{name: "Elixir", creator: "Valim"}, :name) 
#{"Elixir", %{creator: "Valim"}}
iex> Access.pop([name: "Elixir", creator: "Valim"], :name) 
#{"Elixir", [creator: "Valim"]}
iex> Access.pop(%{name: "Elixir", creator: "Valim"}, :year) 
#{nil, %{creator: "Valim", name: "Elixir"}}
```

#### MapSet

```elixir
iex> set1 = 1..5 |> Enum.into(MapSet.new)
#MapSet<[1, 2, 3, 4, 5]>
iex> set2 = 3..8 |> Enum.into(MapSet.new)
#MapSet<[3, 4, 5, 6, 7, 8]>
iex> MapSet.member? set1, 3
#true
iex> MapSet.union set1, set2
#MapSet<[1, 2, 3, 4, 5, 6, 7, 8]>
iex> MapSet.difference set1, set2
#MapSet<[1, 2]>
iex> MapSet.difference set2, set1
#MapSet<[6, 7, 8]>
iex> MapSet.intersection set2, set1
#MapSet<[3, 4, 5]>
```