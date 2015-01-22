---
layout: post
title: "linux 远程拷贝"
description: ""
category: ubuntu
tags: [linux]
---
{% include JB/setup %}

    scp -r deploy@172.18.6.80:/opt/* ./

    [备注：将远程80机器上的opt目录下的东西考到当前路径下(./)

___

    scp -r ./* deploy@172.18.6.81:/opt/

    [备注：将当前路径下(./*)的东西考到远程81机器上的opt目录下