---
layout:     post
title:      "ESLint 使用配置"
subtitle:   ""
date:       2017-02-07
author:     "zhulinpinyu"
header-img:
tags:
    - Javascript
    - ESLint
---

**ESLint:** Javascript代码质量检查工具

#### 编辑器Atom配置

Atom编辑器安装plugin : `linter`, `linter-eslint`

#### 特定项目的配置

安装代码检查规范：

```
yarn add eslint-config-rallycoding --dev
```

在项目根目录新建`.eslintrc`

```
{
  "extends": "rallycoding"
}
```

---

#### Sublime Text 配置ESlint

- npm install global `eslint`
- add `linter`, `eslint`  package to Sublime
- npm install config such as: `eslint-config-rallycoding`
- add config file to project
