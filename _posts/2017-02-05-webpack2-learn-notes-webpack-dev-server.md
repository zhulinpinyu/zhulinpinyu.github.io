---
layout:     post
title:      "Webpack2 学习笔记(七):  webpack-dev-server 使用简介"
subtitle:   ""
date:       2017-02-05
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
    - React
---

[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

![17-02-03-webpack-dev-server.png](/img/in-post/17-02-03-webpack-dev-server.png)


安装依赖包：

```bash
yarn add webpack-dev-server@2.2.0 --dev
```

文件`package.json`

```json
...
"scripts": {
  "clean": "rimraf dist",
  "build": "yarn run clean && webpack",
  "serve": "webpack-dev-server"
},

...
```

运行：

```bash
yarn run serve
```

访问： [http://localhost:8080/](http://localhost:8080/) 即可

[Source code](https://bitbucket.org/zhulinpinyu/webpackproject/commits/7db775c89662850d4b68c61457cd588bf8a91358)
