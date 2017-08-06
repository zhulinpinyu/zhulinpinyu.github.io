---
layout:     post
title:      "String and Binaries 学习摘要(7)"
subtitle:   "《Programming Elixir 1.3》p113-128"
date:       2017-08-06
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

#### String 
 **Heredocs**
字符串多行书写

```
IO.puts "start"
IO.write """
  my 
  string 
  """
IO.puts "end"
```

- 单引号包裹起来的叫 字符列表或者说字符集合
- 双引号包裹起来的叫字符串

#### Binaries

表示语法：

```elixir
<< term,... >>

#示例：
iex> b = << 1, 2, 3 >>
#<<1, 2, 3>>
iex> byte_size b
#3
iex> bit_size b 
#24
```


#### 双引号的String即为Binary --- UTF-8的连续字节序列

示例：

```elixir
#返回指定位置的字符串
at(str, offset)

iex> String.at("∂og", 0) #"∂"
iex> String.at("∂og", -1) #"g"


#将字符串首字母大写
iex> String.capitalize "école" #"École"
iex> String.capitalize "ÎÎÎÎÎ" #"Îîîîî"

#将字符串打散成字符数组（元素还是字符串）
codepoints(str)

iex> String.codepoints("José's ∂øg")
#["J", "o", "s", "é", "'", "s", " ", "∂", "ø", "g"]

#转为小写
downcase(str)

iex> String.downcase "ØRSteD"
#"ørsted"


#返回n份儿复制的字符串
duplicate(str, n)

iex> String.duplicate "Ho! ", 3
#"Ho! Ho! Ho! "

#判断字符串是否是特地的字符结尾
ends_with?(str, suffix | [ suffixes ])

iex> String.ends_with? "string", ["elix", "stri", "ring"]
#true

#返回第一字母
first(str)

iex> String.first "∂og"
"∂"

#返回最后一个字母
iex> String.last "∂og"
#"g"

#返回字母序列
graphemes(str)

iex> String.codepoints "noe\u0308l" ["n", "o", "e", " ̈", "l"]
iex> String.graphemes "noe\u0308l" ["n", "o", "ë", "l"]

#计算两个字符串的相似度
jaro_distance

iex> String.jaro_distance("jonathan", "jonathon")
#0.9166666666666666
iex> String.jaro_distance("josé", "john")
#0.6666666666666666

#计算字符串长度
iex> String.length "∂x/∂y"
#5

#计算一个字符串到另一个字符串的演变过程
myers_difference

iex> String.myers_difference("banana", "panama")
#[del: "b", ins: "p", eq: "ana", del: "n", ins: "m", eq: "a"]

#返回字符串的首部和余下部分
next_codepoint

iex> String.next_codepoint("people")
#{"p", "eople"}

#判断是否为单字符的字符串
valid?(str)

iex> String.valid? "∂" 
#true
iex> String.valid? "∂og" 
#false
```