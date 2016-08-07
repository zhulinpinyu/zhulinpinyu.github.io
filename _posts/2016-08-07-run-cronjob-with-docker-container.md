---
layout:     post
title:      "Run cron job with docker container"
subtitle:   ""
date:       2016-08-07
author:     "zhulinpinyu"
header-img:
tags:
    - Docker
    - Cron
---


### Dockerfile 示例

```ruby
FROM ruby:2.3.1

RUN apt-get update
RUN apt-get -y install rsyslog cron

RUN mkdir /app
WORKDIR /app

ADD app /app

RUN crontab /app/crontabfile

RUN cp /app/crontabfile /etc/crontab
RUN touch /var/log/cron.log

RUN chmod +x /app/run.sh

CMD ["bash","/app/run.sh"]
```

### 保持container 后台运行添加`run.sh`

```shell
rsyslogd
cron
touch /var/log/cron.log
tail -F /var/log/syslog /var/log/cron.log
```

`tail -F /var/log/syslog /var/log/cron.log` 保持container运行

### crontabfile 示例

每分钟运行一次

```
*/1 * * * * /usr/local/bin/ruby /app/run.rb cron >> /var/log/cron.log 2>&1
```

### 运行脚本

```ruby
puts "[#{Time.now}] I am run each 1 min by cron job!"
```

### 构建镜像

```shell
docker build -t cronjob-with-docker .
```

### 运行
控制台运行

```shell
docker run --rm -it cronjob-with-docker
```

后台运行

```shell
docker run -d --name cronjob cronjob-with-docker
```

---
Repo: [https://github.com/zhulinpinyu/cronjob-with-docker](https://github.com/zhulinpinyu/cronjob-with-docker)

---
特别鸣谢 Thanks:    
[https://yanqiw.github.io/docker/2016/02/21/schedule-task-in-docker.html](https://yanqiw.github.io/docker/2016/02/21/schedule-task-in-docker.html)
[https://github.com/yanqiw/cron-in-docker](https://github.com/yanqiw/cron-in-docker)