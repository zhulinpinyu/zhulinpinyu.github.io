---
layout:     post
title:      "ELK 收集nginx日志数据"
subtitle:   ""
date:       2016-12-08
author:     "zhulinpinyu"
header-img: "img/in-post/es.png"
tags:
    - Logstash
    - Kibana
    - Elasticsearch
    - Docker
---

### Test Environment：
- macOS 10.12.1
- Docker for Mac v1.12.1
- Elasticsearch v5.0.0
- Logstash v5.0.2
- Kibana v5.0.0
- Nginx v1.10.2

### Step 1. start elasticsearch

```bash
docker run -d --name es elasticsearch:5.0.0
```

### Step 2. start logstash

```bash
docker run -d \
	--name logstash \
	--link es:elasticsearch \
	-v $(pwd)/config/logstash.conf:/config-dir/logstash.conf \
	logstash:5.0.2 \
	logstash -f /config-dir/logstash.conf
```

`config/logstash.conf`

```bash
input {
  gelf {}
}
output {
  elasticsearch {
    hosts => ["elasticsearch"]
  }
  stdout {}
}
```

### Step 3. start Kibana

```bash
docker run -d \
	--name kibana \
	--link es:elasticsearch \
	-p 5601:5601 \
	kibana:5.0.0
```

### Step 4. start Nginx

```bash
docker run --rm \
  -p 80:80 \
  --log-driver=gelf \
  --log-opt gelf-address=udp://$(docker inspect --format '双花括号 .NetworkSettings.IPAddress 双花括号' logstash):12201 \
  --log-opt tag="test" nginx:1.10.2
```

Notes: get logstash ip address

    docker inspect --format '双花括号 .NetworkSettings.IPAddress 双花括号' logstash

![原图](/img/quiver-image-url/start-nginx-2016120817.19.49.png)

### Step 5. setup kibana

visit nginx: [http://localhost](http://localhost) or [http://Your-IP](http://Your-IP)

visit [http://Your-ip:5601](http://your-ip:5601) , setup kibana. you will see follow graph.

![ELK](/img/quiver-image-url/elkn-2016-12-08-16.56.43.png)

Thanks: [https://gist.github.com/shreyu86/735f2871460a2b068080](https://gist.github.com/shreyu86/735f2871460a2b068080)
