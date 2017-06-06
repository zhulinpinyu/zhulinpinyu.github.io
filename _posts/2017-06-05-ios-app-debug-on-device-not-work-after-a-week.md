---
layout:     post
title:      "iOS 开发真机调试App 正常运行一周后闪退"
subtitle:   ""
date:       2017-06-05
author:     "zhulinpinyu"
header-img:
tags:
    - ReactNative
    - iOS
---

**运行环境：**

iOS: `10.3`
xcode: `8.3.2`

**问题：**iOS 开发中进行**真机**调试，正常运行一段时间（一周）后，出现闪退的问题。

**原因**：Apple官方对于dev状态证书的限制，如下图所示，Personal Team 只有大约一周的真机可运行时间。也就是一周后必须重新安装。

另： 付费开发账号，这个时长限制为`2 weeks`

![Alt text](/img/in-post/17-06-05-ios-debug-on-deivce-problem.png)