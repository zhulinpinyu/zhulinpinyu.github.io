---
layout: post
title: "Ubuntu Server System Monitor Tool"
description: ""
tags:
    - Linux
---



###1. htop
> 这是最能得到你喜爱的命令行工具。它的功能和top相似，但是更加精致并且多一个漂亮的系统负载界面。它的安装并不是默认的，但是在Ubuntu和Fedora这样的发行版套件上则默认可用。

TO Start

```
$ htop 

```

###2. Glances - An eye on your system

```
sudo apt-get install python-pip build-essential python-dev
sudo pip install Glances
sudo pip install PySensors

```    

TO start

```
glances 
```

REF: [http://askubuntu.com/questions/293426/system-monitoring-tools-for-ubuntu](http://askubuntu.com/questions/293426/system-monitoring-tools-for-ubuntu)