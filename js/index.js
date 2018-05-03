
// Variables
var currentPlayer = 1;

var board = [];
player1Board = document.getElementsByClassName('player1');
player2Board = document.getElementsByClassName('player2');

var displayBoard = [];
displayP1 = document.getElementsByClassName('displayP1');
displayP2 = document.getElementsByClassName('displayP2');



// Game start
prepareArrays();
var backgroundAudio = document.getElementById("backgroundAudio");
backgroundAudio.volume = 0.3;

// Functions

// Creates an array in the correct order
function prepareArrays() {
  player1Board = [].slice.call(player1Board);
  player2Board = [].slice.call(player2Board).reverse();
  board = player1Board.concat(player2Board);

  displayP1 = [].slice.call(displayP1);
  displayP2 = [].slice.call(displayP2).reverse();
  displayBoard = displayP1.concat(displayP2);

  prepareBoard();
}

function prepareBoard() {

  removePieces(i);
  // Sets the correct starting values and pieces to each space.
  for (var i = 0; i < board.length; i++) {
    if(i === 6 || i === 13) {
      board[i].innerHTML = 0;
    } else {
      board[i].innerHTML = 4;
      addPieces(i);
    }
  }
  playerTurn();
}

function addPieces(counter) {
  // Loop creates 1 piece and randomises its position within bounds
  for (var j = 0; j < 4; j++) {
    // Creates the element
    var img = document.createElement("img");
    img.src = "img/stone-" + j + ".png";
    var src = displayBoard[counter];
    img.classList.add("stone");

    // Randomising CSS position
    $(img).css({'left' : randomGenerator(35), 'top': randomGenerator(35) });

    // Append to the page
    src.appendChild(img);
  }
}

function removePieces() {
  $('.stone').remove();
}

// Used in AddPieces
// Used for randomly placing pieces within the assigned section
function randomGenerator(maxNumber) {
  return Math.floor(Math.random() * maxNumber + 10);
}


function playerTurn() {
  // Sets click events depending upon who is the current player
  if (currentPlayer === 1) {
    for (var i = 0; i < displayP1.length; i++) {
      player1Board[i].addEventListener('click', player1Click);
      displayP1[i].addEventListener('click', player1ClickDisplay);

      player2Board[i].removeEventListener('click', player2Click);
      displayP2[i].removeEventListener('click', player2ClickDisplay);

    }
  } else {
    for (var i = 0; i < displayP2.length; i++) {
      player2Board[i].addEventListener('click', player2Click);
      displayP2[i].addEventListener('click', player2ClickDisplay);

      player1Board[i].removeEventListener('click', player1Click);
      displayP1[i].removeEventListener('click', player1ClickDisplay);
    }
  }
}

// Calls the click event for the associated "counter" div
function player1ClickDisplay() {
  var elem = document.getElementById(this.dataset.num);
  elem.click();
}

// Calls the click event for the associated "counter" div
function player2ClickDisplay() {
  var elem = document.getElementById(this.dataset.num);
  elem.click();
}

function player1Click() {
  // Checking validity of chosen move
  if (parseInt(this.innerHTML) === 0) {
    document.getElementById('score').innerHTML = "You can't do that. Try another move!";
  }
  else { // Logic for carrying out the move
    var stones = parseInt(this.innerHTML);
    var currentPosition = (parseInt(this.id));
    var lastPosition = currentPosition + stones;
    var overlap = 0;
    var inverseOverlap = 0;

    this.innerHTML = 0;

    playAudio(0);

    // Checking if there are enough stones to wrap around
    if (lastPosition > 12) {
      overlap = lastPosition - 12;
      inverseOverlap = 13 - overlap;

    } // Normal move logic
    for (var i = 1; i < stones - overlap + 1; i++) {
      board[currentPosition+i].innerHTML = parseInt(board[currentPosition+i].innerHTML)+ 1;
      displayBoard[currentPosition+i].appendChild($('#board'+this.id).find('.stone')[0]);

    } // Handles overlapping logic
    for (var i = 0; i < overlap; i++) {
      board[i].innerHTML  = parseInt(board[i].innerHTML)+ 1;
      displayBoard[i].appendChild($('#board'+this.id).find('.stone')[0]);
    }

    // Capturing logic
    if (lastPosition >= 13 && lastPosition <= 18 && board[overlap-1].innerHTML === "1") {
      board[6].innerHTML = parseInt(board[6].innerHTML) + parseInt(board[inverseOverlap].innerHTML) + parseInt(board[overlap-1].innerHTML);
      $(displayBoard[inverseOverlap]).find('.stone').appendTo(displayBoard[6]);
      $(displayBoard[overlap-1]).find('.stone').appendTo(displayBoard[6]);
      document.getElementById('score').innerHTML = "You captured your opponents pieces!";
      board[overlap-1].innerHTML = 0;
      board[inverseOverlap].innerHTML = 0;
    }

    // Checks for a winner
    if (!decideWinner()) {
      if (lastPosition === 6 || lastPosition === 19) {
        document.getElementById('score').innerHTML = "Player 1, you get another turn!";
        playerTurn();
      } else {
        // Changes to player 2's turn
        currentPlayer = 2;
        document.getElementById('score').innerHTML = "Player 2's turn.";
        playerTurn();
      }
    }
    else {
      announceResult(currentPlayer);
    }
  }
}

