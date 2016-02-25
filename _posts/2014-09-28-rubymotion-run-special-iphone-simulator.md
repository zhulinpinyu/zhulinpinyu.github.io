---
layout: post
title: "rubymotion 运行指定的模拟器"
description: ""
category: rubymotion
tags: [OSX,Rubymotion,Rubymotion Tips]
---




**List all simulator devices**
 
```    
$ /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/usr/bin/simctl list
    
== Devices ==
-- iOS 7.0 --
-- iOS 7.1 --
    iPhone 5s (971DB3D4-7FF4-4005-A11D-11541ED79193) (Shutdown)
-- iOS 8.0 --
    iPhone 5s (EE64F798-6CB9-40B1-8B19-30727C3CA538) (Shutdown)
    
```

**run specify device with (specify OS version)**
    
> when you run old IOS version you must use following command:
it will lanuch iPhone 5s with IOS 7.1 (You must set `app.deployment_target = '7.1'`)  只有运行低版本IOS时才需要指定 name(ID)  
    
    $ rake device_name="iPhone 5s (971DB3D4-7FF4-4005-A11D-11541ED79193)"
    
Following command will run newest ios
    
    $ rake device_name="iPhone 5s"
    

    
    
