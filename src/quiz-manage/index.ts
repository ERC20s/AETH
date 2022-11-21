import { getUserData } from "@decentraland/Identity";
import msgtype from "src/uno/msgtype";

const imageTexture000 = new Texture("images/UI_Guestbook.png");
const image002 = new Texture("images/image2.png");
const image003 = new Texture("images/submit.png");
const imageClose = new Texture("images/close_button.png");
const imageOpen = new Texture("images/upload.png");
const imageReview = new Texture("images/review.png");
const imageAccept = new Texture("images/accept.png");
const imageDecline = new Texture("images/decline.png");
const canvas000 = new UICanvas();

let QUIZ_TYPE_INDEX = 0;
let QUIZ_CATEGORY_INDEX = 0;
const adminAddr = "0xa099dC8955C539705da50cB8988B65b356AE42a5";
const quizType = [
  "Multiple Choice",
  // "Image Choice",
  "Text Input",
  "True or False",
];
const types = [
  "choice",
  // "image",
  "input",
  "boolean",
];
const categories = ["Talisman", "Moonbeam",
"Acala",
"Parallel",
"Astar",
"Clover",
"Efinity",
"Composable",
"Centrifuge",
"Interlay",
"Nodle",
"Hydradx",
"Equilibrium",
"Phala",
"Polkadex",
"Litentry",
"Unique",
"Origintrail",
"Bifrost",
"Coinversation",
"Totem",
"Kylin",
"integr",
"aventus",
"oak",
"ajuna",
"crust"];

export class QuizManager {
  reviewContainer = new UIContainerRect(canvas000);
  background = new UIImage(canvas000, image002);
  hintText = new UIText(canvas000);
  reviewTitle = new UIText(canvas000);
  closeBtn = new UIImage(canvas000, imageClose);
  uploadBtn = new UIImage(canvas000, imageOpen);
  reviewBtn = new UIImage(canvas000, imageReview);
  acceptBtn = new UIImage(canvas000, imageAccept);
  declineBtn = new UIImage(canvas000, imageDecline);
  Submitbutton = new UIImage(canvas000, image003);
  previous = new UIImage(canvas000, imageTexture000);
  next = new UIImage(canvas000, imageTexture000);
  previousReview = new UIImage(canvas000, imageTexture000);
  nextReview = new UIImage(canvas000, imageTexture000);

  quizTypeTextReview = new UIText(canvas000);
  quizInput = new UIInputText(canvas000);
  ans1Input = new UIInputText(canvas000);
  ans2Input = new UIInputText(canvas000);
  ans3Input = new UIInputText(canvas000);
  ans4Input = new UIInputText(canvas000);
  urlInput = new UIInputText(canvas000);

  quizCategoryText = new UIText(canvas000);
  quizTextReview = new UIText(canvas000);
  ans1TextReview = new UIText(canvas000);
  ans2TextReview = new UIText(canvas000);
  ans3TextReview = new UIText(canvas000);
  ans4TextReview = new UIText(canvas000);
  // ansTextReview = new UIText(canvas000);
  urlTextReview = new UIText(canvas000);

  indexOfReviewQuiz = new UIText(canvas000);
  socket: WebSocket;
  errorText = new UIText(canvas000);
  reviewData: any = [];
  indexOfReview = 0;
  onWait = false;

