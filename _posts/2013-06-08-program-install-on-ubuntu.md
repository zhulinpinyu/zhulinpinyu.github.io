---
layout: post
title: "简易方式program install on Ubuntu"
description: ""
category: 
tags: []
---
{% include JB/setup %}

####java install
    $ sudo add-apt-repository -y ppa:webupd8team/java
    $ sudo apt-get update
    $ sudo apt-get install -y oracle-jdk7-installer
####redis install
    $ sudo add-apt-repository ppa:chris-lea/redis-server
    $ sudo apt-get -y update
    $ sudo apt-get  install -y redis-server
####nodejs install
    $ sudo add-apt-repository ppa:chris-lea/node.js
    $ sudo apt-get -y update
    $ sudo apt-get -y install nodejs