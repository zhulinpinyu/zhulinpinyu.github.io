---
layout:     post
title:      "Postgresql Data Sync to Elasticsearch"
subtitle:   ""
date:       2016-08-09
author:     "zhulinpinyu"
header-img:
tags:
    - Elasticsearch
---

本文实验环境：

- elasticsearch  2.3.4
- elasticsearch-jdbc 2.3.4.0

#### 下载elasticsearch-jdbc

```sh
http://xbib.org/repository/org/xbib/elasticsearch/importer/elasticsearch-jdbc/2.3.4.0/elasticsearch-jdbc-2.3.4.0-dist.zip
```

#### 解压elasticsearch-jdbc-2.3.4.0-dist.zip

```sh
unzip elasticsearch-jdbc-2.3.4.0-dist.zip
cd elasticsearch-jdbc
```

#### 配置pg to es的同步脚步

进入`bin`目录修改已有的或者添加pg2s.sh。下面是示例配置文件`pg2s.sh`，详见[https://github.com/jprante/elasticsearch-jdbc](https://github.com/jprante/elasticsearch-jdbc)

```shell
#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
bin=${DIR}/../bin
lib=${DIR}/../lib

ES_HOST="192.168.99.100"
DB_HOST="192.168.1.3"

curl -XDELETE "${ES_HOST}:9200/dos/"
curl -XPOST "${ES_HOST}:9200/dos/"

echo '{
    "type" : "jdbc",
    "jdbc" : {
        "url" : "jdbc:postgresql://'${DB_HOST}':5432/DB_NAME?loglevel=0",
        "user" : "postgres",
        "password" : "pwd",
        "sql" : "select id as \"_id\", * from TABLE_NAME",
        "elasticsearch" : {
             "cluster" : "cluster_001",
             "host" : "'${ES_HOST}'",
             "port" : 9300
        },
        "index": "dos",
        "type": "student",
        "index_settings" : {
            "index" : {
                "number_of_shards" : 1
            }
        }
    }
}
' | java \
    -cp "${lib}/*" \
    -Dlog4j.configurationFile=${bin}/log4j2.xml \
    org.xbib.tools.Runner \
    org.xbib.tools.JDBCImporter

```

注意：需要先创建index. `curl -XPOST "${ES_HOST}:9200/dos/"` 并指定集群名称为`cluster_001`

#### 运行

```sh
bin/pg2es.sh
```

另：定时运行参见[https://github.com/zhulinpinyu/cron-sync-pg2es](https://github.com/zhulinpinyu/cron-sync-pg2es)
