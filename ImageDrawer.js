export function ImageDrawer(transform) {
  this.transform = transform;
}

ImageDrawer.prototype.setImage = function(newImg) {
  this.img = newImg;
}

ImageDrawer.prototype.setImageURL = function(newImgURL, width, height) {
  this.img = new Image(width, height);
  this.img.src = newImgURL;
}

ImageDrawer.prototype.draw = function(ctx) {
  ctx.drawImage(this.image, this.transform.x, this.transform.y, this.transform.scaleX, this.transform.scaleY);
}