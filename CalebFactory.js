import { Grower } from "./Grower";
import { ImageDrawer } from "./ImageDrawer";
import { Transform } from "./Transform";
import { EngineObject } from "./UpdatableObject";
import { config } from "./config";

const ondeath = (engine, calebObj) => {
  engine.queueUnregisterEntity(calebObj.calebID);
}

export const spawnCaleb = (engine, x, y) => {
  const transform = new Transform(x, y, config);
  transform.initialize(config.calebWidth, config.calebHeight, config.calebStartScale, config.calebStartScale)
  const drawer = new ImageDrawer(caleb.transform);
  drawer.setImageURL(config.calebImagePath, config.calebWidth, config.calebHeight)
  const caleb = new EngineObject(transform, drawer);
  caleb.grower = new Grower(caleb.transform, config.calebGrowthRate);
  caleb.grower.setOnDoneGrowing(() => { ondeath(engine, caleb) });
  caleb.addComponent(caleb.grower);
  caleb.id = engine.registerEntity(caleb);
  return caleb
};

// export const spawnStarterCaleb = (engine, x, y, onclick, ondeath) => {
//   const caleb = new CalebObj(engine);
//   caleb.image.src = CALEB_THONK_IMG_PATH;
//   caleb.x = x;
//   caleb.y = y;
//   caleb.totalWidth = CALEB_WIDTH;
//   caleb.totalHeight = CALEB_HEIGHT;
//   caleb.scaleX = 0;
//   caleb.scaleY = 0;
//   const id = engine.registerEntity(caleb);
//   caleb.calebID = id;
//   caleb.onclick = onclick;
//   caleb.ondeath = ondeath;
//   return caleb
// };