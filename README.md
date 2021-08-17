# Mapshaper geojson simplify

This is the geojson simplification method extracted directly from [Mapshaper](https://github.com/mbloch/mapshaper)

## Useage

```javascript
import {
	preBuild, 
	simplify
} from 'mapshaper-simplify'

const res = await fetch('./__country.json')
const geojson = await res.json()
console.log(geojson)

console.time('preBuild')
const dataset = preBuild(geojson)
console.timeEnd('preBuild')

console.log(dataset)
// console.log(JSON.stringify(dataset))

console.time('simplify')
const geojson2 = simplify(dataset,  0.1)
console.timeEnd('simplify')
console.log(geojson2)

// console.log(JSON.stringify(dataset))
// console.log(JSON.stringify(geojson2))

console.time('simplify')
const geojson3 = simplify(dataset,  0.5)
console.timeEnd('simplify')
console.log(geojson3)

// console.log(JSON.stringify(dataset))
// console.log(JSON.stringify(geojson3))
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