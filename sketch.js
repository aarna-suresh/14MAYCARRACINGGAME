/*
 C-36-42: Car racing gameObj stage 1
 
 Developer: Aarna
 
 Goals: 
  ● Create a form to log the players' names in the game. 
  ● Create a Database Structure and connect with the game.
  ● Use OOPs programming style.
  ● Update player count in the database.
  ● Change game state.
  ● Create player sprites.

*/

//Declare variables for gameObj objects and behaviour indicators(FLAGS)
var canvas;
var backgroundImage;
var databaseObj;
var formObj;
var gameObj, gameState;
var playerObj, playerCount, allPlayers;
var carsAtFinishLine;
var car1, car2, car3, car4, cars;
var titleImg, startImage, endImage, groundImg, resetImg;
var track1Img, track2Img;
var car1Img, car2Img, car3Img, car4Img
var fuelImg, coinImg, obstacle1Img, obstacle2Img, blastImg, lifeImg;


//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
  backgroundImage = loadImage("./assets/background.png");

  car1Img = loadImage("./assets/car1 (2).png");
  car2Img = loadImage("./assets/car2 (2).png");
  car3Img = loadImage("./assets/car3.png");
  car4Img = loadImage("./assets/car4.png");

  track1Img = loadImage("./assets/track1.jpeg");
  track2Img = loadImage("./assets/track2.jpg");

  titleImg = loadImage("./assets/title.png");
  startImage = loadImage("./assets/startbg.jpeg");

  groundImg = loadImage("./assets/ground.png");
  resetImg = loadImage("./assets/reset.png");

  fuelImg = loadImage("./assets/fuel.png");
  coinImg = loadImage("./assets/goldCoin.png");
  obstacle1Img = loadImage("./assets/obstacle1.png");
  obstacle2Img = loadImage("./assets/obstacle2.png");
  blastImg = loadImage("./assets/blast.png");
  lifeImg = loadImage("./assets/life.png");

}


//define the initial environment of the software(before it is used)
//by defining the declared variables with default values
function setup() {
  createCanvas(displayWidth - 20, displayHeight - 30);

  //initialize the database-
  databaseObj = firebase.database();


  gameState = 0; //0=WAIT, 1=PLAY, 2=END
  playerCount = 0;

  cars = [];


  gameObj = new Game();
  //function call to READ/RETRIEVE/GET existing value of gameState from database
  gameObj.getState();

  //function call to start the GAME i.e. gameState will activate  0 WAIT state
  gameObj.start();

}

function draw() {
  background(backgroundImage);

  //conditions for GAMESTATE to change from 0 to 1 to 2
  if (playerCount === 3) {
    /*
     function call to change existing value of gameState to a 
     new one based on the value of parameter passed in the database
    */
    gameObj.updateState(1);
  }

  if (gameState === 1) {
    /*
      function call to activate the gameObj to START 1 mode and 
      aligned all players to starting positions at the start line
    */
    gameObj.play();
  }

  if (carsAtFinishLine === 3) {
    console.log("carsAtFinishLine before updating GS to 2: " + carsAtFinishLine);
    /*
      function call to change existing value of gameState to a 
      new one based on the value of parameter passed in the database
    */
    gameObj.updateState(2);
  }

  if (gameState === 2) {
    /*
     function call to activate the gameObj to START 1 mode and 
     aligned all players to starting positions at the start line
    */
    gameObj.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


/* READ READ READ READ

CRUD - creating READING UPDATING DELETING

.ref() is used to refer to the location of the
database value(field) we care about.

.on() creates a listener which keeps
listening to the changes in the database.

.set() is used to set the value in the
database



//declration of a variable -> var variableName;
//definition of a variable -> variableName = insert value
//combined version -> var variableName = insert value



READ READ READ READ */