  constructor(socket: WebSocket) {
    this.socket = socket;
    this.reviewContainer.width = 700;
    this.reviewContainer.height = 600;
    this.reviewContainer.positionY = 10;
    this.reviewContainer.positionX = 0;
    this.reviewContainer.color = Color4.White();
    this.reviewContainer.hAlign = "center";
    this.reviewContainer.vAlign = "top";
    this.reviewContainer.opacity = 0.6;
    this.reviewContainer.visible = false;

    this.background.width = 700;
    this.background.height = 600;
    this.background.hAlign = "center";
    this.background.vAlign = "top";
    this.background.positionY = 10;
    this.background.positionX = 0;
    this.background.sourceWidth = 1000;
    this.background.sourceHeight = 1000;
    this.background.opacity = 0.6;

    this.reviewTitle.value = "Review Questions";
    this.reviewTitle.width = 0;
    this.reviewTitle.height = 0;
    this.reviewTitle.hAlign = "center";
    this.reviewTitle.vAlign = "top";
    this.reviewTitle.fontSize = 35;
    this.reviewTitle.shadowBlur = 10;
    this.reviewTitle.positionY = -45;
    this.reviewTitle.positionX = 0;
    this.reviewTitle.hTextAlign = "center";
    this.reviewTitle.color = Color4.Black();

    this.hintText.value = "(Enter text and hit enter key on keyboard)";
    this.hintText.width = 0;
    this.hintText.height = 0;
    this.hintText.hAlign = "center";
    this.hintText.vAlign = "center";
    this.hintText.fontSize = 20;
    this.hintText.positionY = -195;
    this.hintText.positionX = 0;
    this.hintText.hTextAlign = "center";
    this.hintText.color = Color4.Blue();

    this.errorText.value = "Invalid input";
    this.errorText.width = 0;
    this.errorText.height = 0;
    this.errorText.hAlign = "center";
    this.errorText.vAlign = "center";
    this.errorText.fontSize = 20;
    this.errorText.positionY = -165;
    this.errorText.positionX = 0;
    this.errorText.hTextAlign = "center";
    this.errorText.color = Color4.Red();
    this.errorText.visible = false;

    this.closeBtn.width = 45;
    this.closeBtn.height = 45;
    this.closeBtn.hAlign = "center";
    this.closeBtn.vAlign = "top";
    this.closeBtn.positionY = 0;
    this.closeBtn.positionX = 315;
    this.closeBtn.sourceWidth = 200;
    this.closeBtn.sourceHeight = 200;

    this.uploadBtn.width = 45;
    this.uploadBtn.height = 45;
    this.uploadBtn.hAlign = "left";
    this.uploadBtn.vAlign = "top";
    this.uploadBtn.positionY = -70;
    this.uploadBtn.positionX = 168;
    this.uploadBtn.sourceWidth = 512;
    this.uploadBtn.sourceHeight = 512;

    this.reviewBtn.width = 38;
    this.reviewBtn.height = 38;
    this.reviewBtn.hAlign = "left";
    this.reviewBtn.vAlign = "top";
    this.reviewBtn.positionY = -20;
    this.reviewBtn.positionX = 168;
    this.reviewBtn.sourceWidth = 64;
    this.reviewBtn.sourceHeight = 64;
    this.reviewBtn.visible = false;

    this.Submitbutton.width = 375;
    this.Submitbutton.height = 57;
    this.Submitbutton.hAlign = "center";
    this.Submitbutton.vAlign = "bottom";
    this.Submitbutton.positionY = 50;
    this.Submitbutton.positionX = 0;
    this.Submitbutton.sourceWidth = 465;
    this.Submitbutton.sourceHeight = 75;

    this.Submitbutton.onClick = new OnPointerDown(() => {
      this.submitQuiz();
    });

    this.acceptBtn.width = 45;
    this.acceptBtn.height = 45;
    this.acceptBtn.hAlign = "center";
    this.acceptBtn.vAlign = "bottom";
    this.acceptBtn.positionY = 70;
    this.acceptBtn.positionX = -80;
    this.acceptBtn.sourceWidth = 512;
    this.acceptBtn.sourceHeight = 512;

    this.acceptBtn.onClick = new OnPointerDown(() => {
      if (this.onWait) return;
      this.onWait = true;
      this.socket.send(
        JSON.stringify({
          type: msgtype.QUIZ_ACCEPT_REQUEST,
          id: this.reviewData[this.indexOfReview].id,
        })
      );
    });

    this.declineBtn.width = 45;
    this.declineBtn.height = 45;
    this.declineBtn.hAlign = "center";
    this.declineBtn.vAlign = "bottom";
    this.declineBtn.positionY = 70;
    this.declineBtn.positionX = 80;
    this.declineBtn.sourceWidth = 512;
    this.declineBtn.sourceHeight = 512;

    this.declineBtn.onClick = new OnPointerDown(() => {
      if (this.onWait) return;
      this.onWait = true;
      this.socket.send(
        JSON.stringify({
          type: msgtype.QUIZ_DECLINE_REQUEST,
          id: this.reviewData[this.indexOfReview].id,
        })
      );
    });

    this.previous.width = 35;
    this.previous.height = 35;
    this.previous.hAlign = "center";
    this.previous.vAlign = "top";
    this.previous.positionY = -152;
    this.previous.positionX = -170;
    this.previous.sourceWidth = 75;
    this.previous.sourceHeight = 75;
    this.previous.onClick = new OnPointerDown(() => {
      QUIZ_CATEGORY_INDEX = QUIZ_CATEGORY_INDEX > 0 ? --QUIZ_CATEGORY_INDEX : 3;
      this.quizCategoryText.value = categories[QUIZ_CATEGORY_INDEX];
    });

    this.previousReview.width = 35;
    this.previousReview.height = 35;
    this.previousReview.hAlign = "center";
    this.previousReview.vAlign = "top";
    this.previousReview.positionY = -70;
    this.previousReview.positionX = -250;
    this.previousReview.sourceWidth = 75;
    this.previousReview.sourceHeight = 75;
    this.previousReview.onClick = new OnPointerDown(() => {
      if (this.indexOfReview === 0 || this.reviewData.length === 0) return;
      this.indexOfReview = this.indexOfReview - 1;
      this.setQuizToReview();
    });

    this.indexOfReviewQuiz.width = 0;
    this.indexOfReviewQuiz.height = 35;
    this.indexOfReviewQuiz.hAlign = "center";
    this.indexOfReviewQuiz.vAlign = "top";
    this.indexOfReviewQuiz.hTextAlign = "center";
    this.indexOfReviewQuiz.positionY = -70;
    this.indexOfReviewQuiz.positionX = 0;
    this.indexOfReviewQuiz.fontSize = 22;
    this.indexOfReviewQuiz.color = Color4.Black();
    this.indexOfReviewQuiz.visible = false;

    this.next.width = 35;
    this.next.height = 35;
    this.next.hAlign = "center";
    this.next.vAlign = "top";
    this.next.positionY = -152;
    this.next.positionX = 170;
    this.next.sourceWidth = 75;
    this.next.sourceHeight = 75;
    this.next.sourceLeft = 536;
    this.next.onClick = new OnPointerDown(() => {
      QUIZ_CATEGORY_INDEX =
        QUIZ_CATEGORY_INDEX < categories.length - 1 ? ++QUIZ_CATEGORY_INDEX : 0;
      this.quizCategoryText.value = categories[QUIZ_CATEGORY_INDEX];
    });

    this.nextReview.width = 35;
    this.nextReview.height = 35;
    this.nextReview.hAlign = "center";
    this.nextReview.vAlign = "top";
    this.nextReview.positionY = -70;
    this.nextReview.positionX = 250;
    this.nextReview.sourceWidth = 75;
    this.nextReview.sourceHeight = 75;
    this.nextReview.sourceLeft = 537;
    this.nextReview.onClick = new OnPointerDown(() => {
      if (
        this.indexOfReview === this.reviewData.length - 1 ||
        this.reviewData.length === 0
      )
        return;
      this.indexOfReview = this.indexOfReview + 1;
      this.setQuizToReview();
    });

    this.quizCategoryText.value = categories[QUIZ_CATEGORY_INDEX];
    this.quizCategoryText.width = 0;
    this.quizCategoryText.height = 0;
    this.quizCategoryText.hAlign = "center";
    this.quizCategoryText.vAlign = "center";
    this.quizCategoryText.fontSize = 25;
    this.quizCategoryText.positionY = 120;
    this.quizCategoryText.positionX = 0;
    this.quizCategoryText.hTextAlign = "center";
    this.quizCategoryText.color = Color4.Blue();

    let boxh = 60;

    this.quizInput.width = "660px";
    this.quizInput.height = "60px";
    this.quizInput.vAlign = "center";
    this.quizInput.hAlign = "center";
    this.quizInput.fontSize = 22;
    this.quizInput.placeholder = "Write your question here...";
    this.quizInput.vTextAlign = "top";
    this.quizInput.color = Color4.Blue();
    this.quizInput.positionY = boxh + 16 + "px";
    this.quizInput.positionX = 0;
    this.quizInput.paddingTop = 4;
    this.quizInput.paddingLeft = 12;
    this.quizInput.textWrapping = true;
    this.quizInput.onTextSubmit = new OnTextSubmit(() => {
      this.submitQuiz();
    });

    this.ans1Input.width = "660px";
    this.ans1Input.height = "33px";
    this.ans1Input.vAlign = "center";
    this.ans1Input.hAlign = "center";
    this.ans1Input.fontSize = 22;
    this.ans1Input.placeholder = "1. Correct Answer";
    this.ans1Input.color = Color4.Blue();
    this.ans1Input.positionY = boxh - 35 + "px";
    this.ans1Input.positionX = 0;
    this.ans1Input.paddingLeft = 12;
    this.ans1Input.onTextSubmit = new OnTextSubmit(() => {
      this.submitQuiz();
    });

    this.ans2Input.width = "660px";
    this.ans2Input.height = "33px";
    this.ans2Input.vAlign = "center";
    this.ans2Input.hAlign = "center";
    this.ans2Input.fontSize = 22;
    this.ans2Input.placeholder = "2. Wrong Answer";
    this.ans2Input.color = Color4.Blue();
    this.ans2Input.positionY = boxh - 70 + "px";
    this.ans2Input.positionX = 0;
    this.ans2Input.paddingLeft = 12;
    this.ans2Input.onTextSubmit = new OnTextSubmit(() => {
      this.submitQuiz();
    });

    this.ans3Input.width = "660px";
    this.ans3Input.height = "33px";
    this.ans3Input.vAlign = "center";
    this.ans3Input.hAlign = "center";
    this.ans3Input.fontSize = 22;
    this.ans3Input.placeholder = "3. Wrong Answer";
    this.ans3Input.color = Color4.Blue();
    this.ans3Input.positionY = boxh - 105 + "px";
    this.ans3Input.positionX = 0;
    this.ans3Input.paddingLeft = 12;
    this.ans3Input.onTextSubmit = new OnTextSubmit(() => {
      this.submitQuiz();
    });

    this.ans4Input.width = "660px";
    this.ans4Input.height = "33px";
    this.ans4Input.vAlign = "center";
    this.ans4Input.hAlign = "center";
    this.ans4Input.fontSize = 22;
    this.ans4Input.placeholder = "4. Wrong Answer";
    this.ans4Input.color = Color4.Blue();
    this.ans4Input.positionY = boxh - 140 + "px";
    this.ans4Input.positionX = 0;
    this.ans4Input.paddingLeft = 12;
    this.ans4Input.onTextSubmit = new OnTextSubmit(() => {
      this.submitQuiz();
    });

    this.urlInput.width = "660px";
    this.urlInput.height = "33px";
    this.urlInput.vAlign = "center";
    this.urlInput.hAlign = "center";
    this.urlInput.fontSize = 22;
    this.urlInput.placeholder = "URL for more info..";
    this.urlInput.color = Color4.Blue();
    this.urlInput.positionY = boxh - 175 + "px";
    this.urlInput.positionX = 0;
    this.urlInput.paddingLeft = 12;
    this.urlInput.onTextSubmit = new OnTextSubmit(() => {
      this.submitQuiz();
    });
    const boxReviewh = 90;
    this.quizTypeTextReview.value = "";
    this.quizTypeTextReview.width = "";
    this.quizTypeTextReview.height = 0;
    this.quizTypeTextReview.hAlign = "center";
    this.quizTypeTextReview.vAlign = "center";
    this.quizTypeTextReview.hTextAlign = "center";
    this.quizTypeTextReview.fontSize = 18;
    this.quizTypeTextReview.positionY = 170;
    this.quizTypeTextReview.positionX = 0;
    this.quizTypeTextReview.color = Color4.Black();

    this.quizTextReview.width = "580px";
    this.quizTextReview.height = "33px";
    this.quizTextReview.vAlign = "center";
    this.quizTextReview.hAlign = "center";
    this.quizTextReview.fontSize = 24;
    this.quizTextReview.textWrapping = true;
    this.quizTextReview.vTextAlign = "top";
    this.quizTextReview.color = Color4.Purple();
    this.quizTextReview.positionY = boxReviewh + 30 + "px";
    this.quizTextReview.positionX = 0;

    this.ans1TextReview.width = "580px";
    this.ans1TextReview.height = "33px";
    this.ans1TextReview.vAlign = "center";
    this.ans1TextReview.hAlign = "center";
    this.ans1TextReview.fontSize = 22;
    this.ans1TextReview.color = Color4.Blue();
    this.ans1TextReview.positionY = boxReviewh - 35 + "px";
    this.ans1TextReview.positionX = 0;

    this.ans2TextReview.width = "580px";
    this.ans2TextReview.height = "33px";
    this.ans2TextReview.vAlign = "center";
    this.ans2TextReview.hAlign = "center";
    this.ans2TextReview.fontSize = 22;
    this.ans2TextReview.color = Color4.Black();
    this.ans2TextReview.positionY = boxReviewh - 70 + "px";
    this.ans2TextReview.positionX = 0;

    this.ans3TextReview.width = "580px";
    this.ans3TextReview.height = "33px";
    this.ans3TextReview.vAlign = "center";
    this.ans3TextReview.hAlign = "center";
    this.ans3TextReview.fontSize = 22;
    this.ans3TextReview.color = Color4.Black();
    this.ans3TextReview.positionY = boxReviewh - 105 + "px";
    this.ans3TextReview.positionX = 0;

    this.ans4TextReview.width = "580px";
    this.ans4TextReview.height = "33px";
    this.ans4TextReview.vAlign = "center";
    this.ans4TextReview.hAlign = "center";
    this.ans4TextReview.fontSize = 22;
    this.ans4TextReview.color = Color4.Black();
    this.ans4TextReview.positionY = boxReviewh - 140 + "px";
    this.ans4TextReview.positionX = 0;

    this.urlTextReview.width = "580px";
    this.urlTextReview.height = "33px";
    this.urlTextReview.vAlign = "center";
    this.urlTextReview.hAlign = "center";
    this.urlTextReview.fontSize = 22;
    this.urlTextReview.color = Color4.Green();
    this.urlTextReview.positionY = boxReviewh - 210 + "px";
    this.urlTextReview.positionX = 0;

    this.closeBtn.onClick = new OnPointerDown(() => {
      this.reset();
      this.closeDialog();
      this.closeReviewDialog();
    });
    this.uploadBtn.onClick = new OnPointerDown(() => {
      this.openDialog();
    });

    this.reviewBtn.onClick = new OnPointerDown(() => {
      // this.openReviewDialog();
      this.socket.send(
        JSON.stringify({
          type: msgtype.QUIZ_GET_REQUEST,
        })
      );
    });
    this.closeDialog();
    this.closeReviewDialog();
    // this.openReviewDialog();
  }

