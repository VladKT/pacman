var GHOST = '&#9781;';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {
    var ghostCol = getRandomColor();
    // getRandomColor() can be inside the object.
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: ghostCol
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function removeGhost(coords) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if ((coords.i === ghost.location.i) && (coords.j === ghost.location.j)) {
            gGhosts.splice(i, 1);
        }
    }
}

function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 3000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation =
        {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)

        // if WALL - give up
        if (gBoard[nextLocation.i][nextLocation.j] === WALL) return
        // if GHOST - give up
        if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
            return
        }

        // if PACMAN - gameOver
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
            if (gPacman.isSuper) {
                gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
                renderCell(ghost.location, ghost.currCellContent)
                gGhosts.splice(i, 1);
                return;
            } else {
                gameOver();
                return;
            }
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)

        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, getGhostHTML(ghost))

    }
}
function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}






