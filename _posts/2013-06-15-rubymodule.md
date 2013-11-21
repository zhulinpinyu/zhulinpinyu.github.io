---
layout: post
title: "ruby中的module"
description: ""
category: Ruby
tags: [Ruby]
---
{% include JB/setup %}

####Modules

image_utils.rb
{% highlight ruby %}
module ImageUtils
    def preview
        puts "preview"
    end
    def transfer(url)
        puts "transfer #{url}" 
    end
end
{% endhighlight %}
___

image.rb (关键字 `include`)
    
    require './image_utils'
    class Image
        include ImageUtils
    end
    
run.rb
    
    require './image'
    image = Image.new
    image.preview  //preview
    image.transfer("mlx")  //transfer mlx

___
  
    include后 实例化可调用 即为 实例方法

image.rb (关键字 `extend`)
    
    require './image_utils'
    class Image
        extend ImageUtils
    end
    
run.rb
    
    require './image'
    Image.preview  //preview
    Image.transfer("mlx")  //transfer mlx

___
  
    extend后 直接调用 类方法

![extend vs include](/article_images/extend-vs-include.png)

___

    puts Image.ancestors  //输出Image的所有父类
    puts Image.included_modules //输出Image所include的module 


`用include实现多继承` （ruby是单继承的）

![继承 not good](/article_images/inheritance-not-good.png)

![继承 good](/article_images/inheritance-good.png)
