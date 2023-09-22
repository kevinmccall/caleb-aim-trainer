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