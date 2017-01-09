---
layout:     post
title:      "Modules and Named Functions 学习摘要（3）"
subtitle:   "《Programming Elixir 1.3》p47-63"
date:       2017-01-09
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

> Elixir  具名函数（Named Functions）必须定义在module中

#### 编译module文件

源文件：`times.exs`
```elixir
defmodule Times do
  def double(n) do
    n * 2
  end
end
```

编译方法一：

```bash
iex times.exs
iex(1)> Times.double(2)
#4
```

编译方法二：

```bash
$ iex
iex(1)> c "times.exs"
iex(2)> Times.double(2)
#4
```

**知识点：**

`do...end`在elixir中是用于组织代码块，不论是在module,function还是其他elixir code中，都是这样一个基本的用法。但是在编译时其被转为 `do: CODE`.也就是说`do...end`只是一个语法糖。
日常使用时：`do: CODE`语法用于单行代码，

```elixir
def double(n), do: n * 2
```

`do: CODE`语法也可以用于多行代码，写法如下

```elixir
def greet(greeting, name), do: (
	IO.puts greeting
	IO.puts "How're you doing, #{name}?"
)
```

日常书写多行代码更倾向于使用`do...end` 语法

```elixir
def greet(greeting, name), do
	IO.puts greeting
	IO.puts "How're you doing, #{name}?"
end
```

练习：

```elixir
defmodule Times do
  def double(n) do
    n * 2
  end

  def triple(n), do: n * 3

  def quadruple(n), do: double(n) * 2
end
```

运行结果：

```bash
$ iex times.exs
iex(2)> Times.double(2)
#4
iex(3)> Times.triple(2)
#6
iex(4)> Times.quadruple(2)
#8
```

#### 函数调用和Pattern Matching

 定义同名不同参数的函数，根据Pattern Matching，自动识别实际调用的函数。

**注意：** 同名且参数个数相同时函数的在module的定义顺序。如下示例就是不能正常运行的。

```elixir
defmodule BadFactorial do
  def of(n), do: n * of(n-1)
  def of(0), do: 1
end
```

**练习1：**递归实现求和函数

源文件`shuxue.exs`

```elixir
defmodule Shuxue do
  def sum(0), do: 0
  def sum(n), do: n + sum(n-1)
end
```

运行：

```elixir
$ iex shuxue.exs
iex(1)> Shuxue.sum(1)
#1
iex(2)> Shuxue.sum(3)
#6
iex(3)> Shuxue.sum(100)
#5050
iex(4)> Shuxue.sum(0)
#0
```

**练习2：**求两个非负整数的最大公约数

