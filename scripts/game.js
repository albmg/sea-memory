function Player(name, letter) {
  this.name = document.querySelector(name).value;
  this.classString = `players-${letter}`
}

function Game() {
  const ANIMALS = [ "whale", "whale", "dolphin", "dolphin", "starfish", "starfish", "shark", "shark", "seal", "seal", "squid", "squid", "octopus", "octopus", "crab", "crab", "seahorse", "seahorse"];

  this.selectedCards = [];
  this.scoreplayer1 = 0;
  this.scoreplayer2 = 0;
  this.cardsValue = 10;

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
    this.selectedCards = [];

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
    card.classList.remove("cell-hidden");
    card.onclick = "";       

    this.selectedCards.push(card);      
            
    if (this.selectedCards.length === 2) {

      if (this.selectedCards[0].innerText === this.selectedCards[1].innerText) {             

        this.selectedCards[0].classList.add('hit')
        this.selectedCards[0].classList.add(this.currentPlayer.classString)
        
        this.selectedCards[1].classList.add('hit')
        this.selectedCards[1].classList.add(this.currentPlayer.classString) 
        
        if (this.selectedCards[0].classList.contains('players-a')) {
          this.scoreplayer1++;
          document.getElementsByClassName("score-one")[0].innerText = this.scoreplayer1 * this.cardsValue;
          console.log("score player 1" + this.scoreplayer1)
        } else {
          this.scoreplayer2++;
          document.getElementsByClassName("score-two")[0].innerText = this.scoreplayer2 * this.cardsValue;
          console.log("score player 2" + this.scoreplayer2)
        }  

        this.selectedCards[0].classList.remove('cell-hidden')
        this.selectedCards[1].classList.remove('cell-hidden')         

        this.selectedCards = [];

        
      } else {                  
        
        setTimeout(() => {
          this.selectedCards[0].classList.add("cell-hidden");
          this.selectedCards[1].classList.add("cell-hidden");
          this.nextPlayer();
        }, 500);
      }
    }  
  }; 
}


function gameReset () {
  window.location.reload(true);
}


document.querySelector(".play-game").addEventListener("click", startGame);
/*playGame.removeEventListener("click", iniciarPartida);*/
//document.querySelector(".restart-game").addEventListener("click", this.gameReset);


function startGame () { 
  var game = new Game();  
  document.querySelector('.start-panel').style.display = 'none'
  game.init();
  changeBackground();  
}
