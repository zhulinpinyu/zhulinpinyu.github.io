---
layout:     post
title:      "QGIS Add Custom Basemap"
subtitle:   ""
date:       2015-09-10
author:     "zhulinpinyu"
header-img: ""
tags:
    - GIS
---

🍺 Thanks [http://cecilialiao.com/2014/10/30/adding-additional-stamen-map-tiles-to-qgis-2-4-tutorial/](http://cecilialiao.com/2014/10/30/adding-additional-stamen-map-tiles-to-qgis-2-4-tutorial/)

## I、 Install QGIS
visit [Official Site](http://qgis.org/en/site/) download

## II、 Install Openlayers Plugin
under Plugins menu, click **Manage and Install Plugins**
![Manage and Install Plugins p1](http://cecilialiao.com/wp-content/uploads/2014/10/Step1a.png)
![Manage and Install Plugins p2](http://cecilialiao.com/wp-content/uploads/2014/10/step1b.png)
![Manage and Install Plugins p3](http://cecilialiao.com/wp-content/uploads/2014/10/step1c.png)

## III、Custom Basemap
![Manage and Install Plugins p3](http://cecilialiao.com/wp-content/uploads/2014/10/step2a.png)

#### Setp1 edit osm_stamen.py
open folder `.qgis2` in your pc. Windows: `C:\Users\(computer name)\.qgis2` if you used default installation;
Mac OS X: ~/.qgis2
open `.qgis2` edit `python/plugins/openlayers_plugin/weblayers/osm_stamen.py` in last line add.

```python
class OlOSMAutoNavLayer(OlOSMStamenLayer):

  def __init__(self):
    OlOSMStamenLayer.__init__(self, name='AutoNav/OSM', html='autonav.html')
```

#### Step2 define new html for custom basemap

In `python/plugins/openlayers_plugin/weblayers/html/` copy `stamen_toner.html` as `autonav.html` and edit following part

```javascript
var apple = new OpenLayers.Layer.XYZ(
  "AutoNav/OSM map",
  "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x=${x}&y=${y}&z=${z}",
  {
    sphericalMercator: true,
    wrapDateLine: true,
    // TODO: min zoom level 2
    numZoomLevels: 20,
    // attribution: "", // FIXME: attribution
    eventListeners: {
    "loadstart": layerLoadStart,
    "loadend": layerLoadEnd
    }
  }
);
```
🎈Reminder: ${x} ${y} ${z}  NOT  {x} {y} {z}

#### Step3 link new map to open layers plugin

edit `python/plugins/openlayers_plugin/openlayers_plugin.py`

Find following

```python
from weblayers.osm_stamen import OlOSMStamenTonerLayer, OlOSMStamenWatercolorLayer, OlOSMStamenTerrainLayer
```

Update to

```python
from weblayers.osm_stamen import OlOSMStamenTonerLayer, OlOSMStamenWatercolorLayer, OlOSMStamenTerrainLayer, OlOSMAutoNavLayer
```

Find

```python
self._olLayerTypeRegistry.register(OlOSMStamenTerrainLayer())
```

In next line add

```python
self._olLayerTypeRegistry.register(OlOSMAutoNavLayer())
```

#### Step4 Check It works

![Screen Shot 2015-09-10 at 10.04.23.png](http://upload-images.jianshu.io/upload_images/6619-511163fb695efdf4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)