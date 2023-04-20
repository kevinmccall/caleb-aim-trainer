import { getLivesLeft } from "./scorecounter.js";

export class Engine {
  constructor() {
    this.canvas = document.getElementById("screen");
    this.ctx = this.canvas.getContext("2d");
    this.updatedObjects = new Map();
    this.old = new Date().getTime();
    this.canvas.width = window.innerWidth - 10;
    this.canvas.height = window.innerHeight - 10;
    this.toDelete = [];
    this.currentElementID = 0;
    this.mouseX = null;
    this.mouseY = null;
    this.isMouseClicked = false;
    this.playing = true;
    this.canvas.onmousemove = (event) => {
      this.mouseX = event.x;
      this.mouseY = event.y
    };
    this.canvas.onmousedown = () => {
      this.isMouseClicked = true;
    }
    this.canvas.onmouseup = () => {
      this.isMouseClicked = false;
    }
  }
  registerEntity(entity) {
    this.updatedObjects.set(this.currentElementID, entity);
    this.currentElementID += 1;
    return this.currentElementID - 1;
  }
  queueUnregisterEntity(id) {
    this.toDelete.push(id);
  }
  update() {
    let current = new Date().getTime();
    let delta = (current - this.old) / 1000;
    this.old = current;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updatedObjects.forEach((obj) => {
      if (typeof (obj.update) === 'function') {
        obj.update(delta);
      }
      if (typeof (obj.draw) === 'function') {
        obj.draw(this.ctx);
      }
    });
    this.updatedObjects.forEach((obj) => {
      if (typeof (obj.draw) === 'function') {
        obj.lateUpdate(delta);
      }
    });
    this.toDelete.forEach((id) => {
      delete this.updatedObjects.get(id);
      this.updatedObjects.delete(id);
    });
    this.toDelete = [];
    if (getLivesLeft() <= 0) {
      this.playing = false;
    }
    if (this.playing) {
      requestAnimationFrame(this.update.bind(this));
    }
  }
}

export function Timer(interval, startTime) {
  this.paused = true;
  if (startTime === undefined) {
    this.timeUntilNext = interval;
  } else {
    this.timeUntilNext = startTime;
  }
  this.interval = interval;
  this.func = null;
}

Timer.prototype.update = function(delta) {
  if (this.paused) {
    return;
  }
  this.timeUntilNext -= delta;
  if (this.timeUntilNext < 0) {
    this.timeUntilNext = this.interval;
    if (this.func !== null) {
      this.func();
    }
  }
};

Timer.prototype.start = function() {
  this.paused = false;
};