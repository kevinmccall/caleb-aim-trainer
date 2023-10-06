export class Rect {
    constructor(x, y, width, height, scale = 1.0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scale = scale
    }

    getRight() {
        return this.x + this.getWidth() / 2;
    }

    getBottom() {
        return this.y + this.getHeight() / 2;
    }

    getWidth() {
        return this.width * this.scale;
    }

    getHeight() {
        return this.height * this.scale;
    }

    getLeft() {
        return this.x - this.getWidth() / 2;
    }

    getTop() {
        return this.y - this.getHeight() / 2;
    }


    isPointInRect = (px, py) => {
        const right = this.getRight();
        const bottom = this.getBottom();
        return px >= this.getLeft() && px < right && py >= this.getTop() && py < bottom;
    }

    /**
     * AABB collisions
     * 
     * @param {Rect} other 
     */
    AABB(other) {
        return (
            this.getLeft() < other.getRight() &&
            this.getRight() > other.getLeft() &&
            this.getTop() < this.getBottom() &&
            this.getBottom() > other.getTop()
        )
    }
}
