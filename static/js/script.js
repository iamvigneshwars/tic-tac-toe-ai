const humanPlayer = 'x'
const AiPlayer = 'o'
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
    document.getElementById("result_message").innerHTML = "Can you beat the AI?"
    for (var i = 0; i < cellElements.length; i++){
        cellElements[i].classList.remove('x');
        cellElements[i].classList.remove('o');
        cellElements[i].addEventListener('click', playMove, true);
    }
}

function playMove(cell){
    
    if (typeof Board[cell.target.id] == 'number'){
        turn(cell.target.id, humanPlayer);
        let gameWon =  checkWinner(Board, humanPlayer);
        if (gameWon) gameOver(humanPlayer);
        if (!gameWon && !checkTie()) turn(AiMove(), AiPlayer);
        gameWon = checkWinner(Board, AiPlayer);
        if (gameWon) gameOver(AiPlayer);
    }
}

function turn(cellId, player){
    Board[cellId] = player;
    document.getElementById(cellId).classList.add(player);
}

function AiMove(){
    return emptyCells()[0];
}

function emptyCells() {
    return Board.filter(s => typeof s == 'number');
}

function checkWinner(board, player){
    let plays = board.reduce((a, e, i) => 
    (e === player) ? a.concat(i) : a, []);
	for (let [index, win] of WINNING_COMBINATIONS.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
            return true;
		}
	}
	return false;
}

function checkTie(){
    if (emptyCells().length == 0) {
        for (var i = 0 ; i < cellElements.length; i++){
            cellElements[i].removeEventListener('click', playMove, false);
        }
        gameOver("TIE")
        return true;
    }
    return false;
}

function gameOver(gameWon){
    for (var i = 0; i < cellElements.length; i++){
        cellElements[i].removeEventListener('click', playMove, true);
    }
    console.log(gameWon)
    let result;
    if (gameWon == 'x') result = "You Win!";
    else if (gameWon == 'o') result = "You Lose";
    else result = "Ah,.. that's a tie";
    document.getElementById("result_message").innerHTML = result;
}