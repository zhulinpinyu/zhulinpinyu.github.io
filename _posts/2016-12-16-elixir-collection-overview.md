---
layout:     post
title:      "Elixir 集合概览"
subtitle:   ""
date:       2016-12-16
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

**Thanks:**  [http://elixirschool.com/cn/lessons/basics/collections/](http://elixirschool.com/cn/lessons/basics/collections/)

**List， 元组，关键字列表（keywords），Map**

### List
简单的值的集合，类似于其他语言的数组。list元素没有数据类型的限制。Elixir 内部用链表实现列表。

```elixir
iex(2)> a = [1,2,1,:s,'w',"jerry"]
[1, 2, 1, :s, 'w', "jerry"]
```

**列表拼接**：使用 `++/2`函数。

注：`++`是函数名字，`2`代表函数参数的个数。这是Elixir以及Erlang中的表示方法。此处该函数的使用也比较特殊。

```elixir
iex(3)> a = [1]
[1]
iex(4)> b = [2]
[2]
iex(5)> a ++ b
[1, 2]
```

**列表减法**：使用 `--/2`函数。

减去不存在的值也是安全的

```elixir
iex(3)> a = [1]
[1]
iex(4)> b = [2]
[2]
iex(6)> a -- b
[1]
```

存在重复值的减法，对于左边列表中的每个值，右边只有首次出现的这个值会被删除

```elixir
iex(7)> [1,2,2,3,2,3,4] -- [1,2,3,2]
[2, 3, 4]
```
这里的减法，做值比较时使用严格相等

**问题：** `a = [1,2,2,3,2,3,4]`,`b = [1,2,3,2]`完全减法，就是从a中彻底剔除b中存在的值。

```elixir
iex(7)> Enum.uniq(a) -- Enum.uniq(b)
[4]
```

---
**课外科普：**`Enum.dedup/1` **VS** `Enum.uniq/1`

`Enum.dedup/1`只对相邻元素值一样的做去重处理

```elixir
a = [1,2,2,1]
Enum.dedup(a) #[1,2,1]
b = [1,2,1,2]
Enum.dedup(b) #[1,2,1,2]
```

`Enum.uniq/1`对所有元素完全去重处理

```elixir
a = [1,2,2,1]
Enum.uniq(a) #[1,2]
b = [1,2,1,2]
Enum.uniq(b) #[1,2]
```
---

**List的头、尾**
列表的头部是列表的第一个元素；尾部是除去第一个元素剩下的列表。Elixir 提供了两个函数 hd 和 tl 来获取这两个部分

```elixir
iex(15)> a
[1, 2, 2, 3, 4]
iex(16)> hd a
1
iex(17)> tl a
[2, 2, 3, 4]
```

另一种获取头、尾的方式：使用`|`操作符

```elixir
iex(20)> [h|l] = a
[1, 2, 2, 3, 4]
iex(21)> h
1
iex(22)> l
[2, 2, 3, 4]
```

### 元组(Tuple)
定义元组要用花括号。**注意：这种定义形式很容易和ruby中的hash搞混**. `Tuple`,  带花括弧的list，与list有部分类似；**常用作函数的返回值**。

```elixir
iex(23)> a = {"mlx", :name, 12}
{"mlx", :name, 12}
```

**另外：**元组在内存中是连续存放的。获取元组的长度很快，但是修改元组的操作很昂贵：新的元组必须重新在内存中拷贝一份。

### 关键字列表（Keyword list）
列表里的内容是二元元组，并且二元组的第一个元素必须是原子。它和列表的行为完全一致，常用作函数参数。

```elixir
a = [n: 1, b: "as"]
[n: 1, b: "as"]
```

关键字列表非常重要，它有以下的特性：

 - 键（key）都是原子
 - 键（key）是有序的（定义后，顺序不会改变）
 - 键（key）是唯一的

**注意：**key和value 是需要冒号加空格分割的，不然会编译错误, 这个map的情况类似

### Map
Map允许**任意类型的数据作为键**，而且**数据并不严格排序**。你可以使用 `%{}` 来定义Map

**注意：**key和value 是需要冒号加空格分割的，不然会编译错误

```elixir
iex(28)> a = %{"b" => "we", :s => "we"}
%{:s => "we", "b" => "we"}

%{:x => "s", "b" => "we"}
iex(32)> a = %{x: 2}
%{x: 2}
iex(33)> a = %{x: 2,w: 3}
%{w: 3, x: 2}
```

通过下面示例看到如果定义时采用关键字列表语法，则后续定义需全部采用关键字列表语法，否则会报错。

```elixir
iex(27)> a = %{x: "s", "b" => "we"}
** (SyntaxError) iex:27: syntax error before: "b"
iex(34)> a = %{"b" => "we", x: "s"}

iex(34)> a = %{x: 2,:w => 3}
** (SyntaxError) iex:34: syntax error before: w
iex(34)> a = %{:w => 3,x: 2}
```

总是：**为简明起见，建议定义Map时统一语法风格。以免不必要的错误。当然优先选择keyword list 语法。**

如果**重复的键**添加到Map中，后面的值会**覆盖**之前的值

```elixir
iex(36)> a = %{x: 2, x: "jerry"}
%{x: "jerry"}
```

Map更新和获取原子键（key）:

```elixir
a = %{x: 2, y: "jerry"}
#%{x: 2, y: "jerry"}
a.x
#2
b = %{a|x: "zlpy"}
# %{x: "zlpy", y: "jerry"}
a # %{x: 2, y: "jerry"}
b # %{x: "zlpy", y: "jerry"}
```

另一种方法更新Map的值：

```elixir
a = %{x: 2, y: "jerry"}
c = Map.put(a,:x, "alex")
# %{x: "alex", y: "jerry"}
```

读取map中的值：

```elixir
a.y #"jerry"

%{y: name} = a
name #"jerry"
```

注意：
`%{y}=a`这样是不行的，编译通不过会报错。（熟悉es6的同学会对此有所了解）
