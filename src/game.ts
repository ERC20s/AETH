import { movePlayerTo } from '@decentraland/RestrictedActions'
import { getUserAccount } from "@decentraland/EthereumController"
import { RequestManager, HTTPProvider, EthBlockFilter } from 'eth-connect'
import { TriggeredPlatform } from './triggeredPlatform'
import * as utils from '@dcl/ecs-scene-utils'
import * as EthereumController from "@decentraland/EthereumController"
import * as crypto from '@dcl/crypto-scene-utils'
import { NFT_ABI } from './erc721'
import { Standard } from './standard'

export let standard: Standard

const provider = 'https://evm.shibuya.astar.network'
const providerInstance = new HTTPProvider(provider)
const requestManager = new RequestManager(providerInstance)

const machine = new Entity();
engine.addEntity(machine);
machine.addComponent(new GLTFShape("models/machine.glb"));
machine.addComponent(new Transform({ position: new Vector3(204, 0, -24), scale: new Vector3(4, 4, 4), rotation: Quaternion.Euler(0, 270, 0) }));

machine.addComponent(
  new OnPointerDown(() => {
    standard = new Standard(
      new Transform({ position: new Vector3(0, 0, 0) })
    )
  },
    { hoverText: "Load the store!",
    distance: 500, }
)
)

const key = new Entity();

key.addComponent(new GLTFShape("models/key.glb"));
key.addComponent(new Transform({ position: new Vector3(36, 0, -16), scale: new Vector3(0.2, 0.2, 0.2)}));
key.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://talisman.xyz/")
  },
    { hoverText: "We are talisman !",
    distance: 400, }
)
)
engine.addEntity(key);

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
monkey.addComponent(new Transform({ position: new Vector3(220, 0, 40), rotation: Quaternion.Euler(0, 180, 0) }))
monkey.addComponent(
  new OnPointerDown(() => {
        movePlayerTo({ x: 190, y: 100, z: 40 }, { x: 55, y: 88, z: 40 })
      }, {
    hoverText: "Climb to the top!",
    distance: 300
  })
)
engine.addEntity(monkey);

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

)

engine.addEntity(items);

const items2 = new Entity();
items2.addComponent(new GLTFShape("models/word2.glb"))
items2.addComponent(new Transform({ position: new Vector3(3, 0, 1), rotation: Quaternion.Euler(0, 180, 0) }))
items2.addComponent(

  new OnPointerDown(
    (_e) => {
      movePlayerTo({ x: 130, y: 100, z: 34 }, { x: 55, y: 88, z: 40 })
    },
    {
      hoverText: "To the moon!",
      distance: 150,
    })
)

engine.addEntity(items2);


const canvas = new UICanvas()
const imageTexture = new Texture('images/UI_Guestbook.png')

// const a0 = new Entity();
// engine.addEntity(a0);

// a0.addComponent(new Transform({ position: new Vector3(152, 56, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
// a0.addComponent(new GLTFShape("models/polka.glb"));
// a0.addComponent(
//   new OnPointerDown(() => {
//     openExternalURL("https://polkadot.network/")
//   },
//     {
//       hoverText: "Polkadot!",
//       distance: 200,
//     }
//   )
// )


const a1 = new Entity();
engine.addEntity(a1);

