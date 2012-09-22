Map = function() {
	this.xWidth = 50;
	this.yWidth = 50;
	this.zWidth = 7;
	this.textureCount = 16;
	
	this.map = [];
	this.heightMap = [];
	
	// Generate each layer of the map.
	for (var z = 0; z < this.zWidth; z++) {
		this.map.push( this.generateLayer(z) );
	}
};

Map.prototype.getZ = function(x, y) {
	if (!this.heightMap[parseInt(y)]) return -1;
	var z = (this.heightMap[parseInt(y)][parseInt(x)] || 0) * -1;
	return z - 1;
};

Map.prototype.render = function(main) {
	var textures = [
		'textures/texture-00.jpg',
		'textures/texture-01.jpg',
		'textures/texture-02.jpg',
		'textures/texture-03.jpg',
		'textures/texture-04.jpg',
		'textures/texture-05.jpg',
		'textures/texture-06.jpg'
	];
	
	for (var z = 0; z < this.zWidth; z++) {
		for (var y = 0; y < this.yWidth; y++) {			
			for (var x = 0; x < this.xWidth; x++) {
				if (!this.map[z][y][x]) continue;
				var cube = new Attachmenstein.Cube(main.gl, {x: x, y: y, z: z, textureSrc: textures[this.map[z][y][x] - 1] });
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
	
};

Map.prototype.generateLayer = function(z) {
	var layer = [];
	for (var y = 0; y < this.yWidth; y++) {
		layer.push([]);
		
		if (!this.heightMap[y]) this.heightMap.push([]);
		
		for (var x = 0; x < this.xWidth; x++) {
			// Ben pulled this out of nowhere.
			var modifier = z * 0.15
			if (z === 0) {
				modifier = 0.0;
			} else {
				if (!this.map[z - 1][y][x]) continue;
			}
			
			if ( Math.random() > modifier ) {
				layer[y][x] = z + 1;
				this.heightMap[y][x] = z;
			}
		}
	};
	
	return layer;
};