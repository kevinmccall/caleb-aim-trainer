import { Engine } from "./engine.js";
import { Timer } from "./Timer.js"
import { randRange } from "./utils.js";
import { config } from "./config.js";

const engine = new Engine();
const spawnTimer = new Timer(config.calebSpawnInterval);
const increaseDifficultyTimer = new Timer(config.changeRateInterval);
const startCalebSpawnTimer = new Timer(config.startCalebSpawnInterval);

const starterCalebOnClick = () => {
  startCalebSpawnTimer.paused = true;
  spawnTimer.start();
  increaseDifficultyTimer.start();
}

const start = () => {
  spawnTimer.func = () => {
    const randX = randRange(CALEB_WIDTH / 2, engine.canvas.width - CALEB_WIDTH / 2)
    const randY = randRange(CALEB_HEIGHT / 2, engine.canvas.height - CALEB_HEIGHT / 2)
    spawnCaleb(engine, randX, randY, calebOnClick, calebOnDeath);
  }
  increaseDifficultyTimer.func = () => {
    spawnTimer.interval *= config.RATE_CHANGE_INCREASE;
    increaseDifficultyTimer.interval *= config.RATE_CHANGE_INCREASE;
  }
  startCalebSpawnTimer.func = () => {
    const randX = randRange(CALEB_WIDTH / 2, engine.canvas.width - CALEB_WIDTH / 2)
    const randY = randRange(CALEB_HEIGHT / 2, engine.canvas.height - CALEB_HEIGHT / 2)
    spawnStarterCaleb(engine, randX, randY, starterCalebOnClick);
  }
  engine.registerEntity(spawnTimer);
  engine.registerEntity(increaseDifficultyTimer);
  engine.registerEntity(startCalebSpawnTimer);
  startCalebSpawnTimer.func();
  startCalebSpawnTimer.start();
  engine.update();
}
init()
start()