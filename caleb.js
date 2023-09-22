import { isPointInRect } from "./utils.js";

export function CalebObj(img, width, height) {
  this.x = 0;
  this.y = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.growing = true;
  this.image = img;
  this.totalWidth = width;
  this.totalHeight = height;
  this.calebID = null;
}

CalebObj.prototype.update = function(delta) {
  if (isPointInRect(this.engine.mouseX, this.engine.mouseY,
    this.getVisualX(),
    this.getVisualY(),
    this.totalWidth * this.scaleX,
    this.totalHeight * this.scaleY
  ) && this.engine.isMouseClicked) {
    this.engine.isMouseClicked = false;
    this.engine.queueUnregisterEntity(this.calebID);
    if (this.onclick != null && typeof this.onclick === 'function') {
      this.onclick();
    }
  }
};

CalebObj.prototype.onClick = function(delta) {
  if (isPointInRect(this.engine.mouseX, this.engine.mouseY,
    this.getVisualX(),
    this.getVisualY(),
    this.totalWidth * this.scaleX,
    this.totalHeight * this.scaleY
  ) && this.engine.isMouseClicked) {
    this.engine.isMouseClicked = false;
    this.engine.queueUnregisterEntity(this.calebID);
    if (this.onclick != null && typeof this.onclick === 'function') {
      this.onclick();
    }
  }
};

CalebObj.prototype.onDisappear = function(delta) {
  this.engine.queueUnregisterEntity(this.calebID);
  if (this.onclick != null && typeof this.onclick === 'function') {
    this.onclick();
  }
}
