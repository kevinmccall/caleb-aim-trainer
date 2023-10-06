import { Engine } from "./engine.js";
import { config } from "./config.js";
import { randInt } from "./utils.js";

const engine = new Engine();
setInterval(() => {
    const x = randInt(config.calebWidth / 2, engine.canvas.width - config.calebWidth / 2);
    const y = randInt(config.calebHeight / 2, engine.canvas.height - config.calebHeight / 2);
    engine.createCaleb(x, y);
}, config.calebGrowthRate * 1000)
engine.update()