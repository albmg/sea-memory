var players = ["p1", "p2"];
var currentPlayer = players[0];
export const cells = document.getElementsByClassName("cell");

function selectPlayers() {
  var player1 = document.querySelector(".player-one");
  var p1 = player1.innerText;
  console.log(p1);
  console.log(player1);
  if (players.indexOf("p1") !== -1) {
    console.log(p1 + " es tu turno");
    alert(`${p1} es tu turno`);
  }
}

function nextPlayer(current) {
  let index =
    players.indexOf(current) === -1 ? 0 : players.indexOf(current) + 1;

  currentPlayer = players[index] ? players[index] : players[0];
}

var checkCards = [];
var checkedCards = [];

export function checkCard(event) {
  const cards = Array.from(document.querySelectorAll(".cell"));

  let actives = cards.filter(function (card) {
    return card.classList.value.match(/active/);
  });

  let current = event.target;
  current.classList.add("active");
  current.onclick = null;
  checkedCards.push(current);
  let index = actives
    .map((active) => active.innerText)
    .indexOf(current.innerText);

  if (index !== -1) {
    checkedCards.forEach((c) => c.classList.add("checked"));
  } else {
    checkedCards.forEach((c) => c.classList.add("fail"));
  }
}

export function storeCell(e) {
  switch (checkCards.length) {
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
        if (
          checkCards[0] !== checkCards[1] &&
          !checkingCard[i].classList.contains("checked")
        ) {
          console.log(checkingCard[i]);
          checkingCard[i].classList.add("fail");
        }
      }
      console.log("length of checkcards", checkCards.length);
      break;
    case 2:
      checkCards = [];
      var fails = document.querySelectorAll(".cell");

      for (var i = 0; i < fails.length; i++) {
        fails[i].classList.remove("fail");
        fails[i].classList.remove("active");
        fails[i].onclick = storeCell;
      }

      nextPlayer(currentPlayer);

      cells.className = "";
      break;
    default:
    //storeCell();
  }
}

function selectNick() {
  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      // code for enter
      playerOneNick[0].innerText = playerOneName[0].value;
      playerTwoNick[0].innerText = playerTwoName[0].value;
    }
  });
}

export function gameInit() {
  selectNick();
}

export function gameReset() {
  window.location.reload(true);
}

gameInit();

//paintCards();
