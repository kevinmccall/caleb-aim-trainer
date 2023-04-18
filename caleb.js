import { isPointInRect } from "./utils.js";

export const CALEB_WIDTH = 100;
export const CALEB_HEIGHT = 100;
const CALEB_IMG_PATH = "https://kevinmccall.github.io/caleb.webp";
const CALEB_SWITCH_SCALE = 1;
const CALEB_END_SCALE = 0;
const CALEB_GROWTH_RATE = 0.003;


export function CalebObj(engine, x, y, width, height, scaleX = 0, scaleY = 0, dx = 0, dy = 0) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.scaleX = scaleX;
  this.scaleY = scaleY;
  this.growing = true;
  this.image = new Image(width, height);
  this.image.src = CALEB_IMG_PATH;
  this.imageHeight = this.image.height;
  this.width = width;
  this.height = height;
  this.calebID = null;
  this.engine = engine
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
  }

  const mousePos = { px: this.engine.mouseX, py: this.engine.mouseY }
  const calebPos = { x: this.x - this.width * this.scaleX / 2, y: this.y - this.height * this.scaleY / 2, width: this.width * this.scaleX, height: this.height * this.scaleY }
  console.log(this.engine.isMouseClicked)
  if (isPointInRect(mousePos, calebPos) && this.engine.isMouseClicked) {
    this.engine.queueUnregisterEntity(this.calebID);
  }
};

CalebObj.prototype.lateUpdate = function(delta) { };

CalebObj.prototype.draw = function(ctx) {
  const posX = this.x - this.width * this.scaleX / 2;
  const posY = this.y - this.height * this.scaleY / 2;
  ctx.drawImage(this.image, posX, posY, this.scaleX * this.width, this.scaleY * this.height);
};

export const spawnCaleb = (engine, x, y, width = CALEB_WIDTH, height = CALEB_HEIGHT) => {
  const caleb = new CalebObj(engine, x, y, width, height, 0, 0);
  const id = engine.registerEntity(caleb);
  caleb.calebID = id;
};