  reset() {
    QUIZ_CATEGORY_INDEX = 0;
    this.quizCategoryText.value = categories[QUIZ_CATEGORY_INDEX];
    this.quizInput.value = "";
    this.ans1Input.value = "";
    this.ans2Input.value = "";
    this.ans3Input.value = "";
    this.ans4Input.value = "";
    this.urlInput.value = "";
    this.quizTypeTextReview.value = "";
    this.quizTextReview.value = "";
    this.ans1TextReview.value = "";
    this.ans2TextReview.value = "";
    this.ans3TextReview.value = "";
    this.ans4TextReview.value = "";
    this.urlTextReview.value = "";
  }

  async closeDialog() {
    this.background.visible = false;
    this.quizInput.visible = false;
    this.ans1Input.visible = false;
    this.ans2Input.visible = false;
    this.ans3Input.visible = false;
    this.ans4Input.visible = false;
    this.previous.visible = false;
    this.quizCategoryText.visible = false;
    this.next.visible = false;
    this.uploadBtn.visible = true;
    this.closeBtn.visible = false;
    this.hintText.visible = false;
    this.urlInput.visible = false;
    this.Submitbutton.visible = false;
    // input.unsubscribe("BUTTON_DOWN", ActionButton.ANY, this.submitQuiz);
    const user = await getUserData();
    const userAddr = (user?.userId as string).toLowerCase();
    if (userAddr === adminAddr.toLowerCase()) {
      this.reviewBtn.visible = true;
    }
  }

