---
layout:     post
title:      "Dockerize elasticsearch mount volume data,logs and config folder"
subtitle:   ""
date:       2016-08-11
author:     "zhulinpinyu"
header-img:
tags:
    - Elasticsearch
    - Docker
---

## 基本要求：
  - elasticsearch:2.3.4
  - docker:1.12.0
  - docker-compose:1.8.0
  
## 问题描述：
  
  **docker运行elasticsearch，外挂data,config,logs目录。方便数据保存，以及日志查看。**

## 文件结构

### 运行前：

    ├── README.md
    ├── config
    │   ├── elasticsearch.yml
    │   └── logging.yml
    ├── data
    ├── docker-compose.yml
    └── logs

### 运行后：

    .
    ├── README.md
    ├── config
    │   ├── elasticsearch.yml
    │   ├── logging.yml
    │   └── scripts
    ├── data
    │   └── IronMan
    │       └── nodes
    │           └── 0
    │               ├── _state
    │               │   └── global-1.st
    │               └── node.lock
    ├── docker-compose.yml
    └── logs
        └── IronMan.log
        
## 详细介绍

### 详述elasticsearch.yml

```yml
cluster.name: IronMan
node.name: ironman_01
path.data: /usr/share/elasticsearch/data
path.logs: /usr/share/elasticsearch/logs
network.host: 0.0.0.0
```

### 详述logging.yml

```yml
es.logger.level: INFO
rootLogger: ${es.logger.level}, console, file
logger:
  action: DEBUG
  com.amazonaws: WARN
  index.search.slowlog: TRACE, index_search_slow_log_file
  index.indexing.slowlog: TRACE, index_indexing_slow_log_file

additivity:
  index.search.slowlog: false
  index.indexing.slowlog: false

appender:
  console:
    type: console
    layout:
      type: consolePattern
      conversionPattern: "[%d{ISO8601}][%-5p][%-25c] %m%n"

  file:
    type: dailyRollingFile
    file: ${path.logs}/${cluster.name}.log
    datePattern: "'.'yyyy-MM-dd"
    layout:
      type: pattern
      conversionPattern: "[%d{ISO8601}][%-5p][%-25c] %m%n"

  # index_search_slow_log_file:
  #   type: dailyRollingFile
  #   file: ${path.logs}/${cluster.name}_index_search_slowlog.log
  #   datePattern: "'.'yyyy-MM-dd"
  #   layout:
  #     type: pattern
  #     conversionPattern: "[%d{ISO8601}][%-5p][%-25c] %m%n"

  # index_indexing_slow_log_file:
  #   type: dailyRollingFile
  #   file: ${path.logs}/${cluster.name}_index_indexing_slowlog.log
  #   datePattern: "'.'yyyy-MM-dd"
  #   layout:
  #     type: pattern
  #     conversionPattern: "[%d{ISO8601}][%-5p][%-25c] %m%n"

```

### 详述docker-compose.yml

```yml
elasticsearch:
  image: elasticsearch:2.3.4
  environment:
    #set timezone as host machine
    - TZ=Asia/Chongqing
  ports:
    - "9200:9200"
    - "9300:9300"
  volumes:
    - ./config:/usr/share/elasticsearch/config
    - ./data:/usr/share/elasticsearch/data
    - ./logs:/usr/share/elasticsearch/logs
  container_name:
    es
```

## 启动运行

### 使用docker-compose 启动

```shell
docker-compose up -d
```

### CLI命令行启动

```shell
docker run -d -e TZ=Asia/Chongqing -p 9200:9200 -p 9300:9300 -v "$PWD/config":/usr/share/elasticsearch/config -v "$PWD/data":/usr/share/elasticsearch/data -v "$PWD/logs":/usr/share/elasticsearch/logs --name es elasticsearch:2.3.4
```

## 其他

    docker run -d -p 9200:9200 -p 9300:9300 --name es elasticsearch:2.3.4 elasticsearch -Des.node.name="lg_es_node_001" -Des.cluster.name="lg_es_001"