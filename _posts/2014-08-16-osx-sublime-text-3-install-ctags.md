---
layout: post
title: "OSX Sublime text 3 install Ctags"
description: ""
category: ubuntu
tags: [linux,sublime-text,ctag]
---



###OSX Sublime text 3 install Ctags

    brew install ctags
    
`When you get Error` like following:

    Error: The `brew link` step did not complete successfully
    The formula built, but is not symlinked into /usr/local
    Could not symlink include/readtags.h
    /usr/local/include is not writable.

    You can try again using:
    brew link ctags
    
You Can use following solution:

    sudo chown -R $(whoami) /usr/local/include
    

`Other Error` like this:

    ➜  ~  brew link ctags
    Linking /usr/local/Cellar/ctags/5.8...
    Error: Could not symlink lib/readtags.o
    /usr/local/lib is not writable.
    
You Can use following solution:

    sudo chown -R $(whoami) /usr/local/lib
    
###**After use [this doc](https://www.evernote.com/shard/s241/sh/dceef6e9-1734-4781-8bd8-0b8cf68f92a9/53c6e553f760e7f5652e90e211d0fe44) to install ctags to sublime text 3**

REF::[http://jingyan.baidu.com/article/48206aeafba820216ad6b3f5.html](http://jingyan.baidu.com/article/48206aeafba820216ad6b3f5.html)