function Mover(target) {
  this.target = target;
  this.dx = 0;
  this.dy = 0;
}

Mover.prototype.setdx = function(newdx) {
  this.dx = newdx;
}

Mover.prototype.setdy = function(newdy) {
  this.dy = newdy;
}

Mover.prototype.getdx = function() {
  return this.dx;
}

Mover.prototype.getdy = function() {
  return this.dy;
}

Mover.prototype.update = function(delta) {
  this.target.x += this.dx * delta;
  this.target.y += this.dy * delta;
}