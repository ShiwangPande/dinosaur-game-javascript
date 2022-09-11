const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}


function jump() {
    if (dispatchEvent.classList != "jump") {
        //first it checks if the dino is mid-jump. If not, it makes it jump.
        dino.classList.add("jump");
        setTimeout(function () {
            dino.classList.remove("jump");
            //removes the jump class from the dino once it has jumped so that it can jump again
        }, 300);
    }
}
let checkAlive = setInterval(function () {
    let dinoTop = parseInt(
        window.getComputedStyle(dino).getPropertyValue("top")
    );
    let cactusLeft = parseInt(
        window.getComputedStyle(cactus).getPropertyValue("left")
    );
    //check for collision
    if (cactusLeft > 0 && cactusLeft < 45 && dinoTop >= 110) {
        dino.style.animationPlayState = "paused";
        cactus.style.animationPlayState = "paused";
        alert("Whoops! Game Over :(");
        window.location.reload();
    }
}, 10);
document.addEventListener("keydown", function (event) {
    jump();
});
// document.addEventListener("click", function (event) {
//     jump();
// });
function functionToExecute() {
    jump();
}
function timer() {
    var sec = 30;
    var timer = setInterval(function () {
        document.getElementById('safeTimerDisplay').innerHTML = '00:' + sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
{/* <b style="color: rgb(38, 38, 38); font-family: Poppins; font-size: x-large; --darkreader-inline-color:#d0ccc6;" data-darkreader-inline-color=""></b> */ }
