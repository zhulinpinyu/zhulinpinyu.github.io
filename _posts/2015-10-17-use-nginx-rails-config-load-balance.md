---
layout:     post
title:      "用nginx和rails配置负载均衡"
subtitle:   ""
date:       2015-10-17
author:     "zhulinpinyu"
header-img: "img/in-post/2015-10-27-load-balance.png"
tags:
    - Rails
    - Docker
    - Nginx
---

## 用nginx和rails配置负载均衡

Source code: [https://github.com/zhulinpinyu/lbnr](https://github.com/zhulinpinyu/lbnr)

**Requirement**

- docker
- docker-compose

### I. Build rails app image
**HomeHelper**

```ruby
require 'socket'

module HomeHelper
  def local_ip
    orig, Socket.do_not_reverse_lookup = Socket.do_not_reverse_lookup, true  # turn off reverse DNS resolution temporarily

    UDPSocket.open do |s|
      s.connect '192.168.99.100', 1
      s.addr.last
    end
  ensure
    Socket.do_not_reverse_lookup = orig
  end
end
```

**Home#index**

```html
<h1>Home#index</h1>
<p>Hostname: <%= Socket.gethostname %></p>
<p>IP: <%= local_ip %></p>
```

**Dockerfile**

```shell
FROM rails:4.2.3
RUN bundle config 'mirror.https://rubygems.org' 'https://ruby.taobao.org'
ADD Gemfile /lbnr/Gemfile
ADD Gemfile.lock /lbnr/Gemfile.lock
RUN cd /lbnr && bundle install
ADD . /lbnr
WORKDIR /lbnr

ENTRYPOINT ["rails","s","-e","production","-b","0.0.0.0"]
CMD ["-p","3000"]
```

**Build lbnr_app image**

```shell
docker build -t lbnr_app .
```

### II. Build nginx image
**Dockerfile**

```shell
FROM nginx:latest

RUN rm -fr /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf
```

**docker-compose.yml**

```yml
web:
  build: .
  ports:
    - 80:80
  container_name: "web"
```

**Build nginx_web image**

```shell
docker-compose build
```

### III. Start 3 App Server
**docker-compose.yml**

```yml
app1:
  image: lbnr_app
  command: -p 3001
  ports:
    - "3001:3001"
  container_name: "app1"
app2:
  image: lbnr_app
  command: -p 3002
  ports:
    - "3002:3002"
  container_name: "app2"
app3:
  image: lbnr_app
  command: -p 3003
  ports:
    - "3003:3003"
  container_name: "app3"
```

```shell
docker-compose up
```

### IV. Start Nginx Web Server
**docker-compose.yml**

```yml
web:
  build: .
  ports:
    - 80:80
  container_name: "web"
```

**start web**

```shell
docker-compose up
```

### V. Result

1st access

![1st-refresh-load-balance](http://7sbnq9.com1.z0.glb.clouddn.com/doc/1st-refresh-load-balance.png)

2nd access

![2nd-refresh-load-balance.png](http://7sbnq9.com1.z0.glb.clouddn.com/doc/2nd-refresh-load-balance.png)

3rd access

![3rd-refresh-load-balance.png](http://7sbnq9.com1.z0.glb.clouddn.com/doc/3th-refresh-load-balance.png)

4th access

![4th-refresh-load-balance.png](http://7sbnq9.com1.z0.glb.clouddn.com/doc/4th-refresh-load-balance.png)

5th access (start next repeat)

![5th-refresh-load-balance](http://7sbnq9.com1.z0.glb.clouddn.com/doc/5th-refresh-load-balance.png)

参考:
[http://liubin.org/2014/02/18/rails-cluster-with-ruby-load-balancer-using-docker/](http://liubin.org/2014/02/18/rails-cluster-with-ruby-load-balancer-using-docker/)      

[https://github.com/Muriel-Salvan/rails-cluster-docker/tree/master/server](https://github.com/Muriel-Salvan/rails-cluster-docker/tree/master/server)

