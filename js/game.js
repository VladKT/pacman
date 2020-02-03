'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPERFOOD = '*';

var gBoard;
var gGame = {
  score: 0,
  foodCount : 0,
  isOn: false,
};

function init() {
  gGame.score = 0;
  document.querySelector('.modal').style.display = 'none';
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gGame.foodCount ++;
      // console.log(gGame.foodCount);
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
        gGame.foodCount --;

      }
    }
  }
  board[1][1] = SUPERFOOD;
  board[1][8] = SUPERFOOD;
  board[8][1] = SUPERFOOD;
  board[8][8] = SUPERFOOD;
  gGame.foodCount -= 4;
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
  if (gGame.foodCount === 0) gameOver();
}


function gameOver() {
  document.querySelector('.modal').style.display = 'block';
  // (gIsVictorious)? 'You Win' : 'You Lose'
  document.querySelector('.modal h4').innerText = (gGame.foodCount === 0) ? 'Victory' : 'Game Over';
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}




