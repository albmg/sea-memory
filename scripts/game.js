var animals = [
  "whale",
  "whale",
  "dolphin",
  "dolphin",
  "starfish",
  "starfish",
  "shark",
  "shark",
  "seal",
  "seal",
  "squid",
  "squid",
  "octopus",
  "octopus",
  "crab",
  "crab",
  "seahorse",
  "seahorse"]


function Game() {
  var self = this;
  this.animalsShuffle = [];

  this.init = function () {
    this.animalsShuffle = self.shuffle(animals);
    this.printBoard();
  };

  this.printBoard = function () {
    let board = document.querySelector(".board");

    for (let i = 0; i < 3 * 6; i++) {
      const div = document.createElement("div");
      div.classList.add("cell");
      board.appendChild(div);
    }

    this.printCards();
  };

  this.shuffle = function (array) {
    var m = array.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  this.printCards = function () {
    for (var i = 0; i < cells.length; i++) {
      let animal = self.animalsShuffle[i];
      cells[i].innerText = animal;
      cells[i].classList.add(animal);
      cells[i].onclick = storeCards;
    }
  };
}

const cells = document.getElementsByClassName('cell');

var players = ["p1", "p2"];
var currentPlayer = players[0];

function nextPlayer(current) {
  let index = players.indexOf(current) === -1 ? 0 : players.indexOf(current) + 1;

  currentPlayer = players[index] ? players[index] : players[0];
}

function timer() {
  var initialTime = 20;
  var timerId = setInterval(function () {
    document.getElementById("timer").value = initialTime;
    if (initialTime <= 0) {
      clearInterval(timerId);
    }
    initialTime -= 1;
    console.log(initialTime)
  }, 1000);
}


var checkCards = [];

function storeCards(e) {
  //console.log(e);  
  selectPlayers();
  e.target.classList.add("clicked");
  e.target.onclick = "";

  var selectedCard = document.getElementsByClassName("clicked");

  switch (checkCards.length) {
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
          !selectedCard[i].classList.contains("hit-player-two")) {
          selectedCard[i].classList.add("fail");
        }
      }
      break;
    case 2:
      checkCards = [];
      var fails = document.querySelectorAll(".cell");

      for (var i = 0; i < fails.length; i++) {
        fails[i].classList.remove("fail");
        fails[i].classList.remove("clicked");
        fails[i].onclick = storeCards;
      }

      nextPlayer(currentPlayer);
      alert("next player");
      timer();

      cells.className = "";
      break;
    default:
  }
}

function selectPlayers() {
  //var pl1 = document.querySelector(".player-one");
  //var p1 = pl1.innerText;
  //var pl2 = document.querySelector(".player-two");
  //var p2 = pl2.innerText;
  var pa = document.querySelector(".players-a");
  var pb = document.querySelector(".players-b");
  if (currentPlayer === players[1]) {
    //console.log(p2 + " es tu turno");
    pb.classList.add("hit-player-two");
    pa.classList.remove("hit");
  }
  else {
    //console.log(p1 + " es tu turno");
    pa.classList.add("hit");
    pb.classList.remove("hit-player-two")

  }
}

var playerOneName = document.querySelectorAll(".player-one-name");
var playerTwoName = document.querySelectorAll(".player-two-name");

function selectNick() {
  playerOneName[0].addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      playerOneNick[0].innerText = playerOneName[0].value;
    }
  })
  playerTwoName[0].addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      playerTwoNick[0].innerText = playerTwoName[0].value;
    }
  })
}

/*function blockNick () {
  playerOneName[0].removeEventListener("disabled", EventTarget);
}*/

function changeBackground() {
  var backg = document.getElementsByClassName("board");
  var h1text = document.getElementsByTagName("h1");
  backg[0].style.backgroundColor = "white";
  h1text[0].innerText = "";
}

function blockStartGame() {
  playGame.removeEventListener("click", startGame);
}

// export function gameReset() {
//   window.location.reload(true);
// }

var playGame = document.querySelector(".play-game")
var resetGame = document.querySelector(".restart-game");
playGame.addEventListener("click", startGame);
/*playGame.removeEventListener("click", iniciarPartida);*/
resetGame.addEventListener("click", this.gameReset);


selectNick();

function startGame() {
  var game = new Game();
  game.init();
  changeBackground();
  //blockNick();
  blockStartGame();
}
