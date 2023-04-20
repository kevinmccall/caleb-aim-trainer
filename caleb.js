import { isPointInRect } from "./utils.js";
import { increaseScore, removeLife } from "./scorecounter.js";

export const CALEB_WIDTH = 100;
export const CALEB_HEIGHT = 100;
const CALEB_IMG_PATH = "https://kevinmccall.github.io/caleb.webp";
const CALEB_SWITCH_SCALE = 1;
const CALEB_END_SCALE = 0;
const CALEB_GROWTH_RATE = 0.003;


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
}

CalebObj.prototype.getVisualX = function() {
  return this.x - this.totalWidth * this.scaleX / 2
}

CalebObj.prototype.getVisualY = function() {
  return this.y - this.totalHeight * this.scaleY / 2
}

CalebObj.prototype.update = function(delta) {
  this.x += this.dx;
  this.y += this.dy;
  if (this.growing) {
    this.scaleX += CALEB_GROWTH_RATE;
    this.scaleY += CALEB_GROWTH_RATE;
  } else {
    this.scaleX -= CALEB_GROWTH_RATE;
    this.scaleY -= CALEB_GROWTH_RATE;
  }
  if (Math.min(this.scaleX, this.scaleY) >= CALEB_SWITCH_SCALE) {
    this.growing = false;
  } else if (Math.max(this.scaleX, this.scaleY) <= CALEB_END_SCALE && !this.growing) {
    this.engine.queueUnregisterEntity(this.calebID);
    removeLife();
  }

  if (isPointInRect(this.engine.mouseX, this.engine.mouseY,
    this.getVisualX(),
    this.getVisualY(),
    this.totalWidth * this.scaleX,
    this.totalHeight * this.scaleY
  ) && this.engine.isMouseClicked) {
    this.engine.isMouseClicked = false;
    this.engine.queueUnregisterEntity(this.calebID);
    increaseScore();
    if (this.onclick !== null && typeof this.onclick === 'function') {
      this.onclick();
    }
  }
};



CalebObj.prototype.lateUpdate = function(delta) { };

CalebObj.prototype.draw = function(ctx) {
  const posX = this.x - this.totalWidth * this.scaleX / 2;
  const posY = this.y - this.totalHeight * this.scaleY / 2;
  ctx.drawImage(this.image, this.getVisualX(), this.getVisualY(), this.scaleX * this.totalWidth, this.scaleY * this.totalHeight);
};

export const spawnCaleb = (engine, x, y, onclick) => {
  const caleb = new CalebObj(engine);
  caleb.x = x;
  caleb.y = y;
  caleb.totalWidth = CALEB_WIDTH;
  caleb.totalHeight = CALEB_HEIGHT;
  caleb.scaleX = 0;
  caleb.scaleY = 0;
  const id = engine.registerEntity(caleb);
  caleb.calebID = id;
  caleb.onclick = onclick
};