---
layout:     post
title:      "React Native 使用自定义的Font Icon"
subtitle:   ""
date:       2017-06-01
author:     "zhulinpinyu"
header-img:
tags:
    - ReactNative
    - Javascript
    - React
---

#### 添加字体
**字体文件path:**

字体文件放入`./assets/fonts/font_name.ttf`

**`package.json`添加配置**

```json
"rnpm": {
  "assets": ["./assets/fonts"]
},
```

此处`./assets/fonts`为字体所在文件夹的路径

**运行命令使字体生效**

```
react-native link
```

#### 使用自定义的字体文件

**安装工具**

```
yarn add react-native-vector-icons
```

**使用**

```
import { createIconSet } from 'react-native-vector-icons'

const glyphMap = { 'ICON-NAME': 65 };
const MyIcon = createIconSet(glyphMap, '字体名称');

<MyIcon
  name="ICON-NAME"
  size={45}
  color="#ff0000"
/>
```

**备注：**

- glyphMap 中的 `65`是字体中对应图标的十进制数值。也就是字体中 `\u0041`就是此处的`65`。字体中数值采用的是十六进制。

- 注意`createIconSet`的第二个参数是`字体名称`**不是**字体文件的文件名

#### 实际效果

![Alt text](/img/in-post/17-06-01-react-native-font-icon.png)


Thanks:       
[https://blog.bam.tech/developper-news/add-custom-icons-to-your-react-native-application](https://blog.bam.tech/developper-news/add-custom-icons-to-your-react-native-application)         
[https://medium.com/@danielskripnik/how-to-add-and-remove-custom-fonts-in-react-native-b2830084b0e4](https://medium.com/@danielskripnik/how-to-add-and-remove-custom-fonts-in-react-native-b2830084b0e4)
