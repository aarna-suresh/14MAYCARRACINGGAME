/*
  ● Game object  should be able to hold the state of the game.
    It should be able to display form when the game state is 0(WAIT) 
    or the game when the game state is 1(PLAY) or leaderboard when the game state is 2(END).
  ● GAMESTATES: 
    0 WAIT
    1 START
    2 END
*/

class Game {
  /*   
    writing code to create objects even though the blueprint/CONSTRUCTOR isn't
    defined yet. This is called writing code using abstraction 
  */
  constructor() { }

  //function definition to READ/RETRIEVE/GET existing value of gameState from database
  getState() {
    var gameStateRef = databaseObj.ref("GAMESTATE");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  /*
    function definition to change existing value of gameState to a 
    new one based on the value of paramter passed in the database
  */
  updateState(stateInput) {
    databaseObj.ref("/").update({
      GAMESTATE: stateInput,
    });
  }

  /*
    function defintion to start the GAME i.e. gameState will remain in WAIT(0) state 
    displaying the FORM until all 4 players are registered
  */
  async start() {
    if (gameState === 0) {
      //as long as gameState is on WAIT
      playerObj = new Player(); //generate a new playerObj
      //console.log(playerObj);

      var playerCountRef = await databaseObj.ref("PLAYERCOUNT").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        //console.log("VALUE OF PLAYER COUNT IN START FUNCTION: " +playerCount);
        playerObj.getCount(); //get the number of players registered
      }

      formObj = new Form(); //create new formObj for registration
      formObj.display(); //display the generated formObj
    }

    car1 = createSprite(100, 200);
    // car1.addImage("Car1Img", car1Img);
    car2 = createSprite(300, 200);
    //car2.addImage("car2Img", car2Img);
    car3 = createSprite(500, 200);
    // car3.addImage("car3Img", car3Img);
    //car4 = createSprite(700, 200);
    //car4.addImage("car4Img", car4Img);
    cars = [car1, car2, car3];
  }

  /*
    function defintion to activate the gameObj to START 1 mode and 
    aligned all players to starting positions at the start line
  */
  play() {
    formObj.hide();

    /*
        static function call to retrieve existing playerObj records: name and distance 
        value for all registered players according to the index in the database  
    */
    Player.getPlayersInfo();

    //console.log(allPlayers);

    if (allPlayers !== undefined) {
      //background("tan");
      //image(track1Img, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      //index of the array
      var index = 0;

      //x and y positions of the cars
      var calculatedX = 200;
      // console.log("BY DEFAULT VALUE OF calculatedX: " + calculatedX);
      var calculatedY = 0;

      //for every playerObj inside allPlayers
      for (var plr in allPlayers) {
        //console.log(plr);
        // console.log("THE INDEX OF THE CURRENT CAR: " + index);
        //console.log(cars);

        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        calculatedX = calculatedX + 200;
        //console.log("VALUE OF calculatedX AFTER ADDING 200 INSIDE THE LOOP: " + calculatedX);


        //use data from the database to display the cars in y direction
        calculatedY = displayHeight - allPlayers[plr].DISTANCE;

 
        cars[index - 1].x = calculatedX;
        cars[index - 1].y = calculatedY;

        if (index === playerObj.index) {
          cars[index - 1].shapeColor = "red";

          //assigning camera with the same position as the car



          //creating an indicator for the current player
          fill("yellow");
          stroke("yellow");
          strokeWeight("10");
          ellipse(calculatedX, calculatedY, 500, 500);
        }

      }
    }
    if (keyIsDown(UP_ARROW) && playerObj.index !== null && playerObj.distance < 5000) {
      playerObj.distance += 30;

      //function call to change existing value in the database of the distance covered for each player
      playerObj.updatePlayerInfo();
      //console.log("DISTANCE COVERED DURING RACE: "+playerObj.distance);

    }

    if (keyIsDown(DOWN_ARROW) && playerObj.index !== null) {
      playerObj.distance -= 30;

      //function call to change existing value in the database of the distance covered for each player
      playerObj.updatePlayerInfo();
      //console.log("DISTANCE COVERED DURING RACE: "+playerObj.distance);

    }

    if (playerObj.distance === 5000) {
      playerObj.rank += 1;

      /*
      static function call to change existing value of CarsAtEnd 
      in the database based on the paratemete passed
       */
      Player.updateCarsAtEnd(playerObj.rank);
    }

    drawSprites();
  }
}
