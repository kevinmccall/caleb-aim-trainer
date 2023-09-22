import { Grower } from "./Grower";
import { ImageDrawer } from "./ImageDrawer";
import { Transform } from "./Transform";
import { EngineObject } from "./EngineObject";
import { config } from "./config";
import { removeLife } from "./scorecounter";


const ondeath = (engine, calebObj) => {
  engine.queueUnregisterEntity(calebObj.calebID);
  removeLife();
}

const onStarterCalebDeath = (engine, calebObj) => {
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

export const spawnStarterCaleb = (engine, x, y) => {
  const transform = new Transform(x, y, config);
  transform.initialize(config.calebWidth, config.calebHeight, config.calebStartScale, config.calebStartScale)
  const drawer = new ImageDrawer(caleb.transform);
  drawer.setImageURL(config.calebThonkImagePath, config.calebWidth, config.calebHeight)
  const caleb = new EngineObject(transform, drawer);
  caleb.grower = new Grower(caleb.transform, config.calebGrowthRate);
  caleb.grower.setOnDoneGrowing(() => { onStarterCalebDeath(engine, caleb) });
  caleb.addComponent(caleb.grower);
  caleb.id = engine.registerEntity(caleb);
  return caleb
};