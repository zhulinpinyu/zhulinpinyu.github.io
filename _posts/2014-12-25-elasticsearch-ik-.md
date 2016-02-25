---
layout: post
title: "Elasticsearch 配置IK 分词器"
tags:
    - Elasticsearch
---



###安装IK插件 For Elasticsearch

    plugin -install medcl/elasticsearch-analysis-ik/
    
***`若遇到问题`***

    * 下载分词器源码 git clone https://github.com/medcl/elasticsearch-analysis-ik
    * 然后进入下载目录，执行命令：mvn clean package，
    * 打包生成elasticsearch-analysis-ik-xxx.jar。
    * 将这个jar拷贝到ES_HOME/plugins/analysis-ik目录下面(如果没有该目录，则先创建该目录)
    
备注： 
    ES_HOME 为Elasticsearch 的安装目录
    `brew install maven`
    
###下载ik相关配置词典文件到elasticsearch/config目录

    cd config
    wget http://github.com/downloads/medcl/elasticsearch-analysis-ik/ik.zip --no-check-certificate
    unzip ik.zip
    rm ik.zip
    
###ik分词配置，在elasticsearch.yml文件中加入如下

    index:
      analysis:
        analyzer:
          ik:
              alias: [ik_analyzer]
              type: org.elasticsearch.index.analysis.IkAnalyzerProvider
          ik_max_word:
              type: ik
              use_smart: false
          ik_smart:
              type: ik
              use_smart: true

    index.analysis.analyzer.default.type: ik
    

参考链接：
[http://my.oschina.net/xiaohui249/blog/232784](http://my.oschina.net/xiaohui249/blog/232784)    
[http://my.oschina.net/sunzy/blog/195341](http://my.oschina.net/sunzy/blog/195341)