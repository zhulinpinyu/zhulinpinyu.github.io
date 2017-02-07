---
layout:     post
title:      "React Native 简单布局及阴影效果"
subtitle:   ""
date:       2017-02-07
author:     "zhulinpinyu"
header-img:
tags:
    - ReactNative
    - Javascript
    - React
---

Flexbox 之 `alignItems`,基本取值有：`flex-start`,`center`,`flex-end`. 意指位于container中的组件在水平方向的左，中，右 布局

---

Flexbox 之 `justifyContent`,基本取值有：`flex-start`,`center`,`flex-end`. 意指位于container中的组件在垂直方向上的上，中，下 布局

---

[iOS View](http://facebook.github.io/react-native/docs/view.html)  组件实现的Header

文字居中：

```
alignItems: 'center',
justifyContent: 'center',
```

阴影效果：

```
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2
```

示例：

![Alt text](/img/in-post/17-02-07-layout.png)

完整代码：

```javascript
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

export default class Header extends Component {

  render() {
    const { viewStyle, textStyle } = styles;
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>Albums</Text>
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    backgroundColor: '#f8f8f8',
    height: 60,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  textStyle: {
    fontSize: 20,
    color: '#ff0000'
  }
};
```
