---
layout: post
title: "spree install guides"
description: ""
category: rails
tags: [rails]
---
{% include JB/setup %}

###[spree](https://github.com/zhulinpinyu/spree)安装指南
    
#####tips:
首先[ruby环境搭建](https://www.evernote.com/shard/s241/sh/f43d6b5f-c385-46e2-aa50-fb415e1d20b1/f12e8e152d9a871223d1c620b4897da8)

###Start
    sudo apt-get install imagemagick
    gem install rails -v 3.2.13
    gem install spree
    rails _3.2.13_ new my_store --skip-bundle
    cd my_store
    在my_store下修改gemfile更换源(http://ruby.taobao.org)
    在my_store下 bundle
    cd ..
    spree install my_store
    
    若遇到问题:
    在my_store下修改gemfile修改: 'jquery-rails' 改为 'jquery-rails', '~> 2.2.1'
    
    gem install spree_cmd
    spree install my_store -A
    
###admin create
    执行下列命令创建admin账户:
    bundle exec rake spree_auth:admin:create
    
####EOF    