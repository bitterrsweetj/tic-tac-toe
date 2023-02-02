// Setting up an array of all the possible winning conditions
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// Creating board with empty values for each cell
let gameBoard = ['', '', '', '', '', '', '', '', ''];
// const gameStateX = [];
// const gameStateO = [];
const cells = Array.from(document.querySelectorAll('.grid-item'));
const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;

const displayResult = document.querySelector('.result');

const cellClicked = (e) => {
  // get id of the cell that was clicked
  const { id } = e.target;

  // check if game board is empty, if it is update the game board array and display it
  if (!gameBoard[id]) {
    // write the value of current player ('X' or 'O') to the game board array
    // display X or O on the game board
    gameBoard[id] = currentPlayer;
    checkWinner();
    e.target.textContent = currentPlayer;
  }

  // check winner
  function checkWinner() {
    // creating an array with indexes of Xs on the game board
    const indexesX = gameBoard.reduce((accumulator, current, index) => {
      if (current === 'X') {
        accumulator.push(index);
      }
      return accumulator;
    }, []);
    // array with indexes of Os
    const indexesO = gameBoard.reduce((accumulator, current, index) => {
      if (current === 'O') {
        accumulator.push(index);
      }
      return accumulator;
    }, []);
    // check if the amount of Xs is 3 then check if there are any winning combinations
    if (indexesX.length > 2) {
      for (let i = 0; i < 8; i++) {
        // check if every element of winning combination array is in the array with Xs or Os indexes
        const checker = (arr, target) => target.every((v) => arr.includes(v));
        if (checker(indexesX, WINNING_COMBINATIONS[i])) {
          displayResult.textContent = 'X winnns';
          disableBoard();
        } else if (checker(indexesO, WINNING_COMBINATIONS[i])) {
          displayResult.textContent = 'O winnns';
          disableBoard();
        } else if (indexesX.length === 5) {
          displayResult.textContent = `It's a draw`;
          disableBoard();
        }
      }
    }
  }
  // swap players
  currentPlayer = currentPlayer === playerO ? playerX : playerO;
};

// event listener for clicking on the cells, can be done once
function startGame() {
  cells.forEach((cell) => {
    cell.addEventListener('click', cellClicked, { once: true });
  });
}

function disableBoard() {
  cells.forEach((cell) => {
    cell.removeEventListener('click', cellClicked, { once: true });
  });
}
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', restart);

function restart() {
  gameBoard = new Array(9).fill('');
  cells.forEach((cell) => (cell.textContent = ''));
  console.log(gameBoard);
  startGame();
}

startGame();
// NOTES dont allow to input values after win
// remove disablebuttons func
