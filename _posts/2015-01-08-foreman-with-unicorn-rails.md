---
layout: post
title: "Foreman with unicorn 在rails开发中的使用"
description: ""
category: rails
tags: [rails,docker,unicorn,foreman]
---



###Step 1 安装`foreman`和`unicorn`

添加gem在Gemfile中

    gem 'foreman'
    gem 'unicorn'
    
###Step 2 添加配置文件

####For unicorn

配置文件路径 `./config/unicorn.rb`

    # Preloads application before forking worker processes
    preload_app true

    # Amount of unicorn workers to spin up
    worker_processes 2

    # Restarts workers that hang for that many seconds
    timeout 10
    
####For foreman

配置文件路径 `./Procfile`

    web: bundle exec unicorn -p 3000 -c ./config/unicorn.rb
    
*注：* 在3000端口启动unicorn