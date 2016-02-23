---
layout: post
title: "RVM install for Multi User"
description: ""
category: ruby
tags: [ruby]
---


RVM install for Multi-User

    \curl -L https://get.rvm.io | sudo bash -s stable
    
    sudo usermod -a -G rvm username
    
    restart terminal
    sudo chown -R username:rvm /usr/local/rvm 
    source /etc/profile.d/rvm.sh
    
    sudo apt-get install build-essential openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison subversion pkg-config
    
    rvm install 2.0.0