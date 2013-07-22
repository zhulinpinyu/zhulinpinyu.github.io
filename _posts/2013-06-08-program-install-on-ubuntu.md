---
layout: post
title: "简易方式program install on Ubuntu"
description: ""
category: ubuntu
tags: [linux]
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
####MongoDB install
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
    
`echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list`
    
    sudo apt-get update
    sudo apt-get install mongodb-10gen

More Info 参见[http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)