a1.addComponent(new Transform({ position: new Vector3(120, 8, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a1.addComponent(new GLTFShape("models/moonbeam.glb"));
a1.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://moonbeam.network")
  },
    {
      hoverText: "Moonbeam Network!",
      distance: 200,
    }
  )
)


let a2 = new Entity();
engine.addEntity(a2);

a2.addComponent(new Transform({ position: new Vector3(104, 8, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a2.addComponent(new GLTFShape("models/astar2.glb"));
a2.addComponent(
  new OnPointerDown(async() => {


const myMaterial = new BasicMaterial()
myMaterial.texture = myVideoTexture
    const inventoryContainer = new UIContainerStack(canvas)
    inventoryContainer.adaptWidth = true
    inventoryContainer.adaptHeight = true
    inventoryContainer.width = 200
    inventoryContainer.height = 75
    inventoryContainer.positionX = 0
    inventoryContainer.color = Color4.Yellow()
    inventoryContainer.hAlign = "right"
    inventoryContainer.vAlign = "top"
    inventoryContainer.stackOrientation = UIStackOrientation.VERTICAL
    inventoryContainer.opacity = 0.1
    let userBalance = '0'
    let address: string
    try {
      address = await getUserAccount()
      // const balance = await getUserBalance()
      log(address)
      const balance = await requestManager.eth_getBalance(address, address)
      userBalance = balance.minus(balance.mod(1e14)).div(1e18).toString()
      log(userBalance)
    } catch (error) {
      log(error)
    }
    const sname = new UIText(canvas)
    sname.value = `${userBalance} ASTR`
    sname.width = 76
    sname.height = 76
    sname.hAlign = "right"
    sname.vAlign = "top"
    sname.positionX = -120
    sname.fontSize = 25
    sname.color = Color4.Black()

    const NextButton0 = new UIImage(canvas, imageTexture)
    NextButton0.width = 76
    NextButton0.height = 76
    NextButton0.hAlign = "right"
    NextButton0.vAlign = "top"
    NextButton0.positionY = 100
    NextButton0.positionX = 10
    NextButton0.sourceWidth = 75
    NextButton0.sourceHeight = 75
    NextButton0.visible = true
    // executeTask(async () => {
    //   const contract = await crypto.contract.getContract(
    //     '0x86E25f1e266eA4831b3CBb68164753DcbA30D047',
    //     NFT_ABI
    //   )
    //   try {
    //     const tx = await contract.contract.makeAnEpicNFT({from: address});
    //     log(tx)}
    //   catch (e: any) {
    //     log(e.message)
    //   }
    // })
    // openExternalURL("https://astar.network/")
    class SimpleRotate3 implements ISystem {
      update() {
        let transform = (a2.getComponent(Transform))
        transform.rotate(Vector3.Backward(), 1)
      }
    }

    engine.addSystem(new SimpleRotate3())


  },
    {
      hoverText: "Astar Network!",

      distance: 200,
    }
  )
)


const c4 = new Entity();
engine.addEntity(c4);

c4.addComponent(new Transform({ position: new Vector3(136, 8, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
c4.addComponent(new GLTFShape("models/acala.glb"));
c4.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://acala.network/")
  },
    {
      hoverText: "Acala Network!",
      distance: 200,
    }
  )
)

const c5 = new Entity();
engine.addEntity(c5);

c5.addComponent(new Transform({ position: new Vector3(152, 8, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
c5.addComponent(new GLTFShape("models/para.glb"));
c5.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://parallel.fi/")
  },
    {
      hoverText: "Parallel!",
      distance: 200,
    }
  )
)

const c6 = new Entity();
engine.addEntity(c6);

c6.addComponent(new Transform({ position: new Vector3(120, 24, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
c6.addComponent(new GLTFShape("models/efin.glb"));
c6.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://enjin.io/products/efinity")
  },
    {
      hoverText: "Efinity!",
      distance: 200,
    }
  )
)

const a7 = new Entity();
engine.addEntity(a7);

a7.addComponent(new Transform({ position: new Vector3(152, 24, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a7.addComponent(new GLTFShape("models/coinversation.glb"));
a7.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.coinversation.io/")
  },
    {
      hoverText: "Coinversation!",
      distance: 200,
    }
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
    {
      hoverText: "Litentry!",
      distance: 200,
    }
  )
)

const a9 = new Entity();
engine.addEntity(a9);

a9.addComponent(new Transform({ position: new Vector3(104, 24, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a9.addComponent(new GLTFShape("models/nodle.glb"));
a9.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://nodle.com/")
  },
    {
      hoverText: "Nodle!",
      distance: 200,
    }
  )
)

const a10 = new Entity();
engine.addEntity(a10);

a10.addComponent(new Transform({ position: new Vector3(104, 40, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a10.addComponent(new GLTFShape("models/equil.glb"));
a10.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://equilibrium.io/")
  },
    {
      hoverText: "Equilibrium!",
      distance: 200,
    }
  )
)

const a11 = new Entity();
engine.addEntity(a11);

a11.addComponent(new Transform({ position: new Vector3(120, 40, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a11.addComponent(new GLTFShape("models/interlay.glb"));
a11.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.interlay.io/")
  },
    {
      hoverText: "Interlay!",
      distance: 200,
    }
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
    {
      hoverText: "Centrifuge!",
      distance: 200,
    }
  )
)

const a13 = new Entity();
engine.addEntity(a13);

a13.addComponent(new Transform({ position: new Vector3(152, 40, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a13.addComponent(new GLTFShape("models/phala.glb"));
a13.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://phala.network/")
  },
    {
      hoverText: "Phala!",
      distance: 200,
    }
  )
)

const a14 = new Entity();
engine.addEntity(a14);

a14.addComponent(new Transform({ position: new Vector3(104, 56, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a14.addComponent(new GLTFShape("models/bifrost.glb"));
a14.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://bifrost.finance/")
  },
    {
      hoverText: "Bifrost!",
      distance: 200,
    }
  )
)

const a15 = new Entity();
engine.addEntity(a15);

a15.addComponent(new Transform({ position: new Vector3(136, 56, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a15.addComponent(new GLTFShape("models/composable.glb"));
a15.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.composable.finance/")
  },
    {
      hoverText: "Composable!",
      distance: 200,
    }
  )
)

const a16 = new Entity();
engine.addEntity(a16);

a16.addComponent(new Transform({ position: new Vector3(120, 56, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a16.addComponent(new GLTFShape("models/hydradx.glb"));
a16.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://hydradx.io/")
  },
    {
      hoverText: "HydraDX!",
      distance: 200,
    }
  )
)

const a17 = new Entity();
engine.addEntity(a17);

a17.addComponent(new Transform({ position: new Vector3(152, 56, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a17.addComponent(new GLTFShape("models/unique.glb"));
a17.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://unique.network/")
  },
    {
      hoverText: "Unique Network!",
      distance: 200,
    }
  )
)

const a18 = new Entity();
engine.addEntity(a18);

a18.addComponent(new Transform({ position: new Vector3(104, 72, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a18.addComponent(new GLTFShape("models/origin.glb"));
a18.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://parachain.origintrail.io/")
  },
    {
      hoverText: "OriginTrail!",
      distance: 200,
    }
  )
)

const a19 = new Entity();
engine.addEntity(a19);

a19.addComponent(new Transform({ position: new Vector3(136, 72, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a19.addComponent(new GLTFShape("models/polkadex.glb"));
a19.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.polkadex.trade/")
  },
    {
      hoverText: "Polkadex!",
      distance: 200,
    }
  )
)

const a20 = new Entity();
engine.addEntity(a20);

a20.addComponent(new Transform({ position: new Vector3(120, 72, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a20.addComponent(new GLTFShape("models/clover.glb"));
a20.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://clover.finance/")
  },
    {
      hoverText: "Clover!",
      distance: 200,
    }
  )
)

const a21 = new Entity();
engine.addEntity(a21);

a21.addComponent(new Transform({ position: new Vector3(152, 72, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a21.addComponent(new GLTFShape("models/totem.glb"));
a21.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://totemaccounting.com/")
  },
    {
      hoverText: "Totem!",
      distance: 200,
    }
  )
)

const a22 = new Entity();
engine.addEntity(a22);

a22.addComponent(new Transform({ position: new Vector3(128, 88, 78), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a22.addComponent(new GLTFShape("models/statemint.glb"));
a22.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://www.parity.io/")
  },
    {
      hoverText: "Statemint!",
      distance: 200,
    }
  )
)




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
    position: new Vector3(128, 24, -120), scale: new Vector3(60, 40, 22), rotation: Quaternion.Euler(0, 0, 0),
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

let tv = new Entity();
tv.addComponent(new BoxShape())
tv.addComponent(
  new Transform({
    position: new Vector3(128, 2, -120), scale: new Vector3(2, 4, 60), rotation: Quaternion.Euler(0, 270, 0),
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
      screen.addComponent(
        new Transform({
          position: new Vector3(0, 0.875, 0.2),
          scale: new Vector3(0.3, 0.18, 0.3),
          rotation: Quaternion.Euler(0, 180, 0)

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
      screen.addComponent(
        new Transform({
          position: new Vector3(128, 20, -120), scale: new Vector3(48, 32, 22), rotation: Quaternion.Euler(0, 0, 0)
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

let platformTriggerBox = new utils.TriggerBoxShape(
  new Vector3(3, 3, 3),
  new Vector3(0, 1.7, 0)
) // Modified to match platform size
const triggeredMovingPlatform = new TriggeredPlatform(
  new GLTFShape('models/platform.glb'),
  new Transform({ position: new Vector3(200, 0.1, 40), scale: new Vector3(1, 0.1, 1) }),
  platformTriggerBox
)

const pickup = new AudioClip("sounds/coinPickup.mp3")
const success = new AudioSource(pickup)
const pickup2 = new AudioClip("sounds/orbDrop.mp3")
const fail = new AudioSource(pickup2)

const logo = new Entity();
logo.addComponent(new GLTFShape("models/logo3.glb"))
logo.addComponent(new Transform({ position: new Vector3(190, 40, 40), rotation: Quaternion.Euler(0, 0, 0) }))
logo.addComponent(fail)
engine.addEntity(logo);

const logo2 = new Entity();
logo2.addComponent(new GLTFShape("models/logo3.glb"))
logo2.addComponent(new Transform({ position: new Vector3(180, 40, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo2);

const logo3 = new Entity();
logo3.addComponent(new GLTFShape("models/logo3.glb"))
logo3.addComponent(new Transform({ position: new Vector3(170, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo3);

const logo4 = new Entity();
logo4.addComponent(new GLTFShape("models/logo3.glb"))
logo4.addComponent(success)
logo4.addComponent(new Transform({ position: new Vector3(160, 40, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo4);

const logo5 = new Entity();
logo5.addComponent(new Transform({ position: new Vector3(150, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo5);

const logo6 = new Entity();
logo6.addComponent(new Transform({ position: new Vector3(140, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo6);

const logo7 = new Entity();
logo7.addComponent(new Transform({ position: new Vector3(130, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo7);

const logo8 = new Entity();
logo8.addComponent(new Transform({ position: new Vector3(120, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo8);

const logo9 = new Entity();
logo9.addComponent(new Transform({ position: new Vector3(110, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo9);

const logo10 = new Entity();
logo10.addComponent(new Transform({ position: new Vector3(100, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo10);

const logo11 = new Entity();
logo11.addComponent(new Transform({ position: new Vector3(90, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo11);

const logo12 = new Entity();
logo12.addComponent(new Transform({ position: new Vector3(80, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo12);

const logo13 = new Entity();
logo13.addComponent(new Transform({ position: new Vector3(70, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo13);

const logo14 = new Entity();
logo14.addComponent(new Transform({ position: new Vector3(60, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo14);

const logo15 = new Entity();
logo15.addComponent(new Transform({ position: new Vector3(50, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo15);

const logo16 = new Entity();
logo16.addComponent(new Transform({ position: new Vector3(40, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo16);

const logo17 = new Entity();
logo17.addComponent(new Transform({ position: new Vector3(30, 41, 40), rotation: Quaternion.Euler(0, 0, 0) }))
engine.addEntity(logo17);

const canvas4 = new UICanvas()

const canvas3 = new UICanvas()
const imageTexture3 = new Texture('images/next.png')

const input = Input.instance

let imageAtlas = "images/UI-atlas3.png"
let imageTexture2 = new Texture(imageAtlas)

const canvas2 = new UICanvas()

const inventoryContainer2 = new UIContainerStack(canvas4)
inventoryContainer2.adaptWidth = true
inventoryContainer2.adaptHeight = true
inventoryContainer2.width = "50%"
inventoryContainer2.height = "80%"
inventoryContainer2.color = Color4.Yellow()
inventoryContainer2.hAlign = "center"
inventoryContainer2.vAlign = "center"
inventoryContainer2.stackOrientation = UIStackOrientation.VERTICAL
inventoryContainer2.opacity = 0.4

const exit = new UIImage(canvas2, imageTexture2)
exit.sourceLeft = 659
exit.sourceTop = 360
exit.sourceWidth = 83
exit.sourceHeight = 83
exit.width = 60
exit.height = 60
exit.positionY = "80%"
exit.positionX = "25.1%"
exit.hAlign = "left"
exit.vAlign = "bottom"
exit.onClick = new OnPointerDown(() => {
  inventoryContainer2.visible = false
  q1.visible = false
  exit.visible = false
 ans1.visible = false
 ans2.visible = false
 ans3.visible = false
 ans4.visible = false
 ans5.visible = false
 but1.visible = false
 but2.visible = false
 but3.visible = false
 but4.visible = false
 but5.visible = false
})

const q1 = new UIText(canvas4)
q1.hAlign = "center"
q1.vAlign = "bottom"
q1.positionY = "80%"
q1.positionX ="-12.5%"
q1.fontSize = 33
q1.color = Color4.Black()

const ans1 = new UIText(canvas4)
ans1.hAlign = "center"
ans1.vAlign = "bottom"
ans1.positionY = "64%"
ans1.positionX ="-12.5%"
ans1.fontSize = 25

const but1 = new UIImage(canvas3, imageTexture3)
but1.width = 638
but1.height = 60
but1.hAlign = "center"
but1.vAlign = "bottom"
but1.positionY = "62%"
but1.sourceWidth = 700
but1.sourceHeight = 75

const ans2 = new UIText(canvas4)

ans2.hAlign = "center"
ans2.vAlign = "bottom"
ans2.positionY = "53%"
ans2.positionX ="-12.5%"
ans2.fontSize = 25

const but2 = new UIImage(canvas3, imageTexture3)
but2.width = 638
but2.height = 60
but2.hAlign = "center"
but2.vAlign = "bottom"
but2.positionY = "51%"
but2.sourceWidth = 700
but2.sourceHeight = 75

const ans3 = new UIText(canvas4)
ans3.hAlign = "center"
ans3.vAlign = "bottom"
ans3.positionY = "42%"
ans3.positionX ="-12.5%"
ans3.fontSize = 25

const but3 = new UIImage(canvas3, imageTexture3)
but3.width = 638
but3.height = 60
but3.hAlign = "center"
but3.vAlign = "bottom"
but3.positionY = "40%"
but3.sourceWidth = 700
but3.sourceHeight = 75

const ans4 = new UIText(canvas4)
ans4.hAlign = "center"
ans4.vAlign = "bottom"
ans4.positionY = "31%"
ans4.positionX ="-12.5%"
ans4.fontSize = 25

const but4 = new UIImage(canvas3, imageTexture3)
but4.width = 638
but4.height = 60
but4.hAlign = "center"
but4.vAlign = "bottom"
but4.positionY = "29%"
but4.sourceWidth = 700
but4.sourceHeight = 75

const ans5 = new UIText(canvas4)
ans5.value = "Click to learn more.."
ans5.hAlign = "center"
ans5.vAlign = "bottom"
ans5.positionY = "20%"
ans5.positionX ="-12.5%"
ans5.fontSize = 25

 
const but5 = new UIImage(canvas3, imageTexture3)
but5.width = 638
but5.height = 60
but5.hAlign = "center"
but5.vAlign = "bottom"
but5.positionY = "18%"
but5.sourceWidth = 700
but5.sourceHeight = 75

inventoryContainer2.visible = false

q1.visible = false
exit.visible = false

ans1.visible = false
ans2.visible = false
ans3.visible = false
ans4.visible = false
ans5.visible = false

but1.visible = false
but2.visible = false
but3.visible = false
but4.visible = false
but5.visible = false

const a3 = new Entity();
engine.addEntity(a3);
a3.addComponent(new GLTFShape("models/polka.glb"));
a3.addComponent(new Transform({ position: new Vector3(160, 45, 30), scale: new Vector3(6, 6, 1), rotation: Quaternion.Euler(0, 0, 0) }));

a3.addComponent(
  new OnPointerDown(() => {
    unsub()
  inventoryContainer2.visible = true
  exit.visible = true
  q1.visible = true

  q1.value = "Substrate is.."
  ans1.value = "1. A Polkadot Parachain"
  ans2.value = "2. A Development Framework"
  ans3.value = "3. The Native Polkadot Currency"
  ans4.value = "4. A Programming Language"
  ans5.value = "Click to learn more.."

  ans1.visible = true
  ans2.visible = true
  ans3.visible = true
  ans4.visible = true
  ans5.visible = true

  but1.visible = true
  but2.visible = true
  but3.visible = true
  but4.visible = true
  but5.visible = true



  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_3, false, wrong1)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_4, false, correct1)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_5, false, wrong3)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_6, false, wrong4)

  but1.onClick = new OnPointerDown(() => {
    wrong1()
  })
  but2.onClick = new OnPointerDown(() => {
    correct1()
  })
  but3.onClick = new OnPointerDown(() => {
    wrong3()
  })
  but4.onClick = new OnPointerDown(() => {
    wrong4()
  })
  but5.onClick = new OnPointerDown(() => {
    openExternalURL("https://substrate.io/")
  })
  },
    {
      hoverText: "Let's go!",
      distance: 20,
    }
  )
)
const a4 = new Entity();
a4.addComponent(new GLTFShape("models/polka.glb"));
a4.addComponent(new Transform({ position: new Vector3(120, 45, 30), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a4.addComponent(
  new OnPointerDown(() => {
    unsub()
  inventoryContainer2.visible = true
  exit.visible = true
  q1.visible = true
  ans1.visible = true
  ans2.visible = true
  ans3.visible = true
  ans4.visible = true
  ans5.visible = true

  q1.value = "What does EVM stand for?"
  ans1.value = "1. Ethereum Virtual Media"
  ans2.value = "2. Ethereum Virtual Machine"
  ans3.value = "3. Ether Visual Media"
  ans4.value = "4. Ethers Vitalik Mission"

  but1.visible = true
  but2.visible = true
  but3.visible = true
  but4.visible = true
  but5.visible = true

  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_3, false, wrong5)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_4, false, correct2)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_5, false, wrong7)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_6, false, wrong8)

  but1.onClick = new OnPointerDown(() => {
    wrong5()
  })
  but2.onClick = new OnPointerDown(() => {
    correct2()
  })
  but3.onClick = new OnPointerDown(() => {
    wrong7()
  })
  but4.onClick = new OnPointerDown(() => {
    wrong8()
  })
  but5.onClick = new OnPointerDown(() => {
    openExternalURL("https://www.parity.io/blog/substrate-evm/")
  })
  },
    {
      hoverText: "Let's go!",
      distance: 20,
    }
  )
)

const a5 = new Entity();
a5.addComponent(new GLTFShape("models/polka.glb"));
a5.addComponent(new Transform({ position: new Vector3(80, 45, 30), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a5.addComponent(
  new OnPointerDown(() => {
  unsub()
  inventoryContainer2.visible = true
  exit.visible = true
  q1.visible = true
  ans1.visible = true
  ans2.visible = true
  ans3.visible = true
  ans4.visible = true
  ans5.visible = true

  q1.value = "What is Rust?"
  ans1.value = "1. A Smart Contract"
  ans2.value = "2. A Parachain"
  ans3.value = "3. A Programming Language"
  ans4.value = "4. A Parathread"

  but1.visible = true
  but2.visible = true
  but3.visible = true
  but4.visible = true
  but5.visible = true

  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_3, false, wrong9)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_4, false, wrong10)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_5, false, correct3)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_6, false, wrong12)

  but1.onClick = new OnPointerDown(() => {
    wrong9()
  })
  but2.onClick = new OnPointerDown(() => {
    wrong10()
  })
  but3.onClick = new OnPointerDown(() => {
    correct3()
  })
  but4.onClick = new OnPointerDown(() => {
    wrong12()
  })
  but5.onClick = new OnPointerDown(() => {
    openExternalURL("https://www.rust-lang.org/")
  })
  },
    {
      hoverText: "Let's go!",
      distance: 20,
    }
  )
)

const a6 = new Entity();
a6.addComponent(new GLTFShape("models/polka.glb"));
a6.addComponent(new Transform({ position: new Vector3(40, 45, 30), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0, 0, 0) }));
a6.addComponent(
  new OnPointerDown(() => {
  unsub()
  inventoryContainer2.visible = true
  exit.visible = true
  q1.visible = true
  ans1.visible = true
  ans2.visible = true
  ans3.visible = true
  ans4.visible = true
  ans5.visible = true

  q1.value = "INK! is used to create?"
  ans1.value = "1. Smart Contracts"
  ans2.value = "2. Parachains"
  ans3.value = "3. Programming Languages"
  ans4.value = "4. Parathreads"

  but1.visible = true
  but2.visible = true
  but3.visible = true
  but4.visible = true
  but5.visible = true

  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_3, false, correct4)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_4, false, wrong14)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_5, false, wrong15)
  input.subscribe("BUTTON_DOWN", ActionButton.ACTION_6, false, wrong16)

  but1.onClick = new OnPointerDown(() => {
    correct4()
  })
  but2.onClick = new OnPointerDown(() => {
    wrong14()
  })
  but3.onClick = new OnPointerDown(() => {
    wrong15()
  })
  but4.onClick = new OnPointerDown(() => {
    wrong16()
  })
  but5.onClick = new OnPointerDown(() => {
    openExternalURL("https://paritytech.github.io/ink/")
  })
  },
    {
      hoverText: "Let's go!",
      distance: 20,
    }
  )
)

var func1 = function() { 
  ans1.color = Color4.Red()
  but1.visible = false
  exit.visible = false
  ans3.visible = false
  ans2.visible = false
  ans4.visible = false
  but3.visible = false
  but2.visible = false
  but4.visible = false
  fail.playOnce()
  drop()

 utils.setTimeout(3000, ()=>{
 inventoryContainer2.visible = false
 q1.visible = false
 but1.visible = false
 ans1.visible = false
 exit.visible = false
})
utils.setTimeout(30000, ()=>{
  but5.visible = false
  ans5.visible = false
 })

  }

  var func2 = function() {  
    ans1.visible = false
    ans2.color = Color4.Red()
    ans3.visible = false
    ans4.visible = false
    but1.visible = false
    but2.visible = false
    but3.visible = false
    but4.visible = false
    fail.playOnce()
    drop()

    utils.setTimeout(4000, ()=>{
      inventoryContainer2.visible = false
      ans2.visible = false
      q1.visible = false
      exit.visible = false
    }) 
    utils.setTimeout(30000, ()=>{
      but5.visible = false
      ans5.visible = false
    }) 
  }


  var func3 = function() { 
  ans3.color = Color4.Red()
  but3.visible = false
  exit.visible = false
  ans1.visible = false
  ans2.visible = false
  ans4.visible = false
  but1.visible = false
  but2.visible = false
  but4.visible = false
  fail.playOnce()
  drop()

 utils.setTimeout(3000, ()=>{
 inventoryContainer2.visible = false
 q1.visible = false
 but3.visible = false
 ans3.visible = false
 exit.visible = false
})

utils.setTimeout(30000, ()=>{
  but5.visible = false
  ans5.visible = false
 })
  }

  var func4 = function() { 
    ans4.color = Color4.Red()
    but4.visible = false
    exit.visible = false
    ans1.visible = false
    ans2.visible = false
    ans3.visible = false
    but1.visible = false
    but2.visible = false
    but3.visible = false
    fail.playOnce()
    drop()

    utils.setTimeout(3000, ()=>{
    inventoryContainer2.visible = false
    q1.visible = false
    but4.visible = false
    ans4.visible = false
    exit.visible = false
    })
    utils.setTimeout(30000, ()=>{
    but5.visible = false
    ans5.visible = false
    })
 } 

 var func5 = function() {  


  ans1.color = Color4.Green()
  ans2.visible = false
  ans3.visible = false
  ans4.visible = false
  but1.visible = false
  but2.visible = false
  but3.visible = false
  but4.visible = false
 success.playOnce()
  exit.visible = false

  utils.setTimeout(4000, ()=>{
    inventoryContainer2.visible = false
    ans1.visible = false
    q1.visible = false
    exit.visible = false
}) 
  utils.setTimeout(10000, ()=>{
    but5.visible = false
    ans5.visible = false
  }) 
 
  }

  var func6 = function() {  

    ans1.visible = false
    ans2.color = Color4.Green()
    ans3.visible = false
    ans4.visible = false
    but1.visible = false
    but2.visible = false
    but3.visible = false
    but4.visible = false
   success.playOnce()
    exit.visible = false

    utils.setTimeout(4000, ()=>{
      inventoryContainer2.visible = false
      ans2.visible = false
      q1.visible = false
  }) 
    utils.setTimeout(10000, ()=>{
      but5.visible = false
      ans5.visible = false
    }) 
   
    }

    var func7 = function() {  

      ans1.visible = false
      ans3.color = Color4.Green()
      ans2.visible = false
      ans4.visible = false
      but1.visible = false
      but2.visible = false
      but3.visible = false
      but4.visible = false
     success.playOnce()
      exit.visible = false

      utils.setTimeout(4000, ()=>{
        inventoryContainer2.visible = false
        ans3.visible = false
        q1.visible = false
    }) 
      utils.setTimeout(10000, ()=>{
        but5.visible = false
        ans5.visible = false
      }) 

      }

      var func8 = function() {  

        ans1.visible = false
        ans4.color = Color4.Green()
        ans3.visible = false
        ans2.visible = false
        but1.visible = false
        but2.visible = false
        but3.visible = false
        but4.visible = false
       success.playOnce()
        exit.visible = false

        utils.setTimeout(4000, ()=>{
          inventoryContainer2.visible = false
          ans4.visible = false
          q1.visible = false
      }) 
        utils.setTimeout(10000, ()=>{
          but5.visible = false
          ans5.visible = false
        }) 
             
        }

var wrong1 = function() {  
  unsub()
  func1()
  utils.setTimeout(1000, ()=>{
  d1r()
  })
}

var correct1 = function() {  
  unsub()
  func6()
  engine.addEntity(a4)
  d2r()
}

var wrong3 = function() {  
  unsub()
  func3()
  utils.setTimeout(1000, ()=>{
  d1r()
  })
}

var wrong4 = function() {  
  unsub()
  func4()
  utils.setTimeout(1000, ()=>{
  d1r()
  })
}

var wrong5 = function() {  
  unsub()
  func1()
  utils.setTimeout(1000, ()=>{  
  d1r()
  d2r()
  })
}

var correct2 = function() {  
  unsub()
  func6()
  engine.addEntity(a5)
  d3r()
}

var wrong7 = function() {
  unsub()  
  func3()
  utils.setTimeout(1000, ()=>{
  d1r()
  d2r()
  })
}

var wrong8 = function() {  
  unsub()
  func4()
  utils.setTimeout(1000, ()=>{
  d1r()
  d2r()
  })
}

var wrong9 = function() {  
  unsub()
  func1()
  utils.setTimeout(1000, ()=>{  
  d1r()
  d2r()
  d3r()
  })
}

var wrong10 = function() {  
  unsub()
  func2()
  utils.setTimeout(1000, ()=>{
  d1r()
  d2r()
  d3r()
  })
}

var correct3 = function() {  
  unsub()
  func7()
  engine.addEntity(a6)
  d4r()
}

var wrong12 = function() {  
  unsub()
  func4()
  utils.setTimeout(1000, ()=>{
  d1r()
  d2r()
  d3r()
  })
}

var correct4 = function() {  
  unsub()
  func5()
  engine.addEntity(a6)
  d5r()
  const monkey2 = new Entity();
monkey2.addComponent(new GLTFShape("models/monkey.glb"))
monkey2.addComponent(new Transform({ position: new Vector3(15, 40, 40), rotation: Quaternion.Euler(0, 0, 0) }))
monkey2.addComponent(
  new OnPointerDown(() => {
    // openExternalURL("https://polkadot.network/")


    const messageToSign = `# DCL Signed message
    Attacker: 10
    Defender: 123
    Timestamp: 1512345678`

    let eth = EthereumController

    executeTask(async () => {
      log('testing sign message')
      const convertedMessage = await eth.convertMessageToObject(messageToSign)
      const { message, signature } = await eth.signMessage(convertedMessage)
      log({ message, signature })
    })

  }, {
    hoverText: "Claim this NFT!",
    distance: 300
  })
)
engine.addEntity(monkey2);
}

var wrong14 = function() {  
  unsub()
  func2()
  utils.setTimeout(1000, ()=>{  
  d1r()
  d2r()
  d3r()
  d4r()
  })
}

var wrong15 = function() {  
  unsub()
  func3()
  utils.setTimeout(1000, ()=>{
  d1r()
  d2r()
  d3r()
  d4r()
  })
}

var wrong16 = function() {  
  unsub()
  func4()
  utils.setTimeout(1000, ()=>{
  d1r()
  d2r()
  d3r()
  d4r()
  })
}


    var d1 = function() {  
      logo.removeComponent(GLTFShape)
      logo2.removeComponent(GLTFShape)
      logo3.removeComponent(GLTFShape)
      logo4.removeComponent(GLTFShape)
    }
    
    var d1r = function() {  
      logo.addComponent(new GLTFShape("models/logo3.glb"))
      logo2.addComponent(new GLTFShape("models/logo3.glb"))
      logo3.addComponent(new GLTFShape("models/logo3.glb"))
      logo4.addComponent(new GLTFShape("models/logo3.glb"))
    }

    var d2 = function() {  
      logo5.removeComponent(GLTFShape)
      logo6.removeComponent(GLTFShape)
      logo7.removeComponent(GLTFShape)
      logo8.removeComponent(GLTFShape)
    }
    
    var d2r = function() {  
      logo5.addComponent(new GLTFShape("models/logo3.glb"))
      logo6.addComponent(new GLTFShape("models/logo3.glb"))
      logo7.addComponent(new GLTFShape("models/logo3.glb"))
      logo8.addComponent(new GLTFShape("models/logo3.glb"))
    }
    
    var d3 = function() {  
      logo9.removeComponent(GLTFShape)
      logo10.removeComponent(GLTFShape)
      logo11.removeComponent(GLTFShape)
      logo12.removeComponent(GLTFShape)
    }
    
    var d3r = function() {  
      logo9.addComponent(new GLTFShape("models/logo3.glb"))
      logo10.addComponent(new GLTFShape("models/logo3.glb"))
      logo11.addComponent(new GLTFShape("models/logo3.glb"))
      logo12.addComponent(new GLTFShape("models/logo3.glb"))
    }

    var d4 = function() {  
      logo13.removeComponent(GLTFShape)
      logo14.removeComponent(GLTFShape)        
      logo15.removeComponent(GLTFShape)
      logo16.removeComponent(GLTFShape)
    }
    
    var d4r = function() {  
      logo13.addComponent(new GLTFShape("models/logo3.glb"))
      logo14.addComponent(new GLTFShape("models/logo3.glb"))
      logo15.addComponent(new GLTFShape("models/logo3.glb"))
      logo16.addComponent(new GLTFShape("models/logo3.glb"))
    }

    // var d5 = function() {  
    //   logo13.removeComponent(GLTFShape)
    //   logo14.removeComponent(GLTFShape)        
    //   logo15.removeComponent(GLTFShape)
    //   logo16.removeComponent(GLTFShape)
    // }
    
    var d5r = function() {  
      logo17.addComponent(new GLTFShape("models/logo3.glb"))
      // logo18.addComponent(new GLTFShape("models/logo3.glb"))
      // logo19.addComponent(new GLTFShape("models/logo3.glb"))
      // logo20.addComponent(new GLTFShape("models/logo3.glb"))
    }

    var drop = function() {  
      d1()
      d2()
      d3()
      d4()
    }

    var unsub = function() {  
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_3, wrong1)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_4, correct1)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_5, wrong3)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_6, wrong4)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_3, wrong5)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_4, correct2)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_5, wrong7)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_6, wrong8)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_3, wrong9)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_4, wrong10)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_5, correct3)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_6, wrong12)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_3, correct4)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_4, wrong14)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_5, wrong15)
  input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_6, wrong16)
  ans1.color = Color4.Purple()
  ans2.color = Color4.Purple()
  ans3.color = Color4.Purple()
  ans4.color = Color4.Purple()
  ans5.color = Color4.Purple()
    }