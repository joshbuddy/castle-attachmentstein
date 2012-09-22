Attachmenstein.Player = function(options) {
  this.position = options && options.position || [ 0, 0, 0 ];
  this.angle = Math.PI;
  this._angleStep = Math.PI/15.0;
  this._stepSize = options && options.stepSize || 1.0;
  this.updateDirection();
};

Attachmenstein.Player.prototype.walk = function(distance) {
  if (!distance) distance = 1.0;
 // var newPosition = 
  console.log(this.position);
  console.log(this._direction);
  this.position[0] += this._direction[0] * this._stepSize * distance;
  this.position[1] -= this._direction[1] * this._stepSize * distance;
  this.position[2] += this._direction[2] * this._stepSize * distance;
}

// Attachmenstein.Player.prototype.positionAllowed = function(x, y) {
//   var testX = parseInt( ((x * -1) ) + 0.5),
//     testY = parseInt( ((y * -1) ) + 0.5);

//   if (testY < 0) testY = 0;
//   if (testX < 0) testX = 0;
//   testX = Math.min(this.map.length - 1, testX)
//   testY = Math.min(this.map[0].length - 1, testY)

//   if (!this.map[testX][testY]) return true;
//   return true;
// };


Attachmenstein.Player.prototype.turn = function(turnFactor) {
  if (!turnFactor) turnFactor = 1.0;
  this.angle += turnFactor * this._angleStep;
  this.updateDirection();
}

Attachmenstein.Player.prototype.updateDirection = function() {
  this._direction = [ Math.cos(this.angle), Math.sin(this.angle), 0 ];
}
