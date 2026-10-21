/**** 00_config.js — the single source of truth for the project ****
 *
 * WHY THIS FILE EXISTS
 * Every other script loads these settings instead of typing them again.
 * Change a date or threshold here once, and every script (and the
 * dashboard) uses the new value. This is how you keep the report's
 * numbers consistent.
 *
 * HOW OTHER SCRIPTS LOAD IT
 *   var cfg = require('users/YOUR_USERNAME/kumasi-green-heat:00_config');
 *   print(cfg.epochs);
 *
 * In an Earth Engine module, only things attached to `exports` are visible
 * to the scripts that require() it.
 */

// ---------------------------------------------------------------------
// 1. STUDY AREA
// The Kumasi GHS-FUA polygon you upload as an asset in week 1.
// Replace YOUR_CLOUD_PROJECT with your Earth Engine Cloud project ID.
// ---------------------------------------------------------------------
exports.boundaryAsset = 'projects/YOUR_CLOUD_PROJECT/assets/kumasi_fua';

// All exports and statistics use one projection: WGS 84 / UTM 30N (metres).
exports.crs = 'EPSG:32630';

// ---------------------------------------------------------------------
// 2. TIME
// Four epochs. Each is a multi-year window so that enough cloud-free
// dry-season scenes exist. Dry season = November to March.
// ---------------------------------------------------------------------
exports.epochs = [
  {name: '1986-91', start: '1986-01-01', end: '1991-12-31', sensor: 'L5'},
  {name: '2000-02', start: '2000-01-01', end: '2002-12-31', sensor: 'L5L7'},
  {name: '2013-15', start: '2013-04-01', end: '2015-12-31', sensor: 'L8'},
  {name: '2023-25', start: '2023-01-01', end: '2025-12-31', sensor: 'L8L9'}
];

// Months 11 -> 3. ee.Filter.calendarRange wraps around the new year when
// start > end, so (11, 3) means Nov, Dec, Jan, Feb, Mar.
exports.dryMonths = {start: 11, end: 3};

// Settlement years available in WSF Evolution (HW1).
exports.wsfYears = [1985, 1990, 1995, 2000, 2005, 2010, 2015];

// ---------------------------------------------------------------------
// 3. THRESHOLDS (starting values: we calibrate them later and note the
//    final value in the report)
// ---------------------------------------------------------------------
exports.ndviGreen = 0.3;      // NDVI above this = green space (to calibrate vs. WorldCover)
exports.maxCloudCover = 60;   // scene-level filter; pixel-level masking does the rest

// Landsat Collection 2 Level-2 scaling factors (from the USGS product guide)
exports.srScale = 0.0000275;  exports.srOffset = -0.2;        // surface reflectance
exports.stScale = 0.00341802; exports.stOffset = 149.0;       // surface temperature, Kelvin

// ---------------------------------------------------------------------
// 4. DATASET IDs (the Earth Engine catalog names)
// ---------------------------------------------------------------------
exports.data = {
  l5:  'LANDSAT/LT05/C02/T1_L2',
  l7:  'LANDSAT/LE07/C02/T1_L2',
  l8:  'LANDSAT/LC08/C02/T1_L2',
  l9:  'LANDSAT/LC09/C02/T1_L2',
  wsfEvo: 'projects/sat-io/open-datasets/WSF/WSF_EVO',   // community catalog: verify in week 1
  ghslBuilt: 'JRC/GHSL/P2023A/GHS_BUILT_S',
  ghslPop:   'JRC/GHSL/P2023A/GHS_POP',
  worldPop:  'WorldPop/GP/100m/pop',
  worldCover:'ESA/WorldCover/v200',
  dem:       'USGS/SRTMGL1_003'
};

// ---------------------------------------------------------------------
// 5. COLOURS (same palettes in every map = a consistent report)
// ---------------------------------------------------------------------
exports.palettes = {
  ndvi: ['#a6611a', '#dfc27d', '#f5f5f5', '#80cdc1', '#018571'],
  ndbi: ['#2c7bb6', '#abd9e9', '#ffffbf', '#fdae61', '#d7191c'],
  lst:  ['#313695', '#74add1', '#ffffbf', '#f46d43', '#a50026'],
  // Growth classes: settled by 1985, 1986–95, 1996–2005, 2006–15.
  // Old core quiet, newest strongest (visual hierarchy follows the story).
  growthLight: ['#c9c9c9', '#fdd49e', '#fc8d59', '#d7301f'],   // "Ember": report, print, ArcGIS
  growthDark:  ['#4c566a', '#b5577e', '#f28f3b', '#ffd166']    // "City lights": GEE / dashboard on a dark map
};
