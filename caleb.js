import { config } from "./config.js";

export class Caleb {
    /**
     * 
     * @param {Rect} rect 
     * @param {Grower} grower 
     */
    constructor(rect, img, engine) {
        this.rect = rect;
        this.img = img;
        this.isGrowing = true;
        this.growthRate = config.calebGrowthRate;
        this.switchValue = config.calebSwitchValue;
        this.endValue = config.calebEndValue;
        this.engine = engine;
        this.id = null;
    }

    onDoneGrowing() {
        this.engine.queueUnregisterEntity(this.id);
        this.engine.lives -= 1;
    }

    update(delta) {
        if (this.isGrowing) {
            this.rect.scale += this.growthRate * delta;
        } else {
            this.rect.scale -= this.growthRate * delta;
            if (this.rect.scale < this.endValue) {
                console.log(this)
                this.onDoneGrowing();
            }
        }
        if (this.rect.scale >= this.switchValue) {
            this.isGrowing = false;
        }
    }

    onClick() {
        this.engine.score++;
        this.engine.queueUnregisterEntity(this.id);
    }



    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.rect.getLeft(), this.rect.getTop(), this.rect.getWidth(), this.rect.getHeight())
    }
}

