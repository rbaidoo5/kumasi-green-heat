# From Garden City to Heat Island?
### Green-space loss and surface urban heat in Kumasi, Ghana (1986–2025)

Course project for **Remote Sensing in Urban Planning and Development** (TUM, Chair of Data Science in Earth Observation).
Analysis in Google Earth Engine, homework maps in ArcGIS Pro, interactive dashboard published from this repository.

> Status: setting up (week 1 of 6). Live dashboard link will appear here.

## Research questions
1. **Growth:** how did Kumasi's built-up extent and compactness change, 1985–2025?
2. **Green:** how much urban green space was lost, and how much is left per person in each district (vs. the WHO 9 m² minimum)?
3. **Heat:** how did land surface temperature and surface urban heat island intensity change?
4. **Planning:** which districts are both hottest and least green?

## Repository layout
| Folder | What lives there |
|---|---|
| `gee/` | Earth Engine scripts, numbered in run order. `00_config.js` holds every shared setting |
| `data/raw/` | Downloads (Landsat, WSF, GHS-FUA). |
| `data/boundaries/` | The kumasi study are |
| `data/processed/` | Small outputs: CSV tables exported from GEE |
| `arcgis/` | ArcGIS Pro project for the maps |
| `python/` | Data preparation scripts |

## Data
See [`data/README.md`](data/README.md) for every dataset, its source and licence.

## Progress
- [x] Project structure
- [ ] Git + GitHub repo, Earth Engine project
- [ ] Study-area boundary (GHS-FUA Kumasi)
- [ ] HW1 urban extent 1985–2015
- [ ] HW2 NDBI
- [ ] HW3 NDVI / green space
- [ ] LST and surface heat island
- [ ] District statistics and priority map
- [ ] Dashboard
- [ ] Report and presentation
