"use strict";
// selc the elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//starting
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEl.classList.add("hidden");
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

btnNew.addEventListener("click", function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores[0] = 0;
  scores[1] = 0;

  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");

  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
});

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

// rolling dice function

btnRoll.addEventListener("click", function () {
  if (playing) {
    //.1 gen random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. diplay dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //.3 check is 1
    if (dice !== 1) {
      // add dice to score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      //  current0EL.textContent = currentScore;
    } else {
      // switch turn
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // add current score to active players score
    scores[activePlayer] += currentScore;

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    switchPlayer();
  }
});
let playing = true;
