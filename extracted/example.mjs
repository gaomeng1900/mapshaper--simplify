// const fs = require("fs");
// const path = require('path')

// import {simplify} from '../src/commands/__simplify.mjs'
// import { importGeoJSON } from '../src/geojson/geojson-import.js'
// import { exportGeoJSON } from '../src/geojson/geojson-export.js'

// import {
// 	simplify,
// 	importGeoJSON,
// 	exportGeoJSON,
// 	cleanPathsAfterImport,
// 	buildTopology,
// 	parseLocalPath,
// } from '../mapshaper.simplify.mjs'

// const res = await fetch('./__country.json')
// const geojson = await res.json()
// console.log(geojson)

// console.time('importGeoJSON')

// console.timeEnd('importGeoJSON')

// console.log(dataset)
// // console.log(JSON.stringify(dataset))

// console.time('simplify')
// simplify(dataset, {
// 	percentage: 0.1,
// 	keep_shapes: true,
// 	no_repair: false,
// 	method: 'weighted_visvalingam'
// })
// console.timeEnd('simplify')

// console.log(dataset)
// // console.log(JSON.stringify(dataset))

// console.time('exportGeoJSON')
// const b = exportGeoJSON(dataset, {
// 	// format: "geojson",
// 	// v2: true

// })
// console.timeEnd('exportGeoJSON')

// console.log(b[0].content)

import {
	preBuild, 
	simplify
} from '../mapshaper.simplify.mjs'

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