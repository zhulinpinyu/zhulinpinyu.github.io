---
layout:     post
title:      "Webpack2 学习笔记(九): 静态部署"
subtitle:   ""
date:       2017-02-06
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
    - React
    - Surge
---

[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

#### 部署配置

环境变量配置，`webpack.config.js`

```javascript
...

plugins: [
    ...

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

 ...
```

添加build参数, `package.json`

```javascript
...
"scripts": {
    ...
    "build": "NODE_ENV=production yarn run clean && webpack -p",
    ...
  },
...
```

`webpack -p` 意指代码采用压缩形式打包JavaScript代码，参看： [https://webpack.js.org/api/cli/#shortcuts](https://webpack.js.org/api/cli/#shortcuts)

**构建发布的代码包**

```
yarn run build
```

[Source code](https://bitbucket.org/zhulinpinyu/webpackproject/commits/a5993db144a65e59a30f912bedd26735c31ed437)

#### 静态发布

方法一：[surge](https://surge.sh/)

```
yarn global add surge

surge -p dist
```

访问： xxxx.surge.sh 即可。

---

方法二：[Github Pages](https://github.com/)

创建分支：`gh-pages`

```
git checkout -b gh-pages
```

将打包目录dist 作为分支`gh-pages`的内容 push至github

```
git subtree push --prefix dist origin gh-pages
```

访问：[https://USERNAME.github.io/REPO_NAME](https://USERNAME.github.io/REPO_NAME)

快捷做法：更新`package.json`

```
...
"scripts": {
    ...
    "deploy": "yarn run build && git subtree push --prefix dist origin gh-pages"
},
...
```

---

方法三：Deploy to AWS S3

[https://www.udemy.com/webpack-2-the-complete-developers-guide/learn/v4/t/lecture/6296328](https://www.udemy.com/webpack-2-the-complete-developers-guide/learn/v4/t/lecture/6296328)
