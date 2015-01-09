---
layout: page
title: 竹林品雨的个人博客
tagline: Just Do IT
---
{% include JB/setup %}

<div class="span11">
<ul class="posts">
  {% for post in site.posts limit:8 %}
    <article style="margin: 20px 0 20px 0;">
      <section>
          <ul style="list-style-type: none;">
            <li>
              <a href="{{ BASE_PATH }}{{ post.url }}" style="list-style-type: none;font-family: monospace;font-size: xx-large;">
                {{ post.title }}
              </a>
              <span class="pull-right">{{ post.date | date: "%Y-%m-%d" }}</span>
            </li>
          </ul>
      </section>
    </article>
  {% endfor %}
  <article style="margin: 50px 0 10px 0;">
      <section>
          <ul style="list-style-type: none;">
            <li>
              <a href="/archive.html" style="list-style-type: none;font-family: FrescoSansPlusPro-Normal monospace;font-size: xx-large;">
                更多博客......
              </a>
            </li>
          </ul>
      </section>
    </article>
  <h5></h5>
</ul>
</div>
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
