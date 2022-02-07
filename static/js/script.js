const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
var Board;

const cellElements = document.querySelectorAll('.cell')
startGame();


function startGame(){
    Board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (var i = 0; i < cellElements.length; i++){
        cellElements[i].classList.remove('x');
        cellElements[i].classList.remove('o');
        cellElements[i].addEventListener('click', turnClick);
    }
}

function turnClick(cell){
    turn(cell.target.id, X_CLASS);
}

function turn(cellId, player){
    Board[cellId] = player;
    document.getElementById(cellId).classList.add(player);
    // console.log(cellId)
}