import { isPointInRect } from "./utils.js";




export function CalebObj(engine) {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.growing = true;
  this.image = new Image(CALEB_WIDTH, CALEB_HEIGHT);
  this.image.src = CALEB_IMG_PATH;
  this.totalWidth = CALEB_WIDTH;
  this.totalHeight = CALEB_HEIGHT;
  this.calebID = null;
  this.engine = engine;
  this.onclick = null;
  this.ondeath = null;
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

