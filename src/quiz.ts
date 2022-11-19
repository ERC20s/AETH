import * as utils from "@dcl/ecs-scene-utils";
import { getUserData } from "@decentraland/Identity";
import msgtype from "./uno/msgtype";

const pickup = new AudioClip("sounds/coinPickup.mp3");
const success = new AudioSource(pickup);
const pickup2 = new AudioClip("sounds/orbDrop.mp3");
const fail = new AudioSource(pickup2);
const imageAtlas = "images/UI-atlas3.png";
const imageTexture2 = new Texture(imageAtlas);
const imageTexture3 = new Texture("images/next.png");
const imageWrapper = new Texture("images/image_wrapper.png");
const imageClose = new Texture("images/close_button.png");

const canvas4 = new UICanvas();
const canvas3 = new UICanvas();
const canvas2 = new UICanvas();
const input = Input.instance;

let interval: utils.Interval;
interface Question {
  id: string; //unique string such as hash
  type: string; //choice, picture, input, interactive
  question: string;
  answers: string[];
  correct: string;
  category: string; // astar, javascript, maths ...
  learnMoreUrl: string; // https://astar.network/, ...
}

const shuffle = (strings: string[]) => {
  return strings.sort((a, b) => 0.5 - Math.random());
};
let instance: Quiz;

