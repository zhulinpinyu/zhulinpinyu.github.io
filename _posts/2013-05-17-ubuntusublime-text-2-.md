---
layout: post
title: "完美解决ubuntu下sublime text 2 中文无法输入"
description: ""
category: ubuntu
tags: []
---
{% include JB/setup %}

感谢开源中国网友 [@Wuu](http://my.oschina.net/wugaoxing)
原文链接 [http://my.oschina.net/wugaoxing/blog/121281](http://my.oschina.net/wugaoxing/blog/121281)
#####step1.
保存以下代码为： sublime-imfix.c文件

    /*
    sublime-imfix.c
    Use LD_PRELOAD to interpose some function to fix sublime input method support for linux.
    By Cjacker Huang <jianzhong.huang at i-soft.com.cn>

    gcc -shared -o libsublime-imfix.so sublime_imfix.c  `pkg-config --libs --cflags gtk+-2.0` -fPIC
    LD_PRELOAD=./libsublime-imfix.so sublime_text
    */
    #include <gtk/gtk.h>
    #include <gdk/gdkx.h>
    typedef GdkSegment GdkRegionBox;

    struct _GdkRegion
    {
      long size;
      long numRects;
      GdkRegionBox *rects;
      GdkRegionBox extents;
    };

    GtkIMContext *local_context;

    void
    gdk_region_get_clipbox (const GdkRegion *region,
                GdkRectangle    *rectangle)
    {
      g_return_if_fail (region != NULL);
      g_return_if_fail (rectangle != NULL);

      rectangle->x = region->extents.x1;
      rectangle->y = region->extents.y1;
      rectangle->width = region->extents.x2 - region->extents.x1;
      rectangle->height = region->extents.y2 - region->extents.y1;
      GdkRectangle rect;
      rect.x = rectangle->x;
      rect.y = rectangle->y;
      rect.width = 0;
      rect.height = rectangle->height; 
      //The caret width is 2; 
      //Maybe sometimes we will make a mistake, but for most of the time, it should be the caret.
      if(rectangle->width == 2 && GTK_IS_IM_CONTEXT(local_context)) {
            gtk_im_context_set_cursor_location(local_context, rectangle);
      }
    }

    //this is needed, for example, if you input something in file dialog and return back the edit area
    //context will lost, so here we set it again.

    static GdkFilterReturn event_filter (GdkXEvent *xevent, GdkEvent *event, gpointer im_context)
    {
        XEvent *xev = (XEvent *)xevent;
        if(xev->type == KeyRelease && GTK_IS_IM_CONTEXT(im_context)) {
           GdkWindow * win = g_object_get_data(G_OBJECT(im_context),"window");
           if(GDK_IS_WINDOW(win))
             gtk_im_context_set_client_window(im_context, win);
        }
        return GDK_FILTER_CONTINUE;
    }

    void gtk_im_context_set_client_window (GtkIMContext *context,
              GdkWindow    *window)
    {
      GtkIMContextClass *klass;
      g_return_if_fail (GTK_IS_IM_CONTEXT (context));
      klass = GTK_IM_CONTEXT_GET_CLASS (context);
      if (klass->set_client_window)
        klass->set_client_window (context, window);

      if(!GDK_IS_WINDOW (window))
        return;
      g_object_set_data(G_OBJECT(context),"window",window);
      int width = gdk_window_get_width(window);
      int height = gdk_window_get_height(window);
      if(width != 0 && height !=0) {
        gtk_im_context_focus_in(context);
        local_context = context;
      }
      gdk_window_add_filter (window, event_filter, context); 
    }

#####step2。
安装C/C++的编译环境和gtk libgtk2.0-dev

    sudo apt-get install build-essential  
    sudo apt-get install libgtk2.0-dev
#####step3.
编译成共享库

    gcc -shared -o libsublime-imfix.so sublime-imfix.c  `pkg-config --libs --cflags gtk+-2.0` -fPIC
#####step4.
启动 Sublime Text 2 试一试，现在可以使用fcitx输入中文了

    LD_PRELOAD=./libsublime-imfix.so subl
但是这样的话，我们每次都要在终端里面使用命令启动sublime text 2，这样很不方便，接下来我们还要通过修改sublime-text-2.desktop达到点击图标启动。

打开终端进入applications修改sublime-text-2.desktop

    cd /usr/share/applications
    sudo vim sublime-text-2.desktop
    
复制 libsublime-imfix.so 至 /usr/lib/

    mv libsublime-imfix.so /usr/lib
打开sublime-text-2.desktop后，将  

    Exec=/usr/bin/sublime-text-2 %F
修改为

    Exec=bash -c 'LD_PRELOAD=/usr/lib/libsublime-imfix.so /usr/bin/sublime-text-2' %F
将

    Exec=/usr/bin/sublime-text-2 --new-window
修改为

    Exec=bash -c 'LD_PRELOAD=/usr/lib/libsublime-imfix.so /usr/bin/sublime-text-2' --new-window

Ok如此即可，开始sublime无忧代码之旅  
原文链接： [http://my.oschina.net/wugaoxing/blog/121281](http://my.oschina.net/wugaoxing/blog/121281)