  openDialog() {
    this.reset();
    this.background.visible = true;
    this.quizInput.visible = true;
    this.ans1Input.visible = true;
    this.ans2Input.visible = true;
    this.ans3Input.visible = true;
    this.ans4Input.visible = true;
    this.previous.visible = true;
    this.quizCategoryText.visible = true;
    this.next.visible = true;
    this.uploadBtn.visible = false;
    this.reviewBtn.visible = false;
    this.closeBtn.visible = true;
    this.hintText.visible = true;
    this.urlInput.visible = true;
    this.Submitbutton.visible = true;
  }
  openReviewDialog() {
    this.reviewContainer.visible = true;
    this.closeBtn.visible = true;
    this.reviewTitle.visible = true;
    this.nextReview.visible = true;
    this.previousReview.visible = true;
    this.quizTypeTextReview.visible = true;
    this.quizTextReview.visible = true;
    this.ans1TextReview.visible = true;
    this.ans2TextReview.visible = true;
    this.ans3TextReview.visible = true;
    this.ans4TextReview.visible = true;
    this.urlTextReview.visible = true;
    this.acceptBtn.visible = true;
    this.declineBtn.visible = true;
    this.indexOfReviewQuiz.visible = true;
    this.reviewBtn.visible = false;
    this.uploadBtn.visible = false;
  }
  async closeReviewDialog() {
    this.reviewContainer.visible = false;
    this.closeBtn.visible = false;
    this.reviewTitle.visible = false;
    this.nextReview.visible = false;
    this.previousReview.visible = false;
    this.quizTypeTextReview.visible = false;
    this.quizTextReview.visible = false;
    this.ans1TextReview.visible = false;
    this.ans2TextReview.visible = false;
    this.ans3TextReview.visible = false;
    this.ans4TextReview.visible = false;
    this.urlTextReview.visible = false;
    this.acceptBtn.visible = false;
    this.declineBtn.visible = false;
    this.indexOfReviewQuiz.visible = false;
    this.uploadBtn.visible = true;

    const user = await getUserData();
    const userAddr = (user?.userId as string).toLowerCase();
    if (userAddr === adminAddr.toLowerCase()) {
      this.reviewBtn.visible = true;
    }
  }

