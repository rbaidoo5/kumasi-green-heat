/**** 01_boundary.js — check the study area before any analysis ****
 *
 * GOAL: load the Kumasi boundary, confirm it is what we think it is,
 * and see how the built-up area sits inside it.
 *
 * RUN IT AFTER: uploading data/boundaries/kumasi_fua.shp as an asset and
 * putting its path into 00_config.js.
 */

var cfg = require('users/YOUR_USERNAME/kumasi-green-heat:00_config');

// 1. Load the boundary -------------------------------------------------
var aoi = ee.FeatureCollection(cfg.boundaryAsset);
Map.centerObject(aoi, 10);

// Sanity checks: printing is how you "look inside" server-side objects.
print('Number of polygons (expect 1):', aoi.size());
print('Attribute fields:', aoi.first().propertyNames());
// area(maxError) works in square metres; divide by 1e6 for km².
print('Area (km²):', aoi.geometry().area(100).divide(1e6));

// 2. Draw the outline only ---------------------------------------------
// paint() burns the polygon edge into an empty image, so the map shows a
// line instead of a filled shape that hides everything underneath.
var outline = ee.Image().byte().paint({featureCollection: aoi, color: 1, width: 2});

// 3. Context layer: GHSL built-up surface, 2020 --------------------------
// Each 100 m cell holds the square metres of built-up surface (0–10,000).
var built2020 = ee.ImageCollection(cfg.data.ghslBuilt)
  .filter(ee.Filter.eq('system:index', '2020'))
  .first()
  .select('built_surface')
  .clip(aoi);

Map.addLayer(built2020.updateMask(built2020.gt(0)),
  {min: 0, max: 8000, palette: ['#fff5eb', '#fd8d3c', '#7f2704']},
  'GHSL built-up 2020 (m² per cell)');
Map.addLayer(outline, {palette: ['000000']}, 'Kumasi FUA boundary');

// 4. Question to answer in your learning log ----------------------------
// Does the built-up area reach the boundary edge anywhere? If yes, the
// city may already extend past the FUA, which is a point for the report.
