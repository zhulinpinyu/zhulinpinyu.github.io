---
layout:     post
title:      "Elixir Basics 学习摘要(1)"
subtitle:   "《Programming Elixir 1.3》p23-36"
date:       2016-12-29
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

#### Range
示例：`r = 1..5` 这就表示一个range. 开头和结尾都是`integer`

####  Regular Expressions
示例1：**只要有匹配即运行结束**

```elixir
iex(1)> Regex.run(~r{[aeiou]}, "caterpillar")
# ["a"]
```

示例2：**匹配所有出现的字符**

```elixir
iex(2)> Regex.scan(~r{[aeiou]}, "caterpillar")
# [["a"], ["e"], ["i"], ["a"]]
```

示例3：**利用所有匹配的字符作为分隔符**

```elixir
iex(4)> Regex.split(~r{[aeiou]}, "caterpillar")
# ["c", "t", "rp", "ll", "r"]
```

示例4：**利用指定字符替换所有匹配的字符**

```elixir
iex(6)> Regex.replace(~r{[aeiou]}, "caterpillar", "=")
# "c=t=rp=ll=r"
```


####  Tuples
**元组**，使用花括弧，一个元组就是一个**有序的**值的集合

#### List
 **顺序访问开销最小，随机访问开销很大**
常用的就是获取List的首个元素以及List 剩余部分构成的List俗称tail

示例：**判断元素是否属于list**

```elixir
1 in [1,2,3]  #返回true
4 in [1,2,3]  #返回false
```

#### KeyWords Lists
Elixir 中keywords lists 如果是函数最后一个参数可以省去方括号,或者说在其他任何地方只要是作为最后一个参数都是可以省去方括号的。

```elixir
DB.save(record, [ {:use_transaction, true}, {:logging, "HIGH"} ])

DB.save(record, use_transaction: true, logging: "HIGH")

iex(4)> [1, fred: 1, dave: 2]
# [1, {:fred, 1}, {:dave, 2}]
iex(5)> {1, fred: 1, dave: 2}
# {1, [fred: 1, dave: 2]}
```

#### Maps
keywords list与map的区别:

```elixir
#map
colors = %{a: "red",a: "blue"}
#%{a: "blue"}

#keyword list
colors3 = [a: "r",a: "b"]
#[a: "r", a: "b"]
```

#### Binaries
二进制数据的表示方式：

```elixir
iex(7)> bin = <<1, 2, 3>>
# <<1, 2, 3>>
iex(8)> byte_size bin
# 3
```

#### Dates and Times

**Date  日期示例：**

```elixir
iex(10)> Date.new(2016, 12, 29)
# {:ok, ~D[2016-12-29]}
iex(11)> {:ok, d1} = Date.new(2016, 12, 29)
# {:ok, ~D[2016-12-29]}
iex(12)> d1
# ~D[2016-12-29]
iex(13)> d2 = ~D[2016-12-29]
# ~D[2016-12-29]
iex(14)> d2 === d2
# true
```

**Time时间示例**

```elixir
iex(35)> t1 = Time.new(12, 34, 56)
# {:ok, ~T[12:34:56]}
iex(36)> t2 = ~T[12:34:56.78]
# ~T[12:34:56.78]
```

#### 布尔值

```elixir
iex(15)> true === :true
# true
iex(16)> false === :false
# true
iex(17)> nil === :nil
# true
```

#### Operators

`===`:  严格相等
`==`:   值相等

#### 变量作用域
基本的作用域单元是函数，变量在函数里定义（包括函数参数），作用域就是当前函数。

**另外，**module中定义的变量，只能**accessible at the top level of that module**，不能在module中定义的函数里访问

#### `with`表达式
- 定义用完即销毁的临时变量，避免污染作用域
- 可以处理pattern matching failed

示例1：**临时变量**

文件`/etc/passwd`

```plain
_installassistant:*:25:25:Install Assistant:/var/empty:/usr/bin/false
_lp:*:26:26:Printing Services:/var/spool/cups:/usr/bin/false
_postfix:*:27:27:Postfix Mail Server:/var/spool/postfix:/usr/bin/false
```

获取指定用户 `_lp` 的 `gid`, `pid`

```elixir
content = "Now is the time"
lp = with {:ok, file} = File.open("/etc/passwd"),
		  content = IO.read(file, :all),
		  :ok = File.close(file),
		  [_, uid, gid] = Regex.run(~r/_lp:.*?:(\d+):(\d+)/, content)
do
		  "Group: #{gid}, User: #{uid}"
end

IO.puts lp
#=> Group: 26, User: 26
IO.puts content
#=> Now is the time
```

示例2：**处理failed 的pattern matching**

使用`<-`代替`=` 使得pattern matching 失败时，不会抛出错误而是返回 `nil`

```elixir
result = with {:ok, file} = File.open("/etc/passwd"),
              content = IO.read(file, :all),
              :ok = File.close(file),
              [_, uid, gid] <- Regex.run(~r/xxx:.*?:(\d+):(\d+)/, content)
         do
              "Group: #{gid}, User: #{uid}"
         end

IO.puts inspect(result)
#=> nil
```

`with`**用法上的坑**
---

**错误写法：**

```elixir
mean = with
         count = Enum.count(values),
         sum   = Enum.sum(values)
       do
         sum/count
       end
```

**正确写法：**

```elixir
mean = with count = Enum.count(values),
	        sum   = Enum.sum(values)
       do
            sum/count
       end

```
或者

```elixir
mean = with(
         count = Enum.count(values),
         sum   = Enum.sum(values)
       do
         sum/count
       end)

```

或者

```elixir
mean = with count = Enum.count(values),
	        sum   = Enum.sum(values)
       do： sum/count
```