[源文件`shuxue.exs`](https://forums.pragprog.com/forums/322/topics/Exercise:%20ModulesAndFunctions-5)

```elixir
defmodule Shuxue do
  def gcd(x, 0), do: x
  def gcd(x, y), do: gcd(y, rem(x,y))
end
```

运行：

```elixir
$ iex shuxue.exs
iex(1)> Shuxue.gcd(12,5)
#1
iex(2)> Shuxue.gcd(12,3)
#3
iex(3)> Shuxue.gcd(12,8)
#4
```

#### 卫兵从句（Guard Clauses）

[http://blog.zhulinpinyu.com/2016/12/19/elixir-funcitons/#section-4](http://blog.zhulinpinyu.com/2016/12/19/elixir-funcitons/#section-4)

示例：

```elixir
defmodule Guard do
  def what_is(x) when is_number(x) do
    IO.puts "#{x} is a number"
  end
  def what_is(x) when is_list(x) do
    IO.puts "#{inspect(x)} is a list"
  end
  def what_is(x) when is_atom(x) do
    IO.puts "#{x} is an atom"
  end
end

Guard.what_is(99)        # => 99 is a number
Guard.what_is(:cat)      # => cat is an atom
Guard.what_is([1,2,3])   # => [1,2,3] is a list
```

 个人点评：`if`不就可以搞定么，这不是弄复杂了么。虽说这使得语法更清晰。一家之言，欢迎拍砖。

**实例：**优化前文中的求和函数，使得不论module中函数的定义顺序如何皆可正常运行。

```elixir
defmodule Shuxue do
  def sum(n) when n > 0, do: n + sum(n-1)
  def sum(n) when n === 0, do: 0
end
```

运行：

```bash
$ iex shuxue.exs
iex(1)> Shuxue.sum(0)
#0
iex(2)> Shuxue.sum(3)
#6
```

---

**注意：**卫兵从句不允许使用 `||`或者`&&`

以下皆为可用之操作符或函数：

```
==, !=, ===, !==, >, <, <=, >=

or, and, not, !

+, -, *, /

<>, ++ #用于字符串或者集合join

#类型检查函数
is_atom is_binary is_bitstring is_boolean is_exception is_float is_function is_integer is_list is_map is_number is_pid is_port is_record is_reference is_tuple

#其他函数
abs(number) bit_size(bitstring) byte_size(bitstring) div(number,number) elem(tuple, n) float(term) hd(list) length(list) node() node(pid|ref|port) rem(number,number) round(number) self() tl(list) trunc(number) tuple_size(tuple)
```

#### 函数默认参数

[http://blog.zhulinpinyu.com/2016/12/19/elixir-funcitons/#section-3](http://blog.zhulinpinyu.com/2016/12/19/elixir-funcitons/#section-3)

**练习：** 二分法查找算法的实现

```elixir
defmodule Chop do
  def guess(n, range = low..high) do
    mid = div(low+high, 2)
    IO.puts "Is it #{mid}?"
    _guess(n,mid,range)
  end

  defp _guess(n, n, _), do: IO.puts "it is #{n}"

  defp _guess(n, mid, low.._high)
    when mid > n,
    do: guess(n, low..guess-1)

  defp _guess(n, mid, _low..high)
    when mid < n,
    do: guess(n, guess+1..high)
end
```

**前方高能：** 这就是强大的Pattern Matching

```elixir
defp _guess(n, n, _), do: IO.puts "it is #{n}"
```

#### 私有函数

 只能在定义的module中访问的函数，谓之私有函数，使用关键词`defp`定义。
**注意：** 多个同名函数不能既是`private` 又是`public`的

#### 牛逼闪闪的管道操作符`|>`

原始代码

```elixir
def create_hand(hand_size) do
  deck = Cards.create_deck
  deck = Cards.shuffle(deck)
  Cards.deal(deck,hand_size)
end
```

使用管道操作符实现

```elixir
def create_hand(hand_size) do
  Cards.create_deck
  |> Cards.shuffle
  |> Cards.deal(hand_size)
end

#或者
def create_hand(hand_size) do
  Cards.create_deck |> Cards.shuffle |> Cards.deal(hand_size)
end
```

上面的实践中，前面语句的输出作为下一个语句的输入,也就是说是下一个method的第一个参数.

**注意：**在管道操作符的使用中始终都要用圆括号包裹函数的参数

**问题：当真正的输入参数是第二个时，怎样使用pipe管道操作符？**

**答：** 这种情况无解，只能采用传统的办法做。

#### Modules

Modules首先是一个namespace。Ta有三个有用的directive,分别是`import`, `alias`,`require`

---

**import**
将其他moudle的函数/macro 导入到当前作用域中。

示例：导入`List`的`flatten/1`函数，这样使用`flatten/1`就不必书写`List`前缀

```elixir
defmodule Example do
  def func1 do
     List.flatten [1,[2,3],4]
  end
  def func2 do
    import List, only: [flatten: 1]
    flatten [5,[6,7],8]
  end
end
```

`import`的语法：

```
import Module [, only:|except:]
```

比如导入`List`中所有的函数或者macro

```elixir
import List
```

只导入`List`中`flatten/1`函数和`duplicate/2`函数

```elixir
import List, only: [flatten: 1, duplicate: 2]
```

导入`List`中**除**`flatten/1`和`duplicate/2`以外的所有函数和macro

```elixir
import List, except: [flatten: 1, duplicate: 2]
```

只导入module中的函数或者只导入module中的macro

```elixir
import List, only: :functions
```

或

```elixir
import List, only: :macros
```
---

**alias**

`alias` 自定义一个别名：

```elixir
alias Application.User, as: Wanger
#自定义别名为Wanger
```


`alias` 一个(简写)：

```elixir
alias Discuss.Topic
#默认别名就是 Topic。实际的写法是：alias Discuss.Topic, as: Topic
```

`alias` 多个：

```elixir
alias Discuss.{Topic, User}
#默认别名就是 Topic, User
```

---

#### Module 中Attributes

module中metadata被称之为module的`attribute`,语法为：`@name value`, 相同的属性可多次赋值：

```elixir
defmodule Example do
  @attr "one"
  def first, do: @attr
  @attr "two"
  def second, do: @attr
end
IO.puts "#{Example.second} #{Example.first}"
#two one
```

#### Module背后的秘密

以`IO`为例，实际上,以大写字母开头的Module名称，Elixir运行时都会将其转为atom.

```elixir
iex(1)> is_atom IO
#true
iex(2)> to_string IO
#"Elixir.IO"
iex(3)> :"Elixir.IO" === IO
#true

iex(4)> :"Elixir.IO".puts 123
#123
iex(5)> IO.puts 123
#123
```

#### 调用Erlang库函数

调用erlang的io module

```elixir
iex(6)> :io.format("The number is ~3.1f~n", [5.678])
#The number is 5.7
:ok
```

**练习：**

```elixir
#保留两位小数（使用erlang库）
iex> :io.format("~.2f~n", [2.0/3.0])
# 0.67

# Get the value of an operating system environment variable.
iex> System.get_env("HOME")
"/Users/dave"

#获取文件的扩展名称
iex> Path.extname("dave/test.exs")
".exs"

#获取当前工作目录
iex> System.cwd
"/Users/dave/BS2/titles/elixir/Book/yourturn/ModulesAndFunctions"

# Convert a string containing JSON into Elixir data structures
# There are many options. Some, such as https://github.com/guedes/exjson,
# are specifically for Elixir. Others, such as https://github.com/hio/erlang-json
# are Elnag libraries that are usable from Elixir.

#执行系统shell命令
iex> System.cmd("date")
#"Sun Jul 14 15:04:06 CDT 2013\n"
```
