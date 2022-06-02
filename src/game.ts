import { movePlayerTo } from '@decentraland/RestrictedActions'
import { TriggeredPlatform } from './triggeredPlatform'
import * as utils from '@dcl/ecs-scene-utils'

const camera = Camera.instance

class SomeSystem implements ISystem {
  entity: Entity
  constructor(entity: Entity) {
    this.entity = entity
  }

  update() {
    const transform = this.entity.getComponent(Transform)
    transform.rotation = camera.rotation
  }
}

const astar = new Entity();
astar.addComponent(new GLTFShape("models/walls.glb"))
astar.addComponent(new Transform({ position: new Vector3(0, 0, 96), rotation: Quaternion.Euler(0, 90, 0) }))
engine.addEntity(astar);

const monkey = new Entity();
monkey.addComponent(new GLTFShape("models/monkey.glb"))
monkey.addComponent(new Transform({ position: new Vector3(200, 0, 40), rotation: Quaternion.Euler(0, 180, 0) }))
monkey.addComponent(
  new OnPointerDown(() => {
    // openExternalURL("https://polkadot.network/")
  }, {
    hoverText: "Buy this NFT!",
    distance: 300
  })
  // new OnPointerDown(
  //   (_e) => {
  //     movePlayerTo({ x: 150, y: 100, z: -40 }, { x: 55, y: 88, z: 40 })
  //   },
  //   { hoverText: "To the moon!",
  //   distance: 150,  
  // })
)
engine.addEntity(monkey);

