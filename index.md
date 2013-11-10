---
layout: page
title: 竹林品雨的个人博客
tagline: Just Do IT
---
{% include JB/setup %}

###最新博客

<ul class="posts">
  {% for post in site.posts limit:8 %}
    <li><h5><span>{{ post.date | date_to_string }}</span> &nbsp;▸▹ <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h5></li>
  {% endfor %}
  <h5><a href="/archive.html">更多博客......</a></h5>
</ul>

