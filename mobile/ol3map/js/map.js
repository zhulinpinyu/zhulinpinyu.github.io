var baseLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var countries = new ol.layer.Vector({
  source: new ol.source.GeoJSON({
    projection: 'EPSG:3857',
    url: '../ol3map/shenzhen.json'
  })
});

var center = ol.proj.transform([114.02,22.54],'EPSG:4326','EPSG:3857');
//-122.0312186,37.33233141
var view = new ol.View({
  center: center,
  zoom: 14
});

var map = new ol.Map({
  target: 'map',
  layers: [baseLayer,countries],
  view: view,
  controls: []
});


function marker(location){
  return new ol.Overlay({
    position: location,
    element: $('<span class="glyphicon glyphicon-map-marker" aria-hidden="true" style="color: darkviolet; font-size: 21px;"></span>')
  });
}

function onMouseMove(event){
  var coordinate = event.coordinate;
  var pixel = map.getPixelFromCoordinate(coordinate);
  var degrees = ol.proj.transform(coordinate, 'EPSG:3857','EPSG:4326');
  var hdms = ol.coordinate.toStringHDMS(degrees)
  map.forEachFeatureAtPixel(pixel, function(feature){
    var value = feature.get('name')+"("+hdms+")"
    document.location = "ol3map://alert/"+value;
  });
}
map.on('click', onMouseMove);


function setCenter(lat,lon){
  var location = ol.proj.transform([lon,lat],'EPSG:4326','EPSG:3857');
  map.getView().setCenter(location);
  map.addOverlay(marker(location));
}

function orientation(){
  document.location = "ol3map://center/"
}