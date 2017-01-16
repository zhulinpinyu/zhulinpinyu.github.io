---
layout:     post
title:      "Webpack 2 学习笔记(三): css 文件打包规则的配置使用"
subtitle:   ""
date:       2017-01-16
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
---

[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)


### 基础示例准备
添加文件`src/image_viewer.js`

```javascript
import '../styles/image_viewer.css'

const image = document.createElement('img')
image.src = "http://lorempixel.com/400/400/"
document.body.appendChild(image)
```

添加样式文件`styles/image_viewer.css`

```css
img {
  border: 10px solid #ccc;
}
```

### 配置: 打包成页面内嵌式css

安装依赖库

```bash
yarn add css-loader style-loader --dev
```

|lib|简介|
|-|-|
|css-loader|处理css文件|
|style-loader|接收导入并处理过的css文件，整合至HTML中|


打包css文件的配置规则

```javascript
module: {
  //配置规则
  rules: [
    ...
    {
      use: ['style-loader','css-loader'],
      test: /\.css$/
    }
  ]
}
```

注意：`['style-loader','css-loader']`这里的配置是有顺序的，但规则应用顺序是从右到左的。也就是先 `css-loader`,再`style-loader`

运行即可：

```bash
yarn run build
```

**注释：** 以上配置仅将css 添加至页面head下的style tag 中  未打包成单独的css文件

```
<head>
  <meta charset="utf-8">
  <title>Webpack 2</title>
  <style type="text/css">
	img {
	  border: 10px solid #ccc;
	}
  </style>
</head>
```

### 配置：CSS文件单独打包

安装依赖库：

```
yarn add css-loader style-loader extract-text-webpack-plugin@2.0.0-beta.4 --dev
```

打包css文件的配置规则：完整的`webpack.config.js`

```javascript
//获取project根路径的依赖库
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
      //es6/7转码规则：对所有js文件采用babel-loader转码
      {
        use: 'babel-loader',
        test: /\.js$/
      },
      //使用如下配置使css打包成单独的文件
      {
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        }),
        test: /\.css$/
      }
    ]
  },
  plugins: [
    //使用如下配置使css打包成单独的文件style.css
    new ExtractTextPlugin('style.css')
  ]
}

module.exports = config
```

**重点内容：**

```
//使用如下配置使css打包成单独的文件
{
  loader: ExtractTextPlugin.extract({
    loader: 'css-loader'
  }),
  test: /\.css$/
}
```

```javascript
plugins: [
  //使用如下配置使css打包成单独的文件style.css
  new ExtractTextPlugin('style.css')
]
```

运行即可在build 目录下看`style.css`

```
yarn run build
```
