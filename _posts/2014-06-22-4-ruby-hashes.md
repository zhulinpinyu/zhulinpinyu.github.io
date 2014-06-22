---
layout: post
title: "4. ruby hashes"
description: ""
category: ruby
tags: [Ruby,Rubymonk]
---
{% include JB/setup %}

###4. Ruby Hashes

####4.1 Hash 简介

#####初始化一个empty Hash

```ruby
    menu = {}
```    

#####初始化一个Hash with value

`每个没有赋值的key有一个默认值`

```ruby
 m = Hash.new("wq")
 p m                    #{}
 p m["p"]               #"wq"
```


```ruby
menu = {
    "mian" => "12",
    "mo" => "3",
    "ji" => "5"
}
```

#####Hash赋值

```ruby
menu = Hash[:m,"x","b","w","mr",true]
p menu          #{:m=>"x", "b"=>"w", "mr"=>true}
    
def artax
  a = [:punch, 0]
  b = [:kick, 72]
  c = [:stops_bullets_with_hands, false]
  key_value_pairs = [a, b, c] #[[:punch, 0], [:kick, 72], [:stops_bullets_with_hands, false]]
  Hash[key_value_pairs]
end
p artax #{:punch=>0, :kick=>72, :stops_bullets_with_hands=>false}

```

```ruby
m = {}
m["q"] = "mlx"
puts m          #{"q"=>"mlx"}
m[:p] = "brj"
puts m          #{"q"=>"mlx", :p=>"brj"}    
puts m["q"]     # "mlx"
puts m[:p]      # "brj"
m["q"] = "mb"
puts m["q"]     # "mb"
```

**注意 注意 注意**

`会语法错误报错`

```ruby
m = {"k": "s"} #会语法错误报错
```
`正确写法`

```ruby
m = {"k"=>"s"} #正确  {"k"=>"x"}
m = {k: "s"}  #正确(冒号后必须有空格) {:k=>"s"}
```

####4.2 Hash 迭代

##### key,value 输出

```ruby
menu = {
    "mian" => "12",
    "mo" => "3",
    "ji" => "5"
}
menu.each do |k, v|
    puts "#{k},#{v}"
end

menu.each do |k, v|
    menu[k] = "￥"+v
end

p menu  #{"mian"=>"￥12", "mo"=>"￥3", "ji"=>"￥5"}
```

##### 获取hash所有的key

```ruby
menu.keys #["mian", "mo", "ji"]
```

##### 获取hash所有的value

```ruby
menu.values #["12", "3", "5"]
```