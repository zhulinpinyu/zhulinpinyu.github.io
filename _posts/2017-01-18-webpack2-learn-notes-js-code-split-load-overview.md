---
layout:     post
title:      "Webpack2 学习笔记(五): Javascript 文件分步加载原理简介"
subtitle:   ""
date:       2017-01-18
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
---

[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

注意：本文基于前文完成的基本webpack2 配置

概要：本文主要介绍JavaScript文件分步加载的基本原理；进而通过webpack2 实现JavaScript代码分开打包，从而实现性能优化。

`index.js`

```javascript
const button = document.createElement('button')
button.innerText = 'Click Me'
button.onclick = () => {
  System.import('./image_viewer').then( module => {
    module.default()
  })
}

document.body.appendChild(button)
```

当button的click事件被触发时，调用系统import函数，导入相关module,并加载运行。也就是说未触发click事件module不会被加载.

![/img/in-post/20170118-click-flow.png](/img/in-post/20170118-click-flow.png)

`image_viewer.js`

```
import '../styles/image_viewer.css'
import big from '../assets/big.jpeg'

export default () => {
  const image = document.createElement('img')
  image.src = big
  document.body.appendChild(image)
}
```

`index.html`

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack 2</title>
    <link rel="stylesheet" href="build/style.css">
  </head>
  <body>
    <script src="build/bundle.js"></script>
  </body>
</html>
```

 打包文件：

```
yarn run build
```

最终会有两个JavaScript的打包文件 `bundle.js` `0.bundle.js`

在浏览器运行index.html：  只加载`bundle.js`

![/img/in-post/20170118-index-page.png](/img/in-post/20170118-index-page.png)

点击button触发click事件：接着加载了`0.bundle.js`以及图片

![/img/in-post/20170118-clicked-button.png](/img/in-post/20170118-clicked-button.png)

---

源码：[https://bitbucket.org/zhulinpinyu/js_modules_code_split/src](https://bitbucket.org/zhulinpinyu/js_modules_code_split/src)
