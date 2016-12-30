---
layout:     post
title:      "Anonymous Functions 学习摘要(2)"
subtitle:   "《Programming Elixir 1.3》p37-46"
date:       2016-12-30
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

#### 定义匿名函数
关键字 `fn` 和 `end`

示例1：定义匿名函数并存放于变量 sum, 并调用。**注意 调用时的`.`**

```elixir
iex(1)> sum = fn (a, b) -> a + b end
#Function<12.52032458/2 in :erl_eval.expr/5>
iex(2)> sum.(1,2)
# 3
```

示例2：无参数匿名函数

```elixir
iex(3)> f1 = fn -> IO.puts "Hello" end
#Function<20.52032458/0 in :erl_eval.expr/5>
iex(4)> f1.()
# Hello
# :ok
```

定义匿名函数，无论是否有参数均可省去圆括号

```elixir
iex(5)> sum = fn a, b -> a + b end
#Function<12.52032458/2 in :erl_eval.expr/5>
iex(6)> sum.(1,2)
# 3

iex(7)> f1 = fn -> 100 end
#Function<20.52032458/0 in :erl_eval.expr/5>
iex(8)> f1.()
100
```

---

**练习1：**

```elixir
list_concat.([:a, :b],[:c, :d])
# [:a, :b, :c, :d]
```

创建函数：

```elixir
list_concat = fn l1, l2 -> l1 ++ l2 end
```

**练习2：**

```elixir
pair_tuple_to_list.({1234, 5678})
# [1234, 5678]
```

 创建函数：

```elixir
pair_tuple_to_list = fn {a, b} -> [a, b] end
```

#### 一个函数,多个函数体

示例：读取文件，成功输出第一行内容, 不成功输出错误信息

`test.ex`

```elixir
handle_open = fn
  {:ok, file} -> "First line: #{IO.read(file, :line)}"
  {_, error} -> "Error: #{:file.format_error(error)}"
end

IO.puts "1st Start ..."
IO.puts handle_open.(File.open("testfile"))
IO.puts "2nd Start ..."
IO.puts handle_open.(File.open("testfile2"))
```

运行：

```bash
elixir test.ex
# 1st Start ...
# First line: '

# 2nd Start ...
# Error: no such file or directory
```

**注：**应用方向为代替传统的`switch case`

---

**练习1：**写一个带有三个参数的函数，假如前两个参数是0，返回FizzBuzz； 假如第一个参数是0，返回Fizz；假如第二个参数是0，返回Buzz。否则就返回第三个参数的值。

```elixir
handle_zero = fn
  0, 0, _ -> "FizzBuzz"
  0, _, _ -> "Fizz"
  _, 0, _ -> "Buzz"
  _, _, v -> v
end

IO.puts handle_zero.(10,0,1)
# Buzz
```

#### 函数也能返回函数

示例：

```elixir
fun1 = fn ->
  fn ->
    "Hello Elixir"
  end
end

fun2 = fun1.()
fun2.() #Hello Elixir
```

单行写法：

```elixir
fun1 = fn -> (fn -> "Hello Elixir" end) end
fun2 = fun1.()
fun2.() #Hello Elixir
```

---

示例：外部函数的参数作用于内部函数

```elixir
fz = fn name ->
  fn ->
    IO.puts "Hello #{name}"
  end
end

fz1 = fz.("Ex")
fz1.()
#Hello Ex
```

---

示例：外部函数的参数与内部函数的参数运算

```elixir
add_n = fn n -> (fn m -> n + m end ) end
add_2 = add_n.(2)
IO.puts add_2.(2)
# 4
add_5 = add_n.(5)
IO.puts add_5.(2)
# 7
```

**练习：**
定义一个前缀拼串函数`prefix`,运行效果如下：

```elixir
mrs = prefix.("Mrs")
mrs.("Smith")
# "Mrs Smith"
prefix.("Elixir").("Rocks")
# "Elixir Rocks"
```

定义`prefix`函数：

```elixir
prefix = fn fname ->
  fn lname ->
    "#{fname} #{lname}"
  end
end
```

#### 函数作为函数的参数
示例：

```elixir
times_2 = fn n -> n * 2 end
apply = fn (fun, value) -> fun.(value) end

IO.puts apply.(times_2, 5)
# 10
```

#### 强大而便捷的`&`标记
示例1：一个参数

```elixir
add_one = &(&1+1)
#等价于
add_one = fn n -> n + 1 end

#调用：
add_one.(2)
# 3
```

注：`&1`代表匿名函数的第一个参数

示例2：多个参数

```elixir
compute = &(&1 + &2 * &3)
#等价于
compute = fn n1, n2, n3 -> n1 + n2 * n3 end

#调用：
compute.(1,1,2)
# 3
```

注：`&1`,`&2`,`&3`依次代表匿名函数的第一个、第二个、第三个参数

其他示例：

```elixir
speak = &(IO.puts(&1))
speak.("Hello")
# Hello
```

使用具名函数的示例：

```elixir
speak = &IO.puts/1
speak.("Hello")
# Hello
```

**练习：**使用`&`重写下列函数

```elixir
Enum.map [1,2,3,4], fn x -> x + 2 end
#--------------------------------
Enum.each [1,2,3,4], fn x -> IO.inspect x end
```

答案：

```elixir
Enum.map [1,2,3,4], &(&1+2)
#---------------------------
Enum.map [1,2,3,4], &(IO.inspect(&1))
Enum.map [1,2,3,4], &IO.inspect/1
```
