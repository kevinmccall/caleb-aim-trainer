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
    requestAnimationFrame(this.update.bind(this));
  }
}

export function Timer(interval, startTime) {
  if (startTime === undefined) {
    this.timeUntilNext = interval;
  } else {
    this.timeUntilNext = startTime;
  }
  this.interval = interval;
  this.func = null;
}

Timer.prototype.update = function(delta) {
  this.timeUntilNext -= delta;
  if (this.timeUntilNext < 0) {
    this.timeUntilNext = this.interval;
    if (this.func !== null) {
      this.func();
    }
  }
};