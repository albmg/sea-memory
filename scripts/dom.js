// function selectNick
//var playerOneName = document.querySelectorAll(".player-one-name");
var playerOneNick = document.querySelectorAll(".player-one");
//var playerTwoName = document.querySelectorAll(".player-two-name");
var playerTwoNick = document.querySelectorAll(".player-two");
    


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

selectNick();

function changeBackground() {
    var backg = document.getElementsByClassName("board");
    backg[0].style.background = "none";
}
