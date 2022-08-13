// const config = require("../config.json");
// import config from '../'
// import config = require('')

export class Standard extends Entity {
  polka = new Entity()
  polka2 = new Entity()  
  polka3 = new Entity()
  polka4 = new Entity()

  constructor(transform: Transform) {
    super()
    engine.addEntity(this)
    this.addComponent(transform)
    this.initWall()
  }


  initWall() {

    this.polka.addComponent(new GLTFShape("models/man2.gltf"))
    this.polka.addComponent(new Transform({ position: new Vector3(180, 0, -29,), scale: new Vector3(0.02, 0.02, 0.02), rotation: Quaternion.Euler(0, 0, 0) }))
    this.polka.setParent(this)
    this.polka.addComponent(
      new OnPointerDown(() => {
        openExternalURL("https://standard.tech/claim")
      },
        { hoverText: "Buy my merch!",
        distance: 500, }
    )
    )

    this.polka2.addComponent(new GLTFShape("models/man3.gltf"))
    this.polka2.addComponent(new Transform({ position: new Vector3(180, 0, -19,), scale: new Vector3(0.02, 0.02, 0.02), rotation: Quaternion.Euler(0, 180, 0) }))
    this.polka2.setParent(this)
    this.polka2.addComponent(
      new OnPointerDown(() => {
        openExternalURL("https://standard.tech/claim")
      },
        { hoverText: "Buy my merch!",
        distance: 500, }
    )
    )

    this.polka3.addComponent(new GLTFShape("models/man5.gltf"))
    this.polka3.addComponent(new Transform({ position: new Vector3(170, 0, -29,), scale: new Vector3(0.02, 0.02, 0.02), rotation: Quaternion.Euler(0, 0, 0) }))
    this.polka3.setParent(this)
    this.polka3.addComponent(
      new OnPointerDown(() => {
        openExternalURL("https://standard.tech/claim")
      },
        { hoverText: "Buy my merch!",
        distance: 500, }
    )
    )

    this.polka4.addComponent(new GLTFShape("models/man4.gltf"))
    this.polka4.addComponent(new Transform({ position: new Vector3(170, 0, -19,), scale: new Vector3(0.02, 0.02, 0.02), rotation: Quaternion.Euler(0, 180, 0) }))
    this.polka4.setParent(this)
    this.polka4.addComponent(
      new OnPointerDown(() => {
        openExternalURL("https://standard.tech/claim")
      },
        { hoverText: "Buy my merch!",
        distance: 500, }
    )
    )
  }


}