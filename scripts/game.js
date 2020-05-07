var animals = ["whale", "whale", "dolphin", "dolphin", "starfish", "starfish", "shark", "shark", "jellyfish",
    "jellyfish", "squid", "squid", "octopus", "octopus", "fish", "fish", "sea turtle", "sea turtle"]

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
    cells[i].innerText = animalsShuffle[i];       
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

paintCards();