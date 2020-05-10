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

function printCards () {
  //selectCell();  
  for (var i = 0; i < cells.length; i++) {
    let animal = animalsShuffle[i];
    cells[i].innerText = animal;
    cells[i].classList.add(animal);
    cells[i].onclick = storeCards;    
  }
}

function printBoard () {
  let board = document.querySelector(".board");

  for (let i = 0; i < 3 * 6; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    //div.classList.add("aqua");
    board.appendChild(div);
  }
  //paintCards();
}

var players = ["p1", "p2"];
var currentPlayer = players[0];

function nextPlayer(current) {
  let index = players.indexOf(current) === -1 ? 0 : players.indexOf(current) + 1;

  currentPlayer = players[index] ? players[index] : players[0];
}

/*function selectPlayers () {
  var pl1 = document.querySelector(".player-one");
  var p1 = pl1.innerText;
  var pl2 = document.querySelector(".player-one");
  var p2 = pl2.innerText;
  if (players.indexOf("p1")) {
      console.log(p1 + " es tu turno");
      //alert(`${p1} es tu turno`);
    }
    else {
      console.log(p2 + " es tu turno");
      //alert(`${p2} es tu turno`);
    }  
}*/


var checkCards = [];



function storeCards (e) {      
  //console.log(e);
  //selectPlayers();
  e.target.classList.add("active");
  e.target.onclick = "";
  var selectedCard = document.getElementsByClassName("active");
  switch (checkCards.length){
    case 0:      
      checkCards.push(e.target.innerText);      
      break;
    case 1:      
      checkCards.push(e.target.innerText);      

      for (var i = 0; i < selectedCard.length; i++) {
        if (checkCards[0] === checkCards[1]) {  
          if (currentPlayer === players[1]) {
            //console.log("Deberías cambiar de color");
            selectedCard[i].classList.add("hit-player-two");
            checkCards = [];          
          } else {
            selectedCard[i].classList.add("hit");                   
            checkCards = [];            
          }                             
        } 
        if (checkCards[0] !== checkCards[1] && 
          !selectedCard[i].classList.contains("hit") &&
          !selectedCard[i].classList.contains("hit-player-two"))
        {           
          selectedCard[i].classList.add("fail");                             
        }                
      }      
      break;
    case 2:
      checkCards = [];
      var fails = document.querySelectorAll(".cell");

      for (var i = 0; i < fails.length; i++) {        
        fails[i].classList.remove("fail");
        fails[i].classList.remove("active");        
        fails[i].onclick = storeCards;              
      }

      nextPlayer(currentPlayer);
      alert("next player");      

      cells.className = "";      
      break;
    default:      
  }  
}

function selectNick() {
  document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      playerOneNick[0].innerText = playerOneName[0].value
      playerTwoNick[0].innerText = playerTwoName[0].value
    }
  });
}

function gameInit (){
  printBoard();
  selectNick();    
  
  var playGame = document.querySelectorAll(".play-game")
  playGame[0].addEventListener("click", printCards);
  var resetGame = document.querySelectorAll(".restart-game");
  resetGame[0].addEventListener("click", gameReset);
}

function gameReset () {
  window.location.reload(true);
}

gameInit();

//paintCards();