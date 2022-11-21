// import { RequestManager, HTTPProvider } from "eth-connect";
import { Quiz } from "./quiz";
import msgtype from "./uno/msgtype";
import { movePlayerTo } from "@decentraland/RestrictedActions";
import { getUserData } from "@decentraland/Identity";

const imageClose = new Texture("images/close_button.png");
// const provider = "https://evm.shibuya.astar.network";
// const providerInstance = new HTTPProvider(provider);
// const requestManager = new RequestManager(providerInstance);
const canvas = new UICanvas();
const playImage = new Texture("images/play.png");
const imageTexture000 = new Texture("images/UI_Guestbook.png");

const Key_1_Img = new Texture("images/1.png");
const Key_2_Img = new Texture("images/2.png");
const Key_3_Img = new Texture("images/3.png");
const Key_4_Img = new Texture("images/4.png");
const Key_e_Img = new Texture("images/e.png");
const Key_f_Img = new Texture("images/f.png");
const Key_space_Img = new Texture("images/space.png");
const highlight_Img = new Texture("images/highlight.png");

const parachains = [
  {
    id: 0,
    category: "Talisman",
    image: new Texture("images/parachains/talisman.png"),
  },
  {
    id: 1,
    category: "Acala",
    image: new Texture("images/parachains/acala.png"),
  },
  {
    id: 2,
    category: "Astar",
    image: new Texture("images/parachains/astar.png"),
  },
  {
    id: 3,
    category: "Moonbeam",
    image: new Texture("images/parachains/moonbeam.png"),
  },
  {
    id: 4,
    category: "Centrifuge",
    image: new Texture("images/parachains/centrifuge.png"),
  },
  {
    id: 5,
    category: "Clover",
    image: new Texture("images/parachains/clover.png"),
  },
  {
    id: 6,
    category: "Coinversation",
    image: new Texture("images/parachains/coinversation.png"),
  },
  {
    id: 7,
    category: "Composable",
    image: new Texture("images/parachains/composable.png"),
  },
  {
    id: 8,
    category: "Unique",
    image: new Texture("images/parachains/unique.png"),
  },
  {
    id: 9,
    category: "Efinity",
    image: new Texture("images/parachains/efinity.png"),
  },
  {
    id: 10,
    category: "Equilibrium",
    image: new Texture("images/parachains/equilibrium.png"),
  },
  {
    id: 11,
    category: "HydraDX",
    image: new Texture("images/parachains/hydradx.png"),
  },
  {
    id: 12,
    category: "Integritee",
    image: new Texture("images/parachains/integritee.png"),
  },
  {
    id: 13,
    category: "Interlay",
    image: new Texture("images/parachains/interlay.png"),
  },
  {
    id: 14,
    category: "Kylin",
    image: new Texture("images/parachains/kylin.png"),
  },
  {
    id: 15,
    category: "Litentry",
    image: new Texture("images/parachains/litentry.png"),
  },
  {
    id: 16,
    category: "Bifrost",
    image: new Texture("images/parachains/Bifrost.png"),
  },
  {
    id: 17,
    category: "Nodle",
    image: new Texture("images/parachains/nodle.png"),
  },
  {
    id: 18,
    category: "Origintrail",
    image: new Texture("images/parachains/origintrail.png"),
  },
  {
    id: 19,
    category: "Parallel",
    image: new Texture("images/parachains/parallel.png"),
  },
  {
    id: 20,
    category: "Phala",
    image: new Texture("images/parachains/phala.png"),
  },
  {
    id: 21,
    category: "Polkadex",
    image: new Texture("images/parachains/polkadex.png"),
  },
  {
    id: 22,
    category: "Totem",
    image: new Texture("images/parachains/totem.png"),
  },
  {
    id: 23,
    category: "Kylin",
    image: new Texture("images/parachains/kylin.png"),
  },
  {
    id: 24,
    category: "Integritee",
    image: new Texture("images/parachains/integritee.png"),
  },
  {
    id: 25,
    category: "Aventus",
    image: new Texture("images/parachains/aventus.png"),
  },
  {
    id: 26,
    category: "Oak",
    image: new Texture("images/parachains/oak.png"),
  },
  {
    id: 27,
    category: "Ajuna",
    image: new Texture("images/parachains/ajuna.png"),
  },
  {
    id: 28,
    category: "Crust",
    image: new Texture("images/parachains/crust.png"),
  },
  {
    id: 29,
    category: "Maths",
    image: new Texture("images/parachains/math.png"),
  },
];
let instance: Parachain;

