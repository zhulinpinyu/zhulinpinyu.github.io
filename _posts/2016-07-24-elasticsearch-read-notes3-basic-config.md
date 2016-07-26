---
layout:     post
title:      "《Elasticsearch in Action》阅读笔记三：基础配置概览篇"
subtitle:   ""
date:       2016-07-24
author:     "zhulinpinyu"
header-img:
tags:
    - Elasticsearch
---
## 配置Elasticsearch

### 自定义集群名称
修改elasticsearch.yml (OSX brew install elasticsearch)

```shell
/usr/local/etc/elasticsearch/elasticsearch.yml
```
修改集群名称并重启以后，原来索引的数据将不存在了，原因是原来的索引数据存放在原来集群名称的目录下。如果要查看原来的数据把集群名称修改回原来的并重启即可。或者在新的集群下重新索引数据。

### 修改`logging.yml`配置log信息
默认logging的输出级别是INFO

### 调整JVM配置
- 配置heap size使得每次启动elasticsearch都生效。
修改文件`/usr/local/Cellar/elasticsearch/2.3.4/libexec/bin/elasticsearch.in.sh` (OSX brew install elasticsearch). 在首行`#!/bin/sh`的下一行添加 `ES_HEAP_SIZE=500m`即可。配置可用内存500M.
- 另外一种方式就是每次启动时配置

  ```shell
  export ES_HEAP_SIZE=500m; bin/elasticsearch
  ```

**生产环境下如何分配内存**

> 如果只在服务器上运行Elasticsearch,那么设置`ES_HEAP_SIZE`的值为总内存的一半。

## 向集群中添加节点
启动一个新的Elasticsearch实例`bin/elasticsearch`，该实例的集群名称要和已知实例一致。这样即可添加节点到已知集群

安装最新版插件**kopf**查看集群状态

```shell
./elasticsearch/bin/plugin install lmenezes/elasticsearch-kopf/2.0
```
查看集群状态的链接：`http://localhost:9200/_plugin/kopf`
参考: https://github.com/lmenezes/elasticsearch-kopf