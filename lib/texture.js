Attachmenstein.Texture = function(gl, src) {
    this.gl = gl;
    this.src = src;
    this._initTexture();
};

Attachmenstein.Texture.prototype._initTexture = function() {
    var _this = this;
    this.texture = this.gl.createTexture();
    this.texture.image = new Image();
    this.texture.image.onload = function() {
	_this._handleLoadedTexture()
    };
    this.texture.image.src = this.src;
};

Attachmenstein.Texture.prototype._handleLoadedTexture = function() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.texture.image);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    this.vertexTextureCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
    var textureCoords = [
			 // Front face
			 0.0, 0.0,
			 1.0, 0.0,
			 1.0, 1.0,
			 0.0, 1.0,
		
			 // Back face
			 1.0, 0.0,
			 1.0, 1.0,
			 0.0, 1.0,
			 0.0, 0.0,
		
			 // Top face
			 0.0, 1.0,
			 0.0, 0.0,
			 1.0, 0.0,
			 1.0, 1.0,
		
			 // Bottom face
			 1.0, 1.0,
			 0.0, 1.0,
			 0.0, 0.0,
			 1.0, 0.0,
		
			 // Right face
			 1.0, 0.0,
			 1.0, 1.0,
			 0.0, 1.0,
			 0.0, 0.0,
		
			 // Left face
			 0.0, 0.0,
			 1.0, 0.0,
			 1.0, 1.0,
			 0.0, 1.0,
			 ];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
    this.vertexTextureCoordBuffer.itemSize = 2;
    this.vertexTextureCoordBuffer.numItems = 24;
};
