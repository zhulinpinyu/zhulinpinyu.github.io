---
layout: post
title: "mongoDB 学习笔记"
description: ""
category: mongodb
tags: [mongodb,database]
---
{% include JB/setup %}


####**1.** 用全局命令`use`来切换数据库

```javascript
use mydb  //切换到名为mydb的数据库
```      
   >注：数据库是否存在不影响。若不存在，会在创建第一个集合时自行生成

####**2.** 向数据库插入数据（已切换之数据库mydb）

```javascript
db.unicorns.insert({name: "mlx", age: "24"});
//此时即会创建数据库mydb并创建集合things,将数据存入集合things
```
####**3.** 查询数据

```javascript
//查询所有数据并显示查询结果的头20条（如果结果多于20条，用命令it迭代显示剩余数据）
db.unicorns.find();
结果：
{ "_id" : ObjectId("532d36a399592aec20f53dac"), "name" : "mlx", "age" : 24 }
```
####**4.** 清除某个集合中所有的数据 （以集合unicorns为例）

```javascript
db.unicorns.remove();
```
####**5.** 数据库删除

```javascript
use mydb
db.dropDatabase();
输出：
{ "dropped" : "mydb", "ok" : 1 }
//表明数据库mydb已删除
```    
####**6.** 插入一些备用数据

```javascript
db.unicorns.insert({name: 'Horny', dob: new Date(1992,2,13,7,47), loves: ['carrot','papaya'], weight: 600, gender: 'm', vampires: 63});
db.unicorns.insert({name: 'Aurora', dob: new Date(1991, 0, 24, 13, 0), loves:['carrot', 'grape'], weight: 450, gender: 'f', vampires: 43});
db.unicorns.insert({name: 'Unicrom', dob: new Date(1973, 1, 9, 22, 10), loves:['energon', 'redbull'], weight: 984, gender: 'm', vampires: 182});
db.unicorns.insert({name: 'Roooooodles', dob: new Date(1979, 7, 18, 18, 44), loves: ['apple'], weight: 575, gender: 'm', vampires: 99});
db.unicorns.insert({name: 'Solnara', dob: new Date(1985, 6, 4, 2, 1), loves:['apple', 'carrot', 'chocolate'], weight:550, gender:'f', vampires:80});
db.unicorns.insert({name:'Ayna', dob: new Date(1998, 2, 7, 8, 30), loves: ['strawberry', 'lemon'], weight: 733, gender: 'f', vampires: 40});
db.unicorns.insert({name:'Kenny', dob: new Date(1997, 6, 1, 10, 42), loves: ['grape', 'lemon'], weight: 690, gender: 'm', vampires: 39});
db.unicorns.insert({name: 'Raleigh', dob: new Date(2005, 4, 3, 0, 57), loves:['apple', 'sugar'], weight: 421, gender: 'm', vampires: 2});
db.unicorns.insert({name: 'Leia', dob: new Date(2001, 9, 8, 14, 53), loves: ['apple', 'watermelon'], weight: 601, gender: 'f', vampires: 33});
db.unicorns.insert({name: 'Pilot', dob: new Date(1997, 2, 1, 5, 3), loves: ['apple', 'watermelon'], weight: 650, gender: 'm', vampires: 54});
db.unicorns.insert({name: 'Nimue', dob: new Date(1999, 11, 20, 16, 15), loves:['grape', 'carrot'], weight: 540, gender: 'f'});
db.unicorns.insert({name: 'Dunx', dob: new Date(1976, 6, 18, 18, 18), loves: ['grape', 'watermelon'], weight: 704, gender: 'm', vampires: 165});
```        
####**7.** 条件查询（选择器）

> {field: value}用以查找所有field等于value的文档。    
    通过{field1: value1, field2: value2}的形式可以实现与操作
`$lt`、`$lte`、`$gt`、`$gte`以及`$ne`分别表示小于、小于等于、大于、大于等于以及不等于

```javascript
例：//查找所有体重超过700磅的雄性独角兽（unicorn）
db.unicorns.find({gender:'m', weight: {$gt: 700}});
```    
> `$exists用以匹配某一个字段是否存在`

```javascript
例：//查找不存在字段vampires的文档
db.unicorns.find({vampires: {$exists: false}});
```
> `$or`或操作 返回满足其中或条件的结果集
    
