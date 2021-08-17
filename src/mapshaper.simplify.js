import { simplify as _simplify } from "../src/commands/__simplify.mjs";
import { importGeoJSON } from "../src/geojson/geojson-import.js";
import { exportGeoJSON } from "../src/geojson/geojson-export.js";
import { cleanPathsAfterImport } from "../src/paths/mapshaper-path-import.js";
import { buildTopology } from "../src/topology/mapshaper-topology.js";
// import { parseLocalPath } from '../src/utils/mapshaper-filename-utils.js';
import { copyDataset } from "../src/dataset/mapshaper-dataset-utils.js";

// function filenameToLayerName(path) {
// 	var name = 'layer1';
// 	var obj = parseLocalPath(path);
// 	if (obj.basename && obj.extension) { // exclude paths like '/dev/stdin'
// 	  name = obj.basename;
// 	}
// 	return name;
//   }

export function preBuild(geojson) {
  const opts = {
    snap: true,
    no_repair: false,
  };
  const dataset = importGeoJSON(geojson, opts);
  const data = {
    filename: "input.json",
    format: "geojson",
    dataset,
  };
  dataset.info.import_options = opts;
  cleanPathsAfterImport(dataset, opts);
  buildTopology(dataset);
  // dataset.layers.forEach(function(lyr) {
  // 	if (!lyr.name) {
  // 	  lyr.name = filenameToLayerName(data.filename || '');
  // 	}
  //   });

  dataset.info.input_files = [data.filename];
  dataset.info.input_formats = ["geojson"];

  return dataset;
}

export function simplify(dataset, percentage) {
  const _dataset = copyDataset(dataset);
  _simplify(_dataset, {
    percentage,
    keep_shapes: true,
    no_repair: false,
    method: "weighted_visvalingam",
  });

  const b = exportGeoJSON(_dataset, {});

  return b[0].content;
}