export class Quiz extends Entity {
  initialized: boolean = false;
  socket: WebSocket;
  currentStep = 0;
  category = "";
  steps: Entity[] = [];
  quizPassedCnt: number = 0;
  ans: UIText[] = [];
  ansImage: UIImage[] = [];
  but: UIImage[] = [];
  butImage: UIImage[] = [];
  questionContainer = new UIContainerStack(canvas4);
  q1 = new UIText(canvas4);
  ansInput = new UIInputText(canvas4);
  checkPoints: Entity[] = [];
  questions: Question[] = [];
  exit = new UIImage(canvas2, imageClose);
  locked = false;
  monkey: Entity = new Entity();
  countText: UIText = new UIText(canvas2);
  resultText: UIText = new UIText(canvas2);
  constructor(socket: WebSocket) {
    super();
    this.socket = socket;
    const soundSuccess = new Entity();
    soundSuccess.addComponent(success);
    const soundFailed = new Entity();
    soundFailed.addComponent(fail);
    engine.addEntity(soundSuccess);
    engine.addEntity(soundFailed);
    log("ADDED SUONDS=========================");
    // for (let i = 0; i < 17; i++) {
    //   const step = new Entity();
    //   if (i === 0) step.addComponent(fail);
    //   if (i === 3) step.addComponent(success);
    //   // if (i < 4) step.addComponent(new GLTFShape("models/logo3.glb"))
    //   step.addComponent(
    //     new Transform({
    //       position: new Vector3(190 - i * 10, 40, 40),
    //       rotation: Quaternion.Euler(0, 0, 0),
    //     })
    //   );
    //   engine.addEntity(step);
    //   this.steps.push(step);
    // }
    engine.addEntity(this);
    this.questionContainer.visible = false;
    this.q1.visible = false;
    this.exit.visible = false;
    this.ansInput.visible = false;
    instance = this;
  }
  init(questions: Question[]) {
    this.category = questions[0].category;
    this.initialized = true;
    // for (let i = 0; i < 4; i++) {
    //   this.steps[i].addComponent(new GLTFShape("models/logo3.glb"));
    // }

    for (let i = 0; i < 5; i++) {
      const ans1 = new UIText(canvas4);
      const textWrapper = new UIImage(canvas3, imageTexture3);
      const but1Image = new UIImage(canvas3, imageWrapper);
      const ans1Image = new UIImage(canvas3, imageTexture3);
      const but1 = textWrapper;
      this.ans.push(ans1);
      this.but.push(but1);
      this.butImage.push(but1Image);
      this.ansImage.push(ans1Image);
    }
    this.questions = questions;
    this.questionContainer.adaptWidth = true;
    this.questionContainer.adaptHeight = true;
    this.questionContainer.width = "50%";
    this.questionContainer.height = "80%";
    this.questionContainer.color = Color4.Yellow();
    this.questionContainer.hAlign = "center";
    this.questionContainer.vAlign = "center";
    this.questionContainer.stackOrientation = UIStackOrientation.VERTICAL;
    this.questionContainer.opacity = 0.4;

    this.exit.sourceWidth = 200;
    this.exit.sourceHeight = 200;
    this.exit.width = 45;
    this.exit.height = 45;
    this.exit.positionY = "81%";
    this.exit.positionX = "26.1%";
    this.exit.hAlign = "left";
    this.exit.vAlign = "bottom";
    this.exit.onClick = new OnPointerDown(() => {
      this.onClose();
      this.unsub();
    });

    this.countText.width = 60;
    this.countText.height = 60;
    this.countText.positionY = "80%";
    this.countText.positionX = "-25.1%";
    this.countText.hAlign = "right";
    this.countText.vAlign = "bottom";
    this.countText.vTextAlign = "center";
    this.countText.color = Color4.Green();
    this.countText.fontSize = 24;

    this.resultText.hAlign = "center";
    this.resultText.vAlign = "center";
    this.resultText.vTextAlign = "center";
    this.resultText.hTextAlign = "center";
    this.resultText.color = Color4.Green();
    this.resultText.textWrapping = true;
    this.resultText.width = "45%";
    this.resultText.fontSize = 36;

    this.q1.hAlign = "center";
    this.q1.vAlign = "top";
    this.q1.positionY = "-12%";
    this.q1.fontSize = 26;
    this.q1.width = "38%";
    this.q1.hTextAlign = "center";
    this.q1.vTextAlign = "top";
    this.q1.textWrapping = true;
    this.q1.color = Color4.Black();

    this.ansInput.width = "40%";
    this.ansInput.height = "30px";
    this.ansInput.vAlign = "bottom";
    this.ansInput.hAlign = "center";
    this.ansInput.fontSize = 14;
    this.ansInput.placeholder = "";
    this.ansInput.positionY = "64%";
    this.ansInput.paddingLeft = 18;
    this.ansInput.paddingRight = 18;
    this.ansInput.paddingBottom = 6;
    this.ansInput.paddingTop = 6;
    this.ansInput.focusedBackground = Color4.Purple();
    // this.ansInput.isPointerBlocker = true;
    this.ansInput.onTextSubmit = new OnTextSubmit((x) => {
      this.checkAnswer(undefined, this.quizPassedCnt, undefined);
    });
    this.onClose();

    // for (let i = 0; i < 4; i++) {
    //   const checkPoint = new Entity();
    //   checkPoint.addComponent(new GLTFShape("models/polka.glb"));
    //   checkPoint.addComponent(
    //     new Transform({
    //       position: new Vector3(160 - i * 40, 45, 30),
    //       scale: new Vector3(6, 6, 1),
    //       rotation: Quaternion.Euler(0, 0, 0),
    //     })
    //   );
    //   const type = this.questions[i].type;
    //   checkPoint.addComponent(
    //     new OnPointerDown(
    //       () => {
    //         this.showQuestion();
    //       },
    //       {
    //         hoverText: "Let's go!",
    //         distance: 20,
    //       }
    //     )
    //   );
    //   this.checkPoints.push(checkPoint);
    // }
    // engine.addEntity(this.checkPoints[0]);
  }
  showQuestion() {
    if (this.locked) {
      this.resultText.visible = true;
      this.hideAnsAndBut();
      return;
    }
    if (this.quizPassedCnt === this.questions.length) {
      this.quizPassedCnt = 0;
    }
    this.resultText.visible = false;
    const index = this.quizPassedCnt;
    this.countText.value = `${this.quizPassedCnt + 1}/${this.questions.length}`;
    this.countText.visible = true;
    const type = this.questions[index].type;
    // this.unsub()
    if (this.quizPassedCnt > index) return;
    for (let i = 0; i < 5; i++) {
      this.ans[i].color = Color4.Purple();
    }
    let answers = [];
    if (type === "boolean") {
      answers = [...shuffle(this.questions[index].answers.slice(0, 2)), "", ""];
    } else answers = shuffle(this.questions[index].answers);
    this.questionContainer.visible = true;
    this.exit.visible = true;
    this.q1.visible = true;

    this.q1.value = this.questions[index].question;
    if (type === "choice" || type === "boolean") {
      this.ans[0].value = `1. ${answers[0]}`;
      this.ans[1].value = `2. ${answers[1]}`;
      this.ans[2].value = `3. ${answers[2]}`;
      this.ans[3].value = `4. ${answers[3]}`;
      for (let i = 0; i < 5; i++) {
        this.ans[i].hAlign = "center";
        this.ans[i].vAlign = "bottom";
        this.ans[i].positionY = `${64 - 11 * i}%`;
        this.ans[i].positionX = "-12.5%";
        this.ans[i].fontSize = 25;

        this.but[i].width = 638;
        this.but[i].height = 60;
        this.but[i].hAlign = "center";
        this.but[i].vAlign = "bottom";
        this.but[i].positionY = `${62 - 11 * i}%`;
        this.but[i].sourceWidth = 700;
        this.but[i].sourceHeight = 75;
      }
    }
    if (type === "image") {
      this.ans[0].value = `1. `;
      this.ans[1].value = `2. `;
      this.ans[2].value = `3. `;
      this.ans[3].value = `4. `;
      this.ansImage[0].source = new Texture(
        `https://api.allorigins.win/raw?url=${answers[0]}`
      );
      this.ansImage[1].source = new Texture(
        `https://api.allorigins.win/raw?url=${answers[1]}`
      );
      this.ansImage[2].source = new Texture(
        `https://api.allorigins.win/raw?url=${answers[2]}`
      );
      this.ansImage[3].source = new Texture(
        `https://api.allorigins.win/raw?url=${answers[3]}`
      );

      for (let i = 0; i < 4; i++) {
        this.ans[i].hAlign = "center";
        this.ans[i].vAlign = "center";
        this.ans[i].positionY = 140 - 180 * Math.floor(i / 2);
        this.ans[i].positionX = 60 - ((i + 1) % 2) * 240;
        this.ans[i].fontSize = 25;
        this.ans[i].hTextAlign = "left";
        this.ans[i].vTextAlign = "top";
        this.ansImage[i].hAlign = "center";
        this.ansImage[i].vAlign = "center";
        this.ansImage[i].width = 160;
        this.ansImage[i].height = 160;
        this.ansImage[i].positionY = 80 - 180 * Math.floor(i / 2);
        this.ansImage[i].positionX = 120 - ((i + 1) % 2) * 240;
        this.ansImage[i].sourceWidth = 920;
        this.ansImage[i].sourceHeight = 920;
      }

      this.ans[4].hAlign = "center";
      this.ans[4].vAlign = "bottom";
      this.ans[4].positionY = `13%`;
      this.ans[4].positionX = "-12.5%";
      this.ans[4].fontSize = 25;

      this.but[4].width = 638;
      this.but[4].height = 45;
      this.but[4].hAlign = "center";
      this.but[4].vAlign = "bottom";
      this.but[4].positionY = `12%`;
      this.but[4].sourceWidth = 700;
      this.but[4].sourceHeight = 75;
    }
    if (type === "input") {
      this.ans[4].hAlign = "center";
      this.ans[4].vAlign = "bottom";
      this.ans[4].positionY = `13%`;
      this.ans[4].positionX = "-12.5%";
      this.ans[4].fontSize = 25;

      this.but[4].width = 638;
      this.but[4].height = 45;
      this.but[4].hAlign = "center";
      this.but[4].vAlign = "bottom";
      this.but[4].positionY = `12%`;
      this.but[4].sourceWidth = 700;
      this.but[4].sourceHeight = 75;
    }
    this.ans[4].value = "Click to learn more..";
    this.hideAnsAndBut();
    if (type === "choice") {
      this.ans[0].visible = true;
      this.ans[1].visible = true;
      this.ans[2].visible = true;
      this.ans[3].visible = true;

      this.but[0].visible = true;
      this.but[1].visible = true;
      this.but[2].visible = true;
      this.but[3].visible = true;
    }
    if (type === "image") {
      this.ans[0].visible = true;
      this.ans[1].visible = true;
      this.ans[2].visible = true;
      this.ans[3].visible = true;
      this.ansImage[0].visible = true;
      this.ansImage[1].visible = true;
      this.ansImage[2].visible = true;
      this.ansImage[3].visible = true;
    }
    if (type === "input") {
      this.ansInput.visible = true;
      this.ansInput.value = "";
    }

    if (type === "boolean") {
      this.ans[0].visible = true;
      this.ans[1].visible = true;
      this.ans[2].visible = false;
      this.ans[3].visible = false;

      this.but[0].visible = true;
      this.but[1].visible = true;
      this.but[2].visible = false;
      this.but[3].visible = false;
    }
    if (this.questions[index].learnMoreUrl) {
      this.but[4].visible = true;
      this.ans[4].visible = true;
    }
    if (type === "choice" || type === "image" || type === "boolean") {
      input.subscribe(
        "BUTTON_DOWN",
        ActionButton.ACTION_3,
        false,
        this.checkAnswer
      );
      input.subscribe(
        "BUTTON_DOWN",
        ActionButton.ACTION_4,
        false,
        this.checkAnswer
      );
      if (type !== "boolean") {
        input.subscribe(
          "BUTTON_DOWN",
          ActionButton.ACTION_5,
          false,
          this.checkAnswer
        );
        input.subscribe(
          "BUTTON_DOWN",
          ActionButton.ACTION_6,
          false,
          this.checkAnswer
        );
      }
    }

    this.but[0].onClick = new OnPointerDown(() => {
      this.checkAnswer(undefined, index, 0);
    });
    this.but[1].onClick = new OnPointerDown(() => {
      this.checkAnswer(undefined, index, 1);
    });
    this.but[2].onClick = new OnPointerDown(() => {
      this.checkAnswer(undefined, index, 2);
    });
    this.but[3].onClick = new OnPointerDown(() => {
      this.checkAnswer(undefined, index, 3);
    });
    this.ansImage[0].onClick = new OnPointerDown(() => {
      this.checkAnswer(undefined, index, 0);
    });
    this.ansImage[1].onClick = new OnPointerDown(() => {
      this.checkAnswer(undefined, index, 1);
    });
    this.ansImage[2].onClick = new OnPointerDown(() => {
      this.checkAnswer(undefined, index, 2);
    });
    this.ansImage[3].onClick = new OnPointerDown(() => {
      this.checkAnswer(undefined, index, 3);
    });

    this.but[4].onClick = new OnPointerDown(() => {
      openExternalURL(this.questions[index].learnMoreUrl);
    });
  }
  reset() {
    // this.drop(5);
    this.onClose();
    this.unsub();
    this.ansImage = [];
    this.butImage = [];
    this.ans = [];
    this.but = [];
    // for (let i = 0; i < this.checkPoints.length; i++) {
    //   if (this.quizPassedCnt >= i) engine.removeEntity(this.checkPoints[i]);
    //   this.checkPoints[i].removeComponent(GLTFShape);
    //   this.checkPoints[i].removeComponent(Transform);
    //   this.checkPoints[i].removeComponent(OnPointerDown);
    // }
    // this.checkPoints = [];
    // if (this.quizPassedCnt === 4) {
    //   this.monkey.removeComponent(GLTFShape);
    //   this.monkey.removeComponent(Transform);
    //   this.monkey.removeComponent(OnPointerDown);
    // }
    this.quizPassedCnt = 0;
    this.initialized = false;
  }
  hideAnsAndBut() {
    for (let i = 0; i < 5; i++) {
      this.ans[i].visible = false;
      this.but[i].visible = false;
      this.ansImage[i].visible = false;
      this.butImage[i].visible = false;
    }
    this.ansInput.visible = false;
  }
  onClose() {
    this.questionContainer.visible = false;
    this.q1.visible = false;
    this.ansInput.visible = false;
    this.exit.visible = false;
    this.countText.visible = false;
    this.resultText.visible = false;
    this.hideAnsAndBut();
  }

