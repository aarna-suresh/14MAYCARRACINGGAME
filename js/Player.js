/*

  ● A new player object should be created every time a new user logs in. It should contain all the information
  about the player - name, position in the game etc. 
    
  ● For now it can just have the name property. It should also be able to read and write player

  -> databaseReference.on() creates a listener which keeps listening to the
  gameState from the database. When the gameState is changed in
  the database, the function passed as an argument to it is executed.
  
  Note: Here the function is directly written inside the .on() listener.
  
  -> databaseReference.update() will update the database reference.
  Here "/" refers to the main database inside which gameState is created.
  
  writing code to create objects even though the blueprint/ CLASS isn't
  defined yet. This is called writing code using abstraction.

*/

class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.rank = 0;
    this.distance = 0;
  }

  /*
    function definition to retrieve existing value of playerCount from database
  */

  // PLAYERCOUNT
  // playercount
  //playerCount
  //playerCOUNT

  getCount() {
    var playerCountRef = databaseObj.ref("PLAYERCOUNT");
    playerCountRef.on("value", function (data) {
      playerCount = data.val();
    });
  }

  /*
    function definition to change existing value of playerCount in the database
    to a new one based on the value of paramter passed 
  */
  updateCount(countInput) {
    databaseObj.ref("/").update({
      PLAYERCOUNT: countInput,
    });
  }

  /*
    function defintiion to change existing values  in the database to a new ones 
    based on the index(number of the playerObj) according to the paramters passed.
  
    .set() is used to set the value in the database
  */
  updatePlayerInfo() {

    /*
      PLAYERS
      ----PLAYER1
      ----PLAYER2
      ----PLAYER3
      ----PLAYER4

      var playerIndex = "PLAYERS/PLAYER" + 1;
      === playerIndex = PLAYERS/PLAYER1

    */
    var playerIndex = "PLAYERS/PLAYER" + this.index;
    databaseObj.ref(playerIndex).set({
      NAME: this.name,
      DISTANCE: this.distance,
      RANK: this.rank,
    });
  }

  /*
  Static functions are those common functions which are called by the
  class themselves rather than by objects of the class. We use the
  'static' keyword before the function to make it a static function. 
 
  function definition to retrieve existing players records: name and distance 
  value for all registered players according to the index in the database  
 
  The players data will be stored as JSON - since the firebase database
  structure is of JSON type JAVASCRIPT OBJECT NOTATION

  {
    firstname: Uttara,
    lastnmae: Sahastrabuddhe,
    age: 28
  }


*/
  static getPlayersInfo() {
    var playersInfoRef = databaseObj.ref("PLAYERS");
    playersInfoRef.on("value", (data) => {
      allPlayers = data.val();
    });
  }

  /*
   
   Static functions are those common functions which are called by the
   class themselves rather than by objects of the class. We use the
   'static' keyword before the function to make it a static function. 
 
   function definition to delete records of all 4 player


    PLAYERS
      ----PLAYER1
      ----PLAYER2
      ----PLAYER3
      ----PLAYER4
  */
  static deletePlayersInfo() {
    var playersInfoRef = databaseObj.ref("PLAYERS");
    playersInfoRef.remove();
  }

  /*
  function definition to change exisiting value of CarsAtEnd
  in the database based on the parameter passed
   */
  static updateCarsAtEnd(rankInput) {
    databaseObj.ref("/").update({
      CARSATEND: rankInput
    });
  }

}
