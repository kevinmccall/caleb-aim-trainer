import { Caleb } from "./caleb.js";
import { config } from "./config.js";
import { Rect } from "./rect.js";

export class Engine {

    constructor() {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById("screen");
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext("2d");
        this.updatedObjects = new Map();
        this.old = Date.now()
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 10;
        this.toDelete = [];
        this.currentElementID = 0;
        this.playing = true;
        this.lives = 3;
        this.canvas.addEventListener("mousemove", this.handleMouse.bind(this));
        this.canvas.addEventListener("mousedown", this.handleMouseClick.bind(this));
        this.mouseX = null;
        this.mouseY = null;
        this.nextSpawnTime = Date.now()
        this.score = 0;
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
        for (let [id, obj] of this.updatedObjects) {
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
        this.ctx.fillStyle = "white";
        this.ctx.fillText("game over :(", this.canvas.width / 2, this.canvas.height / 2)
    }

    createCaleb(x, y) {
        let width = 100;
        let height = 100;
        let image = new Image();
        image.src = config.calebImagePath;
        let rect = new Rect(x, y, width, height, 0);
        const caleb = new Caleb(rect, image, this);

        this.registerEntity(caleb);
    }
}

