export class Astar extends Entity {
  polka = new Entity()

  constructor(transform: Transform) {
    super()
    engine.addEntity(this)
    this.addComponent(transform)
    this.initScene()
  }

  initScene() {
  }
}
