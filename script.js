import { Engine } from "./engine.js";
import { config, openConfigMenu, closeConfigMenu } from "./config.js";


const engine = new Engine();
let startButton = document.getElementById("start");
openConfigMenu()

startButton.onclick = () => {
    console.log(config.numLives);
    closeConfigMenu();
    console.log("start")
    engine.start()
    startButton.hidden = true;
}
