---
layout:     post
title:      "Control Flow 学习摘要(8)"
subtitle:   "《Programming Elixir 1.3》p129-136"
date:       2017-08-07
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

#### if/unless

if/unless   的值就是其对应运算表达式的运算的结果

#### cond

条件语句，类似于switch 但明显比switch强大. 运算结果为true即可返回值。

```elixir
next_answer =
  cond do
    rem(current, 3) == 0 and rem(current, 5) == 0 ->
      "FizzBuzz"
    rem(current, 3) == 0 ->
      "Fizz"
    rem(current, 5) == 0 ->
      "Buzz"
      true ->
        current
  end
```

但是cond这类语句是不常用的，实际使用中多是使用pattern matching

```elixir
defmodule FizzBuzz do
  def upto(n) when n > 0, do:  1..n |> Enum.map(&fizzbuzz/1)

  defp fizzbuzz(n), do: _fizzword(n, rem(n, 3), rem(n, 5))

  defp _fizzword(_n, 0, 0), do: "FizzBuzz"
  defp _fizzword(_n, 0, _), do: "Fizz"
  defp _fizzword(_n, _, 0), do: "Buzz"
  defp _fizzword( n, _, _), do: n
end
```

#### case

```elixir
case File.open("case.ex") do
  { :ok, file } ->
    IO.puts "First line: #{IO.read(file, :line)}"
  { :error, reason } -> 
    IO.puts "Failed to open file: #{reason}"  
end


defmodule Users do 
  dave = %{ name: "Dave", state: "TX", likes: "programming" }
  
  case dave do
    %{state: some_state} = person ->
      IO.puts "#{person.name} lives in #{some_state}"
    _ ->
      IO.puts "No matches"
  end
end
```

#### Raising Exceptions 异常处理

使用`raise`函数抛出异常

```elixir
iex> raise "Giving up"
** (RuntimeError) Giving up

#抛出带着异常类型及message
iex> raise RuntimeError
#** (RuntimeError) runtime error
iex> raise RuntimeError, message: "override message" 
#** (RuntimeError) override message
```
