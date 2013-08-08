---
layout: post
title: "Deploy rails Project to VPS 实战部署篇"
description: ""
category: Ubuntu
tags: [Deploy]
---
{% include JB/setup %}


注：数据库，git仓库位于服务器A; web server，app server位于服务器B

#####前言
git server搭建参见[Git 服务器搭建](http://ruby-china.org/topics/5040)

生成 SSH 公钥参见[https://help.github.com/articles/generating-ssh-keys](https://help.github.com/articles/generating-ssh-keys)

开启mysql远程访问 参见[mysql数据库远程访问设置方法](http://blog.csdn.net/xjd_1985/article/details/7882992)

#####正题
    
    #分别上传本地公钥至git服务器A 和 web服务器B
    cat ~/.ssh/id_rsa.pub | ssh git@server_A_ip 'cat >> ~/.ssh/authorized_keys'
    cat ~/.ssh/id_rsa.pub | ssh git@server_B_ip 'cat >> ~/.ssh/authorized_keys'    
___
    
    #添加 gem
    gem 'unicorn'
    gem 'capistrano'
___

    #定位至project根目录创建部署文件
    capify .
___
  
 参考[https://github.com/zhulinpinyu/store-activeadmin](https://github.com/zhulinpinyu/store-activeadmin) 修改或创建如下文件 
    
    Capfile
    config/database.yml.sample
    config/deploy.rb
    config/nginx.conf
    config/unicorn.rb
    config/unicorn_init.sh
    chmod +x config/unicorn_init.sh
___

    #部署(位于project 根目录)
    cap deploy:setup
    edit /home/deployer/apps/blog/shared/config/database.yml on server
    cap deploy:cold
    # 导入预置数据
    cap deploy:seed
    
    注： cap -vT 查看deploy task
___
    #删除nginx默认首页(登录server B)
    sudo rm /etc/nginx/sites-enabled/default
    sudo service nginx restart
    
    sudo /usr/sbin/update-rc.d -f unicorn_store-activeadmin defaults
___

Access your Server B
#####END 剧终
    
[Deploy Rails project to VPS 服务器环境搭建篇](/ubuntu/2013/08/07/deploy-rails-project-to-vps/)    