---
layout:     post
title:      "Kafka 小白上手指南"
subtitle:   ""
date:       2016-11-14
author:     "zhulinpinyu"
header-img: ""
tags:
    - Kafka
---

### 前言
**操作系统：** macOS 10.12.1
**kafka:** 0.10.10

### Step 1. 下载安装

下载[kafka_2.11-0.10.1.0.tgz](https://www.apache.org/dyn/closer.cgi?path=/kafka/0.10.1.0/kafka_2.11-0.10.1.0.tgz)，解压文件包

```zsh
tar -xzf kafka_2.11-0.10.1.0.tgz
cd kafka_2.11-0.10.1.0
```

### Step 2. 启动服务

首先启动ZooKeeper, 因为Kafka需要使用到Zookeeper.使用安装包中的脚本启动

```zsh
bin/zookeeper-server-start.sh config/zookeeper.properties
```

接着启动Kafka,

```zsh
bin/kafka-server-start.sh config/server.properties
```

### Step 3. 创建Topic

创建一个topic命名为test,设置replica和partition的数目均为1

```zsh
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test
```

查看我们刚刚创建的topic

```zsh
bin/kafka-topics.sh --list --zookeeper localhost:2181
```

### Step 4. Producer发送消息

CLI启动producer console,并任意输入消息 比如：`Hi kafka`

```zsh
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
```
![Screen Shot 2016-11-14 at 12.06.06.png](/img/quiver-image-url/F07AD3AAA4F4B2D3FD407FE803E9567C.png)

### Step 5. Consumer（这里的处理就是输出）

CLI启动consumer, 就会看到输出 `Hi kafka`

```zsh
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```

### Step 6. 配置多节点集群

前面的例子🌰只是启动单个节点，现在配置多个节点

```zsh
cp config/server.properties config/server-1.properties
cp config/server.properties config/server-2.properties
```

config/server-1.properties:

```bash
broker.id=1
listeners=PLAINTEXT://:9093
log.dir=/tmp/kafka-logs-1
```

config/server-2.properties:

```bash
broker.id=2
listeners=PLAINTEXT://:9094
log.dir=/tmp/kafka-logs-2
```

使用新的配置文件启动新节点

```bash
bin/kafka-server-start.sh config/server-1.properties &
bin/kafka-server-start.sh config/server-2.properties &
```

创建新的Topic,

```zsh
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 3 --partitions 1 --topic my-replicated-topic
```

查看当前topic 在集群中的运行情况

```zsh
bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic my-replicated-topic
```
![Screen Shot 2016-11-14 at 15.23.30.png](/img/quiver-image-url/013CD7C6921BC5791F816E496FA6698F.png)

其他用法与前面的类似。

好了，这只是一个简单的尝试，关于Kafka,详细内容见[https://kafka.apache.org/](https://kafka.apache.org/)


原文地址: [https://kafka.apache.org/quickstart](https://kafka.apache.org/quickstart)
