Attachmenstein.Cube = function(gl, opts) {
	this.gl = gl;
	this.x = opts.x || 0.0;
	this.y = opts.y || 0.0;
	this.z = opts.z || 0.0;
	this._initVerticies();
	this._initPosition();
	this.textureSrc = opts.textureSrc;
	this._initTexture();
};

Attachmenstein.Cube.prototype._initVerticies = function() {
	var vertices = [
		// Front face
		-0.5, -0.5,  0.5,
		 0.5, -0.5,  0.5,
		 0.5,  0.5,  0.5,
		-0.5,  0.5,  0.5,
		
		// Back face
		-0.5, -0.5, -0.5,
		-0.5,  0.5, -0.5,
		 0.5,  0.5, -0.5,
		 0.5, -0.5, -0.5,
		
		// Top face
		-0.5,  0.5, -0.5,
		-0.5,  0.5,  0.5,
		 0.5,  0.5,  0.5,
		 0.5,  0.5, -0.5,
		
		// Bottom face
		-0.5, -0.5, -0.5,
		 0.5, -0.5, -0.5,
		 0.5, -0.5,  0.5,
		-0.5, -0.5,  0.5,
		
		// Right face
		 0.5, -0.5, -0.5,
		 0.5,  0.5, -0.5,
		 0.5,  0.5,  0.5,
		 0.5, -0.5,  0.5,
		
		// Left face
		-0.5, -0.5, -0.5,
		-0.5, -0.5,  0.5,
		-0.5,  0.5,  0.5,
		-0.5,  0.5, -0.5
	];
	
	this.positionBuffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
	this.positionBuffer.itemSize = 3;
	this.positionBuffer.numItems = 24;
};

Attachmenstein.Cube.prototype._initPosition = function() {
	this.vertexIndexBuffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
	var cubeVertexIndices = [
		0, 1, 2,      0, 2, 3,    // Front face
		4, 5, 6,      4, 6, 7,    // Back face
		8, 9, 10,     8, 10, 11,  // Top face
		12, 13, 14,   12, 14, 15, // Bottom face
		16, 17, 18,   16, 18, 19, // Right face
		20, 21, 22,   20, 22, 23  // Left face
	]
	this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), this.gl.STATIC_DRAW);
	this.vertexIndexBuffer.itemSize = 1;
	this.vertexIndexBuffer.numItems = 36;	
};

Attachmenstein.Cube.prototype._initTexture = function() {
	this.texture = Attachmenstein.loader.load(this.gl, this.textureSrc);
};
