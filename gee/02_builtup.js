/**** 02_builtup.js — HW1: settled area of Kumasi, 1985–2015 ****
 *
 * Data: WSF Evolution. Each pixel = the year it was first detected as
 * settled (1985–2015); 0 = never settled.
 *
 * Output:
 *   Console : table + chart of settled area per year (compare with ArcGIS)
 *   Tasks   : CSV export of the same table
 *   Map     : when each pixel became settled ("City lights" colours)
 */

var cfg = require('users/YOUR_USERNAME/kumasi-green-heat:00_config');


// ===================== 1. INPUTS =====================================

var fua  = ee.FeatureCollection(cfg.boundaryAsset);
var area = fua.geometry();
var view = area.buffer(10000).bounds();          // map window: FUA + 10 km

var wsf = ee.ImageCollection(cfg.data.wsfEvo)
  .filterBounds(view)
  .mosaic()
  .select(0)
  .rename('year')
  .selfMask();                                    // hide 0 = never settled


// ===================== 2. AREA PER YEAR ==============================
// Settled by year Y = every pixel with a year <= Y (cumulative).
// Counted on the same grid as ArcGIS: UTM 30N, 30 m, a pixel counts if
// its centre is inside the boundary (unweighted).

var years = [1985, 1995, 2005, 2015];

var table = ee.FeatureCollection(years.map(function (y) {
  var pixels = wsf.lte(y).reduceRegion({
    reducer: ee.Reducer.sum().unweighted(),
    geometry: area,
    crs: cfg.crs,
    scale: 30,
    maxPixels: 1e10
  }).getNumber('year');

  return ee.Feature(null, {
    year: y,
    pixels: pixels,
    area_km2: pixels.multiply(900).divide(1e6)
  });
}));

print(ui.Chart.feature.byFeature(table, 'year', ['pixels', 'area_km2'])
  .setChartType('Table'));

print(ui.Chart.feature.byFeature(table, 'year', 'area_km2')
  .setChartType('ColumnChart')
  .setOptions({
    title: 'Settled area in the Kumasi FUA (WSF Evolution)',
    hAxis: {title: 'Year', format: '####'},
    vAxis: {title: 'km²', minValue: 0},
    legend: {position: 'none'},
    colors: [cfg.palettes.growthDark[2]]
  }));

Export.table.toDrive({
  collection: table,
  description: 'hw1_wsf_area_gee',
  fileFormat: 'CSV',
  selectors: ['year', 'pixels', 'area_km2']
});


// ===================== 3. MAP ========================================

// Four periods in one line: start at 1 and add 1 for each threshold the
// year passes. 1985 -> 1, 1990 -> 2, 2000 -> 3, 2010 -> 4.
// Pixels never settled stay hidden (the mask comes along from wsf).
var period = wsf.gt(1985).add(wsf.gt(1995)).add(wsf.gt(2005)).add(1)
  .rename('period')
  // Show true 30 m pixels at every zoom. Without this, GEE averages the
  // years when you zoom out (e.g. 1985 and 0 -> 992) and colours go wrong.
  .reproject({crs: cfg.crs, scale: 30})
  .clip(view);

// Dark basemap so the bright new growth stands out
Map.setOptions('Dark', {Dark: [
  {elementType: 'geometry',           stylers: [{color: '#1e2230'}]},
  {elementType: 'labels',             stylers: [{visibility: 'off'}]},
  {featureType: 'road',  elementType: 'geometry', stylers: [{color: '#262b3a'}]},
  {featureType: 'water', elementType: 'geometry', stylers: [{color: '#151821'}]}
]});
Map.centerObject(fua, 11);

Map.addLayer(period,
  {min: 1, max: 4, palette: cfg.palettes.growthDark},
  'Settled since (WSF Evolution)');

var outline = ee.Image().byte().paint({featureCollection: fua, color: 1, width: 2});
Map.addLayer(outline, {palette: ['ffffff']}, 'Kumasi FUA boundary (2015)');


// ===================== 4. LEGEND =====================================

var labels = ['Settled by 1985', 'New 1986–1995', 'New 1996–2005', 'New 2006–2015'];

var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 12px',
                               backgroundColor: '#1e2230'}});
legend.add(ui.Label('Kumasi: settled since', {fontWeight: 'bold', color: 'white',
                                              backgroundColor: '#1e2230'}));
labels.forEach(function (text, i) {
  legend.add(ui.Panel([
    ui.Label('', {backgroundColor: cfg.palettes.growthDark[i], padding: '8px',
                  margin: '3px 8px 3px 0'}),
    ui.Label(text, {color: '#e6e6e6', backgroundColor: '#1e2230', margin: '3px 0'})
  ], ui.Panel.Layout.flow('horizontal'), {backgroundColor: '#1e2230'}));
});
legend.add(ui.Label('White line: FUA boundary (2015)',
                    {color: '#9aa0ab', fontSize: '11px', backgroundColor: '#1e2230'}));
Map.add(legend);
