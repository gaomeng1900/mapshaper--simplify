// const fs = require("fs");
// const path = require('path')

// import {simplify} from '../src/commands/__simplify.mjs'
// import { importGeoJSON } from '../src/geojson/geojson-import.js'
// import { exportGeoJSON } from '../src/geojson/geojson-export.js'

import {
	simplify,
	importGeoJSON,
	exportGeoJSON,
	cleanPathsAfterImport,
} from '../mapshaper.simplify.mjs'

const res = await fetch('./__country.json')
const geojson = await res.json()
console.log(geojson)

console.time('importGeoJSON')
const opts = {
	snap: true,
	no_repair: false
}
const dataset = importGeoJSON(geojson, opts)
cleanPathsAfterImport(dataset, opts)
console.timeEnd('importGeoJSON')

console.log(dataset)
// console.log(JSON.stringify(dataset))

console.time('simplify')
simplify(dataset, {
	percentage: 0.1,
	keep_shapes: true,
	no_repair: false,
	method: 'weighted_visvalingam'
})
console.timeEnd('simplify')

console.log(dataset)
// console.log(JSON.stringify(dataset))

console.time('exportGeoJSON')
const b = exportGeoJSON(dataset)
console.timeEnd('exportGeoJSON')

console.log(b[0].content)