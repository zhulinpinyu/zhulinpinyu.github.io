---
layout: post
title: "[译文]rails 4.1 spring Rspec Guard 配置"
description: ""
category: 译文
tags: [译文,Ruby,Rails,Rspec]
---



###**[译文]** Rails 4.1 配置 Spring, Rspec 和 Guard


----------


> Rails 4.1 允许我们使用[Spring](https://github.com/rails/spring)通过预加载机制快速运行rails和rake命令，避免了每次启动应用时间的浪费。我花了一点时间找了相关资料，下面是我的设置记录。

*我现在使用的测试框架是[Rspec](http://rspec.info/),使用[Guard](https://github.com/guard/guard)作为test case侦测器（及时自动运行有变动的test case）。*

首先，我们新建一个project,当然使用这些技术升级已有的project也是妥妥滴。注意 我使用的是`rails 4.1.0.beta1`,on `Ruby 2.1.0P0`.

![Alt text](/article_images/rsrg1.png)

在编辑器里打开`Gemfile`文件，添加下列gem

- [rspec-rails](https://rubygems.org/gems/rspec-rails) ～ rspec和rails集成的一个gem
- [spring-commands-rspec](https://rubygems.org/gems/spring-commands-rspec) ～ 为spring添加rspec命令，为spring预加载器加载一些依赖。
- [guard-rspec](https://rubygems.org/gems/guard-rspec) ～ 为运行rspec的guard文件侦测器
- [rb-fsevent](https://rubygems.org/gems/rb-fsevent) ～ 只有Mac OS X会用到，一个文件侦测API gem. 

添加如下内容至你的`Gemfile`(你也许想添加gem的版本号)

![Alt text](/article_images/rsrg2.png)

运行`bundle`安装新添加的gem

![Alt text](/article_images/rsrg3.png)

####设置Spring

`spring`命令通过spring应用运行器运行一个命令。默认配置的只有rails 和 rake 命令。我们添加一个插件gem 允许它为我们运行rspec命令。
Spring有一个子`binstub`命令用于更新`myapp/bin`下load spring加载器的脚本。运行这个命令为rspec命令配置这些脚本。
![Alt text](/article_images/rsrg4.png)

如果有一个应用使用spring在后台运行，你可以使用`status`子命令检查。当你运行`spring-enabled`命令，它会启动server。

由于rails应用第一次启动需要初始化，会稍慢一些。现在spring已经为你启动了应用。随后运行将使用一个来自server分支进程，反应会很快。

![Alt text](/article_images/rsrg5.png)


当你关闭命令行时，spring server会自动关闭，你也可以手动关闭它

![Alt text](/article_images/rsrg6.png)


以上是你需要了解的有关spring知识。

####设置 Rspec and Guard

配置rspec和guard

![Alt text](/article_images/rsrg8.png)

这些文件是rspec和guard 自动创建的。现在我们必须告诉guard运行rspec时使用spring预加载器。编辑`Guardfile`并且为rspec改变命令

把
![Alt text](/article_images/rsrg9.png)
改为
![Alt text](/article_images/rsrg10.png)

####运行

（用binsubs,shell扩展,别名等运行。也许在你的系统里执行这些命令有不同的方使。你也许需要`bundle exec rails`或`bin/rails`,或者你的环境已经设置好了）

检查通过spring运行rspec所需的时间，我使用`time`命令。

![Alt text](/article_images/rsrg11.png)

这是一个简单应用的运行所需时间，随着应用变得越来越大，初次启动的时间会变长，你节约的时间就会相应增多。（当然，如果你只对运行结果感兴趣，你也可以只运行`spring rspec`命令）

开始TDD, 在另外的窗口启动guard

![Alt text](/article_images/rsrg12.png)

运行`guard`侦测文件的改动，并出发`spring rspec`命令运行你的测试。

####后记

如果你需要修改应用里的一些基础性的文件，比如添加一个gem,更新一个依赖，你需要重启guard和spring.重启guard也会重启spring,基于依赖的重新加载。


----------


原文链接：[http://girders.org/blog/2014/02/06/setup-rails-41-spring-rspec-and-guard/](http://girders.org/blog/2014/02/06/setup-rails-41-spring-rspec-and-guard/)
