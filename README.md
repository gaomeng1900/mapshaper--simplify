# Mapshaper geojson simplify

This is the geojson simplification method extracted directly from [Mapshaper](https://github.com/mbloch/mapshaper)

> This is the full version that supports polygon and lines features. If you only need polygon simplification, please use [mapshaper-simplify](https://github.com/gaomeng1900/mapshaper-simplify)

## Useage

```javascript
import { preBuild, simplify } from 'mapshaper-simplify-full'

const res = await fetch('./__country.json')
const geojson = await res.json()
console.log(geojson)

console.time('preBuild')
const dataset = preBuild(geojson)
console.timeEnd('preBuild')

console.log(dataset)

console.time('simplify')
const geojson2 = simplify(dataset, 0.1)
console.timeEnd('simplify')
console.log(geojson2)

console.time('simplify')
const geojson3 = simplify(dataset, 0.5)
console.timeEnd('simplify')
console.log(geojson3)
```

## Why Bother?

It is important to keep topological relations among features when processing geographic data, which
unfortunately, not promised in most simplification algorithms or GIS softwares like QGIS and ArcGIS.

The simplification process of Mapshaper handles the shared edges well enough in most cases.

However Mapshaper is not designed to be called programmatically on the fly.
Nor to be light-weighted. The browser version of it is enormous with dependencies like
buffer-es6 as polyfills since it's originaly designed to run in a node.js evirenment.

That's why I extracted the geojson simplification part and minify it as much as posible.

This is a smaller version that only supports polygon features. Check out [mapshaper-simplify](https://github.com/gaomeng1900/mapshaper-simplify).

## License

This software is licensed under [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/).
