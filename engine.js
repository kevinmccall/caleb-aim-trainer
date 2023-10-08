import { Caleb } from "./caleb.js";
import { config } from "./config.js";
import { Rect } from "./rect.js";
import { randInt } from "./utils.js";

const defaultFont = "sans-serif";
/** border of rendering canvas in pixels */
const screenBorder = 10;

export class Engine {
    constructor() {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById("screen");
        this.canvas.width = window.innerWidth - screenBorder;
        this.canvas.height = window.innerHeight - screenBorder;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext("2d");
        this.initGame();
    }
    initGame() {
        this.old = null;
        this.updatedObjects = new Map();
        this.toDelete = [];
        this.currentElementID = 0;
        this.playing = false;
        this.lives = null;
        this.mouseX = null;
        this.mouseY = null;
        this.nextSpawnTime = null;
        this.spawnDelay = null;
        this.difficultyInterval = null;
        this.score = 0;
    }

    startGame() {
        this.playing = true;
        this.old = Date.now();
        this.nextSpawnTime = Date.now();
        this.lives = config.numLives;
        this.spawnDelay = config.calebSpawnInterval;
        this.update();
        this.canvas.addEventListener("mousemove", this.handleMouse.bind(this));
        this.canvas.addEventListener("mousedown", this.handleMouseClick.bind(this));
        this.difficultyInterval = setInterval(() => {
            this.spawnDelay *= config.calebRateIncrease;
        }, config.changeRateInterval * 1000);
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
        let current = Date.now();
        let delta = (current - this.old) / 1000;
        if (current > this.nextSpawnTime) {
            const x = randInt(config.calebWidth / 2, this.canvas.width - config.calebWidth / 2);
            const y = randInt(config.calebHeight / 2, this.canvas.height - config.calebHeight / 2);
            this.createCaleb(x, y);
            this.nextSpawnTime = current + this.spawnDelay * 1000;
        }

        this.old = current;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updatedObjects.forEach((obj) => {
            if (typeof obj.update === "function") {
                obj.update(delta);
            }
            if (typeof obj.draw === "function") {
                obj.draw(this.ctx);
            }
        });
        this.ctx.fillStyle = "white";
        this.ctx.font = `2.5rem ${defaultFont}`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, 0);
        this.ctx.font = `1.5rem ${defaultFont}`;
        this.ctx.textAlign = "right";
        this.ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 10, 5);
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
        console.log("game has ended");
        this.updatedObjects.clear();
        this.toDelete = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "red";
        this.ctx.font = `5rem ${defaultFont}`;
        this.ctx.fillText("game over :(", this.canvas.width / 2, this.canvas.height / 2);
        clearInterval(this.difficultyInterval);
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
