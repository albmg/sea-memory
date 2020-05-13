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
  const cells = document.getElementsByClassName('cell');
  let startButton = document.querySelector(".play-game");
  let resetButton = document.querySelector(".restart-game");

  this.animalsShuffle = [];
  this.layoutLoaded = false;

  this.init = function () {
    this.animalsShuffle = self.shuffle(ANIMALS);
    this.layoutLoaded = false;
    self.layout();
    startButton.addEventListener("click", self.changeBackground);
    resetButton.addEventListener("click", self.refresh);
  };

  this.layout = function () {
    let board = document.querySelector(".board");

    if (this.layoutLoaded) {
      const cells = document.getElementsByClassName('cell')

      while (cells.length > 0) {
        cells[0].parentNode.removeChild(cells[0]);
      }
    }

    for (let i = 0; i < 3 * 6; i++) {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.classList.add("aqua");
      div.classList.add("invisible");
      board.appendChild(div);
    }

    this.paintCards();
    this.layoutLoaded = true;
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
      cells[i].onclick = game.storeCards;
    }
  };

  this.changeBackground = function () {
    let board = document.querySelector(".board");
    let h1 = document.querySelector("h1");
    game.init();
    board.style.backgroundColor = "white";
    h1.innerText = "";
    document.querySelectorAll('input').forEach(input => input.setAttribute('disabled', true));
  }

  this.blockButton = function (button) {
    startButton.removeEventListener("click", startGame);
  }

  this.refresh = function () {
    window.location.reload(true);
  }
}

var dom = new Dom();

window.onload = function () {
  dom.init();
}
