export const config = {
  /** The width of the Caleb */
  calebWidth: 100,
  /** The height of the Caleb */
  calebHeight: 100,
  /** The image for the caleb */
  calebImagePath: "https://kevinmccall.github.io/caleb.webp",
  /** The alternate image for the caleb */
  calebThonkImagePath: "https://kevinmccall.github.io/5head.webp",
  /** The scale value which the Caleb goes from growing to shrinking */
  calebSwitchValue: 1,
  /** The rate at which the Caleb grows/shrinks*/
  calebGrowthRate: .5,
  /** The minimum velocity in pixels/second of a Caleb */
  calebMinSpeed: 10,
  /** The maximum velocity in pixels/second of a Caleb */
  calebMaxSpeed: 100,
  /** The scale at which the caleb starts at */
  calebStartScale: 0,
  /** The *starting* interval for the spawn rates of caleb. One Caleb will
   * spawn every calebSpawnInterval seconds. This is not constant,
   * it is modified by calebRateIncrease
  */
  calebSpawnInterval: 5,
  /** Multiplicative change of the spawn rate of Calebs. This is not constant,
   * it is modified by calebRateIncreaseIncrease
  */
  calebRateIncrease: 0.9,
  /** The multiplicative change of the spawn rates of spawn rates of Calebs.
   * This property is analagous to the acceleration of difficulty.
   */
  calebRateIncreaseIncrease: 1.05,
  /** This is how many seconds that it takes for a calebRateIncrease and a
   * calebRateIncreaseIncrease to take effect*/
  changeRateInterval: 3,
  /** Natural number of missed Calebs before the game is over */
  numLives: 3
};
const configMenu = document.getElementById("config")
const optionsContainer = configMenu.getElementsByClassName("property-container")[0];



function initConfigMenu() {
  for (let property in config) {
    let label = document.createElement("label");
    let input = document.createElement("input");
    input.value = config[property];
    label.name = property;
    label.id = property;
    label.innerText = property;
    label.appendChild(input)
    optionsContainer.appendChild(label);
    document.getElementById("config-confirm").onclick = () => {
      console.log("confirm")
      saveConfig()
    }
    document.getElementById("config-cancel").onclick = () => {
      console.log("cancel")
      closeConfigMenu();
    }
  }
}

export function openConfigMenu() {
  for (let element of optionsContainer.children) {
    element.children[0].value = config[element.innerText];
  }
  configMenu.hidden = false;
}

function saveConfig() {
  for (let element of optionsContainer.children) {
    config[element.innerText] = element.children[0].value;
  }
}

export function closeConfigMenu() {
  configMenu.hidden = true;
}

initConfigMenu()