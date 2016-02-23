---
layout: post
title: "直接插入排序（Java实现）"
description: ""
category: 算法
tags: [java,算法]
---


直接插入排序

####原理

    插入排序是在部分数据有序的情况下，使用i标记第一个无序的数据，将其提取保存到一个中间变量temp中去，使用j标记空位置，依次比较temp中的值与j中的值，如果j中的值大于temp的值，则后移，直到遇到第一个比temp小的值，在其下一个位置插入

####算法实现
{% highlight java %}    
    public static void insertSort(int[] array){
            //从小到大的顺序排
        for(int i=1; i<array.length; i++){
          int temp = array[i];
          int j = i-1;
          while(j>=0 && array[j]>temp){
            array[j+1] = array[j];
            j--;
          }
          array[j+1] = temp;
        }
    }
{% endhighlight %}