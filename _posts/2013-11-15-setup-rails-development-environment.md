---
layout: post
title: "Ubuntu下Ruby on Rails开发环境的安装"
description: ""
category: rails
tags: [linux, ruby, rails]
---
{% include JB/setup %}

####Ubuntu下Ruby on Rails开发环境的安装

<b>鸣谢: Ruchee的荒草园子</b>
<br/>
转载：[http://www.ruchee.com/code/web/ruby/ubuntu.html](http://www.ruchee.com/code/web/ruby/ubuntu.html)
参考链接：[https://rvm.io/rvm/install](https://rvm.io/rvm/install)

#####第一步 安装依赖库

    sudo apt-get install git curl
    
#####第二步 安装RVM
    1. bash < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)
    2. vim ~/.zshrc 或 gedit ~/.zshrc，在最后添加 [[ -s "\(HOME/.rvm/scripts/rvm" ]] && source "\)HOME/.rvm/scripts/rvm"
    3. source ~/.zshrc ：重新加载修改过的bash配置文件
    4. type rvm | head -1 ：如显示rvm is a function则说明RVM安装成功
    5. sudo apt-get install build-essential openssl libreadline6 libreadline6-dev zlib1g zlib1g-dev libssl-dev libyaml-dev 
    libsqlite3-0 libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison subversion（这一大串的安装数据可以通过执行rvm requirements得到）
    
#####第三步 安装Ruby

    rvm install 2.0.0：安装指定版本的Ruby
    rvm use 2.0.0：使用刚刚安装的Ruby版本
    
#####第四步 更换镜像

    淘宝RubyGems镜像地址为http://ruby.taobao.org/，使用方式如下
    gem sources -a http://ruby.taobao.org/：增加新镜像
    gem sources -r http://rubygems.org/：移除原有镜像
    gem sources -l；查看镜像列表（必须确保只有淘宝一个镜像地址）
    对于Rails应用，也可以将Gemfile的第一行改写为source 'http://ruby.taobao.org/'，然后执行bundle install进行更新
    
#####第五步 安装Rails

    gem install rails -v 4.0.0 --no-rdoc --no-ri：使用--version指定要安装的版本
    
#####第六部安装JS运行环境

参考：[http://zhulinpinyu.github.io/ubuntu/2013/06/08/program-install-on-ubuntu/](http://zhulinpinyu.github.io/ubuntu/2013/06/08/program-install-on-ubuntu/)

#####第七步 新建项目进行测试
    
    rvm use 2.0.0 --default：这样以后就不需要频繁地手动选择版本了
    rails new demo：新建项目并自动安装所需的gem包
    cd demo
    rails s：启动服务器
    使用浏览器打开http://127.0.0.1:3000即可浏览项目默认首页
