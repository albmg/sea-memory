function Player(name, letter) {
  this.name = document.querySelector(name).value;
  this.classString = `players-${letter}`
}

function Game() {
  const ANIMALS = [ "whale", "whale", "dolphin", "dolphin", "starfish", "starfish", "shark", "shark", "seal", "seal", "squid", "squid", "octopus", "octopus", "crab", "crab", "seahorse", "seahorse"];

  this.init = function () {
    this.animals = this.shuffle(ANIMALS);
    let board = document.querySelector(".board");

    this.player1 = new Player(".player-one-name", 'a');
    this.player2 = new Player(".player-two-name", 'b');
    this.currentPlayer = this.player1;
    document.querySelector('.players-a').classList.add('hit')
    this.animals.forEach(animal => {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.innerText = animal;
      div.classList.add(animal);
      div.classList.add('cell-hidden');
      div.addEventListener('click', this.play);
      board.appendChild(div);
    })
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

  this.nextPlayer = function() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2
      document.querySelector(".players-b").classList.add("hit");
      document.querySelector(".players-a").classList.remove("hit");
    } else {
      this.currentPlayer = this.player1
      document.querySelector(".players-a").classList.add("hit");
      document.querySelector(".players-b").classList.remove("hit");
    }
  }

  this.starTimer = function() {
    this.initialTime = 20;
    this.timerId = setInterval( () => {
      document.getElementById("timer").value = this.initialTime;
      if (this.initialTime === 0) {
        clearInterval(this.timerId);
      } else {
        this.initialTime -= 1;
      }
    }, 1000);

    return this.timerId;
  }

  this.stopTimer = function() {
    clearInterval(this.timerId)
  }  

  this.play = e => {    
    let card = e.target
    //card.classList.toggle("cell-hidden");
    card.classList.remove("cell-hidden");
    t = setTimeout(() => {
      card.classList.add("cell-hidden");
    }, 2000);
    card.classList.add("clicked");    
    card.onclick = "";    
    //this.starTimer()
    var selectedCards = document.getElementsByClassName("clicked");
    
    //console.log(selectedCards.length)       
    if (selectedCards.length === 2) {
      if (selectedCards[0].innerText === selectedCards[1].innerText) { 
        //clearTimeout(t);      
        selectedCards[0].classList.add('hit')
        selectedCards[0].classList.add(this.currentPlayer.classString)
        //clearTimeout(t);
        selectedCards[1].classList.add('hit')
        selectedCards[1].classList.add(this.currentPlayer.classString)
        //clearTimeout(t);

        selectedCards[0].classList.remove('cell-hidden')
        selectedCards[1].classList.remove('cell-hidden')
        selectedCards[0].classList.remove('clicked')
        selectedCards[0].classList.remove('clicked')
        clearTimeout(t);
                
      } else {                  
        selectedCards[0].classList.remove('clicked')
        selectedCards[0].classList.remove('clicked')        
        this.nextPlayer()
      }
    }  
  }
}



/*var checkCards = [];

function storeCards (e) {


  switch (checkCards.length){
    case 0:
      checkCards.push(e.target.innerText);
      break;
    case 1:
      checkCards.push(e.target.innerText);

      for (var i = 0; i < selectedCard.length; i++) {
        if (checkCards[0] === checkCards[1]) {
          if (currentPlayer === players[1]) {
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
          clearInterval(timerId);
          timerId = timer();
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
      clearInterval(timerId);
      timerId = timer();

      cells.className = "";
      break;
    default:
  }
}*/



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

function changeBackground () {
  var backg = document.getElementsByClassName("board");
  var h1text = document.getElementsByTagName("h1");
  backg[0].style.background = "none";
  //h1text[0].innerText = "";
}

function gameReset () {
  window.location.reload(true);
}


document.querySelector(".play-game").addEventListener("click", startGame);
/*playGame.removeEventListener("click", iniciarPartida);*/
document.querySelector(".restart-game").addEventListener("click", this.gameReset);


selectNick();

function startGame () {
  var game = new Game();
  document.querySelector('.start-panel').style.display = 'none'
  game.init();
  changeBackground();
  //blockNick();
}
