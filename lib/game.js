Attachmenstein.Game = function(main, opts) {
	this.main = main;
	this.map = new Map()
	this.map.render(this.main);
	this.player = new Attachmenstein.Player({
		position: [7.0, 6.0, 0.0],
		map: this.map
	});
	this.addKeyEvents();
};

Attachmenstein.Game.prototype.addKeyEvents = function() {
	var _this = this;
	$('body').keydown(function(e) {

		if (e.keyCode === 37) {//left
			_this.player.turn();
		}
		
		else if (e.keyCode === 39) {//right.
			_this.player.turn(-1.0);
		}

		else if (e.keyCode === 38) {//forwards.
			_this.player.walk(-1.0);
		}
		else if (e.keyCode === 40) {//Backwards.
			_this.player.walk();
		}
		else if (e.keyCode == 65) {
			_this.player.fly(-1.0);
		}
		else if (e.keyCode == 90) {
			_this.player.fly();
		}
		console.log(e.keyCode);
	})
};

