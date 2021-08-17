declare module 'mapshaper-simplify' {
	export type Dataset = Object
	export type Geojson = Object
	export function preBuild(geojson: Geojson): Dataset
	export function simplify(dataset: Dataset, percentage: number): Geojson
}
