---
layout: page
title: 竹林品雨的个人博客
tagline: Just Do IT
---
{% include JB/setup %}

<!-- <ul class="posts">
  {% for post in site.posts limit:8 %}
    <li><h5><span>{{ post.date | date_to_string }}</span> &nbsp;▸▹ <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h5></li>
  {% endfor %}
  <h5><a href="/archive.html">更多博客......</a></h5>
</ul> -->

<ul class="posts">
  {% for post in site.posts limit:8 %}
    <article style="margin: 40px 0 10px 0;">
      <h2>
        <a href="{{ BASE_PATH }}{{ post.url }}">
          {{ post.title }}
        </a>
      </h2>
      <section>
          <ul class="inline">
            <li>{{ post.date | date_to_string }}</li>
            <li>{{ post.category }}</li>
            <li>{{ post.tag }}</li>
          </ul>
      </section>
      <div class="content">
        {{post.content}}
      </div>
    </article>
  {% endfor %}
  <h5><a href="/archive.html">更多博客......</a></h5>
</ul>

<!--
{% for p in site.posts limit:8 %}
<div class="article">
    <h4 class="article-title"><a href="{{ site.url }}{{ p.url }}">{{p.title}}</a></h4>

    {{ p.excerpt }}
    <div class="article-status">
        <div class="article-date">{{ p.date | date: "%-d %B %Y" }}</div>
        <a class="article-readmore" href="{{ site.url }}{{ p.url }}">Read More Â» </a>
    </div>
</div>
{% endfor %}
参照debbbbie.github.io
-->
