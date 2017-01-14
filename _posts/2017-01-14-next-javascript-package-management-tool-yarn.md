---
layout:     post
title:      "Yarn: 新一代JavaScript包管理工具用法简要总结"
subtitle:   ""
date:       2017-01-14
author:     "zhulinpinyu"
header-img:
tags:
    - Javascript
    - Yarn
---

本文基于 macOS 10.12.2

#### 安装

```bash
brew update
brew install yarn
```

设置 `PATH`环境变量, 添加到(`.profile`, `.bashrc`, `.zshrc`)

```bash
export PATH="$PATH:`yarn global bin`"
```

检查是否安装成功

```bash
yarn --version
```

---

#### 初始化`nodejs`项目

```bash
mkdir node_project && cd node_project
yarn init
```

运行完成自动创建`package.json`文件

---

#### 包管理常用命令

**添加包**

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

使用参数 `--dev` or `-D` 将会添加一个或多个包到`devDependencies`

---

**更新包**

```bash
yarn upgrade #全部升级
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

**移除包**

```bash
yarn remove [package]
```

移除一个包的时候，会从所有位置移除包括 `dependencies`, `devDependencies` 等.

---

**安装所有包**

```bash
yarn
#或者
yarn install
```

---

#### 运行`package.json` 中自定义命令

```json
{
  "name": "my-package",
  "scripts": {
    "build": "babel src -d lib",
    "test": "jest"
  }
}
```

根据需要运行即可：

```
yarn run build
```

---

其他更多用法请参考官方文档        
[https://yarnpkg.com/](https://yarnpkg.com/)        
[https://github.com/yarnpkg/yarn](https://github.com/yarnpkg/yarn)
