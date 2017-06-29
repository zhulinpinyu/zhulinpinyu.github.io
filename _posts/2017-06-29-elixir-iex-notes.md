---
layout:     post
title:      " Elixir 学习之iex赏析"
subtitle:   ""
date:       2017-06-29
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

1. CLI 输入`iex`即可运行官方库中的函数, 若需要运行自定义lib文件则要手动加载`c "lib/servy.ex"`
![Alt text](/img/in-post/2017-06-29-iex.png)
2. `iex lib/servy.ex`即加载自定义文件`lib/servy.ex`运行,那么就可在文件中直接调用`servy.ex`中定义的module。
![Alt text](/img/in-post/2017-06-29-iex-load.png)
  elixir 也可直接运行 无依赖的文件
  ![Alt text](/img/in-post/2017-06-29-elixir-run.png)
3. `iex -S mix`即可自动加载项目下所有文件
![Alt text](/img/in-post/2017-06-29-iex-s-mix.png)

**注：**以上`iex`相关的命令皆在elixir项目servy根路径下运行。
