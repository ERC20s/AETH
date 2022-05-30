import { movePlayerTo } from '@decentraland/RestrictedActions'

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

const logo = new Entity();
logo.addComponent(new GLTFShape("models/logo2.glb"))
logo.addComponent(new Transform({ position: new Vector3(128, 44, 32), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo);

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






const a1 = new Entity();
engine.addEntity(a1);

a1.addComponent(new Transform({ position: new Vector3(104, 8, -12), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 315, 0) }));
a1.addComponent(new GLTFShape("models/moonbeam.glb"));
a1.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://moonbeam.network")
  },
    { hoverText: "Moonbeam Network!",
    distance: 100, }
)
)

const a2 = new Entity();
engine.addEntity(a2);

a2.addComponent(new Transform({ position: new Vector3(120, 8, -2), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a2.addComponent(new GLTFShape("models/astar2.glb"));
a2.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://astar.network/")
  },
    { hoverText: "Astar Network!",
    distance: 100, }
)
)

const a3 = new Entity();
engine.addEntity(a3);
a3.addComponent(new GLTFShape("models/polka.glb"));
a3.addComponent(new Transform({ position: new Vector3(136, 8, -2), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));

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
    distance: 100, }
)
)

const a4 = new Entity();
engine.addEntity(a4);

a4.addComponent(new Transform({ position: new Vector3(152, 8, -12), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 45, 0) }));
a4.addComponent(new GLTFShape("models/acala.glb"));
a4.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://acala.network/")
  },
    { hoverText: "Acala Network!",
    distance: 100, }
)
)

const a5 = new Entity();
engine.addEntity(a5);

a5.addComponent(new Transform({ position: new Vector3(162, 8, -28), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 90, 0) }));
a5.addComponent(new GLTFShape("models/para.glb"));
a5.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://parallel.fi/")
  },
    { hoverText: "Parallel!",
    distance: 100, }
)
)

const a6 = new Entity();
engine.addEntity(a6);

a6.addComponent(new Transform({ position: new Vector3(162, 8, -44), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 90, 0) }));
a6.addComponent(new GLTFShape("models/efin.glb"));
a6.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://enjin.io/products/efinity")
  },
    { hoverText: "Efinity!",
    distance: 100, }
)
)

const a7 = new Entity();
engine.addEntity(a7);

a7.addComponent(new Transform({ position: new Vector3(152, 8, -60), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 315, 0) }));
a7.addComponent(new GLTFShape("models/manta.glb"));
a7.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.manta.network/")
  },
    { hoverText: "Manta Network!",
    distance: 100, }
)
)

const a8 = new Entity();
engine.addEntity(a8);

a8.addComponent(new Transform({ position: new Vector3(136, 8, -68), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a8.addComponent(new GLTFShape("models/lit.glb"));
a8.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.litentry.com/")
  },
    { hoverText: "Litentry!",
    distance: 100, }
)
)

const a9 = new Entity();
engine.addEntity(a9);

a9.addComponent(new Transform({ position: new Vector3(120, 8, -68), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a9.addComponent(new GLTFShape("models/sub.glb"));
a9.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.subdao.network/")
  },
    { hoverText: "SubDAO!",
    distance: 100, }
)
)

const a10 = new Entity();
engine.addEntity(a10);

a10.addComponent(new Transform({ position: new Vector3(104, 8, -60), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 45, 0) }));
a10.addComponent(new GLTFShape("models/subg.glb"));
a10.addComponent(
  new OnPointerDown(() => {
    openExternalURL("http://subgame.org/")
  },
    { hoverText: "SubGame!",
    distance: 100, }
)
)

const a11 = new Entity();
engine.addEntity(a11);

a11.addComponent(new Transform({ position: new Vector3(98, 8, -44), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 90, 0) }));
a11.addComponent(new GLTFShape("models/ares.glb"));
a11.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.aresprotocol.io/")
  },
    { hoverText: "Ares!",
    distance: 100, }
)
)

const a12 = new Entity();
engine.addEntity(a12);

a12.addComponent(new Transform({ position: new Vector3(98, 8, -28), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 90, 0) }));
a12.addComponent(new GLTFShape("models/centri.glb"));
a12.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://centrifuge.io/")
  },
    { hoverText: "Centrifuge!",
    distance: 100, }
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
    position: new Vector3(128, 20, 78), scale: new Vector3(48, 32, 22), rotation: Quaternion.Euler(0, 180, 0) ,
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
    position: new Vector3(128, 2, 78), scale: new Vector3(2, 1, 10), rotation: Quaternion.Euler(0, 90, 0) ,
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
          position: new Vector3(128, 20, 78), scale: new Vector3(48, 32, 22), rotation: Quaternion.Euler(0, 180, 0)
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