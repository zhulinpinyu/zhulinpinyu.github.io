var baseLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var countries = new ol.layer.Vector({
  source: new ol.source.GeoJSON({
    projection: 'EPSG:3857',
    url: '../data/shanghai.json'
  })
});

var center = ol.proj.transform([114.01,22.51],'EPSG:4326','EPSG:3857');
//-122.0312186,37.33233141
var view = new ol.View({
  center: center,
  zoom: 9
});

var map = new ol.Map({
  target: 'map',
  layers: [baseLayer,countries],
  view: view,
  controls: []
});

function onMouseMove(event){
  var coordinate = event.coordinate;
  var pixel = map.getPixelFromCoordinate(coordinate);
  var name = $('#name')[0];
  name.innerHTML = '';
  map.forEachFeatureAtPixel(pixel, function(feature){
    name.innerHTML += feature.get('name') + '<br>';
  });
}
map.on('click', onMouseMove);


function setCenter(lat,lon){
  var location = ol.proj.transform([lon,lat],'EPSG:4326','EPSG:3857');
  map.getView().setCenter(location);
}