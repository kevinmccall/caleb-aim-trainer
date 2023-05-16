import { Engine, Timer } from "./engine.js";
import { spawnCaleb, CALEB_WIDTH, CALEB_HEIGHT, spawnStarterCaleb } from "./caleb.js";
import { randRange } from "./utils.js";
import { getScore, increaseScore, removeLife } from "./scorecounter.js";



const engine = new Engine();
const spawnTimer = new Timer(CALEB_SPAWN_INTERVAL);
const increaseDifficultyTimer = new Timer(CHANGE_RATE_INTERVAL);
const startCalebSpawnTimer = new Timer(START_CALEB_SPAWN_INTERVAL);
const scoreElement = document.getElementById('score');

const init = () => {
  scoreElement.style.left = '50%'
  scoreElement.style.translate = 'translate(-50%)'
}

const calebOnClick = () => {
  increaseScore();
  scoreElement.innerText = getScore();
};

const calebOnDeath = () => {
  removeLife();
}

const starterCalebOnClick = () => {
  increaseScore();
  scoreElement.innerText = getScore();
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
    spawnTimer.interval *= CALEB_RATE_INCREASE;
    increaseDifficultyTimer.interval *= RATE_CHANGE_INCREASE;
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