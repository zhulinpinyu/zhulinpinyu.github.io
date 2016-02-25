---
layout: post
title: "写一个函数判断两个字符串是否是变位词（java实现）"
description: ""
category: Cracking the coding interview
tags: [Java]
---


`注：变位词(anagrams)指的是组成两个单词的字符相同，但位置不同的单词。比如说， abbcd和abcdb就是一对变位词。`

参考链接：[http://hawstein.com/posts/1.4.html](http://hawstein.com/posts/1.4.html)

    private static boolean isAnagrams(String word, String other){
        if(word==null || other == null || word == other || word.length() != other.length()){
            return false;
        }
        char[] wordToCharArray = word.toCharArray();
        char[] otherToCharArray = other.toCharArray();
        Arrays.sort(wordToCharArray);
        Arrays.sort(otherToCharArray);
        if(new String(wordToCharArray).equals(new String(otherToCharArray))){
            return true;
        }
        return false;
    }