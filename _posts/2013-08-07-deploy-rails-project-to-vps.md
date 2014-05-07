---
layout: post
title: "Deploy Rails project to VPS服务器环境搭建篇"
description: ""
category: Ubuntu
tags: [Deploy]
---
{% include JB/setup %}

#####Deploy Rails project to VPS 服务器环境搭建篇
    
######1.准备部署环境    
    
    ubuntu server (推荐ubuntu server 12.04 LTS)
    
######2.安装必要的软件(在root用户下)

    #切换到root用户： 
      sudo su
___      

      
    #修改源 
    #修改ubuntu server默认前缀us改为cn即可改为国内源
      vim /etc/apt/sources.list
    #更新源
      apt-get -y update
      apt-get -y upgrade (可选)
___      


    #安装git curl 及必要的依赖包
      apt-get -y install curl git-core python-software-properties software-properties-common
___

    #安装nginx
    #添加nginx源
      add-apt-repository ppa:nginx/stable
      #if add-apt-repository command not found, use following command install it（前面已装）     
      [apt-get install python-software-properties]    
      [apt-get install software-properties-common]
    #更新源
      apt-get -y update
    #安装
      apt-get -y install nginx
    #启动nginx
      service nginx start
    #当遇到端口占用的问题时，修改/etc/nginx/sites-available/default文件 注释掉IPV6的配置
___

    #安装nodejs
      add-apt-repository ppa:chris-lea/node.js
      apt-get -y update
      apt-get -y install nodejs
___

    #数据库安装 mysql 或者 postgresql 依个人使用而定
    #安装mysql
      apt-get install mysql-server
      //gem mysql2 需要依赖libmysqlclient-dev
      apt-get install libmysqlclient-dev
    #安装 postgresql
      add-apt-repository ppa:pitti/postgresql
      apt-get -y update
      apt-get -y install postgresql libpq-dev
      sudo -u postgres psql
      #设置默认用户的密码 
      # \password   (sudo su postgres 切换至用户postgres)
      创建用户pg  mlx 密码 111111
      # create user mlx with password '111111';
      创建属于用户mlx的数据库 blog_production
      # create database blog_production owner mlx;
      # \q
___

    #创建新用户deployer (在root下)
      (So if you get an error that "admin" group does not exist, simply replace it with "sudo". adduser deployer --ingroup sudo)
      adduser deployer --ingroup sudo
      su deployer
      cd

#####以下在新建的用户deployer下完成
    
    #在用户deployer下安装rbenv
      curl https://raw.githubusercontent.com/fesplugas/rbenv-installer/master/bin/rbenv-installer | bash
    #添加下面代码到.bashrc
    _______________________________________________
    export RBENV_ROOT="${HOME}/.rbenv"
    
    if [ -d "${RBENV_ROOT}" ]; then
      export data-path="${RBENV_ROOT}/bin:${PATH}"
      eval "$(rbenv init -)"
    fi
    _______________________________________________
    #执行如下代码使上面修改生效
      . ~/.bashrc
___      
      
    #在用户deployer下安装ruby
      rbenv bootstrap-ubuntu-12-04
      rbenv install 2.0.0-p247
      rbenv global 2.0.0-p247
      gem install bundler --no-ri --no-rdoc
      rbenv rehash   
___

    #在用户deployer下更新gem源
      gem sources -a http://ruby.taobao.org/：增加新镜像
      gem sources -r https://rubygems.org/：移除原有镜像
      gem sources -l；查看镜像列表（必须确保只有淘宝一个镜像地址）
      对于Rails应用，也可以将Gemfile的第一行改写为source 'http://ruby.taobao.org/'，然后执行bundle install进行更新

###END 服务器环境搭建完成

[Deploy rails Project to VPS 实战部署篇](/ubuntu/2013/08/08/deploy-rails-project-to-vps-/)
