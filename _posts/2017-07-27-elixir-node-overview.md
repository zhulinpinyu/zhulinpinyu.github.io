---
layout:     post
title:      "Elixir Node Overview"
subtitle:   ""
date:       2017-07-27
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

### node name

**short name**: 一般用于运行于同一台机器中的node `--sname`

**long name**: 用于在不同机器运行的node `--name`

**尤其要注意的是：**在同一网络中，不能混用short name 和 long name，换句话说就是，要么全用 short name(当然只能是单机环境)，要么全用long name.

### node 简单用例

使用iex创建两个node
```
$ iex --name one
$ iex(one@LiMBP)1> Node.connect(:two@LiMBP)
#true
$ iex(one@LiMBP)2> Node.list
#[:two@LiMBP]

#在 node two 中起一个进程并打印 node 名称
iex(one@LiMBP)6> Node.spawn(:two@LiMBP, fn -> IO.puts node() end)
# two@LiMBP
```

```
$ iex --name two
#node one 执行connect后运行，否则返回 []
$ iex(two@LiMBP)1> Node.list
#[:one@LiMBP]
```

### 单机跨node进程通信

示例：
```elixir
defmodule Demo do
  def reverse do
    receive do
      msg ->
        ret = msg |> String.reverse
        IO.puts ret
        reverse()
    end
  end
end
```

在 node two 中使用Demo启动进程

```
iex(two@LiMBP)4> pid = spawn Demo, :reverse, []
##PID<0.104.0>

#为已知pid的进程设置名称
iex(two@LiMBP)5> Process.register(pid, :rev)
```

在node one中向名称为:rev的进程发送消息

```
iex(one@LiMBP)9> send {:rev, :two@LiMBP}, "ldd"
```

node two 中的输出结果：

```
iex(two@LiMBP)11>
ddl
```

示例2：
```elixir
defmodule Demo do
  def reverse do
    receive do
      {from_pid, msg} ->
        ret = msg |> String.reverse
        send from_pid, ret
        reverse()
    end
  end
end
```

这段代码不同之处在于其在当前执行进程中输出结果，注意运行完以后再次运行`flush()` 查看结果

在node two 中
```
iex(two@LiMBP)13> pid = spawn Demo, :reverse, []
#PID<0.119.0>
iex(two@LiMBP)14> Process.register pid, :rev1
true
iex(two@LiMBP)15> send :rev1, {self(), "czt"}
{#PID<0.89.0>, "czt"}
iex(two@LiMBP)16> flush()
"tzc"
:ok
```

在node one 中
```
iex(one@LiMBP)19> send {:rev1, :two@LiMBP}, {self(),"ldd"}
#{#PID<0.89.0>, "ldd"}
iex(one@LiMBP)20> flush()
"ddl"
```