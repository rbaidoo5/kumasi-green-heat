# Data sources

Raw files go in `data/raw/` (ignored by git). Record every download here: what, where from, when.

| Dataset | Used for | Source | Downloaded |
|---|---|---|---|
| GHS-FUA R2019A (Functional Urban Areas) | Study-area boundary | https://human-settlement.emergency.copernicus.eu/ghs_fua.php | |
| World Settlement Footprint Evolution 1985–2015 | HW1 urban extent | https://download.geoservice.dlr.de/WSF_EVO/ | |
| Landsat 8 Level-1 | HW2 NDBI, HW3 NDVI | https://landsat-diss.eo.esa.int/socat/LANDSAT-8_L1/ | |
| Landsat C2 L2, GHSL, WorldPop, ESA WorldCover | Time series (via GEE, no download) | Google Earth Engine catalog | n/a |

## Coordinate reference system
Everything is stored in **WGS 84 / UTM zone 30N (EPSG:32630)**, metres. Kumasi sits at about 1.6° W, 6.7° N, inside zone 30N.
