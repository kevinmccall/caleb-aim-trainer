import { config } from "./config";

export function Grower(transform, growthRate) {
  this.transform = transform;
  this.growthRate = growthRate;
  this.isGrowing = true;
  this.onDoneGrowing = null;
  this.switchValue = config.calebSwitchValue;
  this.endValue = config.endValue;
}

Grower.prototype.setOnDoneGrowing = function(newOnDoneGrowing) {
  this.onDoneGrowing = newOnDoneGrowing;
}

Grower.prototype.getIsGrowing = function() {
  return this.isGrowing;
}

Grower.prototype.setIsGrowing = function(newIsGrowing) {
  this.isGrowing = newIsGrowing;
}

Grower.prototype.update = function(delta) {
  const currentScaleX = this.transform.getScaleX();
  const currentScaleY = this.transform.getScaleY();
  if (this.isGrowing) {
    this.transform.setScaleX(currentScaleX + this.growthRate * delta);
    this.transform.setScaleY(currentScaleY + this.growthRate * delta);
  } else {
    this.transform.setScaleX(currentScaleX - this.growthRate * delta);
    this.transform.setScaleY(currentScaleY - this.growthRate * delta);
    if (Math.min(currentScaleX, currentScaleY) < this.endValue && typeof this.onDoneGrowing === 'function') {
      this.onDoneGrowing();
    }
  }
  if (Math.min(currentScaleX, currentScaleY) >= this.switchValue) {
    this.growing = false;
  }
}