  unsub() {
    input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_3, this.checkAnswer);
    input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_4, this.checkAnswer);
    input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_5, this.checkAnswer);
    input.unsubscribe("BUTTON_DOWN", ActionButton.ACTION_6, this.checkAnswer);
  }

  checkAnswer(
    e?: LocalActionButtonEvent,
    _index?: number,
    _answerIndex?: number
  ) {
    let index: number;
    let answerIndex: number = 0;
    if (e === undefined) {
      index = _index ? _index : 0;
      if (_answerIndex !== undefined)
        answerIndex = _answerIndex ? _answerIndex : 0;
    } else {
      index = instance.quizPassedCnt;
      answerIndex = e.buttonId - 10;
    }
    instance.unsub();
    const type = instance.questions[index].type;
    let answer = "";
    if (type === "image")
      answer = (instance.ansImage[answerIndex].source as Texture).src.substr(
        35
      );
    if (type === "choice" || type === "boolean")
      answer = instance.ans[answerIndex].value.substr(3);
    if (type === "input") answer = instance.ansInput.value;
    if (instance.questions[index].correct === answer) {
      instance.hideAnswers();
      if (type === "choice" || type === "image" || type === "boolean")
        instance.ans[answerIndex].visible = true;
      if (type === "image") instance.ansImage[answerIndex].visible = true;
      if (type === "choice" || type === "image" || type === "boolean")
        instance.ans[answerIndex].color = Color4.Green();
      success.playOnce();
      instance.exit.visible = false;
      // instance.regenerate((index + 1) * 4, (index + 2) * 4);
      instance.quizPassedCnt += 1;
      if (index === instance.questions.length - 1) {
        instance.addHistory();
        // instance.monkey.addComponent(new GLTFShape("models/monkey.glb"));
        // instance.monkey.addComponent(
        //   new Transform({
        //     position: new Vector3(15, 40, 40),
        //     rotation: Quaternion.Euler(0, 0, 0),
        //   })
        // );
        // instance.monkey.addComponent(
        //   new OnPointerDown(
        //     () => {
        //       log(
        //         "Getting an Certification NFT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        //       );
        //     },
        //     {
        //       hoverText: "Claim this NFT!",
        //       distance: 300,
        //     }
        //   )
        // );
        // engine.addEntity(instance.monkey);
        utils.setTimeout(1000, () => {
          instance.hideAnsAndBut();
          instance.exit.visible = true;
          instance.resultText.value = "Congratulation!";
          instance.resultText.color = Color4.Green();
          instance.resultText.visible = true;
        });
      } else {
        // engine.addEntity(instance.checkPoints[index + 1]);
        utils.setTimeout(1000, () => {
          // instance.onClose();
          if (instance.questions[index].learnMoreUrl) {
            instance.but[4].visible = true;
            instance.ans[4].visible = true;
          }
          instance.showQuestion();
        });
      }
    } else {
      instance.hideAnswers();
      if (type === "choice" || type === "image" || type === "boolean") {
        instance.ans[answerIndex].visible = true;
        instance.ans[answerIndex].color = Color4.Red();
      }
      fail.playOnce();
      // instance.drop(index);
      // utils.setTimeout(1000, () => {
      //   instance.regenerate(0, (index + 1) * 4);
      // });

      utils.setTimeout(1000, () => {
        // instance.onClose();
        if (instance.questions[index].learnMoreUrl) {
          instance.but[4].visible = true;
          instance.ans[4].visible = true;
        }
        instance.locked = true;
        utils.setTimeout(20000, () => {
          instance.locked = false;
          instance.removeComponent(interval);
          instance.showQuestion();
        });
        let timer = 20;
        instance.resultText.visible = true;
        instance.resultText.value = `You can try after ${timer} seconds again!`;
        instance.resultText.color = Color4.Red();
        interval = new utils.Interval(1000, () => {
          timer = timer - 1;
          instance.resultText.value = `You can try after ${timer} seconds again!`;
        });
        instance.addComponent(interval);
        instance.showQuestion();
      });
    }
  }
  async addHistory() {
    const userData = await getUserData();
    this.socket.send(
      JSON.stringify({
        type: msgtype.HISTORY_ADD_REQUEST,
        user: userData?.userId,
        category: this.category,
      })
    );
  }
  hideAnswers() {
    for (let i = 0; i < 4; i++) {
      this.ans[i].visible = false;
      this.ansImage[i].visible = false;
      this.but[i].visible = false;
    }
  }

  // drop(index: number) {
  //   const dropCount = 4 * (index + 1);
  //   for (let i = 0; i < dropCount; i++) {
  //     if (i < 17) this.steps[i].removeComponent(GLTFShape);
  //   }
  // }

  // regenerate(from: number, to: number) {
  //   const end = to < 17 ? to : 17;
  //   for (let i = from; i < end; i++) {
  //     this.steps[i].addComponent(new GLTFShape("models/logo3.glb"));
  //   }
  // }
}