const logo = new Entity();
logo.addComponent(new GLTFShape("models/logo2.glb"))
logo.addComponent(new Transform({ position: new Vector3(128, 38, 8), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo);

const logo2 = new Entity();
logo2.addComponent(new GLTFShape("models/logo2.glb"))
logo2.addComponent(new Transform({ position: new Vector3(134, 39, 16), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo2);

const logo3 = new Entity();
logo3.addComponent(new GLTFShape("models/logo2.glb"))
logo3.addComponent(new Transform({ position: new Vector3(140, 40, 13), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo3);

const logo4 = new Entity();
logo4.addComponent(new GLTFShape("models/logo2.glb"))
logo4.addComponent(new Transform({ position: new Vector3(148, 41, 16), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo4);

const items = new Entity();
items.addComponent(new GLTFShape("models/word.glb"))
items.addComponent(new Transform({ position: new Vector3(3, 0, 1), rotation: Quaternion.Euler(0, 180, 0) }))
items.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://polkadot.network/")
  }, {
    hoverText: "Learn more about polkadot!",
    distance: 300
  })
  // new OnPointerDown(
  //   (_e) => {
  //     movePlayerTo({ x: 150, y: 100, z: -40 }, { x: 55, y: 88, z: 40 })
  //   },
  //   { hoverText: "To the moon!",
  //   distance: 150,  
  // })
)

engine.addEntity(items);

const items2 = new Entity();
items2.addComponent(new GLTFShape("models/word2.glb"))
items2.addComponent(new Transform({ position: new Vector3(3, 0, 1), rotation: Quaternion.Euler(0, 180, 0) }))
items2.addComponent(
  // new OnPointerDown(() => {
  //   openExternalURL("https://astar.network/")
  // }, {
  //   hoverText: "Learn more about the Astar Network!",
  //   distance: 100
  // })
  new OnPointerDown(
    (_e) => {
      movePlayerTo({ x: 130, y: 100, z: 34 }, { x: 55, y: 88, z: 40 })
    },
    { hoverText: "To the moon!",
    distance: 150,  
  })
)

engine.addEntity(items2);

// const items2 = new Entity();
// items2.addComponent(new GLTFShape("models/monkey.glb"))
// items2.addComponent(new Transform({ position: new Vector3(200, 1, 48), rotation: Quaternion.Euler(0, 90, 0) }))
// items2.addComponent(
//   new OnPointerDown(() => {
//     openExternalURL("https://tofunft.com/collection/astardegens/items")
//   }, {
//     hoverText: "Check out our NFT collection!",
//     distance: 100
//   })
// )
// engine.addEntity(items2);

// engine.addSystem(new SomeSystem(items2))

// const socialDiscord = new Entity();
// socialDiscord.addComponent(new GLTFShape("models/discord.glb"))
// socialDiscord.addComponent(new Transform({ position: new Vector3(128, 12, 78), scale: new Vector3(10, 10, 1), rotation: Quaternion.Euler(0, 0, 0) }));
// socialDiscord.addComponent(
//   new OnPointerDown(() => {
//     openExternalURL('https://discord.gg/fDjRg4XKRF')
//   }, {
//     hoverText: 'Check out the degens discord community',
//     distance: 100
//   })
// )
// engine.addEntity(socialDiscord);


const canvas = new UICanvas()
const imageTexture = new Texture('images/UI_Guestbook.png')


const a1 = new Entity();
engine.addEntity(a1);

a1.addComponent(new Transform({ position: new Vector3(120, 8, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a1.addComponent(new GLTFShape("models/moonbeam.glb"));
a1.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://moonbeam.network")
  },
    { hoverText: "Moonbeam Network!",
    distance: 200, }
)
)


let a2 = new Entity();
engine.addEntity(a2);

a2.addComponent(new Transform({ position: new Vector3(104, 8, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a2.addComponent(new GLTFShape("models/astar2.glb"));
a2.addComponent(
  new OnPointerDown(() => {
    const inventoryContainer = new UIContainerStack(canvas)
    inventoryContainer.adaptWidth = true
    inventoryContainer.adaptHeight = true
    inventoryContainer.width = 200
    inventoryContainer.height = 75
    inventoryContainer.positionY = 100
    inventoryContainer.positionX = 0
    inventoryContainer.color = Color4.Yellow()
    inventoryContainer.hAlign = "left"
    inventoryContainer.vAlign = "bottom"
    inventoryContainer.stackOrientation = UIStackOrientation.VERTICAL
    inventoryContainer.opacity = 0.1

    const sname = new UIText(canvas)
sname.value = "0.1 ASTR"
sname.width = 76
sname.height = 76
sname.hAlign = "left"
sname.vAlign = "bottom"
sname.positionY = 110
sname.positionX = 20
sname.fontSize = 25
sname.color = Color4.Black()

const NextButton0 = new UIImage(canvas, imageTexture)
NextButton0.width = 76
NextButton0.height = 76
NextButton0.hAlign = "left"
NextButton0.vAlign = "bottom"
NextButton0.positionY = 100
NextButton0.positionX = 10
NextButton0.sourceWidth = 75
NextButton0.sourceHeight = 75
NextButton0.visible = false

    // openExternalURL("https://astar.network/")
    class SimpleRotate3 implements ISystem {
      update() {
        let transform = (a2.getComponent(Transform))
        transform.rotate(Vector3.Backward(), 1)
      }
    }
    
    engine.addSystem(new SimpleRotate3())

    
  },
    { hoverText: "Astar Network!",
    
    distance: 200, }
)
)

const entity = new Entity();




const a3 = new Entity();
engine.addEntity(a3);
a3.addComponent(new GLTFShape("models/polka.glb"));
a3.addComponent(new Transform({ position: new Vector3(156, 48, 16), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));

a3.addComponent(
  new OnPointerDown(() => {

    // a4.addComponent(new GLTFShape("models/astar2.glb"));
    // a3.addComponent(new GLTFShape("models/acala.glb"));
    // a6.addComponent(new GLTFShape("models/moonbeam.glb"));
    
    
    // Polkaexplainer.visible = false
    // Submitbutton.visible = false
    // textInput.visible = false
    // Polkago.visible = false
    // Polkaclose.visible = false
  },
    { hoverText: "More coming soon!",
    distance: 200, }
)
)

export class SimpleRotate implements ISystem {
  update() {
    let transform = a3.getComponent(Transform)
    transform.rotate(Vector3.Down(), 0.3)
  }
}

engine.addSystem(new SimpleRotate())

const myEntity = new Entity()
myEntity.addComponent(new Transform())
myEntity.addComponent(new BoxShape())

engine.addEntity(myEntity)

const a4 = new Entity();
engine.addEntity(a4);

a4.addComponent(new Transform({ position: new Vector3(136, 8, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a4.addComponent(new GLTFShape("models/acala.glb"));
a4.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://acala.network/")
  },
    { hoverText: "Acala Network!",
    distance: 200, }
)
)

const a5 = new Entity();
engine.addEntity(a5);

a5.addComponent(new Transform({ position: new Vector3(152, 8, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a5.addComponent(new GLTFShape("models/para.glb"));
a5.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://parallel.fi/")
  },
    { hoverText: "Parallel!",
    distance: 200, }
)
)

const a6 = new Entity();
engine.addEntity(a6);

a6.addComponent(new Transform({ position: new Vector3(120, 24, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a6.addComponent(new GLTFShape("models/efin.glb"));
a6.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://enjin.io/products/efinity")
  },
    { hoverText: "Efinity!",
    distance: 200, }
)
)

const a7 = new Entity();
engine.addEntity(a7);

a7.addComponent(new Transform({ position: new Vector3(152, 24, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a7.addComponent(new GLTFShape("models/manta.glb"));
a7.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.manta.network/")
  },
    { hoverText: "Manta Network!",
    distance: 200, }
)
)

const a8 = new Entity();
engine.addEntity(a8);

a8.addComponent(new Transform({ position: new Vector3(136, 24, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a8.addComponent(new GLTFShape("models/lit.glb"));
a8.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.litentry.com/")
  },
    { hoverText: "Litentry!",
    distance: 200, }
)
)

const a9 = new Entity();
engine.addEntity(a9);

a9.addComponent(new Transform({ position: new Vector3(104, 24, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a9.addComponent(new GLTFShape("models/sub.glb"));
a9.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.subdao.network/")
  },
    { hoverText: "SubDAO!",
    distance: 200, }
)
)

const a10 = new Entity();
engine.addEntity(a10);

a10.addComponent(new Transform({ position: new Vector3(104, 40, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a10.addComponent(new GLTFShape("models/subg.glb"));
a10.addComponent(
  new OnPointerDown(() => {
    openExternalURL("http://subgame.org/")
  },
    { hoverText: "SubGame!",
    distance: 200, }
)
)

const a11 = new Entity();
engine.addEntity(a11);

a11.addComponent(new Transform({ position: new Vector3(120, 40, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a11.addComponent(new GLTFShape("models/ares.glb"));
a11.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.aresprotocol.io/")
  },
    { hoverText: "Ares!",
    distance: 200, }
)
)

const a12 = new Entity();
engine.addEntity(a12);

a12.addComponent(new Transform({ position: new Vector3(136, 40, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a12.addComponent(new GLTFShape("models/centri.glb"));
a12.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://centrifuge.io/")
  },
    { hoverText: "Centrifuge!",
    distance: 200, }
)
)

const a13 = new Entity();
engine.addEntity(a13);

a13.addComponent(new Transform({ position: new Vector3(152, 40, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a13.addComponent(new GLTFShape("models/polka.glb"));
a13.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://centrifuge.io/")
  },
    { hoverText: "Centrifuge!",
    distance: 200, }
)
)


























const myVideoClip = new VideoClip("polka360.mp4")

const myVideoTexture = new VideoTexture(myVideoClip)
myVideoTexture.playing = false
// #3
const myMaterial = new BasicMaterial()
myMaterial.texture = myVideoTexture

// #4
const screen = new Entity()
screen.addComponent(new PlaneShape())
screen.addComponent(
  new Transform({
    position: new Vector3(128, 24, -120), scale: new Vector3(60, 40, 22), rotation: Quaternion.Euler(0, 0, 0) ,
  })
)
screen.addComponent(myMaterial)
screen.addComponent(
  new OnPointerDown(
    (_e) => {
      myVideoTexture.playing = !myVideoTexture.playing
    },
    { hoverText: "Click to play/pause. 'U' to close the UI.",
    distance: 120,  }
  )
)
engine.addEntity(screen)

const tv = new Entity();
tv.addComponent(new BoxShape())
tv.addComponent(
  new Transform({
    position: new Vector3(128, 2, -120), scale: new Vector3(2, 4, 60), rotation: Quaternion.Euler(0, 270, 0) ,
  })
)
const myMaterial3 = new Material()
myMaterial3.albedoColor = Color3.Red()
tv.addComponent(myMaterial3)
tv.addComponent(
  new OnPointerDown(
    (_e) => {
      screen.removeComponent(Transform)
      screen.setParent(Attachable.AVATAR)
      closetv.getComponent(PlaneShape).visible = true
      screen.addComponent(
        new Transform({
          position: new Vector3(0, 0.875, 0.2),
          scale: new Vector3(0.3, 0.18, 0.3),
          rotation: Quaternion.Euler(0, 180, 0)

        })
      )

    },
    { hoverText: "Pick up screen! Hit 'V' to view in 1st person.",
    distance: 120,  }
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
      screen.addComponent(
        new Transform({
          position: new Vector3(128, 20, -120), scale: new Vector3(48, 32, 22), rotation: Quaternion.Euler(0, 0, 0)
        })
      )
    },
    { hoverText: "Drop screen!",
    distance: 2,  }
  )
)

closetv.getComponent(PlaneShape).visible = false

engine.addEntity(closetv)
closetv.setParent(Attachable.AVATAR)

// const avocado4 = new Entity();
// engine.addEntity(avocado4);

// avocado4.addComponent(new GLTFShape("models/beam2.glb"));
// avocado4.addComponent(new Transform({ position: new Vector3(128, 1, 0), scale: new Vector3(1,0.35, 1),}));

// avocado4.addComponent(
//   new OnPointerDown(
//     (_e) => {
//       RestrictedActions.movePlayerTo({ x: 45, y: 48, z: 73 }, { x: 45, y: 38, z: 44 })
//     },
//     { hoverText: "Go upstairs!",
//     distance: 200,  }
//   )
// )

let platformTriggerBox = new utils.TriggerBoxShape(
  new Vector3(3, 3, 3),
  new Vector3(0, 1.7, 0)
) // Modified to match platform size
const triggeredMovingPlatform = new TriggeredPlatform(
  new GLTFShape('models/platform.glb'),
  new Transform({ position: new Vector3(128, 0.1, 0), scale: new Vector3(1, 0.1, 1)}),
  platformTriggerBox
)