```javascript
例： 
//查找或者喜欢苹果的雌性独角兽,或者喜欢橘子的雌性独角兽,或者体重小于500的雌性独角兽
db.unicorns.find({gender: 'f', $or: [{loves: 'apple'},{loves: 'orange'},{weight: {$lt: 500}}]});
```    
> loves字段是一个数组。在MongoDB中数组是一级对象(first class object)。这是非常非常有用的功能。更有意思的是基于数组的选择是非常简单的: {loves: 'watermelon'}就会找到 loves 中含有 watermelon 这个值的所有文档。

**`count()`,`remove()`和`find()`用法类似**
    
####**8.** 更新update()
  
> ##### mongoDB的update和SQL中的update有重大区别
    
```javascript
例: db.unicorns.update({name: 'Roooooodles'},{weight: 590});
    db.unicorns.find({name: 'Roooooodles'});
    //没有任何结果返回
    原因：以上update操作实质上用{weight: 590}替换掉了name为Roooooodles的记录
    第一个参数为查询条件，第二个参数是要替换的文档。也就是说替换完成该记录就是{weight: 590} 只包含一个字段weight
```
  > 真正的update 用`$set`

```javascript
例: 真正的更新
    //更新前
    db.unicorns.find({name: 'Roooooodles'});
    => { "_id" : ObjectId("532fa2107eb6f00d7e12c51e"), "name" : "Roooooodles", "dob" : ISODate("1979-08-18T10:44:00Z"), "loves" : [  "apple" ], "weight" : 575, "gender" : "m", "vampires" : 99 } 
    //执行更新
    db.unicorns.update({name: 'Roooooodles'}, {$set: {weight: 590}});
    //更新后
    db.unicorns.find({name: 'Roooooodles'});
    => { "_id" : ObjectId("532fa2107eb6f00d7e12c51e"), "name" : "Roooooodles", "dob" : ISODate("1979-08-18T10:44:00Z"), "loves" : [  "apple" ], "weight" : 590, "gender" : "m", "vampires" : 99 }
```
> #####有关update的其他修改符    
> `$inc`对已有数值字段的值进行增加一个正数或负数操作

```javascript
例: db.unicorns.update({name: 'Pilot'}, {$inc: {vampires: -2}});
```
> `$push`修改已有数组字段，向数组字段中添加新元素

```javascript
例: db.unicorns.update({name: 'Aurora'}, {$push: {loves: 'sugar'}});
```
####**9.** 插新upsert

> 没有就创建，有就更新

```javascript
例： 以记录页面点击率为例
//典型的插新用法 其中第三个参数不传入时默认为false,也就不具有插新功能了
db.hits.update({page: 'unicorns'}, {$inc: {hits: 1}}, true);

db.hits.find();
=> { "_id" : ObjectId("532ff09c833e54ade96a449a"), "hits" : 1, "page" : "unicorns"}

db.hits.update({page: 'unicorns'}, {$inc: {hits: 1}}, true);
db.hits.find();
=> { "_id" : ObjectId("532ff09c833e54ade96a449a"), "hits" : 2, "page" : "unicorns"}

第一次，因为没有文档有域 page 的值为 unicorns ，就插入一个新的文档。再执行一次上面的命令，创建好的文档就会被更新，而 hits 的值就会增加为2
```
####**10.** 多重更新

> `update`的默认行为是只更新第一个找到的文档，要想更新所有符合条件的记录则必须将其第四个参数设置为true
    
```javascript
例: 将所有独角兽设置成已注射过疫苗
db.unicorns.update({}, {$set: {vaccinated: true }}, false, true);
```
####**11.** 查找
  
> 查找单个字段    
    默认_id会返回 可显式设置

```javascript
例: 查询所有独角兽的名称name
db.unicorns.find({},{name:1});              //返回name字段和_id字段
db.unicorns.find({},{name:1, _id:0});       //只返回name字段
```
####**12.** 排序
  
> `sort` 1表示升序 -1 表示降序

```javascript
例: 
//将独角兽按体重从大到小排序
db.unicorns.find().sort({weight: -1});
//优先按名称排序再按体重排序
db.unicorns.find().sort({name:1, weight:-1});
```
####**13.** 分页

> `limit(n)` 返回查询结果的前n条记录     
      `skip(n)` 跳过前n条记录

```javascript
例: 
//返回前五条结果
db.unicorns.find().limit(5);
//返回第二页的五条记录 即跳过前五条返回接下来的五条记录
db.unicorns.find().skip(5).limit(5)
```