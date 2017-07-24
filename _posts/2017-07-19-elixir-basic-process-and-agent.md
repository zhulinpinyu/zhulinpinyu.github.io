---
layout:     post
title:      "Elixir basic process && Agent"
subtitle:   ""
date:       2017-07-19
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

**MFA --- module, function, arguments**

**F --- function**

procs.exs

```elixir
defmodule Procs do
  def greeter(count) do
    receive do
      {:boom, reason} ->
        exit(reason)
      {:add, n} ->
        greeter(count+n)
      {:reset} ->
        greeter(0)
      msg ->
        IO.puts "#{count}: #{inspect msg}"
        greeter(count)
    end
  end
end
```


```elixir
# run in iex
c "proc.exs"
spawn Procs, :greeter, ["mlx"]

spawn(fn -> IO.puts "Hi Process" end)

# create 100 process
Enum.each(1..1000, fn _ -> spawn(fn -> Process.sleep(5000) end) end)

:observer.start()
```

**Sending and Receiving Messages**

```elixir
pid = spawn Procs, :greeter, []
send pid, "wonder man"
```

**Linking Our Fate to Our Children's Fate**

- spawn 开启独立process
- spawn_link 开启的是child process, 只要一个非正常挂掉，另一个也随之被kill

> exit(:bad) 表示非正常挂掉。exit(:normal) 表示正常退出。

```elixir
# 增加100个process 10秒后结束

inner_process = fn -> Process.sleep(10_000) end
outer_process = fn -> spawn(inner_process); exit(:bad) end
Enum.each(1..100, fn _ -> spawn(outer_process) end)

################

#process 数量不变：原因就是spawn_link

inner_process = fn -> Process.sleep(10_000) end
outer_process = fn -> spawn_link(inner_process); exit(:bad) end
Enum.each(1..100, fn _ -> spawn(outer_process) end)
```

**Agents—Simple State Holders**

```elixir
#初始化
{:ok, pid} = Agent.start_link(fn -> 0 end)

#读取process的值
Agent.get(pid, fn count -> count end)

#更新process的值
Agent.update(pid, fn count -> count+1 end)

#读取并更新process的值 (返回值为读取到的值，然后再做的更新)
Agent.get_and_update(pid, fn count -> {count, count+1} end)
```

Example:

```elixir
defmodule HitCount do
  def start() do
    Agent.start_link(fn -> 0 end)
  end

  def record_hit(agent) do
    Agent.update(agent, &(&1 + 1))
  end

  def get_count(agent) do
    Agent.get(agent, &(&1))
  end
end

{:ok, agent} = HitCount.start()

IO.puts HitCount.record_hit(agent)
IO.puts HitCount.get_count(agent)

IO.puts HitCount.record_hit(agent)
IO.puts HitCount.get_count(agent)
```