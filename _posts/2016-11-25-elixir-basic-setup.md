---
layout:     post
title:      "Elixir 使用入门"
subtitle:   ""
date:       2016-11-25
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

#### 创建Elixir项目

```elixir
mix new PROJECT_NAME
```

**mix 默认可用task**

```elixir
mix                   # Runs the default task (current: "mix run")
mix app.start         # Starts all registered apps
mix app.tree          # Prints the application tree
mix archive           # Lists installed archives
mix archive.build     # Archives this project into a .ez file
mix archive.install   # Installs an archive locally
mix archive.uninstall # Uninstalls archives
mix clean             # Deletes generated application files
mix cmd               # Executes the given command
mix compile           # Compiles source files
mix deps              # Lists dependencies and their status
mix deps.clean        # Deletes the given dependencies' files
mix deps.compile      # Compiles dependencies
mix deps.get          # Gets all out of date dependencies
mix deps.tree         # Prints the dependency tree
mix deps.unlock       # Unlocks the given dependencies
mix deps.update       # Updates the given dependencies
mix do                # Executes the tasks separated by comma
mix escript           # Lists installed escripts
mix escript.build     # Builds an escript for the project
mix escript.install   # Installs an escript locally
mix escript.uninstall # Uninstalls escripts
mix help              # Prints help information for tasks
mix hex               # Prints Hex help information
mix hex.build         # Builds a new package version locally
mix hex.config        # Reads, updates or deletes Hex config
mix hex.docs          # Fetch or open documentation of a package
mix hex.info          # Prints Hex information
mix hex.key           # Manages Hex API key
mix hex.outdated      # Shows outdated Hex deps for the current project
mix hex.owner         # Manages Hex package ownership
mix hex.public_keys   # Manages Hex public keys
mix hex.publish       # Publishes a new package version
mix hex.search        # Searches for package names
mix hex.user          # Registers or manages Hex user
mix loadconfig        # Loads and persists the given configuration
mix local             # Lists local tasks
mix local.hex         # Installs Hex locally
mix local.phoenix     # Updates Phoenix locally
mix local.public_keys # Manages public keys
mix local.rebar       # Installs Rebar locally
mix new               # Creates a new Elixir project
mix phoenix.new       # Creates a new Phoenix v1.2.1 application
mix profile.fprof     # Profiles the given file or expression with fprof
mix run               # Runs the given file or expression
mix test              # Runs a project's tests
mix xref              # Performs cross reference checks
iex -S mix            # Starts IEx and runs the default task
```

#### Elixir 运行当前Project中的code

```bash
iex -S mix
```


#### Elixir 安装依赖库

在文件`mix.exs`中添加

```elixir
defp deps do
  [
	{:ex_doc, "~> 0.12"}
  ]
end
```

执行命令安装依赖

```bash
mix deps.get
```
