---
layout: post
title: "sublime text 2使用简介"
description: ""
category: ubuntu
tags: [linux,sublime-text]
---


#####Ubuntu install sublime

    sudo add-apt-repository ppa:webupd8team/sublime-text-2
    sudo apt-get update
    sudo apt-get install sublime-text

#####插件使用方法：
    Ctrl+Shift+P 调用命令面板，我们就会找到一些以“Package Control:”开头的命令，
    我们常用到的有如下几个： 
    Install Package (安装扩展)、
    List Packages (列出全部扩展)、
    Remove Package (移除扩展)、
    Upgrade Package (升级扩展)  
#####Sublime Text2 快捷键汇总
    Ctrl+D 选词 （反复按快捷键，即可继续向下同时选中下一个相同的文本进行同时编辑）
    Ctrl+G 跳转到相应的行
    Ctrl+J 合并行（已选择需要合并的多行时）
    Ctrl+L 选择整行（按住-继续选择下行）
    Ctrl+M 光标移动至括号内开始或结束的位置
    Ctrl+T 词互换
    Ctrl+U 软撤销
    Ctrl+P 查找当前项目中的文件和快速搜索；输入 @ 查找文件主标题/函数；或者输入 : 跳转到文件某行；
    Ctrl+R 快速列出/跳转到某个函数
    Ctrl+K Backspace 从光标处删除至行首
    Ctrl+KB 开启/关闭侧边栏
    Ctrl+KK 从光标处删除至行尾
    Ctrl+KT 折叠属性
    Ctrl+KU 改为大写
    Ctrl+KL 改为小写
    Ctrl+K0 展开所有
    Ctrl+Enter 插入行后（快速换行）
    Ctrl+Tab 当前窗口中的标签页切换
    Ctrl+Shift+A 选择光标位置父标签对儿
    Ctrl+Shift+D 复制光标所在整行，插入在该行之前
    ctrl+shift+F 在文件夹内查找，与普通编辑器不同的地方是sublime允许添加多个文件夹进行查找
    Ctrl+Shift+K 删除整行
    Ctrl+Shift+L 鼠标选中多行（按下快捷键），即可同时编辑这些行
    Ctrl+Shift+M 选择括号内的内容（按住-继续选择父括号）
    Ctrl+Shift+P 打开命令面板
    Ctrl+Shift+/ 注释已选择内容
    Ctrl+Shift+↑可以移动此行代码，与上行互换
    Ctrl+Shift+↓可以移动此行代码，与下行互换
    Ctrl+Shift+[ 折叠代码
    Ctrl+Shift+] 展开代码
    Ctrl+Shift+Enter 光标前插入行
    Ctrl+PageDown 、Ctrl+PageUp 文件按开启的前后顺序切换
    Ctrl+Z 撤销
    Ctrl+Y 恢复撤销
    Ctrl+F2 设置书签
    Ctrl+/ 注释整行（如已选择内容，同“Ctrl+Shift+/”效果）
    Ctrl+鼠标左键 可以同时选择要编辑的多处文本
    Shift+鼠标右键（或使用鼠标中键）可以用鼠标进行竖向多行选择
    Shift+F2 上一个书签
    Shift+Tab 去除缩进
    Alt+Shift+1~9（非小键盘）屏幕显示相等数字的小窗口
    Alt+. 闭合当前标签
    Alt+F3 选中文本按下快捷键，即可一次性选择全部的相同文本进行同时编辑
    Tab 缩进 自动完成
    F2 下一个书签
    F9 行排序(按a-z)
    F11 全屏模式