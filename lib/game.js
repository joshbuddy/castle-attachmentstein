Attachmenstein.Game = function(main, opts) {
	this.main = main;
	this.player = new Attachmenstein.Player({
		position: [7.0, 6.0, 0.0]
	});
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
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5]
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
			console.log('rotated left');
			_this.player.turn();
		}
		
		else if (e.keyCode === 39) {//right.
			console.log('rotated right');
			_this.player.turn(-1.0);
		}

		else if (e.keyCode === 38) {
			console.log('walked forwads');
			_this.player.walk(-1.0);
		}

		else if (e.keyCode === 40) {//Backwards.
			console.log('walked backwards');
			_this.player.walk();
		}
	})
};

