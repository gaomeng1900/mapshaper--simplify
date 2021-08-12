# Mapshaper geojson simplify

This is the geojson simplification method extracted directly from [Mapshaper](https://github.com/mbloch/mapshaper)

## Useage

```javascript
import {
	simplify,
	importGeoJSON,
	exportGeoJSON,
} from 'mapshaper-simplify'

const res = await fetch('./__country.json')
const geojson = await res.json()
console.log(geojson)

console.time('importGeoJSON')
const dataset = importGeoJSON(geojson, {
	snap: true,
	no_repair: false
})
console.timeEnd('importGeoJSON')

console.log(dataset)

console.time('simplify')
simplify(dataset, {
	percentage: 0.1,
	keep_shapes: true,
	no_repair: false,
	method: 'weighted_visvalingam'
})
console.timeEnd('simplify')

console.time('exportGeoJSON')
const b = exportGeoJSON(dataset)
console.timeEnd('exportGeoJSON')

console.log(b[0].content)
```

## Why Bother?

It is important to keep topological relations among features when processing geographic data, which 
unfortunately, not promised in most simplification algorithms or GIS softwares like QGIS and ArcGIS. 

The simplification process of Mapshaper handles the shared edges well enough in most cases.

However Mapshaper is not designed to be called programmatically on the fly. 
Nor to be light-weighted. The browser version of it is enormous with dependencies like 
buffer-es6 as polyfills since it's originaly designed to run in a node.js evirenment.

That's why I extracted the geojson simplification part and minify it as much as posible.

## Caution!

The original Mapshaper is not programed friendly for tree-shaking so I have to use some very progressive 
minification method including JS coverage.

You have to USE IT EXACTLY LIKE OUR EXAMPLES. Or it won't work.

## License

This software is licensed under [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/).