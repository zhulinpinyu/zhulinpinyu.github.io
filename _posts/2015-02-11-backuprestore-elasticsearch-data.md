---
layout: post
title: "Backup/Restore elasticsearch data"
description: ""
category: 
tags: []
---
{% include JB/setup %}

###Ubuntu install elasticsearch

`!Warning: You Must` [install Java](http://zhulinpinyu.github.io/ubuntu/2013/06/08/program-install-on-ubuntu/)

#####下载
> Download [elasticsearch-1.4.2.deb](https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.4.2.deb) 当前版本 1.4.2

#####安装
    sudo dpkg -i elasticsearch-1.4.2.deb
#####设置
    根据安装后提示设置开机启动等

`Tips:` 以上方式安装会创建名称为`elasticsearch`的用户和用户组 `备份恢复会用到`

###数据备份及恢复
#####注册备份文件类型以及备份位置

    $ curl -XPUT 'http://localhost:9200/_snapshot/myes_backup' -d '{
        "type": "fs",
        "settings": {
            "location": "/mount/backups/myes_backup",
            "compress": true
        }
    }

>`注1.` location指定备份数据的存放位置   
`注2.` 以上面为例,`backups`所属用户及用户组均为`elasticsearch`    
`注3.`

    chown -R elasticsearch:elasticsearch backups
    修改 backups 及其子文件，子文件夹 的用户用户组为elasticsearch

#####执行备份---backup

    $ curl -XPUT "localhost:9200/_snapshot/myes_backup/snapshot_1?wait_for_completion=true"


#####恢复备份---restore


    $ curl -XPOST "localhost:9200/_snapshot/myes_backup/snapshot_1/_restore?wait_for_completion=true"


`Warning: 备份时首先创建备份位置的文件夹`

REF::
主要参考：    
[http://www.elasticsearch.org/blog/introducing-snapshot-restore/](http://www.elasticsearch.org/blog/introducing-snapshot-restore/)    
[http://dopey.io/elasticsearch-snapshot.html](http://dopey.io/elasticsearch-snapshot.html)

辅助了解：    
[http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/modules-snapshots.html#_repositories](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/modules-snapshots.html#_repositories)