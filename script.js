import { Engine, Timer } from "./engine.js";
import { spawnCaleb, CALEB_WIDTH, CALEB_HEIGHT } from "./caleb.js";
import { randRange } from "./utils.js";
import { getScore } from "./scorecounter.js";

let times = 0;

const DOES_CALEB_STRAFE = false;
const CALEB_MIN_SPEED = 10;
const CALEB_MAX_SPEED = 100;
const CALEB_START_SCALE = 0;
const CALEB_SWITCH_SCALE = 1;
const CALEB_END_SCALE = 0;
const CALEB_GROWTH_RATE = 0.003;
const CALEB_THONK_IMG_PATH = "https://kevinmccall.github.io/5head.webp";
const CALEB_SPAWN_INTERVAL = 1;
const CALEB_RATE_INCREASE = 0.96;
const RATE_CHANGE_INCREASE = 1.03;
const CHANGE_RATE_INTERVAL = 3;
const CALEB_MISSED_TO_LOSE = 3;

const canvas = document.getElementById("screen");

const engine = new Engine();
const spawnTimer = new Timer(CALEB_SPAWN_INTERVAL);
const increaseDifficultyTimer = new Timer(CHANGE_RATE_INTERVAL);
const scoreElement = document.getElementById('score');



const init = () => {
  score.style.left = '50%'
  score.style.translate = 'translate(-50%)'
}

const calebOnClick = () => {
  score.innerText = getScore();
};

const start = () => {
  spawnTimer.func = () => {
    const randX = randRange(CALEB_WIDTH / 2, engine.canvas.width - CALEB_WIDTH / 2)
    const randY = randRange(CALEB_HEIGHT / 2, engine.canvas.height - CALEB_HEIGHT / 2)
    spawnCaleb(engine, randX, randY, calebOnClick);
  }
  increaseDifficultyTimer.func = () => {
    spawnTimer.interval *= CALEB_RATE_INCREASE;
    increaseDifficultyTimer.interval *= RATE_CHANGE_INCREASE;
    console.log('increaseDifficultyTimer.interval :>> ', increaseDifficultyTimer.interval);
  }
  engine.registerEntity(spawnTimer)
  engine.registerEntity(increaseDifficultyTimer)
  spawnCaleb(engine, 100, 100, calebOnClick).image.src = CALEB_THONK_IMG_PATH;
  engine.update();
}
init()
start()