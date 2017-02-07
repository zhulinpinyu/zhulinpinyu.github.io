---
layout:     post
title:      "React Native 之 Hello World"
subtitle:   ""
date:       2017-02-07
author:     "zhulinpinyu"
header-img:
tags:
    - ReactNative
    - Javascript
    - React
---

#### 开发环境搭建（OSX）

[http://facebook.github.io/react-native/docs/getting-started.html](http://facebook.github.io/react-native/docs/getting-started.html)

**基础环境**

```
brew install node
brew install watchman
npm install -g react-native-cli
```

#### Hello World 示例

创建HelloWorld:

```
react-native init HelloWorld
```

iOS 运行（方法一）：

```
cd /Users/xxx/ReactNative/HelloWorld
npm start
```

```
//new terminal window cd to project root path
cd /Users/xxx/ReactNative/HelloWorld
react-native run-ios
```

iOS 运行（方法二）：

```
cd /Users/xxx/ReactNative/HelloWorld
react-native run-ios
- or -
Open ios/HelloWorld.xcodeproj in Xcode
Hit the Run button
```

**正常运行后可使用 cmd+R 刷新，cmd+D 调出调试菜单**，若前述快捷键无效，解决方法如下图：

![Alt text](/img/in-post/17-02-07-keyboard.png)

---

andorid 运行：

```
cd /Users/xxx/ReactNative/HelloWorld
Have an Android emulator running (quickest way to get started), or a device connected
react-native run-android
```
