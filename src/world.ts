// import utils from '../node_modules/decentraland-ecs-utils/index'
// import * as RestrictedActions from '@decentraland/RestrictedActions'
// import { movePlayerTo } from '@decentraland/RestrictedActions'

// const config = require("../config.json");
// import config from '../'
// import config = require('')

export class World extends Entity {
  wall = new Entity()

  socialGithub = new Entity()
  socialDiscord = new Entity()
  socialTelegram = new Entity()

  polka = new Entity()

  uiCanvas = new UICanvas()
  uiElements: UIShape[] = []

  constructor(transform: Transform, devMode: boolean = true) {
    super()
    engine.addEntity(this)
    this.addComponent(transform)
    this.initUI()
    this.initWall()
    if (!devMode) this.initSocial()
    if (!devMode) this.initVideo()
    if (!devMode) this.initExternal()

  }

  initUI() {
    this.uiElements.push(this.uiCanvas)
    this.setUiVisibility(false)
  }

  setUiVisibility (visible: boolean) {
    for(let i = 0; i < this.uiElements.length; i++) {
      this.uiElements[i].visible = visible
    }
  }

  initWall() { 
    const scene = new Entity();
    engine.addEntity(scene);
    scene.addComponent(new GLTFShape("models/scene.glb"));
    scene.addComponent(new Transform({ position: new Vector3(0, 0, 96), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0, 270, 0) }));
 
    const talisman = new Entity();
    talisman.addComponent(new GLTFShape("models/talisman2.glb"))
    talisman.addComponent(new Transform({ position: new Vector3(128, 1, 78), rotation: Quaternion.Euler(0, 0, 0), scale: new Vector3(1, 1, 1), }))
    talisman.addComponent(
      new OnPointerDown(() => {
        openExternalURL("https://talisman.xyz/download");
      }, {
        hoverText: "Download talisman!",
        distance: 600
      })
    )
    engine.addEntity(talisman);
    
    const discord = new Entity();
    discord.addComponent(new GLTFShape("models/discord.glb"))
    discord.addComponent(new Transform({ position: new Vector3(128, 11, 78), rotation: Quaternion.Euler(0, 0, 0), scale: new Vector3(5, 5, 1), }))
    discord.addComponent(
      new OnPointerDown(() => {
        openExternalURL("https://discord.gg/fCkPsSReYZ");
      }, {
        hoverText: "Find Talisman on discord!",
        distance: 600
      })
    )
    engine.addEntity(discord);

    const maze = new Entity();
    maze.addComponent(new GLTFShape("models/maze.glb"));
    maze.addComponent(new Transform({ position: new Vector3(0, 0, 92), rotation: Quaternion.Euler(0, 270, 0), scale: new Vector3(1, 1, 1), })); 
    engine.addEntity(maze);

    const camera = Camera.instance

  class SomeSystem implements ISystem {
    entity: Entity
    constructor(entity: Entity) {
      this.entity = entity
    }
  
    update() {
      let transform = this.entity.getComponent(Transform)
      transform.rotation.eulerAngles = new Vector3(0, Camera.instance.rotation.eulerAngles.y+180, Camera.instance.rotation.eulerAngles.z) 
      
    }
  } 

  class SomeSystem2 implements ISystem {
    entity: Entity
    constructor(entity: Entity) {
      this.entity = entity
    }
  
    update() {
      let transform = this.entity.getComponent(Transform)
      transform.rotation.eulerAngles = new Vector3(0, 180, 0) 
    }
  } 

  let vidurl = "polka360.mp4"
  let myVideoClip = new VideoClip(vidurl)
 
  let myVideoTexture = new VideoTexture(myVideoClip)
  myVideoTexture.playing = false
  // #3 
  const myMaterial = new BasicMaterial()
  myMaterial.texture = myVideoTexture
  // #4
  let screen = new Entity()
  screen.addComponent(new PlaneShape())
  screen.addComponent(
    new Transform({
      position: new Vector3(70, 24, 40), scale: new Vector3(40, 30, 11),
    })
  ) 
 
  screen.addComponent(myMaterial)
  screen.addComponent(
    new OnPointerDown(
      (_e) => {
        myVideoTexture.playing = !myVideoTexture.playing
      
      },
      {
        hoverText: "Click to play/pause. 'U' to close the UI.",
        distance: 600,
      }
    )
  )
  engine.addEntity(screen)
engine.addSystem(new SomeSystem(screen))

  let tv = new Entity();
  tv.addComponent(new CylinderShape())
  tv.addComponent(
    new Transform({
      position: new Vector3(70, 1, 40), scale: new Vector3(5, 1.5, 5), 
      rotation: Quaternion.Euler(0, 90, 0)
    })
  )
  let myMaterial3 = new Material()
  myMaterial3.albedoColor = Color3.Red()
  tv.addComponent(myMaterial3)
  tv.addComponent(
    new OnPointerDown(
      (_e) => {
        screen.removeComponent(Transform)
        screen.setParent(Attachable.AVATAR)
        closetv.getComponent(PlaneShape).visible = true
        engine.removeSystem(new SomeSystem(screen))
        engine.addSystem(new SomeSystem2(screen))
        screen.addComponent(
          new Transform({
            position: new Vector3(0, 0.875, 0.2),
            scale: new Vector3(0.3, 0.18, 0.3),
            rotation: Quaternion.Euler(0, 0, 0)
          })
        )
        
        
      },
      {
        hoverText: "Pick up screen! Hit 'V' to view in 1st person.",
        distance: 600,
      }
    )
  )
  engine.addEntity(tv)

  const closetv = new Entity()

  closetv.addComponent(new PlaneShape())

  closetv.addComponent(
    new Transform({
      position: new Vector3(0, 0.65, 0.2),
      scale: new Vector3(0.2, 0.2, 0.2),
      rotation: Quaternion.Euler(0, 180, 0)
    })
  )

  closetv.addComponent(myMaterial3)
  closetv.addComponent(
    new OnPointerDown(
      (_e) => {
        closetv.getComponent(PlaneShape).visible = false
        screen.removeComponent(Transform)
        screen.setParent(null)
        engine.removeSystem(new SomeSystem2(screen))
        engine.addSystem(new SomeSystem(screen))
        screen.addComponent(
          new Transform({
            position: new Vector3(70, 24, 40), scale: new Vector3(40, 30, 11),
          })
        )
      },
      {
        hoverText: "Drop screen!",
        distance: 2,
      }
    )
  )

  closetv.getComponent(PlaneShape).visible = false

  engine.addEntity(closetv)
  closetv.setParent(Attachable.AVATAR)
  }

  initSocial() {

  }

  initVideo() {
    
  }

  initPolka() {

  }

  initExternal() {
 

  }
}
