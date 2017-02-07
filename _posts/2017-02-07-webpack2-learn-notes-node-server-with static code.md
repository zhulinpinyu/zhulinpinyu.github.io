---
layout:     post
title:      "Webpack2 学习笔记(十):  与Server端整合及远程部署"
subtitle:   ""
date:       2017-02-07
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
    - React
---

[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

**安装node web框架express**

```
yarn add express
```

#### Webpack 与 Node Server整合 ------  开发环境

```
yarn add webpack-dev-middleware --dev
```

`server.js`

```javascript
const express = require('express')
const webpackMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const app = express()

app.use(webpackMiddleware(webpack(webpackConfig)))
app.listen(3000, () => console.log("Listening port 3000"))
```

[Source Code](https://bitbucket.org/zhulinpinyu/webpackproject/commits/7a92dffb6d388ebfe9299fe1ea9bb38adc2a1409?at=master)

#### Webpack 与 Node Server整合 ------  Production环境

`server.js`

```
const express = require('express')
const path = require('path')

const app = express()

if(process.env.NODE_ENV !== 'production'){
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.js')
  app.use(webpackMiddleware(webpack(webpackConfig)))
} else {
  app.use(express.static('dist'))
  app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}


app.listen(process.env.PORT || 3000, () => console.log("Listening..."))
```

运行：

```
NODE_ENV=production node server.js
```

[Source Code](https://bitbucket.org/zhulinpinyu/webpackproject/commits/65c62af)

### 部署到Heroku

[https://devcenter.heroku.com/articles/deploying-nodejs#build-your-app-and-run-it-locally](https://devcenter.heroku.com/articles/deploying-nodejs#build-your-app-and-run-it-locally)
