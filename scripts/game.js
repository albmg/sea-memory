function Game(numberOfPlayers = 2) {
  var self = this;
  this.numberOfPlayers = numberOfPlayers;
  this.players = [];
  var timerId = null;
  var currentPlayer;
  var checkCards = [];
  var playerOneName = document.querySelector(".player-one-name");
  var playerTwoName = document.querySelector(".player-two-name");

  this.init = function () {
    if (self.players.length === 0) {
      for (let i = 0; i < self.numberOfPlayers; i++) {
        let player = new Player();
        player.setName(`Player ${i + 1}`);
        self.players.push(player);
        self.createPlayer(player);
      }
    }

    if (self.players.length > 0) {
      currentPlayer = self.players[Math.floor(Math.random() * self.players.length)];
    }
  };

  this.createPlayer = function (player) {
    const playersSection = document.getElementById("players");
    const label = document.createElement('label');
    const input = document.createElement('input');
    label.classList.add(`p${self.players.length}`);
    label.id = `player-${self.players.length}`;
    label.innerText = player.name;
    input.classList.add('player-name');
    input.placeholder = 'Type your name';
    label.appendChild(input);
    playersSection.appendChild(label);
    input.onchange = function (e) {
      console.log(e);
      self.selectNick(e);
    }
  }

  this.nextPlayer = function (current) {
    let index = self.players.indexOf(current) === -1 ? 0 : self.players.indexOf(current) + 1;
    currentPlayer = self.players[index] ? self.players[index] : self.players[0];
  }

  this.timer = function () {
    var initialTime = 20;

    return setInterval(function () {
      document.getElementById("timer").value = initialTime;

      if (initialTime <= 0) {
        clearInterval(timerId);
        return;
      }

      initialTime -= 1;
      console.log(initialTime);
    }, 1000);
  }

  this.storeCards = function (event) {
    //console.log(event);
    self.selectPlayers();
    event.target.classList.add("clicked");
    event.target.onclick = "";
    clearInterval(timerId);
    timerId = self.timer();

    var selectedCard = document.getElementsByClassName("clicked");

    switch (checkCards.length) {
      case 0:
        checkCards.push(event.target.innerText);
        break;
      case 1:
        checkCards.push(event.target.innerText);

        for (var i = 0; i < selectedCard.length; i++) {
          if (checkCards[0] === checkCards[1]) {
            if (currentPlayer === self.players[1]) {
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
            clearInterval(timerId);
            //timerId = self.timer();
          }
        }
        break;
      case 2:
        checkCards = [];
        var fails = document.querySelectorAll(".cell");

        for (var i = 0; i < fails.length; i++) {
          fails[i].classList.remove("fail");
          fails[i].classList.remove("clicked");
          fails[i].onclick = self.storeCards;
        }

        self.nextPlayer(currentPlayer);
        alert("next player");
        clearInterval(timerId);
        timerId = self.timer();

        //cells.className = "";
        break;
      default:
    }
  }

  this.selectPlayers = function () {
    var pa = document.querySelector(".players-a");
    var pb = document.querySelector(".players-b");

    if (currentPlayer === self.players[1]) {
      pb.classList.add("hit-player-two");
      pa.classList.remove("hit");
    } else {
      pa.classList.add("hit");
      pb.classList.remove("hit-player-two")
    }
  };

  this.selectNick = function (event) {
    const player = event.currentTarget;
    const index = self.players.map(p => p.name).indexOf(player.parentNode.innerText);
    document.querySelector(`.player-${index === 0 ? 'one' : 'two'}`).innerText = player.value;
  };
}

var game = new Game();
game.init();
