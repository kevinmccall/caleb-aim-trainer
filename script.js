import { Engine, Timer } from "./engine.js";
import { spawnCaleb, CALEB_WIDTH, CALEB_HEIGHT, spawnStarterCaleb } from "./caleb.js";
import { randRange } from "./utils.js";
import { getScore, increaseScore, removeLife } from "./scorecounter.js";

let times = 0;

const DOES_CALEB_STRAFE = false;
const CALEB_MIN_SPEED = 10;
const CALEB_MAX_SPEED = 100;
const CALEB_START_SCALE = 0;
const CALEB_SWITCH_SCALE = 1;
const CALEB_END_SCALE = 0;
const CALEB_GROWTH_RATE = 0.003;
const CALEB_SPAWN_INTERVAL = 1;
const CALEB_RATE_INCREASE = 0.9;
const RATE_CHANGE_INCREASE = 1.05;
const CHANGE_RATE_INTERVAL = 3;
const START_CALEB_SPAWN_INTERVAL = 5;
const CALEB_MISSED_TO_LOSE = 3;

const canvas = document.getElementById("screen");

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
    spawnStarterCaleb(engine, randX, randY, starterCalebOnClick,);
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