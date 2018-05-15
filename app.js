let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const UIGame = document.querySelector('#game'),
  UIMinNum = document.querySelector('.min-num'),
  UIMaxNum = document.querySelector('.max-num'),
  UIGuessBtn = document.querySelector('#guess-btn'),
  UIGuessInp = document.querySelector('#guess-input'),
  UIMessage = document.querySelector('.message');

// assign UI min and max
UIMinNum.textContent = min;
UIMaxNum.textContent = max;

// Play again even listener
UIGame.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
UIGuessBtn.addEventListener('click', function () {
  let guess = parseInt(UIGuessInp.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // Disable input
    gameOver(true, `${winningNum} is correct, you WIN !`);

  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over
      gameOver(false, `Game Over, you lost! The correct number was ${winningNum}`);

    } else {
      // Game continues
      UIGuessInp.style.borderColor = 'red';
      UIGuessInp.value = '';
      setMessage(`${guess} is no correct, ${guessesLeft} guesses left`);
    }
  }
});

function setMessage(msg, color) {
  UIMessage.style.color = color;
  UIMessage.textContent = msg;
};

// Game Over
function gameOver(won, msg) {
  // Disable input
  let color;
  won === true ? color = 'green' : color = 'red';
  UIGuessInp.disabled = true;
  UIGuessInp.style.borderColor = color;
  setMessage(msg, color);

  //Play Again ?
  UIGuessBtn.value = 'Play Again';
  UIGuessBtn.className += 'play-again';
};

// Get Wining Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};