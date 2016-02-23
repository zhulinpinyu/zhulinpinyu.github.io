---
layout: post
title: "OSX use Fig/Docker development Rails project"
description: ""
category: docker
tags: [docker,osx,fig,rails]
---



###安装Fig
*注：[OSX docker install](https://docs.docker.com/installation/mac/) 参见前文

    curl -L https://github.com/docker/fig/releases/download/1.0.1/fig-`uname -s`-`uname -m` > /usr/local/bin/fig; chmod +x /usr/local/bin/fig
    
That should be all you need! Run`fig --version` to see if it worked.

###Setup Rails Dev ENVIRONMENT

    $ mkdir demo
    $ cd demo


在Demo下创建Dockerfile文件

    From ruby:2.2.0

    # Install package
    RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
    RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*
    RUN mkdir /demo
    WORKDIR /demo
    ADD Gemfile /demo/Gemfile
    RUN bundle install
    ADD . /demo
    
    
在Demo下创建fig.yml文件

    db:
      image: zhulinpinyu/mongodb:latest
      ports:
        - 27017
    web:
      build: .
      command: bundle exec rackup -p 3000
      volumes:
        - .:/demo
      ports:
        - 3000:3000
      links:
        - db
        

在Demo下创建Gemfile文件

    source 'https://rubygems.org'

    gem 'rails', '4.2.0'
    
在demo下运行创建rails project
    
    fig run web rails new . --force -O -T -B
    
*注:
    `-O # Skip Active Record files`
    `-T # Skip Test::Unit files`
    `-B # Don't run bundle install`
    
###ERROR问题

**Question 1：运行正常端口无法访问**

    默认采用rails 服务器会出现3000端口无法访问的问题，改用 unicorn 会解决这个问题
    
**Question 2：数据库链接配置**

`以往的localhost配置无法使用`

    <%= ENV.fetch('DB_PORT_27017_TCP_ADDR', 'localhost') %>:<%= ENV.fetch('DB_PORT_27017_TCP_PORT', '27017') %>
    
*注*：DB_PORT_27017_TCP_PORT和DB_PORT_27017_TCP_ADDR 中的DB 部分就是fig.yml中的db
    