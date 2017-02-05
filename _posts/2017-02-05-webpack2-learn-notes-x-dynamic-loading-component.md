---
layout:     post
title:      "Webpack2 学习笔记(八): 动态加载react-router路由依赖组件"
subtitle:   "react项目代码优化"
date:       2017-02-05
author:     "zhulinpinyu"
header-img:
tags:
    - Webpack2
    - Javascript
    - React
---

[https://www.udemy.com/webpack-2-the-complete-developers-guide/](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

**优化前示例代码：router.js**

```javascript
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';
import ArtistDetail from './components/artists/ArtistDetail';
import ArtistCreate from './components/artists/ArtistCreate';
import ArtistEdit from './components/artists/ArtistEdit';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={ArtistMain} />
        <Route path="artists/new" component={ArtistCreate} />
        <Route path="artists/:id" component={ArtistDetail} />
        <Route path="artists/:id/edit" component={ArtistEdit} />
      </Route>
    </Router>
  );
};

export default Routes;
```

缺点：初始化加载所有组件，但实际只使用其中某一个组件，即`root` 或者`index` path，存在冗余加载的问题

---

**优化后代码：`router.js`**

```javascript
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes: [
    {
      path: 'artists/new',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistCreate')
          .then(module => cb(null, module.default))
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail')
          .then(module => cb(null, module.default))
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit')
          .then(module => cb(null, module.default))
      }
    }
  ]
}

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentRoutes}/>
  )
};

export default Routes;
```

优点：只在需要时加载相应组件，优化前端性能

[Source code](https://bitbucket.org/zhulinpinyu/webpackproject/commits/94c9ab17dcdbdf71b419227fab1c3161d1c63e71)
