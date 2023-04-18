import { Engine, Timer } from "./engine.js";

const CALEB_WIDTH = 100;
const CALEB_HEIGHT = 100;
const DOES_CALEB_STRAFE = false;
const CALEB_MIN_SPEED = 10;
const CALEB_MAX_SPEED = 100;
const CALEB_START_SCALE = 0;
const CALEB_SWITCH_SCALE = 1;
const CALEB_END_SCALE = 0;
const CALEB_IMG_PATH = "https://kevinmccall.github.io/caleb.webp";
const CALEB_GROWTH_RATE = 0.003;
const CALEB_THONK_IMG_PATH = "https://kevinmccall.github.io/5head.webp";
const CALEB_START_INTERVAL = 3;
const CALEB_RATE_INCREASE = 0.90;
const CALEB_MISSED_TO_LOSE = 3;

const canvas = document.getElementById("screen");

const engine = new Engine();
const spawnTimer = new Timer(CALEB_START_INTERVAL);
const increaseDifficultyTimer = new Timer(CALEB_START_INTERVAL);

const init = () => { }

const randRange = (a, b) => {
  a = Math.floor(a);
  b = Math.ceil(b);
  return Math.floor(Math.random() * (b - a)) + a;
};

function CalebObj(x, y, width, height, scaleX = 0, scaleY = 0, dx = 0, dy = 0) {
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
    kill_caleb(this.calebID);
  }
};

CalebObj.prototype.lateUpdate = function(delta) { };

CalebObj.prototype.draw = function(ctx) {
  const posX = this.x - this.width * this.scaleX / 2;
  const posY = this.y - this.height * this.scaleY / 2;
  ctx.drawImage(this.image, posX, posY, this.scaleX * this.width, this.scaleY * this.height);
};



const spawnCaleb = (x, y, width = CALEB_WIDTH, height = CALEB_HEIGHT) => {
  if (x === undefined) {
    x = randRange(CALEB_WIDTH / 2, engine.canvas.width - CALEB_WIDTH / 2);
  }
  if (y === undefined) {
    y = randRange(CALEB_HEIGHT / 2, engine.canvas.height - CALEB_HEIGHT / 2);
  }
  const caleb = new CalebObj(x, y, width, height, 0, 0);
  const id = engine.registerEntity(caleb);
  caleb.calebID = id;
};

const kill_caleb = (id) => {
  engine.queueUnregisterEntity(id);
};

const start = () => {
  spawnTimer.func = () => {
    const randX = randRange(CALEB_WIDTH / 2, engine.canvas.width - CALEB_WIDTH / 2)
    const randY = randRange(CALEB_HEIGHT / 2, engine.canvas.height - CALEB_HEIGHT / 2)
    console.log(engine.canvas.height - CALEB_HEIGHT / 2)
    spawnCaleb(randX, randY)
  }
  increaseDifficultyTimer.func = () => {
    spawnTimer.interval *= CALEB_RATE_INCREASE
  }
  engine.registerEntity(spawnTimer)
  spawnCaleb(100, 100);
  engine.update();
}
init()
start()