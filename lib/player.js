Attachmenstein.Player = function(options) {
  this.map = options.map;
  this.position = options && options.position || [ 0, 0, 0 ];
  this.angle = Math.PI;
  this._angleStep = Math.PI/15.0;
  this._stepSize = options && options.stepSize || 1.0;
  this.updateDirection();
};

Attachmenstein.Player.prototype.walk = function(distance) {
  if (!distance) distance = 1.0;
  this.position[0] += this._direction[0] * this._stepSize * distance;
  this.position[1] -= this._direction[1] * this._stepSize * distance;
  this.position[2] = this.map.getZ(this.position[0] * -1, this.position[1] * -1)
}

Attachmenstein.Player.prototype.turn = function(turnFactor) {
  if (!turnFactor) turnFactor = 1.0;
  this.angle += turnFactor * this._angleStep;
  this.updateDirection();
}

Attachmenstein.Player.prototype.fly = function(flyFactor) {
  if (!flyFactor) flyFactor = 1.0;
  this.position[2] += flyFactor * this._stepSize;
}

Attachmenstein.Player.prototype.updateDirection = function() {
  this._direction = [ Math.cos(this.angle), Math.sin(this.angle), 0 ];
}
