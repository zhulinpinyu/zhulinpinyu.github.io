---
layout: post
title: "使用CSS3画三角形"
description: ""
category: css3
tags: [CSS3]
---


<style>
  #triangle-up{
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
  }

  #triangle-down{
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
  }

  #triangle-left{
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
  }

  #triangle-right{
    width: 0;
    height: 0;
    border-left: 100px solid red;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
  }

  #triangle-top-left{
    width: 0;
    height: 0;
    border-left: 100px solid red;
    border-bottom: 100px solid transparent;
  }

  #triangle-top-right{
    width: 0;
    height: 0;
    border-right: 100px solid red;
    border-bottom: 100px solid transparent;
  }

  #triangle-bottom-left{
    width: 0;
    height: 0;
    border-left: 100px solid red;
    border-top: 100px solid transparent;
  }

  #triangle-bottom-right{
    width: 0;
    height: 0;
    border-right: 100px solid red;
    border-top: 100px solid transparent;
  }
</style>

参考链接： [http://www.cnblogs.com/lhb25/p/css-and-css3-triangle.html](http://www.cnblogs.com/lhb25/p/css-and-css3-triangle.html)

####向上
<div id="triangle-up">&nbsp;</div>
#####`CSS Code`:
```css
#triangle-up{
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}
```
####向下
<div id="triangle-down">&nbsp;</div>
#####`CSS Code`:
```css
#triangle-down{
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
}
```
####向左
<div id="triangle-left">&nbsp;</div>
#####`CSS Code`:
```css
  #triangle-left{
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
}
```
####向右
<div id="triangle-right">&nbsp;</div>
#####`CSS Code`:
```css
#triangle-right{
    width: 0;
    height: 0;
    border-left: 100px solid red;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
}
```
####向左上
#####`CSS Code`:
<div id="triangle-top-left">&nbsp;</div>
```css
#triangle-top-left{
    width: 0;
    height: 0;
    border-left: 100px solid red;
    border-bottom: 100px solid transparent;
}
```
####向左下
<div id="triangle-bottom-left">&nbsp;</div>
#####`CSS Code`:
```css
#triangle-bottom-left{
    width: 0;
    height: 0;
    border-left: 100px solid red;
    border-top: 100px solid transparent;
}
```
####向右上
<div id="triangle-top-right">&nbsp;</div>
#####`CSS Code`:
```css
#triangle-top-right{
    width: 0;
    height: 0;
    border-right: 100px solid red;
    border-bottom: 100px solid transparent;
}
```
####向右下
<div id="triangle-bottom-right">&nbsp;</div>
#####`CSS Code`:
```css  
#triangle-bottom-right{
    width: 0;
    height: 0;
    border-right: 100px solid red;
    border-top: 100px solid transparent;
}
```