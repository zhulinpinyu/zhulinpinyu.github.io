---
layout:     post
title:      " Elixir Keyword List 真相"
subtitle:   ""
date:       2017-07-04
author:     "zhulinpinyu"
header-img: "img/in-post/elixir-bg.png"
tags:
    - Elixir
---

Keyword list:

```elixir
[ method: "", path: "", resp_body: "", status: nil ]
```

事实上其内部表示形式为：
```elixir
[ {:method, ""}, {:path, ""}, {:resp_body, ""}, {:status, nil} ]
```

总结：keyword list 实际是Tuple list, 明确的说就是**只有一个key的元组的list**