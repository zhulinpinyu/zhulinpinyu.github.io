---
layout:     post
title:      "Webpack2 学习笔记(一): 入门"
subtitle:   ""
date:       2017-01-14
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
---

[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

注：文中提到的依赖库，若无明确安装，则为`nodejs`提供

```
mkdir js_modules
cd js_modules && mkdir src
```

`src/index.js`

```javascript
const sum = require('./sum')
const total = sum(10,5)

console.log(total)
```

`src/sum.js`

```javascript
const sum = (a, b) => a + b
module.exports = sum
```

 使用`yarn`管理依赖库

```
cd js_modules
yarn init
```

安装webpack 2

```
yarn add webpack@2.2.0-rc.4 --dev
```

创建webpack 配置文件`webpack.config.js` （示例）

```javascript
//获取project根路径的依赖库
const path = require('path')

const config = {
  //配置入口文件
  entry: "./src/index.js",
  //配置输出文件
  output: {
    //获取project根路径并指定输出文件的目录build
    path: path.resolve(__dirname, "build"),
    //输出文件的名称
    filename: "bundle.js"
  }
}

module.exports = config
```

在`package.json`添加

```json
"scripts": {
   "build": "webpack"
 }
```

运行：

```bash
yarnpkg run build
```

```
➜  js_modules yarnpkg run build
yarn run v0.16.1
$ webpack
Hash: 91b8709710a611694610
Version: webpack 2.2.0-rc.4
Time: 61ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.71 kB       0  [emitted]  main
   [0] ./src/sum.js 49 bytes {0} [built]
   [1] ./src/index.js 73 bytes {0} [built]
✨  Done in 0.53s.
```
