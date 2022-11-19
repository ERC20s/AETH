import { TriggeredPlatform } from "./triggeredPlatform";
import * as utils from "@dcl/ecs-scene-utils";
// import * as EthereumController from "@decentraland/EthereumController"
import {
  joinSocketServer,
  paraInstance,
  quizManager,
  unos,
  uno_bot,
} from "./uno/wsConnection";


import { World } from "./world";
import { UNO } from "./uno/uno";
import { Quiz } from "./quiz";
import Parachain from "./parachains";
import { QuizManager } from "./quiz-manage/index";
import { getUserData } from "@decentraland/Identity";

export let sceneStarted = false;
export let world: World;
// export let unos: UNO[] = []

// let pyraheight = -75

// const wallst = new Entity();
// wallst.addComponent(new GLTFShape("models/pyra.glb"))
// wallst
// wallst.addComponent(new Transform({ position: new Vector3(128, pyraheight, 16), rotation: Quaternion.Euler(0, 90, 0) }))
// wallst.addComponent(new OnPointerDown(() => {

//   pyraheight = pyraheight + 5
//   wallst.getComponent(Transform).position = new Vector3(128, pyraheight, 16)
//     },
//       {
//         hoverText: "next level",
//         distance: 500,
//       }
//     )
//   )

// engine.addEntity(wallst);

const canvas = new UICanvas();

const textCanvas = new UICanvas();
const textContainer = new UIContainerStack(textCanvas);
textContainer.adaptWidth = true;
textContainer.adaptHeight = true;
textContainer.width = "50%";
textContainer.height = "10%";
textContainer.color = Color4.Yellow();
textContainer.hAlign = "center";
textContainer.vAlign = "center";
textContainer.stackOrientation = UIStackOrientation.VERTICAL;
textContainer.opacity = 0.4;
const text = new UIText(textCanvas);
text.value = `You didn't select quiz category yet!`;
text.width = 76;
text.height = 76;
text.hAlign = "center";
text.vAlign = "center";
text.fontSize = 25;
text.color = Color4.Black();
text.hTextAlign = "center";
text.vTextAlign = "center";
textContainer.visible = false;
text.visible = false;

// const shop = new Entity();
// shop.addComponent(new GLTFShape("models/shop.glb"));
// shop.addComponent(new Transform({ position: new Vector3(216, 0, -8), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0, 0, 0) }));
// engine.addEntity(shop);

async function setUpScene() {
  let socket: WebSocket = await joinSocketServer();
  world = new World(new Transform({ position: new Vector3(0, 0, 0) }));
  try {
    for (let i = 0; i < 4; i++) {
      const uno = new UNO(
        i,
        new Transform({ position: new Vector3(10 + 10 * (i % 4), 0, 0) }),
        socket,
        canvas,
        uno_bot
      );
      unos.push(uno);
    }
  } catch (e) {
    log(JSON.stringify(e));
  }
  

  let platformTriggerBox = new utils.TriggerBoxShape(
    new Vector3(3, 3, 3),
    new Vector3(0, 2, 0)
  ); // Modified to match platform size
  const triggeredMovingPlatform = new TriggeredPlatform(
    new GLTFShape("models/platform.glb"),
    new Transform({
      position: new Vector3(200, 0.1, 40),
      scale: new Vector3(1, 0.1, 1),
    }),
    platformTriggerBox
  );
  //<---QUIZ STARTS HERE--->\\

  const quiz = new Quiz(socket);
  const categoryInstance = new Parachain(quiz, socket);
  paraInstance.unshift(categoryInstance);
  categoryInstance.showParachains();
  const quizUploader = new QuizManager(socket);
  quizManager.unshift(quizUploader);

  const ourdiscord = new Entity();
  ourdiscord.addComponent(new GLTFShape("models/discord.glb"))
  ourdiscord.addComponent(new Transform({ position: new Vector3(121, 11, -22), rotation: Quaternion.Euler(0, 0, 0), scale: new Vector3(5, 5, 1), }))
  ourdiscord.addComponent(
    new OnPointerDown(() => {
      openExternalURL("https://discord.gg/fCkPsSReYZ");
    }, {
      hoverText: "More coming soon!",
      distance: 600
    })
  )
  engine.addEntity(ourdiscord);

  const monkey = new Entity();
  monkey.addComponent(new GLTFShape("models/qmark.glb"));
  monkey.addComponent(
    new Transform({
      position: new Vector3(200, 0.5, 40),
      scale: new Vector3(20, 20, 20),
    })
  );
  monkey.addComponent(
    new OnPointerDown(
      (e) => {
        // if(text.visible) return
        // if (parachain === '') {
        //   textContainer.visible = true
        //   text.visible = true
        //   utils.setTimeout(4000, () => {
        //     textContainer.visible = false
        //     text.visible = false;
        //   })
        //   return
        // }
        // movePlayerTo({ x: 190, y: 100, z: 40 }, { x: 55, y: 88, z: 40 })
        if (e.buttonId === 0) {
          if (categoryInstance.categoryContainer.visible === true) return;
          // categoryInstance.showCategory();
          categoryInstance.getHistory();
          categoryInstance.subscribeEvent();
          return;
        }
      },
      {
        hoverText: "Join a quiz!",
        distance: 400,
      }
    )
  );
  engine.addEntity(monkey);
  // quiz.init(questions)
  class SimpleRotate implements ISystem {
    update() {
      let transform = monkey.getComponent(Transform)
      transform.rotate(Vector3.Down(), 1)
    }
  }
   
  engine.addSystem(new SimpleRotate())
}

let uiArea = new Entity();
uiArea.addComponent(
  new Transform({
    position: new Vector3(16, 0, 16),
    scale: new Vector3(100, 100, 100),
  })
);
engine.addEntity(uiArea);

uiArea.addComponent(
  new utils.TriggerComponent(
    new utils.TriggerBoxShape(new Vector3(32, 32, 32), Vector3.Zero()),
    {
      onCameraEnter: () => {
        if (!sceneStarted) {
          log("scene started");
          setUpScene();
          sceneStarted = true;
        }
      },
      onCameraExit: () => {},
    }
  )
);
