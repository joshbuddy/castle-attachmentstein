Attachmenstein.Game = function(main, opts) {
	this.main = main;
	this.rotationStep = 15.0;
	this.rotation = 180.0;
	this.x = -15.0;
	this.y = -8.0;
	this.z = 0.0;
	this.xStep = 1.0;
	this.yStep = 1.0;
	this.zStep = 1.0;
	this.addKeyEvents();
	this.createMapObjects();
};

Attachmenstein.Game.prototype.createMapObjects = function() {
	var _this = this,
		textures = [
			'textures/cubicle.jpeg',
			'textures/gmail1.png',
			'textures/cat1.jpeg',
			'textures/rock.jpeg',
			'textures/attachments.png',
			'textures/rock.jpeg',
			'textures/dilbert.jpeg',
			'textures/office.jpeg',
			'textures/blue.gif'
		];
	this.map = [
		[1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1 ,1 ,0 ,0 ,0 ,1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,1, 7, 1, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 1, 0, 1],
		[6, 0, 0, 7, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0 ,1 ,0 ,0 ,0 ,0, 0, 0, 0, 6, 0, 1],
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,0 ,1, 0, 0, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0 ,3 ,0 ,0 ,0 ,1, 0, 0, 1, 0, 0, 1],
		[1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,0 ,1, 0, 0, 1, 0, 0, 1],
		[8, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 8, 0, 0 ,1 ,1 ,1 ,1 ,1, 0, 0, 3, 0, 0, 8],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 1, 0, 0 ,0 ,0 ,0 ,0 ,1, 0, 0, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0 ,0 ,0 ,0 ,0 ,1, 0, 0, 1, 0, 0, 1],
		[7, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0 ,0 ,0 ,0 ,0 ,6, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 3, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0 ,0 ,0 ,0 ,0 ,1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0 ,1 ,7 ,1 ,1 ,1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 7, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1 ,1 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 6, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 1, 2, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1 ,1 ,0 ,0 ,0 ,1, 1, 0, 0, 1, 1, 1],
		[1, 0, 0, 1, 0, 0, 0, 9, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0 ,1 ,0 ,0 ,0 ,6, 1, 0, 0, 1, 1, 8],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0 ,1 ,1 ,1 ,8 ,1, 1, 0, 0, 1, 1, 1],
		[1, 0, 0, 8, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ,0 ,0 ,0 ,0 ,0, 1, 0, 0, 1, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 8, 0 ,0 ,0 ,0 ,0 ,0, 1, 0, 0, 1, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0 ,0 ,0 ,0 ,0 ,0, 1, 0, 0, 1, 0, 1],
		[9, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0 ,0 ,1 ,1 ,1 ,1, 1, 0, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 1, 0, 1],
		[3, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0 ,1 ,1 ,1 ,1 ,3, 1, 1, 7, 1, 0, 1],
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 4, 4, 4, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 3, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 8, 0, 1, 0, 0, 0, 0, 6, 4, 0, 0, 0, 0, 7, 0, 1, 1, 1 ,1 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 1],
		[1, 1, 7, 1, 1, 1, 1, 7, 1, 1, 1, 4, 5, 0, 0, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1],
	];
	for (var y = 0; y < this.map.length; y++) {
		for (var x = 0; x < this.map[0].length; x++) {
			if (!this.map[y][x]) continue;
			var cube = new Attachmenstein.Cube(_this.main.gl, {x: x, y: y, textureSrc: textures[ this.map[y][x] - 1 ]});
			_this.main.addObject(cube);
		}
	}
};

Attachmenstein.Game.prototype.addKeyEvents = function() {
	var _this = this;
	$('body').keydown(function(e) {

		if (e.keyCode === 37) {//left
			_this.rotation += _this.rotationStep;
		}
		
		else if (e.keyCode === 39) {//right.
			_this.rotation -= _this.rotationStep;
		}

		else if (e.keyCode === 38) {//forward.
			if ( _this.positionAllowed(_this.x + _this.xStep * Math.cos(_this.rotation * Math.PI / 180), _this.y + _this.yStep * Math.sin(_this.rotation * Math.PI / 180)) ) {
				_this.x += _this.xStep * Math.cos(_this.rotation * Math.PI / 180);
				_this.y += _this.xStep * Math.sin(_this.rotation * Math.PI / 180);
			}
		}

		else if (e.keyCode === 40) {//Backwards.
			if ( _this.positionAllowed(_this.x - _this.xStep * Math.cos(_this.rotation * Math.PI / 180), _this.y - _this.yStep * Math.sin(_this.rotation * Math.PI / 180)) ) {
				_this.x -= _this.xStep * Math.cos(_this.rotation * Math.PI / 180);
				_this.y -= _this.yStep * Math.sin(_this.rotation * Math.PI / 180);
			}
		}
		
		else if (e.keyCode === 65) {
			_this.y -= _this.yStep;
		}
		else if (e.keyCode === 90) {
			_this.z += _this.zStep;
		}
	})
};

Attachmenstein.Game.prototype.positionAllowed = function(x, z) {
	var testX = parseInt( ((x * -1) ) + 0.5),
		testY = parseInt( ((y * -1) ) + 0.5);

	if (testY < 0) testY = 0;
	if (testX < 0) testX = 0;
	testX = Math.min(this.map.length - 1, testX)
	testY = Math.min(this.map[0].length - 1, testY)

	if (!this.map[testX][testY]) return true;
	return true;
};
