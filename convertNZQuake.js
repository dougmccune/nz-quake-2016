const shapefile = require('shapefile');
const fishnet = require('geojson-fishnet');
const shp2stl = require('shp2stl');
const fs = require('fs');

if (!fs.existsSync('output')) { fs.mkdirSync('output'); }

convertOneQuake('mi', 1, 'mi');
convertOneQuake('mi', .3, 'mi_simplified');

convertOneQuake('pgv', 1, 'pgv');
convertOneQuake('pgv', .3, 'pgv_simplified');

convertOneQuake('pga', 1, 'pga');
convertOneQuake('pga', .3, 'pga_simplified');

function convertOneQuake(filename, simplification, outputFilename) {
	shapefile.read( 'data/' + filename + '.shp', function(err, geojson) {
	
	fishnet.square(geojson, 40, function(err, fishnettedGeoJSON) {
		
		shp2stl.geojson2stl(fishnettedGeoJSON, {
			width: 100, 
			height: 30,
			extrudeBy: "PARAMVALUE",
			verbose: true,
			extrusionMode: 'straight',
			simplification: simplification
		},
		function(err, stl) {
			fs.writeFileSync('output/' + outputFilename + '.stl',  stl);
		});

	});

});
}