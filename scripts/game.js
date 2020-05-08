var animals = ["whale", "whale", "dolphin", "dolphin", "starfish", "starfish", "shark", "shark", "seal",
  "seal", "squid", "squid", "octopus", "octopus", "crab", "crab", "seahorse", "seahorse"]

function shuffle(array) {
  var m = array.length, t, i;
    
  while (m) {   
    i = Math.floor(Math.random() * m--); 
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    }
    return array;
}


var animalsShuffle = shuffle(animals);


const cells = document.getElementsByClassName('cell');

function paintCards () {
  //selectCell();  
  for (var i = 0; i < cells.length; i++) {
    let animal = animalsShuffle[i];
    cells[i].innerText = animal;
    cells[i].classList.add(animal);
    cells[i].onclick = storeCell;    
  }
}

var checkCards = [];

function storeCell (e) {
  //console.log(e);
  switch (checkCards.length){
    case 0: 
      e.target.classList.add("active");
      e.target.onclick = "";
      checkCards.push(e.target.innerText);      
      break;
    case 1:
      e.target.classList.add("active");
      e.target.onclick = "";
      checkCards.push(e.target.innerText);      
      var checkingCard = document.getElementsByClassName("active");
      for (var i = 0; i < checkingCard.length; i++) {
        if (checkCards[0] === checkCards[1]) {     
          checkingCard[i].classList.add("checked");                   
          checkCards = [];
          //console.log(checkCards.length);                    
        } 
        if (checkCards[0] !== checkCards[1] && !checkingCard[i].classList.contains("checked"))
        {  
          console.log(checkingCard[i]) 
          checkingCard[i].classList.add("fail");                   
        }
        //if (checkCards[0] !== checkCards[1] && checkingCard[i].classList.contains("fail")) {
        //else {  
         // checkCards = [];
        //}
      }
      console.log(checkCards.length);
      break;
    case 2:
      checkCards = [];
      var fails = document.querySelectorAll(".cell")
      for (var i = 0; i < fails.length; i++) {
        //console.log(fails[i]);
        fails[i].classList.remove("fail");
        fails[i].classList.remove("active");
        fails[i].onclick = storeCell;
      }
      
      cells.className = "";
      break;
    default:
      //storeCell();
  }  
}

var playerOneName = document.querySelectorAll(".player-one-name");
var playerOneNick = document.querySelectorAll(".player-one");
var playerTwoName = document.querySelectorAll(".player-two-name");
var playerTwoNick = document.querySelectorAll(".player-two");
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    // code for enter
    playerOneNick[0].innerText = playerOneName[0].value
    playerTwoNick[0].innerText = playerTwoName[0].value    
  }  
});

function gameInit (){
  var playGame = document.querySelectorAll(".play-game")
  playGame[0].onclick = paintCards;
}

/*function gameReset () {
  var resetGame = document.querySelectorAll(".restart-game")
  resetGame[0].onclick = window.location.reload(true);
}*/

gameInit();

//paintCards();