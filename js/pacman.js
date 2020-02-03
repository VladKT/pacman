var gPacman;
const PACMAN = '&#9786;';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === SUPERFOOD) {
    updateScore(1);
    superPower();
  }
  if (nextCell === FOOD) {
    updateScore(1);
    gGame.foodCount --;
    console.log('Current foodcount: ', gGame.foodCount);
  } 
  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      removeGhost(nextLocation)
    } else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }

  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function superPower() {
  gPacman.isSuper = true;
  console.log('Super Mode!', gPacman.isSuper);
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].color = 'white';
    console.log('the color is :', gGhosts[i].color);
    renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
  }
  setTimeout(function () {
    gPacman.isSuper = false;
    console.log('Super Mode is off!!!', gPacman.isSuper);
    var ghostsNum = gGhosts.length;
    for (var i = 0; i < ghostsNum; i++) {
      gGhosts[i].color = getRandomColor();
      renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
    }
    for (var i = 3; i > ghostsNum; i--) {
      createGhost(gBoard);
    }
  }, 5000);
}



function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}