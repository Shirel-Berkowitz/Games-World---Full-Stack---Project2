let order = [];
let playerOrder = [];
let flash;
let turn;  //count the scores
let good;
let compTurn;
let intervalId;
let strict = true;
let noise = true;
let on = true;
let win;


const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const startButton = document.querySelector("#start");
const menuButton = document.querySelector("#menu");
const tryAgainButton = document.querySelector("#TryAgain");
const gameOverBox = document.querySelector("#GameOverBox");
const boxButton = document.querySelector(".boxButton");
const winBox = document.querySelector(".WinBox");
const WinBoxButtons = document.querySelector(".WinBoxButtons");
const playAgainButton = document.querySelector("#PlayAgain");
const winMenuButton = document.querySelector("#winMenu");


startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
    startButton.style.visibility = "hidden";
  }
});

tryAgainButton.addEventListener('click', (event) => {
  play();
  gameOverBox.style.visibility = "hidden";
  menuButton.style.visibility = "hidden";
  boxButton.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
});

playAgainButton.addEventListener('click', (event) => {
  play();
  winBox.style.visibility = "hidden";
  WinBoxButtons.style.visibility = "hidden";
  playAgainButton.style.visibility = "hidden";
  menuButton.style.visibility = "hidden";
  winMenuButton.style.visibility="hidden";
});

menuButton.addEventListener('click', (event) => {
  window.location.href = "homePage.html";
  gameOverBox.style.visibility = "hidden";
  boxButton.style.visibility = "hidden";
});

winMenuButton.addEventListener('click', (event) => {
  window.location.href = "homePage.html";
  winBox.style.visibility = "hidden";
  WinBoxButtons.style.visibility = "hidden";
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 3 && good) {
    winGame();
    winBox.style.visibility = "visible";
    document.getElementById("win-score").innerHTML=turn;
    WinBoxButtons.style.visibility = "visible";
    winMenuButton.style.visibility = "visible";  

    //JS for the TotalScore when the user won
    let isLoggedIn= JSON.parse(localStorage.getItem("userLoggedIn"));
    let user=JSON.parse(localStorage.getItem(isLoggedIn['username']));
    user["score"]=parseInt(user["score"])+turn;
    localStorage.setItem(user["username"], JSON.stringify(user));
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      gameOverBox.style.visibility = "visible"
      document.getElementById("lose-score").innerHTML=turn;
      boxButton.style.visibility = "visible";
      menuButton.style.visibility = "visible";
    }, 600);
    
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}

