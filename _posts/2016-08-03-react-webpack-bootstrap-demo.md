---
layout:     post
title:      "React Demo with Bootstrap and Webpack"
subtitle:   ""
date:       2016-08-03
author:     "zhulinpinyu"
header-img:
tags:
    - React
---


## 基本项目

    npm install -g create-react-app
    create-react-app WebpackReactBootstrapDemo

## 使用配置模式

    npm run eject

## 添加依赖库

    npm install bootstrap@3 --save
    npm install jquery --save

## 修改webpack配置文件使bootstrap生效
  
  [config/webpack.config.dev.js](https://github.com/zhulinpinyu/WebpackReactBootstrapDemo/blob/master/config/webpack.config.dev.js) plugins中添加

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  

  [config/webpack.config.prod.js](https://github.com/zhulinpinyu/WebpackReactBootstrapDemo/blob/master/config/webpack.config.prod.js) plugins中添加
  
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })


## 在jsx中应用图片

```react
import docker from './images/docker.png'

···
<img src={docker} alt="docker"/>
```

## 在css中应用图片

```css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: url('./images/tile.jpg');
}
```

## build in Production

```
npm run build
```

## Deploy to Github

添加依赖库

```zsh
npm install gh-pages --save-dev
```

更新[package.json](https://github.com/zhulinpinyu/WebpackReactBootstrapDemo/blob/master/package.json)

```json
{
  ...
  "homepage": "http://zhulinpinyu.github.io/WebpackReactBootstrapDemo",
  
  ...
  
  "scripts": {
  
    ...
  
    "deploy": "gh-pages -d build"
  },
  
  ...
}
```

发布到github

```
npm run build
npm run deploy
```

visit: [https://zhulinpinyu.github.io/WebpackReactBootstrapDemo/](https://zhulinpinyu.github.io/WebpackReactBootstrapDemo/)

Github Repo: [https://github.com/zhulinpinyu/WebpackReactBootstrapDemo](https://github.com/zhulinpinyu/WebpackReactBootstrapDemo)

参考：    
[https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html)
[https://github.com/zhulinpinyu/kanban-app/](https://github.com/zhulinpinyu/kanban-app/)