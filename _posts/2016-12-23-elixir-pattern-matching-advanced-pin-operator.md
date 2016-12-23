---
layout:     post
title:      "Pattern Matching 精进 & Pin 操作符"
subtitle:   "Elixir"
date:       2016-12-23
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

#### Variables Bind Once (per Match)
模式匹配中，同一变量只能有一次匹配值绑定，否侧报错

```elixir
iex(1)> [a,a] = [1,1]
# [1, 1]
iex(2)> a
# 1
iex(3)> [b,b] = [1,2]
# ** (MatchError) no match of right hand side value: [1, 2]
```

第一个示例中没有报错的原因是：`[a,1] = [1, 1]`第一个a值已经绑定为1，也就是说第二个a就是1.这样理解第二个示例就显而易见了。

#### pin操作符`^`
 想要在pattern matching中使用已绑定值得变量，**并且不希望该变量值被重新绑定**，所以使用`^`pin操作符

```elixir
iex(6)> b = 1
# 1
iex(7)> b = 2
# 2
iex(8)> ^b = 1
# ** (MatchError) no match of right hand side value: 1
iex(8)> ^b = 2
# 2
```

`^b`实际含义就是在编译时就读取了b的值。实际就是`2 = 2`, 这样也就理解了`^b=1`,报错了其实就是`2 = 1`,这当然会报错。

另一个示例：

```elixir
iex(9)> a = 1
## 1
iex(10)> [a, ^a] = [2,1]
# [2, 1]
iex(11)> a
# 2
```

`[a, ^a] = [2,1]`理解为：`[a, 1] = [2,1]`即可理解。`^a`先读取a的值，然后再做匹配运算。

再来一例：

```elixir
iex(12)> a = 1
# 1
iex(13)> ^a = 2 - a
# 1
```

这表明`^`和普通运算符(`+ - * /`)处于同一级,并优于`=`

[http://blog.zhulinpinyu.com/2016/12/16/elixir-enum-pattern-matching/#pattern-matching](http://blog.zhulinpinyu.com/2016/12/16/elixir-enum-pattern-matching/#pattern-matching)
