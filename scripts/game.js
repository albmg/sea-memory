var animals = ["whale", "whale", "dolphin", "dolphin", "starfish", "starfish", "shark", "shark", "jellyfish",
    "jellyfish", "squid", "squid", "octopus", "octopus", "fish", "fish", "sea turtle", "sea turtle", "crab", 
    "crab", "kelp", "kelp", "penguin", "penguin", "seal", "seal", "krill", "krill"]

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

//console.log(shuffle(animals));
//console.log(shuffle(animals[0]));

var animalsShuffle = shuffle(animals);

const cells = document.getElementsByClassName('cell');
for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = animalsShuffle[i];
    //console.log(cells[i]);
    //console.log(animalsShuffle[i])
    cells[i].onclick = function (e) {
        console.log(e.target.innerText);
    }
}