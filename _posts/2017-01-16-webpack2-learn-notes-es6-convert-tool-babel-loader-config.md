---
layout:     post
title:      "Webpack2 学习笔记(二): ES6转码工具babel的配置使用"
subtitle:   ""
date:       2017-01-16
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
---

[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

#### 安装依赖库
由于是dev环境使用故添加参数`--dev`

```
yarn add babel-loader babel-core babel-preset-env --dev
```

|lib|用途|
|:-:|:-:|
|babel-loader|整合webpack与babel协同工作|
|babel-core|核心转码库|
|babel-preset-env|规则集合，准确识别es6/7等语法，并适配相应转码规则|


### 添加配置使babel转码生效

```javascript
//es6/7转码规则：对所有js文件采用babel-loader转码
{
  use: 'babel-loader',
  test: /\.js$/
}
```


 完整的`webpack.config.js`

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
  },
  module: {
    //配置规则
    rules: [
      // es6/7转码规则：对所有js文件采用babel-loader转码
      {
        use: 'babel-loader',
        test: /\.js$/
      }
    ]
  }
}

module.exports = config
```

项目根目录新建`.babelrc`

```
{
  "presets": ["babel-preset-env"]
}
```

 运行：

```
yarn run build
```

查看 bundle.js 即可看到效果

---

#### CommonJS VS ES6

|Action|CommonJS|ES6|
|-|-|-|
|**Import** a module|`const sum = require('./sum')`|`import sum from './sum'`|
|**Export** some code|`module.exports = sum`|`export default sum`|
