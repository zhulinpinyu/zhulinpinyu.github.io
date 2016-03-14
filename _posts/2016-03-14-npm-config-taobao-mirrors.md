---
layout:     post
title:      "NPM配置国内淘宝镜像"
subtitle:   ""
date:       2016-03-14
author:     "zhulinpinyu"
header-img:
tags:
    - Nodejs
    - NPM
---

### 淘宝NPM镜像

- 搜索地址：[https://npm.taobao.org](https://npm.taobao.org)
- registry地址：[https://registry.npm.taobao.org](https://registry.npm.taobao.org)

### 配置

**临时使用**

```shell
npm --registry https://registry.npm.taobao.org install [package name]
```

**持久使用**

```shell
//查看当前配置
npm config get registry
//=> https://registry.npmjs.org/

//配置淘宝镜像
npm config set registry https://registry.npm.taobao.org

//查看是否配置成功
npm config get registry
//=> https://registry.npm.taobao.org/
```

> 以后`npm install`将默认采用淘宝的镜像。将会大幅提高工作效率。👍

### Thanks
[http://riny.net/2014/cnpm/](http://riny.net/2014/cnpm/)
[http://taobao.com](http://taobao.com) 👍