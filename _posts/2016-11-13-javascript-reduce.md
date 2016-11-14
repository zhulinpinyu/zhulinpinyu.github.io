---
layout:     post
title:      "JavaScript Reduce 用法示例"
subtitle:   ""
date:       2016-11-13
author:     "zhulinpinyu"
header-img: "img/in-post/16-02-25-javascript-array-in-deeps.jpg"
tags:
    - Javascript
---

**求和：一共走了多少路**

```javascript
var trips = [
  { distance: 34 },
  { distance: 12 },
  { distance: 1 }
]

var totalDistance;

totalDistance = trips.reduce((sum,trip) => sum += trip.distance,0)
```

**统计：有多少站着的多少坐着的**

```javascript
var desks = [
  { type: 'sitting' },
  { type: 'standing' },
  { type: 'sitting' },
  { type: 'sitting' },
  { type: 'standing' }
]

var deskTypes = desks.reduce(function(r,desk) {
    if(desk.type === 'sitting') {
        r.sitting +=1
        return r
    }
    if(desk.type === 'standing') {
        r.standing +=1
        return r
    }
}, { sitting: 0, standing: 0 })
```

**使用reduce实现unique：输入[1,1,2,2,1,4,3]，返回[1,2,4,3]**

```javascript
function unique(array) {
  return array.reduce((uniq,e) => {
      if(!uniq.includes(e)){
          uniq.push(e)
          return uniq
      }
      return uniq
  },[])
}
```
