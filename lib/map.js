Map = function() {
	this.xWidth = 10;
	this.yWidth = 10;
	this.zWidth = 4;
	this.textureCount = 16;
	
	this.map = [];
	
	// Generate each layer of the map.
	for (var z = 0; z < this.zWidth; z++) {
		this.map.push( this.generateLayer(z) );
	}
};

Map.prototype.render = function(main) {
	for (var z = 0; z < this.zWidth; z++) {
		for (var y = 0; y < this.yWidth; y++) {
			for (var x = 0; x < this.xWidth; x++) {
				if (!this.map[z][y][x]) continue;
				var cube = new Attachmenstein.Cube(main.gl, {x: x, y: y, z: z, textureSrc: 'textures/rock.jpeg'});
				main.addObject(cube);
			}
		}
	}
};

Map.prototype.printLayer = function(layer) {
	var str = '';
	
	for (var y = 0; y < this.yWidth; y++) {
		for (var x = 0; x < this.xWidth; x++) {
			str += this.map[layer][y][x];
		}
		str += '\n';
	}
	
	console.log(str);
};

Map.prototype.generateLayer = function(z) {
	var layer = [];
	console.log('generating one layer')
	for (var y = 0; y < this.yWidth; y++) {
		layer.push([]);
		for (var x = 0; x < this.xWidth; x++) {
			// Ben pulled this out of nowhere.
			var modifier = (14.0 - parseFloat(this.countEmptyTiles(x, y, z))) / 17.0;
			layer[y][x] = ( Math.random() > modifier ) ? 1 : 0;
		}
	};
	
	return layer;
};

Map.prototype.countEmptyTiles = function(_x, _y, _z) {
	var count = 0,
		startX = Math.max(_x - 1, 0),
		startY = Math.max(_y - 1, 0),
		startZ = Math.max(_z - 1, 0),
		stopX = Math.min(_x + 1, this.xWidth - 1),
		stopY = Math.min(_y + 1, this.yWidth - 1),
		stopZ = Math.min(_z, this.zWidth - 1);
	
	if (_z === 0) {
		count += 9.0;
	}
	
	for (var x = startX; x < stopX; x++) {
		for (var y = startY; y < stopY; y++) {
			for (var z = startZ; z < stopZ; z++) {
				if (!this.map[z][y][x]) {
					count++;
				}
			}
		}
	}
	return count;
};