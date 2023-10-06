const CALEB_WIDTH = 100;
const CALEB_HEIGHT = 100;
const CALEB_IMG_PATH = "https://kevinmccall.github.io/caleb.webp";
const CALEB_THONK_IMG_PATH = "https://kevinmccall.github.io/5head.webp";
const CALEB_SWITCH_VALUE = 1;
const CALEB_END_VALUE = 0;
const CALEB_GROWTH_RATE = .5;
const CALEB_MIN_SPEED = 10;
const CALEB_MAX_SPEED = 100;
const CALEB_START_SCALE = 0;
const CALEB_SPAWN_INTERVAL = 1;
const CALEB_RATE_INCREASE = 0.9;
const RATE_CHANGE_INCREASE = 1.05;
const CHANGE_RATE_INTERVAL = 3;
const START_CALEB_SPAWN_INTERVAL = 5;
const CALEB_MISSED_TO_LOSE = 3;



export const config = {
  calebWidth: CALEB_WIDTH,
  calebHeight: CALEB_HEIGHT,
  calebImagePath: CALEB_IMG_PATH,
  calebThonkImagePath: CALEB_THONK_IMG_PATH,
  calebSwitchValue: CALEB_SWITCH_VALUE,
  calebEndValue: CALEB_END_VALUE,
  calebGrowthRate: CALEB_GROWTH_RATE,
  calebMinSpeed: CALEB_MIN_SPEED,
  calebMaxSpeed: CALEB_MAX_SPEED,
  calebStartScale: CALEB_START_SCALE,
  calebSpawnInterval: CALEB_SPAWN_INTERVAL,
  calebRateIncrease: CALEB_RATE_INCREASE,
  calebRateIncreaseIncrease: RATE_CHANGE_INCREASE,
  changeRateInterval: CHANGE_RATE_INTERVAL,
  startCalebSpawnInterval: START_CALEB_SPAWN_INTERVAL,
  numLives: CALEB_MISSED_TO_LOSE
};