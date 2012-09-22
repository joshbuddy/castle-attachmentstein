Attachmenstein = function() {
	var main = new Attachmenstein.Main();
	main.start();
}

Attachmenstein.Main = function() {
	console.log('Loading...');
	this.gl = null;
	this.shaderProgram = null;
	this.mvMatrix = mat4.create(); // Model view matrix.
	this.pMatrix = mat4.create(); // Projection matrix.
	this.objectPipeline = [];
	
	this.initGL(document.getElementById('canvas'));
	this.initShaders();
	this.game = new Attachmenstein.Game(this, {});
};

Attachmenstein.Main.prototype.addObject = function(obj) {
	console.log(obj);
	this.objectPipeline.push(obj);
};

Attachmenstein.Main.prototype.initGL = function(canvas) {
	try {
		this.gl = canvas.getContext("experimental-webgl");
		this.gl.viewportWidth = canvas.width;
		this.gl.viewportHeight = canvas.height;
	} catch (e) {
		console.log(e);
	}
	if (!this.gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
	console.log('initialized WebGL.')
};

Attachmenstein.Main.prototype._getShader = function(id) {
	var shaderScript = document.getElementById(id),
		shader = null,
		str = "";
	
	if (!shaderScript) {
		return null;
	}
	
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}
	
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = this.gl.createShader(this.gl.VERTEX_SHADER);
	} else {
		return null;
	}
	
	this.gl.shaderSource(shader, str);
	this.gl.compileShader(shader);
	if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
		alert(this.gl.getShaderInfoLog(shader));
		return null;
	}
	
	return shader;
};

Attachmenstein.Main.prototype.initShaders = function () {
	var fragmentShader = this._getShader("shader-fs");
	var vertexShader = this._getShader("shader-vs");

	this.shaderProgram = this.gl.createProgram();
	this.gl.attachShader(this.shaderProgram, vertexShader);
	this.gl.attachShader(this.shaderProgram, fragmentShader);
	this.gl.linkProgram(this.shaderProgram);
	
	if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
	    alert("Could not initialise shaders");
	}
	
	this.gl.useProgram(this.shaderProgram);
	
	this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	
	this.shaderProgram.textureCoordAttribute = this.gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
	this.gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);
	
	this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
	this.shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
	this.shaderProgram.samplerUniform = this.gl.getUniformLocation(this.shaderProgram, "uSampler");
};

Attachmenstein.Main.prototype._setMatrixUniforms = function() {
	this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
	this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
};

Attachmenstein.Main.prototype.start = function() {
	this.gl.clearColor(0.5, 0.5, 0.5, 1.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this._tick();
}

Attachmenstein.Main.prototype._tick = function() {
	var _this = this;
	requestAnimFrame(function() {
		setTimeout(function() {
			_this._tick();
		}, 30);
	});
	this._drawScene();
};


Attachmenstein.Main.prototype._drawScene = function() {
	var _this = this;
	
	this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.pMatrix);
	
	mat4.identity(this.mvMatrix);
	mat4.rotate(this.mvMatrix, -1.0 * this._degToRad(this.game.rotation), [0, 1, 0]);	
	mat4.translate(this.mvMatrix, [this.game.z, this.game.y, this.game.x]);
	
	this.objectPipeline.forEach(function(object) {
		_this.gl.bindBuffer(_this.gl.ARRAY_BUFFER, object.positionBuffer);
		_this.gl.vertexAttribPointer(_this.shaderProgram.vertexPositionAttribute, object.positionBuffer.itemSize, _this.gl.FLOAT, false, 0, 0);

		if (object.vertexTextureCoordBuffer) {
			_this.gl.bindBuffer(_this.gl.ARRAY_BUFFER, object.vertexTextureCoordBuffer);
			_this.gl.vertexAttribPointer(_this.shaderProgram.textureCoordAttribute, object.vertexTextureCoordBuffer.itemSize, _this.gl.FLOAT, false, 0, 0);
		}
		
		_this.gl.activeTexture(_this.gl.TEXTURE0);
		_this.gl.bindTexture(_this.gl.TEXTURE_2D, object.texture);
		_this.gl.uniform1i(_this.shaderProgram.samplerUniform, 0);

		_this.gl.bindBuffer(_this.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
		_this._setMatrixUniforms();
		_this.gl.drawElements(_this.gl.TRIANGLES, object.vertexIndexBuffer.numItems, _this.gl.UNSIGNED_SHORT, 0);	  
	});	
};

Attachmenstein.Main.prototype._degToRad = function(degrees) {
    return degrees * Math.PI / 180;
};