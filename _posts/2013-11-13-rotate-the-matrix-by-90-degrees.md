---
layout: post
title: "矩阵旋转（java实现）"
description: ""
category: Cracking the coding interview
tags: [java]
---


参考链接：[http://hawstein.com/posts/1.6.html](http://hawstein.com/posts/1.6.html)
####一张图像表示成NxN的矩阵，图像中每个像素是4个字节，写一个函数把图像旋转90度。 你能原地进行操作吗？(即不开辟额外的存储空间)

####假设图像如下所示

        1    2    3    4
        5    6    7    8
        9    a    b    c
        d    e    f    g
    
####旋转输出结果为（以逆时针转90度为例）：

        4    8    c    g
        3    7    b    f
        2    6    a    e
        1    5    9    d
    
####变化过程

        1    2    3    4
        5    6    7    8
        9    a    b    c
        d    e    f    g
    
`对角对称变换 ⤋`

        1    5    9    d
        2    6    a    e
        3    7    b    f
        4    8    c    g
    
`水平对称变换 ⤋`

        4    8    c    g
        3    7    b    f
        2    6    a    e
        1    5    9    d
    
###算法实现

    private static int[][] rotateMatrix(int[][] matrix){
        int N = matrix[0].length;
        for(int i=0; i< N; i++){
            for(int j=i; j< N; j++){
                diagonalSwap(matrix, i, j);
            }
        }

        for(int k=0; k<(N/2); k++){
            horizontalSwap(matrix, k, N-k-1);
        }
       return matrix;
    }

####以对角线为对称轴交换
    private static void diagonalSwap(int[][] matrix, int i, int j) {
        int swap;
        swap = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = swap;
    }

####以水平中心线为对称轴交换

    private static void horizontalSwap(int[][] matrix, int i, int j) {
        int[] swap;
        swap = matrix[i];
        matrix[i] = matrix[j];
        matrix[j] = swap;
    }