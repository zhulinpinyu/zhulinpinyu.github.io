---
layout:     post
title:      "Angularjs Table 知识点纪要"
subtitle:   ""
date:       2016-02-24
author:     "zhulinpinyu"
header-img: "img/in-post/16-02-24-angular.jpg"
tags:
    - Javascript
    - Angularjs
---

## Angularjs Table 知识点纪要

> `$index` :  自动序号  
 `$even` : 偶数判断，比如偶数行   
 `$odd` : 奇数判断，比如奇数行  

## 示例代码`$index`
{% raw %}
```html
<table>
  <tr ng-repeat="x in names">
    <td>{{$index + 1}}</td>
    <td>{{x.Name}}</td>
    <td>{{x.Country}}</td>
  </tr>
</table>
```
{% endraw %}

## 示例代码`$even` `$odd`
{% raw %}
```html
<table>
  <tr ng-repeat="x in names">
    <td ng-if="$odd" style="background-color:#f1f1f1">{{ x.Name }}</td>
    <td ng-if="$even">{{ x.Name }}</td>
    <td ng-if="$odd" style="background-color:#f1f1f1">{{ x.Country }}</td>
    <td ng-if="$even">{{ x.Country }}</td>
  </tr>
</table>
```
{% endraw %}

## 完整示例

<p data-height="268" data-theme-id="0" data-slug-hash="ZQgoLY" data-default-tab="html" data-user="zhulinpinyu" class='codepen'>See the Pen <a href='http://codepen.io/zhulinpinyu/pen/ZQgoLY/'>Angular Table</a> by zhulinpinyu (<a href='http://codepen.io/zhulinpinyu'>@zhulinpinyu</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


参考：[http://www.w3schools.com/angular/angular_tables.asp](http://www.w3schools.com/angular/angular_tables.asp)