function player2Click() {
  // Checking validity of chosen move
  if (parseInt(this.innerHTML) === 0) {
    document.getElementById('score').innerHTML = "You can't do that. Try another move!";
  }
  else { // Logic for carrying out the move
    var stones = parseInt(this.innerHTML);
    var currentPosition = (parseInt(this.id));
    var lastPosition = currentPosition + stones;
    var overlap = 0;
    var inverseOverlap = 0;

    this.innerHTML = 0;

    playAudio(0);

    // Checking if there are enough stones to wrap around
    if (lastPosition > 13) {
      overlap = lastPosition - 13;
      inverseOverlap = 12 - overlap;
    } // Normal move logic
    for (var i = 1; i < stones - overlap + 1; i++) {
      board[currentPosition+i].innerHTML = parseInt(board[currentPosition+i].innerHTML)+ 1;
      displayBoard[currentPosition+i].appendChild($('#board'+this.id).find('.stone')[0]);
    }
    // Handles overlapping logic
    if (overlap < 7) { // Skipped as this is the opponents scoring zone
      for (var i = 0; i < overlap; i++) {
        board[i].innerHTML  = parseInt(board[i].innerHTML)+ 1;
        displayBoard[i].appendChild($('#board'+this.id).find('.stone')[0]);
      }
    } else {
      overlap = overlap + 1;
      for (var i = 0; i < 6; i++) {
        board[i].innerHTML  = parseInt(board[i].innerHTML)+ 1;
        displayBoard[i].appendChild($('#board'+this.id).find('.stone')[0]);
      }
      for (var i = 7; i < overlap ; i++) {
        board[i].innerHTML  = parseInt(board[i].innerHTML)+ 1;
        displayBoard[i].appendChild($('#board'+this.id).find('.stone')[0]);
      }
    }

    // Capturing logic
    if (lastPosition >= 20 && lastPosition <= 25 && board[overlap-1].innerHTML === "1") {
      board[13].innerHTML = parseInt(board[13].innerHTML) + parseInt(board[inverseOverlap].innerHTML) + parseInt(board[overlap-1].innerHTML);
      $(displayBoard[inverseOverlap]).find('.stone').appendTo(displayBoard[13]);
      $(displayBoard[overlap-1]).find('.stone').appendTo(displayBoard[13]);
      document.getElementById('score').innerHTML = "Player 2, you captured your opponents pieces!";
      board[overlap-1].innerHTML = 0;
      board[inverseOverlap].innerHTML = 0;
    }

    // Checks for a winner
    if (!decideWinner()) {
      if (lastPosition === 13 || lastPosition === 26) {
        document.getElementById('score').innerHTML = "You get another turn!";
        playerTurn();
      } else { // Changes to player 1's turn
        currentPlayer = 1;
        document.getElementById('score').innerHTML = "Player 1's turn.";
        playerTurn();
      }
    }
    else {
      announceResult(currentPlayer);
    }
  }
}

function playAudio(number) {
  if (number === 0) {
    var audio = new Audio('src/move.wav');
    audio.play();
  }
}


function decideWinner() {
  // Checks if over half the pieces have been collected
  if (parseInt(board[6].innerHTML) > 24 || parseInt(board[13].innerHTML) > 24) {
    return true
  }
  // Checks if either side is empty
  else if (board.slice(0,6).every(isZero) || board.slice(7,13).every(isZero)) {
    if (currentPlayer === 1) {
        currentPlayer = 2;
    } else {
      currentPlayer = 1;
    }
    return true;
  }
}

function announceResult(playerNumber) {
  removeListeners();
  // Reports the result
  if (playerNumber === 1) {
    document.getElementById('score').innerHTML = "Player 1 wins! Press the Reset button to play again.";
  } else {
    document.getElementById('score').innerHTML = "Player 2 wins! Press the Reset button to play again.";
  }
}

// Removes the click events, called in announceResult
function removeListeners() {
  for (var i = 0; i < player1Board.length-1; i++) {
    player1Board[i].removeEventListener('click', player1Click);
    player2Board[i].removeEventListener('click', player2Click);
    displayP1[i].removeEventListener('click', player2ClickDisplay);
    displayP2[i].removeEventListener('click', player2ClickDisplay);
  }
}

// Used in DecideWinner
function isZero(currentValue) {
  return currentValue.innerHTML === "0";
}

// Attached to the reset button
function reset(){
  currentPlayer = 1;
  prepareBoard();
}
