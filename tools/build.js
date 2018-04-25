var webpack = require('webpack');
var config = require('./webpack_build.config.js');
var exec = require('child_process').exec;
var fs = require('fs');

main();
function main(){
	// exec('rm -rf ./dist/*', function(err){
	// 	if(err) throw err;
	// 	compile();
	// });
	compile();
}

function compile(){
	var compiler = webpack(config);

	compiler.run(function(err, stats){
		console.log(stats.toString({colors: true}));
		if(err)
	        return handleFatalError(err);
	    var jsonStats = stats.toJson();
	    if(jsonStats.errors.length > 0)
	        return handleSoftErrors(jsonStats.errors);
	    if(jsonStats.warnings.length > 0)
	        handleWarnings(jsonStats.warnings);
	    successfullyCompiled(jsonStats);
	});
}

function successfullyCompiled(jsonStats){
	console.log('...success');
	var assetsByChunkName = jsonStats.assetsByChunkName;
	// console.log(assetsByChunkName);

	// exec('mkdir -p ./dist/pages/ && cp -rf ./src/pages/* ./dist/pages/ && cp -rf ./src/index.html ./dist/', function(err, stdout, stderr){
	exec('cp -rf ./src/index.html ./dist/', function(err, stdout, stderr){
		if(err) throw err;
		changeFileName(assetsByChunkName);
	});
}

function changeFileName(assetsByChunkName){
	var targetFile = ['./dist/index.html'],
		targetFile2 = [];

	var entry = assetsByChunkName.entry,
		entry2 = assetsByChunkName.entry2;

	var RE_ENTRY = /dist\/entry\.bundle\.js/,
		RE_ENTRY2 = /dist\/entry2\.bundle\.js/;

	for(var i=0, len=targetFile.length; i<len; i++){
		var fileName = targetFile[i];
		reWrite(fileName, entry, RE_ENTRY);
	}

	for(var i=0, len=targetFile2.length; i<len; i++){
		var fileName = targetFile2[i];
		reWrite(fileName, entry2, RE_ENTRY2);
	}

	function reWrite(fileName, entry, re){
		if(Object.prototype.toString.call(entry) === '[object Array]'){
			entry = entry[0];
		}
		fs.readFile(fileName, {encoding: 'utf8'}, function(err, data){
			if(err) throw err;
			var d = data.replace(re, entry);
			fs.writeFile(fileName, d, function(err){
				if(err) throw err;
				console.log('save ' + fileName + ' success');
			});
		});
	}
}

function handleFatalError(err){
	console.log('...error:');
	console.log(err);
}

function handleSoftErrors(err){
	console.log('...softerror:');
	console.log(err);
}

function handleWarnings(err){
	console.log('...warnings:');
	console.log(err);
}
