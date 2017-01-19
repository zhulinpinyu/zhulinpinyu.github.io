---
layout:     post
title:      "Webpack2 学习笔记(六):  Reactjs Project 依赖库单独打包及优化"
subtitle:   ""
date:       2017-01-19
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
    - React
---

[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

**背景信息：**示例项目依赖库

```json
"dependencies": {
  "faker": "^3.1.0",
  "lodash": "^4.17.2",
  "react": "^15.4.1",
  "react-dom": "^15.4.1",
  "react-input-range": "^0.9.2",
  "react-redux": "^4.4.6",
  "react-router": "^3.0.0",
  "redux": "^3.6.0",
  "redux-form": "^6.3.2",
  "redux-thunk": "^2.1.0"
}
```

配置`webpack.config.js` 使得依赖库单独打包

定义依赖库名称集合的数组：

```
const VENDOR_LIBS = [
  "react", "faker", "lodash", "react-dom", "react-input-range", "react-redux", "react-router", "redux", "redux-form", "redux-thunk"
]
```

关键配置信息：bundle与vendor 分别打包

```javascript
entry: {
  bundle: './src/index.js',
  vendor: VENDOR_LIBS
},
output: {
  path: path.join(__dirname, 'dist'),
  filename: '[name].js'
}
```

---

利用插件`webpack.optimize.CommonsChunkPlugin`解耦依赖关系： 利用plugin使得打包时自定义代码不直接依赖于库，而是依赖打包后的`vendor.js`；若不使用插件，打包的依赖将无法发挥作用。

```
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
]
```

---

利用插件`html-webpack-plugin`实现打包后的文件自动插入html

```
yarn add html-webpack-plugin --dev
```

配置信息：

```
new htmlWebpackPlugin({
  template: 'src/index.html'
})
```

具体参考：[https://github.com/ampedandwired/html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

---

**打包文件添加hash数值，使其利用浏览器缓存**:配置如下

```
output: {
  path: path.join(__dirname, 'dist'),
  filename: '[name].[chunkhash].js'
},
```

```
new webpack.optimize.CommonsChunkPlugin({
  name: ['vendor','mainfest']
}),
```

---

自动清理旧的打包文件：

```
yarn add rimraf --dev
```

`package.json`

```
"scripts": {
  "clean": "rimraf dist",
  "build": "yarn run clean && webpack"
},
```

这样每次运行`yarn run build`旧的dist就会被清理。

---

运行：`yarn run build` ,依赖库打包成`vendor.xxxxxx.js` ,自定义代码打包成 `bundle.xxxxx.js` `mainfest.xxxxx.js` ,以及插入打包后文件的`index.html`

---

 源代码:     
 [文件打包及自动插入至index.html](https://bitbucket.org/zhulinpinyu/webpackproject/commits/5959cae4165e7be88fead518deed002516fbd85f)      
[打包文件添加hash标签，并实现自动清理旧的打包文件](https://bitbucket.org/zhulinpinyu/webpackproject/commits/eb76f11350b92ea3cfd6e65a908840cc14b1221d)