  onInvalidInput = () => {
    this.errorText.visible = true;
  };
  onSuccess = () => {
    this.hintText.value = "Your question has been submitted for review!";
    this.errorText.visible = false;
  };
  async submitQuiz() {
    this.quizInput.value =
      this.quizInput.value === this.quizInput.placeholder
        ? ""
        : this.quizInput.value;
    this.ans1Input.value =
      this.ans1Input.value === this.ans1Input.placeholder
        ? ""
        : this.ans1Input.value;
    this.ans2Input.value =
      this.ans2Input.value === this.ans2Input.placeholder
        ? ""
        : this.ans2Input.value;
    this.ans3Input.value =
      this.ans3Input.value === this.ans3Input.placeholder
        ? ""
        : this.ans3Input.value;
    this.ans4Input.value =
      this.ans4Input.value === this.ans4Input.placeholder
        ? ""
        : this.ans4Input.value;
    this.urlInput.value =
      this.urlInput.value === this.urlInput.placeholder
        ? ""
        : this.urlInput.value;
    if (this.ans1Input.value === "") return this.onInvalidInput();
    if (this.ans2Input.value === "") {
      QUIZ_TYPE_INDEX = 1;
    } else if (this.ans3Input.value === "") {
      QUIZ_TYPE_INDEX = 2;
    } else if (this.ans4Input.value === "") {
      return this.onInvalidInput();
    } else {
      QUIZ_TYPE_INDEX = 0;
    }

    const quiz = {
      category: this.quizCategoryText.value,
      type: types[QUIZ_TYPE_INDEX],
      question: this.quizInput.value,
      answers: [
        this.ans1Input.value,
        this.ans2Input.value,
        this.ans3Input.value,
        this.ans4Input.value,
      ],
      correct: this.ans1Input.value,
      learnMoreUrl: this.urlInput.value,
    };
    log(quiz);
    const userData = await getUserData();
    const msg = {
      type: msgtype.QUIZ_UPLOAD,
      data: quiz,
      sender: userData,
    };
    this.socket.send(JSON.stringify(msg));
    this.onSuccess();
  }
  showReviewDialog(data: any) {
    log(data);
    this.indexOfReview = 0;
    const reviewData = data.map((item: any) => {
      return {
        ...item,
        answers: JSON.parse(item.answers),
        author: JSON.parse(item.author),
      };
    });
    this.reviewData = reviewData;
    this.openReviewDialog();
    this.setQuizToReview();
  }
  setQuizToReview() {
    if (this.reviewData.length === 0) {
      this.ans1TextReview.visible = false;
      this.ans2TextReview.visible = false;
      this.ans3TextReview.visible = false;
      this.ans4TextReview.visible = false;
      this.indexOfReviewQuiz.visible = false;
      this.quizTypeTextReview.visible = false;
      this.acceptBtn.visible = false;
      this.declineBtn.visible = false;
      this.quizTextReview.value = "Nothing to review";
      this.quizTextReview.textWrapping = false;
      this.quizTextReview.hTextAlign = "center";
      this.quizTextReview.width = 0;
      return;
    }
    this.ans1TextReview.visible = true;
    this.ans2TextReview.visible = true;
    this.ans3TextReview.visible = true;
    this.ans4TextReview.visible = true;
    this.indexOfReviewQuiz.visible = true;
    this.quizTypeTextReview.visible = true;
    this.acceptBtn.visible = true;
    this.declineBtn.visible = true;
    this.quizTextReview.width = "580px";
    this.quizTextReview.hTextAlign = "left";
    this.quizTextReview.textWrapping = true;
    if (this.reviewData.length - 1 < this.indexOfReview)
      this.indexOfReview = this.reviewData.length - 1;
    const quizToReview: any = this.reviewData[this.indexOfReview];
    log(quizToReview);
    const quizTypeIndex = types.indexOf(quizToReview.type);
    const type = quizType[quizTypeIndex];
    this.indexOfReviewQuiz.value = `${this.indexOfReview + 1}/${
      this.reviewData.length
    }`;
    this.quizTypeTextReview.value = "(" + type + ")";
    this.quizTextReview.value = quizToReview.question;
    this.ans1TextReview.value = quizToReview.answers[0];
    this.ans2TextReview.value = quizToReview.answers[1];
    this.ans3TextReview.value = quizToReview.answers[2];
    this.ans4TextReview.value = quizToReview.answers[3];
    this.urlTextReview.value = quizToReview.learnMoreUrl;

    const boxReviewh = 90;
    switch (quizToReview.type) {
      case "choice":
        this.urlTextReview.positionY = boxReviewh - 190 + "px";
        break;
      case "boolean":
        this.ans3TextReview.visible = false;
        this.ans4TextReview.visible = false;
        this.urlTextReview.positionY = boxReviewh - 120 + "px";
        break;
      case "input":
        this.ans2TextReview.visible = false;
        this.ans3TextReview.visible = false;
        this.ans4TextReview.visible = false;
        this.urlTextReview.positionY = boxReviewh - 85 + "px";
        break;
      case "image":
      default:
        break;
    }
  }
}
