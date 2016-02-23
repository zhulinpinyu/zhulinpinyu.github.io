---
layout: post
title: "CSS3画红心"
description: ""
category: css3
tags: [css3]
---


多多的红心: [红心](/red-heart.html) [/red-heart.html](/red-heart.html)

###`红心`
<div id="heart">&nbsp;</div>
<br/>
<style type="text/css">
  #heart{
    position: relative;
    width: 300px;
    height: 270px;
  }
  #heart:after,
  #heart:before{
    position: absolute;
    content: "";
    left: 150px;
    top: 0;
    width: 150px;
    height: 240px;
    background: red;
    border-radius: 75px 75px 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
  }
  #heart:after{
    left: 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
  }
</style>

{% highlight css %}
#heart{
    position: relative;
    width: 300px;
    height: 270px;
  }
  #heart:after,
  #heart:before{
    position: absolute;
    content: "";
    left: 150px;
    top: 0;
    width: 150px;
    height: 240px;
    background: red;
    border-radius: 75px 75px 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
  }
  #heart:after{
    left: 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
  }
{% endhighlight %}