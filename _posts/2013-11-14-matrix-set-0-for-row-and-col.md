---
layout: post
title: "处理一个MxN的矩阵，若矩阵中某个元素为0，则把它所在的行和列都置为0.（Java实现）"
description: ""
category: Cracking the coding interview
tags: [java]
---
{% include JB/setup %}

参考链接：[http://hawstein.com/posts/1.7.html](http://hawstein.com/posts/1.7.html)

#####写一个函数处理一个MxN的矩阵，如果矩阵中某个元素为0，那么把它所在的行和列都置为0.

####示例
    
`原矩阵`
    
    1   2   3   4   5   6
    1   2   3   4   5   0
    1   2   0   4   5   6
    1   2   3   4   5   6

`处理后矩阵`
    
    1   2   3   4   5   6
    1   2   3   4   5   0
    1   2   0   4   5   6
    1   2   3   4   5   6

####算法实现

    private void matrixConversion(int[][] matrix){
        List<int[]> zeroPosList = new ArrayList<int[]>();
        saveZeroPos(matrix, zeroPosList);
        setZero(matrix, zeroPosList);
    }

`保存零值位置`

    private void saveZeroPos(int[][] matrix, List<int[]> zeroPosList) {
        int M = matrix.length;
        int N = matrix[0].length;
        for(int i=0; i<M; i++){
            for(int j=0; j<N; j++){
                if(isZero(matrix, i,j)){
                    int[] pos = {i, j};
                    zeroPosList.add(pos);
                }
            }
        }
    }
    
`判断零值`

    private static boolean isZero(int[][] matrix,int i, int j) {
        return matrix[i][j] == 0;
    }

`置零`

    private static void setZero(int[][] matrix, List<int[]> zeroPos) {
        for(int[] pos : zeroPos){
            int i = pos[0];
            int j = pos[1];
            //水平置零
            for(int k=0; k<matrix[0].length; k++){
                matrix[i][k] = 0;
            }
            //垂直置零
            for(int k=0; k<matrix.length; k++){
                matrix[k][j] = 0;
            }
        }
    }