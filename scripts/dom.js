var ANIMALS = [
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
  "seahorse",
];

function Dom() {
  var self = this;
  this.animalsShuffle = [];

  this.init = function () {
    this.animalsShuffle = self.shuffle(ANIMALS);
    this.layout();
    let startButton = document.querySelector(".play-game");
    let resetButton = document.querySelector(".restart-game");

    startButton.addEventListener("click", game.gameInit);
    resetButton.addEventListener("click", game.gameReset);
  };

  this.layout = function () {
    let board = document.querySelector(".board");

    for (let i = 0; i < 3 * 6; i++) {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.classList.add("aqua");
      div.classList.add("invisible");
      board.appendChild(div);
    }

    this.paintCards();
  };

  this.shuffle = function (items) {
    var m = items.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = items[m];
      items[m] = items[i];
      items[i] = t;
    }

    return items;
  };

  this.paintCards = function () {
    for (var i = 0; i < cells.length; i++) {
      let animal = self.animalsShuffle[i];
      cells[i].innerText = animal;
      cells[i].classList.add(animal);
      cells[i].onclick = checkCard;
    }
  };
}

var dom = new Dom();

window.onload = () => {
  dom.init();
  startGame();
}
