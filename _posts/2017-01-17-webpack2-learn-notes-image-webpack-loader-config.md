---
layout:     post
title:      "Webpack2 学习笔记(四): image文件打包规则的配置使用"
subtitle:   ""
date:       2017-01-17
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
---


[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

### Image 打包处理流程

![/img/in-post/17-01-17-image-loader-flow.png](/img/in-post/17-01-17-image-loader-flow.png)

### 安装依赖库

```
yarn add image-webpack-loader url-loader --dev
```

### 配置image处理规则

```javascript
//图片打包处理使用如下配置
{
  //匹配后缀为jpe?g|png|gif|svg的image
  test: /\.(jpe?g|png|gif|svg)$/,
  use: [
    //配置url-loader 使得图片大于40000bytes时被单独分开打包
    {
      loader: 'url-loader',
      options: { limit: 40000 }
    },
    'image-webpack-loader'
  ]
}
```

### 应用图片

完整`image_viewer.js`

```javascript
import '../styles/image_viewer.css'

import big from '../assets/big.jpeg'
import small from '../assets/small.jpeg'

const image1 = document.createElement('img')
image1.src = big
document.body.appendChild(image1)

const image2 = document.createElement('img')
image2.src = small
document.body.appendChild(image2)

```

注意：当图片资源大于配置的40000bytes时将会被单独打包为hash文件名，并存放于build 目录下，但是需要如下配置方可访问到该资源。

```javascript
output: {
  ...
  //静态资源输出配置
  publicPath: "build/"
},
```

完整的配置文件 `webpack.config.js`

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
    filename: "bundle.js",
    //静态资源输出配置
    publicPath: "build/"
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
      },
      //图片打包处理使用如下配置
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
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
