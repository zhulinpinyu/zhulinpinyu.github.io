---
layout: post
title: "Git project change remote url"
description: ""
category: git
tags: [git,github]
---
{% include JB/setup %}

```
$ git remote -v

```
> View existing remotes    
> origin  https://github.com/user/repo.git (fetch)    
> origin  https://github.com/user/repo.git (push)    

```
$ git remote set-url origin https://github.com/user/repo2.git

```
> Change the 'origin' remote's URL

```
$ git remote -v

```
> Verify new remote URL    
> origin  https://github.com/user/repo2.git (fetch)    
> origin  https://github.com/user/repo2.git (push)    