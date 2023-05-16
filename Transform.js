export function Transform(x = 0, y = 0) {
  this.x = x;
  this.y = y;
  this.scaleX = 0;
  this.scaleY = 0;
  this.width = 0;
  this.height = 0;
}

Transform.prototype.setWidth = function(newWidth) {
  this.width = newWidth;
}

Transform.prototype.setHeight = function(newHeight) {
  this.height = newHeight;
}

Transform.prototype.getWidth = function() {
  return this.width;
}

Transform.prototype.getHeight = function() {
  return this.height;
}

Transform.prototype.setScaleX = function(newScaleX) {
  this.scaleX = newScaleX;
}

Transform.prototype.setScaleY = function(newScaleY) {
  this.scaleY = newScaleY;
}

Transform.prototype.getScaleX = function() {
  return this.scaleX;
}

Transform.prototype.getScaleY = function() {
  return this.scaleY;
}

Transform.prototype.initialize = function(width, height, scaleX, scaleY) {
  this.setWidth(width);
  this.setHeight(height)
  this.setscaleX(scaleX)
  this.setScaleY(scaleY);
}

Transform.prototype.getXMidpoint = function() {
  return this.x - this.scaleX * this.width / 2;
}

Transform.getYMidpoint = function() {
  return this.y - this.scaleY * this.height / 2;
}