const input = Input.instance;
class Parachain {
  curCategory: string = "";
  quizInstance: Quiz;
  categoryContainer = new UIContainerRect(canvas);
  titleText = new UIText(canvas);
  closeBtn = new UIImage(canvas, imageClose);
  paraLogos: UIImage[] = [];
  highlights: UIImage[] = [];
  paraLabels: UIText[] = [];
  categoryLabel = new UIContainerStack(canvas);
  sname = new UIText(canvas);
  statusTxt = new UIText(canvas);
  socket: WebSocket;
  page: number = 0;
  previousPage = new UIImage(canvas, imageTexture000);
  nextPage = new UIImage(canvas, imageTexture000);
  pageText = new UIText(canvas);
  categoryText = new UIText(canvas);
  Key_1 = new UIImage(canvas, Key_1_Img);
  Key_2 = new UIImage(canvas, Key_2_Img);
  Key_3 = new UIImage(canvas, Key_3_Img);
  Key_4 = new UIImage(canvas, Key_4_Img);
  Key_e = new UIImage(canvas, Key_e_Img);
  Key_f = new UIImage(canvas, Key_f_Img);
  Key_space = new UIImage(canvas, Key_space_Img);
  playBtn = new UIImage(canvas, playImage);
  history: any[] = [];

  constructor(quiz: Quiz, socket: WebSocket) {
    this.quizInstance = quiz;
    this.socket = socket;
    this.categoryLabel.adaptWidth = true;
    this.categoryLabel.adaptHeight = true;
    this.categoryLabel.width = 146;
    this.categoryLabel.height = 30;
    this.categoryLabel.positionX = 12;
    this.categoryLabel.positionY = -120;
    this.categoryLabel.color = Color4.Yellow();
    this.categoryLabel.hAlign = "left";
    this.categoryLabel.vAlign = "top";
    this.categoryLabel.stackOrientation = UIStackOrientation.VERTICAL;
    this.categoryLabel.opacity = 0.3;

    this.sname.width = 146;
    this.sname.height = 30;
    this.sname.hAlign = "left";
    this.sname.vAlign = "top";
    this.sname.positionX = 12;
    this.sname.positionY = -120;
    this.sname.fontSize = 14;
    this.sname.vTextAlign = "center";
    this.sname.hTextAlign = "center";
    this.sname.color = Color4.Black();
    this.sname.value = "";

    this.closeBtn.width = 45;
    this.closeBtn.height = 45;
    this.closeBtn.hAlign = "center";
    this.closeBtn.vAlign = "top";
    this.closeBtn.positionY = 0;
    this.closeBtn.positionX = 315;
    this.closeBtn.sourceWidth = 200;
    this.closeBtn.sourceHeight = 200;
    this.closeBtn.onClick = new OnPointerDown(() => {
      this.closeCategory();
    });

    this.playBtn.width = 110;
    this.playBtn.height = 38;
    this.playBtn.hAlign = "center";
    this.playBtn.vAlign = "top";
    this.playBtn.positionY = -490;
    this.playBtn.positionX = 0;
    this.playBtn.sourceWidth = 170;
    this.playBtn.sourceHeight = 64;
    this.playBtn.visible = false;
    this.playBtn.onClick = new OnPointerDown(() => {
      this.closeCategory();
      // movePlayerTo({ x: 190, y: 100, z: 40 }, { x: 55, y: 88, z: 40 });
      this.quizInstance.showQuestion()
    });
    this.Key_space.width = 48;
    this.Key_space.height = 48;
    this.Key_space.hAlign = "center";
    this.Key_space.vAlign = "top";
    this.Key_space.positionY = -520;
    this.Key_space.positionX = 0;
    this.Key_space.sourceWidth = 48;
    this.Key_space.sourceHeight = 48;
    this.Key_space.visible = false;

    this.statusTxt.width = 0;
    this.statusTxt.height = 0;
    this.statusTxt.hAlign = "center";
    this.statusTxt.vAlign = "top";
    this.statusTxt.positionY = -560;
    this.statusTxt.positionX = 0;
    this.statusTxt.fontSize = 22;
    this.statusTxt.hTextAlign = "center";
    this.statusTxt.color = Color4.Blue();
    this.statusTxt.value = "(Click a category)";

    this.categoryText.width = 0;
    this.categoryText.height = 0;
    this.categoryText.hAlign = "center";
    this.categoryText.vAlign = "top";
    this.categoryText.positionY = -480;
    this.categoryText.positionX = 0;
    this.categoryText.fontSize = 28;
    this.categoryText.hTextAlign = "center";
    this.categoryText.color = Color4.Purple();
    this.categoryText.value = "";

    this.categoryContainer.width = 700;
    this.categoryContainer.height = 600;
    this.categoryContainer.positionY = 10;
    this.categoryContainer.positionX = 0;
    this.categoryContainer.color = Color4.White();
    this.categoryContainer.hAlign = "center";
    this.categoryContainer.vAlign = "top";
    this.categoryContainer.opacity = 0.6;

    this.titleText.value = "Choose a Category";
    this.titleText.width = 0;
    this.titleText.height = 0;
    this.titleText.hAlign = "center";
    this.titleText.vAlign = "top";
    this.titleText.fontSize = 35;
    this.titleText.shadowBlur = 10;
    this.titleText.positionY = -45;
    this.titleText.positionX = 0;
    this.titleText.hTextAlign = "center";
    this.titleText.color = Color4.Black();

    this.previousPage.width = 35;
    this.previousPage.height = 35;
    this.previousPage.hAlign = "center";
    this.previousPage.vAlign = "top";
    this.previousPage.positionY = -100;
    this.previousPage.positionX = -220;
    this.previousPage.sourceWidth = 75;
    this.previousPage.sourceHeight = 75;
    this.previousPage.onClick = new OnPointerDown(() => {
      this.updatePage(undefined, -1);
    });

    this.nextPage.width = 35;
    this.nextPage.height = 35;
    this.nextPage.hAlign = "center";
    this.nextPage.vAlign = "top";
    this.nextPage.positionY = -100;
    this.nextPage.positionX = 220;
    this.nextPage.sourceWidth = 75;
    this.nextPage.sourceHeight = 75;
    this.nextPage.sourceLeft = 537;
    this.nextPage.onClick = new OnPointerDown(() => {
      this.updatePage(undefined, 1);
    });

    this.Key_f.width = 35;
    this.Key_f.height = 35;
    this.Key_f.hAlign = "center";
    this.Key_f.vAlign = "top";
    this.Key_f.positionY = -140;
    this.Key_f.positionX = -220;
    this.Key_f.sourceWidth = 48;
    this.Key_f.sourceHeight = 48;

    this.Key_e.width = 35;
    this.Key_e.height = 35;
    this.Key_e.hAlign = "center";
    this.Key_e.vAlign = "top";
    this.Key_e.positionY = -140;
    this.Key_e.positionX = 220;
    this.Key_e.sourceWidth = 48;
    this.Key_e.sourceHeight = 48;

    this.Key_1.width = 35;
    this.Key_1.height = 35;
    this.Key_1.hAlign = "center";
    this.Key_1.vAlign = "top";
    this.Key_1.positionY = -400;
    this.Key_1.positionX = -225;
    this.Key_1.sourceWidth = 48;
    this.Key_1.sourceHeight = 48;

    this.Key_2.width = 35;
    this.Key_2.height = 35;
    this.Key_2.hAlign = "center";
    this.Key_2.vAlign = "top";
    this.Key_2.positionY = -400;
    this.Key_2.positionX = -225 + 150;
    this.Key_2.sourceWidth = 48;
    this.Key_2.sourceHeight = 48;

    this.Key_3.width = 35;
    this.Key_3.height = 35;
    this.Key_3.hAlign = "center";
    this.Key_3.vAlign = "top";
    this.Key_3.positionY = -400;
    this.Key_3.positionX = -225 + 300;
    this.Key_3.sourceWidth = 48;
    this.Key_3.sourceHeight = 48;

    this.Key_4.width = 35;
    this.Key_4.height = 35;
    this.Key_4.hAlign = "center";
    this.Key_4.vAlign = "top";
    this.Key_4.positionY = -400;
    this.Key_4.positionX = -225 + 450;
    this.Key_4.sourceWidth = 48;
    this.Key_4.sourceHeight = 48;

    this.pageText.width = 0;
    this.pageText.height = 0;
    this.pageText.hAlign = "center";
    this.pageText.vAlign = "top";
    this.pageText.positionY = -130;
    this.pageText.positionX = 0;
    this.pageText.fontSize = 22;
    this.pageText.hTextAlign = "center";
    this.pageText.color = Color4.Black();
    this.pageText.value = "";
    // super();
    parachains.map((para, index) => {
      const gold = new UIImage(canvas, highlight_Img);
      gold.width = 180;
      gold.height = 180;
      gold.hAlign = "center";
      gold.vAlign = "top";
      gold.positionY = -175;
      gold.positionX = -225 + 150 * (para.id % 4);
      gold.sourceWidth = 200;
      gold.sourceHeight = 200;

      const img = new UIImage(canvas, para.image);
      img.width = 110;
      img.height = 110;
      img.hAlign = "center";
      img.vAlign = "top";
      img.positionY = -210;
      img.positionX = -225 + 150 * (para.id % 4);
      img.sourceWidth = 150;
      img.sourceHeight = 150;
      img.visible = true;
      img.onClick = new OnPointerDown(() => {
        // this.sname.value = para.category.toUpperCase();
        // this.curCategory = para.category;
        // this.socket.send(
        //   JSON.stringify({
        //     type: msgtype.GET_QUIZ_BY_CATEGORY,
        //     category: para.category,
        //   })
        // );
        this.onClickLogo(index);
      });
      const txt = new UIText(canvas);
      txt.width = 85;
      txt.height = 0;
      txt.hAlign = "center";
      txt.vAlign = "top";
      txt.hTextAlign = "center";
      txt.value = para.category;
      txt.color = Color4.Blue();
      txt.fontSize = 20;
      txt.positionY = -375;
      txt.positionX = -225 + 150 * (para.id % 4);
      txt.visible = true;
      this.paraLabels.push(txt);
      this.paraLogos.push(img);
      this.highlights.push(gold);
    });
    this.closeCategory();
    instance = this;
  }
  async getHistory() {
    const userData = await getUserData();
    this.socket.send(
      JSON.stringify({
        type: msgtype.GET_HISTORY_REQUEST,
        user: userData?.userId,
      })
    );
  }
  setHistory(history: any[]) {
    this.history = history;
    this.showCategory();
  }
  onClickLogo(i: number) {
    const para = parachains[i];
    this.sname.value = para.category.toUpperCase();
    this.curCategory = para.category;
    this.categoryText.value = para.category.toUpperCase();
    this.socket.send(
      JSON.stringify({
        type: msgtype.GET_QUIZ_BY_CATEGORY,
        category: para.category,
      })
    );
  }
  selectCategory(data: any[]) {
    const questionsToShow: any[] = data.map((item: any) => {
      return {
        ...item,
        answers: JSON.parse(item.answers),
        author: JSON.parse(item.author),
      };
    });
    if (questionsToShow.length >= 4) {
      this.statusTxt.visible = false;
      this.playBtn.visible = true;
      this.Key_space.visible = true;
      if (this.quizInstance.initialized) this.quizInstance.reset();
      this.quizInstance.init(
        questionsToShow.sort((a, b) => 0.5 - Math.random())
      );
    } else {
      this.statusTxt.visible = true;
      this.playBtn.visible = false;
      this.Key_space.visible = false;
      this.statusTxt.color = Color4.Red();
      this.statusTxt.value = "Coming Soon";
      if (this.quizInstance.initialized) this.quizInstance.reset();
    }
  }
  showCategory() {
    const start = 4 * this.page;
    const end =
      4 * this.page + 3 > parachains.length - 1
        ? parachains.length - 1
        : 4 * this.page + 3;
    for (let i = 0; i < this.paraLabels.length; i++) {
      if (i >= start && i <= end) {
        this.paraLabels[i].visible = true;
        this.paraLogos[i].visible = true;
        let passed = false;
        this.history.map((item) => {
          if (item.category === this.paraLabels[i].value) passed = true;
          return;
        });
        this.highlights[i].visible = passed;
      } else {
        this.paraLabels[i].visible = false;
        this.paraLogos[i].visible = false;
        this.highlights[i].visible = false;
      }
    }
    this.pageText.value = `${start + 1}-${end + 1}/${parachains.length}`;
    this.titleText.visible = true;
    this.categoryContainer.visible = true;
    this.closeBtn.visible = true;
    if (this.curCategory === "") {
      this.statusTxt.value = "(Click a category)";
      this.statusTxt.color = Color4.Blue();
      this.playBtn.visible = false;
      this.Key_space.visible = false;
      this.statusTxt.visible = true;
    }
    if (this.quizInstance.initialized) {
      this.playBtn.visible = true;
      this.Key_space.visible = true;
    } else this.statusTxt.visible = true;
    this.previousPage.visible = true;
    this.nextPage.visible = true;
    this.pageText.visible = true;
    this.sname.visible = false;
    this.categoryLabel.visible = false;
    this.categoryText.visible = true;
    this.Key_1.visible = true;
    this.Key_2.visible = true;
    this.Key_3.visible = true;
    this.Key_4.visible = true;
    this.Key_e.visible = true;
    this.Key_f.visible = true;
  }
  subscribeEvent() {
    input.subscribe(
      "BUTTON_DOWN",
      ActionButton.SECONDARY,
      false,
      this.updatePage
    );
    input.subscribe(
      "BUTTON_DOWN",
      ActionButton.PRIMARY,
      false,
      this.updatePage
    );
    input.subscribe(
      "BUTTON_DOWN",
      ActionButton.ACTION_3,
      false,
      this.onNumKeyEvent
    );
    input.subscribe(
      "BUTTON_DOWN",
      ActionButton.ACTION_4,
      false,
      this.onNumKeyEvent
    );
    input.subscribe(
      "BUTTON_DOWN",
      ActionButton.ACTION_5,
      false,
      this.onNumKeyEvent
    );
    input.subscribe(
      "BUTTON_DOWN",
      ActionButton.ACTION_6,
      false,
      this.onNumKeyEvent
    );
    input.subscribe("BUTTON_DOWN", ActionButton.JUMP, false, this.onJumpEvent);
  }
  onJumpEvent(e: any) {
    if (instance.quizInstance.initialized) {
      instance.closeCategory();
      // movePlayerTo({ x: 190, y: 100, z: 40 }, { x: 55, y: 88, z: 40 });
      instance.quizInstance.showQuestion()
    }
  }
  onNumKeyEvent(e: any) {
    const keyNum = e.buttonId - 10;
    const index = instance.page * 4 + keyNum;
    if (index > parachains.length - 1) return;
    instance.onClickLogo(index);
  }
  unsubscribeEvent() {
    input.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY, this.updatePage);
    input.unsubscribe("BUTTON_DOWN", ActionButton.PRIMARY, this.updatePage);
    input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_3, this.onNumKeyEvent);
    input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_4, this.onNumKeyEvent);
    input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_5, this.onNumKeyEvent);
    input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_6, this.onNumKeyEvent);
    input.unsubscribe("BUTTON_DOWN", ActionButton.JUMP, this.onJumpEvent);
  }
  showParachains() {

    let xcord = 254;
    let ycord = 50;
    let zcord = 3;

    const parachain1 = new Entity();
    engine.addEntity(parachain1);

    parachain1.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord, ycord),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );

    parachain1.addComponent(new GLTFShape("models/moonbeam.glb"));
    parachain1.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `MOONBEAM`;
          this.categoryLabel.visible = true          
          openExternalURL("https://moonbeam.network");
          
        },
        {
          hoverText: "Moonbeam Network!",
          distance: 200,
        }
      )
    );

    const parachain2 = new Entity();
    engine.addEntity(parachain2);

    parachain2.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord, ycord - 5),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain2.addComponent(new GLTFShape("models/acala.glb"));
    parachain2.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `ACALA`;
          this.categoryLabel.visible = true
          // this.selectCategory("Acala");
          openExternalURL("https://acala.network/");
        },
        {
          hoverText: "Acala Network!",
          distance: 200,
        }
      )
    );

    const parachain3 = new Entity();
    engine.addEntity(parachain3);

    parachain3.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord, ycord - 10),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain3.addComponent(new GLTFShape("models/para.glb"));
    parachain3.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `PARALLEL`;
          this.categoryLabel.visible = true
          // this.selectCategory("Parallel");
          openExternalURL("https://parallel.fi/");
        },
        {
          hoverText: "Parallel!",
          distance: 200,
        }
      )
    );

    let parachain4 = new Entity();
    engine.addEntity(parachain4);

    parachain4.addComponent(
      new Transform(
        new Transform({
          position: new Vector3(xcord, zcord, ycord - 15),
          scale: new Vector3(2, 2, 1),
          rotation: Quaternion.Euler(0, 90, 0),
        })
      )
    );
    parachain4.addComponent(new GLTFShape("models/astar2.glb"));
    parachain4.addComponent(
      new OnPointerDown(
        async () => {
          this.categoryLabel.visible = true 
          this.sname.value = `ASTAR`;
          // let userBalance = '0'
          // let address: string
          // try {
          //   address = await getUserAccount()
          //   // const balance = await getUserBalance()
          //   log(address)
          //   const balance = await requestManager.eth_getBalance(address, address)
          //   userBalance = balance.minus(balance.mod(1e14)).div(1e18).toString()
          //   log(userBalance)
          // } catch (error) {
          //   log(error)
          // }
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
          openExternalURL("https://astar.network/")
          // class SimpleRotate3 implements ISystem {
          //   update() {
          //     let transform = parachain4.getComponent(Transform);
          //     transform.rotate(Vector3.Backward(), 1);
          //   }
          // }
          // engine.addSystem(new SimpleRotate3());
        },
        {
          hoverText: "Astar Network!",

          distance: 200,
        }
      )
    );

    const parachain5 = new Entity();
    engine.addEntity(parachain5);

    parachain5.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord, ycord - 20),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain5.addComponent(new GLTFShape("models/clover.glb"));
    parachain5.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `CLOVER`; this.categoryLabel.visible = true 
          openExternalURL("https://clover.finance/");
        },
        {
          hoverText: "Clover!",
          distance: 200,
        }
      )
    );

    const parachain6 = new Entity();
    engine.addEntity(parachain6);

    parachain6.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 5, ycord),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain6.addComponent(new GLTFShape("models/efin.glb"));
    parachain6.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `EFINITY`; this.categoryLabel.visible = true 
          openExternalURL("https://enjin.io/products/efinity");
        },
        {
          hoverText: "Efinity!",
          distance: 200,
        }
      )
    );

    const parachain7 = new Entity();
    engine.addEntity(parachain7);

    parachain7.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 5, ycord - 5),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain7.addComponent(new GLTFShape("models/composable.glb"));
    parachain7.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `COMPOSABLE`; this.categoryLabel.visible = true 
          openExternalURL("https://www.composable.finance/");
        },
        {
          hoverText: "Composable!",
          distance: 200,
        }
      )
    );

    const parachain8 = new Entity();
    engine.addEntity(parachain8);

    parachain8.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 5, ycord - 10),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain8.addComponent(new GLTFShape("models/centri.glb"));
    parachain8.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `CENTRIFUGE`; this.categoryLabel.visible = true 
          openExternalURL("https://centrifuge.io/");
        },
        {
          hoverText: "Centrifuge!",
          distance: 200,
        }
      )
    );

    const parachain9 = new Entity();
    engine.addEntity(parachain9);

    parachain9.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 5, ycord - 15),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain9.addComponent(new GLTFShape("models/interlay.glb"));
    parachain9.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `INTERLAY`; this.categoryLabel.visible = true 
          openExternalURL("https://www.interlay.io/");
        },
        {
          hoverText: "Interlay!",
          distance: 200,
        }
      )
    );

    const parachain10 = new Entity();
    engine.addEntity(parachain10);

    parachain10.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 5, ycord - 20),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain10.addComponent(new GLTFShape("models/nodle.glb"));
    parachain10.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `NODLE`; this.categoryLabel.visible = true 
          openExternalURL("https://nodle.com/");
        },
        {
          hoverText: "Nodle!",
          distance: 200,
        }
      )
    );

    const parachain11 = new Entity();
    engine.addEntity(parachain11);

    parachain11.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 10, ycord),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain11.addComponent(new GLTFShape("models/hydradx.glb"));
    parachain11.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `HYDRADX`; this.categoryLabel.visible = true 
          openExternalURL("https://hydradx.io/");
        },
        {
          hoverText: "HydraDX!",
          distance: 200,
        }
      )
    );

    const parachain12 = new Entity();
    engine.addEntity(parachain12);

    parachain12.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 10, ycord - 5),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain12.addComponent(new GLTFShape("models/equil.glb"));
    parachain12.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `EQUILIBRIUM`; this.categoryLabel.visible = true 
          openExternalURL("https://equilibrium.io/");
        },
        {
          hoverText: "Equilibrium!",
          distance: 200,
        }
      )
    );

    const parachain13 = new Entity();
    engine.addEntity(parachain13);

    parachain13.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 10, ycord - 10),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain13.addComponent(new GLTFShape("models/phala.glb"));
    parachain13.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `PHALA`; this.categoryLabel.visible = true 
          openExternalURL("https://phala.network/");
        },
        {
          hoverText: "Phala!",
          distance: 200,
        }
      )
    );

    const parachain14 = new Entity();
    engine.addEntity(parachain14);

    parachain14.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 10, ycord - 15),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain14.addComponent(new GLTFShape("models/polkadex.glb"));
    parachain14.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `POLKADEX`; this.categoryLabel.visible = true 
          openExternalURL("https://www.polkadex.trade/");
        },
        {
          hoverText: "Polkadex!",
          distance: 200,
        }
      )
    );

    const parachain15 = new Entity();
    engine.addEntity(parachain15);

    parachain15.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 10, ycord - 20),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain15.addComponent(new GLTFShape("models/lit.glb"));
    parachain15.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `LITENTRY`; this.categoryLabel.visible = true 
          openExternalURL("https://www.litentry.com/");
        },
        {
          hoverText: "Litentry!",
          distance: 200,
        }
      )
    );

    const parachain16 = new Entity();
    engine.addEntity(parachain16);

    parachain16.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 15, ycord),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain16.addComponent(new GLTFShape("models/unique.glb"));
    parachain16.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `UNIQUE`; this.categoryLabel.visible = true 
          openExternalURL("https://unique.network/");
        },
        {
          hoverText: "Unique Network!",
          distance: 200,
        }
      )
    );

    const parachain17 = new Entity();
    engine.addEntity(parachain17);

    parachain17.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 15, ycord - 5),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain17.addComponent(new GLTFShape("models/origin.glb"));
    parachain17.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `ORIGIN`; this.categoryLabel.visible = true 
          openExternalURL("https://parachain.origintrail.io/");
        },
        {
          hoverText: "OriginTrail!",
          distance: 200,
        }
      )
    );

    const parachain18 = new Entity();
    engine.addEntity(parachain18);

    parachain18.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 15, ycord - 10),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain18.addComponent(new GLTFShape("models/bifrost.glb"));
    parachain18.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `BIFROST`; this.categoryLabel.visible = true 
          openExternalURL("https://bifrost.finance/");
        },
        {
          hoverText: "Bifrost!",
          distance: 200,
        }
      )
    );

    const parachain19 = new Entity();
    engine.addEntity(parachain19);

    parachain19.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 15, ycord - 15),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain19.addComponent(new GLTFShape("models/coinversation.glb"));
    parachain19.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `COINVERSATION`; this.categoryLabel.visible = true 
          openExternalURL("https://www.coinversation.io/");
        },
        {
          hoverText: "Coinversation!",
          distance: 200,
        }
      )
    );

    const parachain20 = new Entity();
    engine.addEntity(parachain20);

    parachain20.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 15, ycord - 20),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain20.addComponent(new GLTFShape("models/totem.glb"));
    parachain20.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `TOTEM`; this.categoryLabel.visible = true 
          openExternalURL("https://totemaccounting.com/");
        },
        {
          hoverText: "Totem!",
          distance: 200,
        }
      )
    );

    const parachain21 = new Entity();
    engine.addEntity(parachain21);

    parachain21.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 20, ycord),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain21.addComponent(new GLTFShape("models/kylin.glb"));
    parachain21.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `KYLIN`; this.categoryLabel.visible = true 
          openExternalURL("https://kylin.network/");
        },
        {
          hoverText: "Kylin!",
          distance: 200,
        }
      )
    );

    const parachain22 = new Entity();
    engine.addEntity(parachain22);

    parachain22.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 20, ycord - 5),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain22.addComponent(new GLTFShape("models/integr.glb"));
    parachain22.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `INTEGRITEE`; this.categoryLabel.visible = true 
          openExternalURL("https://integritee.network/");
        },
        {
          hoverText: "Integritee!",
          distance: 200,
        }
      )
    );

    const parachain23 = new Entity();
    engine.addEntity(parachain23);

    parachain23.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 20, ycord - 10),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain23.addComponent(new GLTFShape("models/aventus.glb"));
    parachain23.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `AVENTUS`; this.categoryLabel.visible = true 
          openExternalURL("https://www.aventus.io/");
        },
        {
          hoverText: "Aventus!",
          distance: 200,
        }
      )
    );

    const parachain24 = new Entity();
    engine.addEntity(parachain24);

    parachain24.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 20, ycord - 15),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain24.addComponent(new GLTFShape("models/oak.glb"));
    parachain24.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `OAK`; this.categoryLabel.visible = true 
          openExternalURL("https://www.oak.tech/");
        },
        {
          hoverText: "Oak!",
          distance: 200,
        }
      )
    );

    const parachain25 = new Entity();
    engine.addEntity(parachain25);

    parachain25.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 20, ycord - 20),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain25.addComponent(new GLTFShape("models/ajuna.glb"));
    parachain25.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `AJUNA`; this.categoryLabel.visible = true 
          openExternalURL("https://www.ajuna.io/");
        },
        {
          hoverText: "Ajuna!",
          distance: 200,
        }
      )
    );

    const parachain26 = new Entity();
    engine.addEntity(parachain26);

    parachain26.addComponent(
      new Transform({
        position: new Vector3(xcord, zcord + 25, ycord - 10),
        scale: new Vector3(2, 2, 1),
        rotation: Quaternion.Euler(0, 90, 0),
      })
    );
    parachain26.addComponent(new GLTFShape("models/crust.glb"));
    parachain26.addComponent(
      new OnPointerDown(
        () => {
          this.sname.value = `CRUST`; this.categoryLabel.visible = true 
          openExternalURL("https://www.crust.network/");
        },
        {
          hoverText: "Crust!",
          distance: 200,
        }
      )
    );


  }
  updatePage(e: any, dif = 0) {
    let diff = dif;
    if (e) {
      if (e.buttonId === 1) diff = 1;
      if (e.buttonId === 2) diff = -1;
    }
    log("--------------------------------", diff);
    if (diff > 0) {
      if (instance.page * 4 + 3 >= parachains.length - 1) return;
      else {
        instance.page = instance.page + 1;
        instance.showCategory();
      }
    } else {
      if (instance.page === 0) return;
      else {
        instance.page = instance.page - 1;
        instance.showCategory();
      }
    }
  }
  closeCategory() {
    for (let i = 0; i < this.paraLabels.length; i++) {
      this.paraLabels[i].visible = false;
      this.paraLogos[i].visible = false;
      this.highlights[i].visible = false;
    }
    this.titleText.visible = false;
    this.categoryContainer.visible = false;
    this.closeBtn.visible = false;
    this.statusTxt.visible = false;
    this.playBtn.visible = false;
    this.Key_space.visible = false;
    this.previousPage.visible = false;
    this.nextPage.visible = false;
    this.pageText.visible = false;
    this.sname.visible = true;
    this.categoryText.visible = false;
    if (this.sname.value !== "") this.categoryLabel.visible = true
    else this.categoryLabel.visible = false;
    this.unsubscribeEvent();
    this.Key_1.visible = false;
    this.Key_2.visible = false;
    this.Key_3.visible = false;
    this.Key_4.visible = false;
    this.Key_e.visible = false;
    this.Key_f.visible = false;
  }
}

export default Parachain;
