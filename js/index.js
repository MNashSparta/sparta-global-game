
// Variables
board = [];
currentPlayer = 1;
var player1Board = [];
var player2Board = [];
winner = false;

// Game start
PrepareBoard();

// Functions

function PrepareBoard() {

  // Setting variables to starting values
  player1Board = document.getElementsByClassName('player1');
  player2Board = document.getElementsByClassName('player2');
  currentPlayer = 1;

  // Creates an array in the correct order
  player1Board = [].slice.call(player1Board);
  player2Board = [].slice.call(player2Board).reverse();
  board = player1Board.concat(player2Board);

  // Sets the correct starting values to each space.
  for (var i = 0; i < board.length; i++) {
    if(i === 6 || i === 13) {
      board[i].innerHTML = 0;
    } else {
      board[i].innerHTML = 4;
      AddPieces();
    }
  }

  PlayerTurn();
}

function AddPieces() {
  for (var j = 0; j < 4; j++) {
    var img = document.createElement("img");
    img.src = "../img/stone-" + j ".png";
    console.log(img.src);
    var src = board[i];
    src.appendChild(img);
  }
}


function PlayerTurn() {
  // Sets click events depending upon who is the current player
  if (currentPlayer === 1) {
    for (var i = 0; i < player1Board.length-1; i++) {
      player1Board[i].addEventListener('click', Player1Click);
      player2Board[i].removeEventListener('click', Player2Click);

    }
  } else {
    for (var i = 0; i < player2Board.length-1; i++) {
      player2Board[i].addEventListener('click', Player2Click);
      player1Board[i].removeEventListener('click', Player1Click);
    }
  }
}

function Player1Click() {
  // Checking validity of chosen move
  if (parseInt(this.innerHTML) === 0) {
    document.getElementById('score').innerHTML = "You can't do that. Try another move!";
  }
  else {
    var stones = parseInt(this.innerHTML);
    var currentPosition = (parseInt(this.id));
    var lastPosition = currentPosition + stones;
    var overlap = 0;
    var inverseOverlap = 0;
    this.innerHTML = 0;

    // Checking if there are enough stones to wrap around
    if (lastPosition > 12) {
      overlap = lastPosition - 12;
      inverseOverlap = 13 - overlap;

    } // Normal move logic
    for (var i = 1; i < stones - overlap + 1; i++) {
      board[currentPosition+i].innerHTML = parseInt(board[currentPosition+i].innerHTML)+ 1;
    } // Handles overlapping logic
    for (var i = 0; i < overlap; i++) {
      board[i].innerHTML  = parseInt(board[i].innerHTML)+ 1;
    }

    // Capturing logic
    if (lastPosition >= 13 && lastPosition <= 18 && board[overlap-1].innerHTML === "1") {
      board[6].innerHTML = parseInt(board[6].innerHTML) + parseInt(board[inverseOverlap].innerHTML) + parseInt(board[overlap-1].innerHTML);
      document.getElementById('score').innerHTML = "You captured your opponents pieces!";
      board[overlap-1].innerHTML = 0;
      board[inverseOverlap].innerHTML = 0;
    }

    // Checks for a winner
    DecideWinner();
    if (!winner) {
      if (lastPosition === 6) {
        document.getElementById('score').innerHTML = "Player 1, you get another turn!";
        PlayerTurn();
      } else {
        currentPlayer = 2;
        document.getElementById('score').innerHTML = "Player 2's turn.";
        PlayerTurn();
      }
    }

  }
}

function Player2Click() {
  // Checking validity of chosen move
  if (parseInt(this.innerHTML) === 0) {
    document.getElementById('score').innerHTML = "You can't do that. Try another move!";
  }
  else {
    var stones = parseInt(this.innerHTML);
    var currentPosition = (parseInt(this.id));
    var lastPosition = currentPosition + stones;
    var overlap = 0;
    var inverseOverlap = 0;
    this.innerHTML = 0;

    // Checking if there are enough stones to wrap around
    if (lastPosition > 13) {
      overlap = lastPosition - 13;
      inverseOverlap = 12 - overlap;
    } // Normal move logic
    for (var i = 1; i < stones - overlap + 1; i++) {
      board[currentPosition+i].innerHTML = parseInt(board[currentPosition+i].innerHTML)+ 1;
    } // Handles overlapping logic

    // Skipped as this is the opponents scoring zone
    if (overlap < 7) {
      for (var i = 0; i < overlap; i++) {
        board[i].innerHTML  = parseInt(board[i].innerHTML)+ 1;
      }
    } else {
      overlap = overlap + 1;
      for (var i = 0; i < 6; i++) {
        board[i].innerHTML  = parseInt(board[i].innerHTML)+ 1;
      }
      for (var i = 7; i < overlap ; i++) {
        board[i].innerHTML  = parseInt(board[i].innerHTML)+ 1;
      }
    }

    // Capturing logic
    if (lastPosition >= 20 && lastPosition <= 25 && board[overlap-1].innerHTML === "1") {
      board[13].innerHTML = parseInt(board[13].innerHTML) + parseInt(board[inverseOverlap].innerHTML) + parseInt(board[overlap-1].innerHTML);
      document.getElementById('score').innerHTML = "Player 2, you captured your opponents pieces!";
      board[overlap-1].innerHTML = 0;
      board[inverseOverlap].innerHTML = 0;
    }

    // Checks for a winner
    DecideWinner();
    if (!winner) {
      if (lastPosition === 13) {
        document.getElementById('score').innerHTML = "You get another turn!";
        PlayerTurn();
      } else {
        currentPlayer = 1;
        document.getElementById('score').innerHTML = "Player 1's turn.";
        PlayerTurn();
      }
    }
  }
}


function DecideWinner() {
  // Checks if over half the pieces have been collected
  if (parseInt(board[6].innerHTML) > 24 || parseInt(board[13].innerHTML) > 24) {
    winner = true;
    AnnounceResult();
  }
  // Checks if either side is empty
  else if (board.slice(0,6).every(IsZero) || board.slice(7,13).every(IsZero)) {
    if (currentPlayer === 1) {
      currentPlayer = 2;
    }
    else {
      currentPlayer = 1;
    }

    winner = true;
    AnnounceResult();
  }}


function AnnounceResult() {
  // Removes the click events
  for (var i = 0; i < player1Board.length-1; i++) {
    player1Board[i].removeEventListener('click', Player1Click);
    player2Board[i].removeEventListener('click', Player2Click);
  }
  // Reports the result
  if (winner && currentPlayer === 1) {
    document.getElementById('score').innerHTML = "Player 1 wins!";
  } else if (winner && currentPlayer === 2) {
    document.getElementById('score').innerHTML = "Player 2 wins!";
  } else {
    document.getElementById('score').innerHTML = "It's a draw...";
  }
}

// Used in DecideWinner
function IsZero(currentValue) {
  return currentValue.innerHTML === "0";
}


function Reset(){
  PrepareBoard();
}
