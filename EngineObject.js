// Abastract class for Engine to update
export function EngineObject(transform, drawer) {
  this.updatedComponents = [];
  this.id = undefined;
  this.transform = transform;
  this.drawer = drawer;
}

EngineObject.prototype.update = function(delta) {
  this.updatedComponents.forEach((component) => {
    if (typeof component.update === 'function') {
      component.update(delta);
    } else {
      throw new Error('Component does not have update function');
    }
  });
}

EngineObject.prototype.addComponent = function(component) {
  this.updatedComponents.push(component);
}

EngineObject.prototype.draw = function(ctx) {
  if (!this.drawer || typeof this.drawer.draw !== 'function') {
    throw new Error('Drawer is invalid');
  }
  this.drawer.draw(ctx, this.transform);
}

EngineObject.prototype.setId = function(id) {
  this.id = id;
}
