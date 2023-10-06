import { Caleb } from "./caleb.js";
import { config } from "./config.js";
import { Rect } from "./rect.js";
import { randInt } from "./utils.js";

const defaultFont = "sans-serif"

export class Engine {
    constructor() {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById("screen");
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext("2d");
        this.old = null;
        this.updatedObjects = new Map();
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 10;
        this.toDelete = [];
        this.currentElementID = 0;
        this.playing = false;
        this.canvas.addEventListener("mousemove", this.handleMouse.bind(this));
        this.canvas.addEventListener("mousedown", this.handleMouseClick.bind(this));
        this.lives = null;
        this.mouseX = null;
        this.mouseY = null;
        this.nextSpawnTime = null;
        this.spawnDelay = null;
        this.score = 0;
    }
    start() {
        this.playing = true;
        this.old = Date.now()
        this.nextSpawnTime = Date.now();
        this.lives = config.numLives;
        this.spawnDelay = config.calebStartScale;
        this.update();
    }

    registerEntity(entity) {
        this.updatedObjects.set(this.currentElementID++, entity);
        entity.id = this.currentElementID - 1;
        return this.currentElementID - 1;
    }
    queueUnregisterEntity(id) {
        this.toDelete.push(id);
    }
    update() {
        let current = Date.now()
        let delta = (current - this.old) / 1000;
        if (current > this.nextSpawnTime) {
            const x = randInt(config.calebWidth / 2, this.canvas.width - config.calebWidth / 2);
            const y = randInt(config.calebHeight / 2, this.canvas.height - config.calebHeight / 2);
            this.createCaleb(x, y);
            this.nextSpawnTime = current + config.calebSpawnInterval * 1000;
        }

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
        this.ctx.fillStyle = "white";
        this.ctx.font = `40px ${defaultFont}`
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, 50);
        this.ctx.font = `20px ${defaultFont}`;
        this.ctx.textAlign = "right";
        let message = `Lives: ${this.lives}`;
        let fontInfo = this.ctx.measureText(message);
        this.ctx.fillText(message, this.canvas.width - fontInfo.width, 50);
        if (this.toDelete.length > 0) {
            this.toDelete.forEach((id) => {
                delete this.updatedObjects.get(id);
                this.updatedObjects.delete(id);
            });
            this.toDelete = [];
        }
        if (this.lives <= 0) {
            this.playing = false;
            this.endGame();
        }
        if (this.playing) {
            requestAnimationFrame(this.update.bind(this));
        }
    }
    handleMouse(event) {
        this.mouseX = event.x;
        this.mouseY = event.y;
    }

    handleMouseClick(event) {
        for (let [, obj] of this.updatedObjects) {
            if (obj.rect.isPointInRect(event.x, event.y)) {
                obj.onClick();
                return;
            }
        }
    }

    endGame() {
        console.log('game has ended')
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "red";
        this.ctx.font = `60px ${defaultFont}`
        this.ctx.fillText("game over :(", this.canvas.width / 2, this.canvas.height / 2)
    }

    createCaleb(x, y) {
        let width = config.calebWidth;
        let height = config.calebHeight;
        let image = new Image();
        image.src = config.calebImagePath;
        let rect = new Rect(x, y, width, height, 0);
        const caleb = new Caleb(rect, image, this);

        this.registerEntity(caleb);
    }
}

