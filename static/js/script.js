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

    var available_cells = emptyCells();
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < available_cells.length; i++){
        Board[available_cells[i]] = AiPlayer;
        let score= minimax(Board, false);
        Board[available_cells[i]] = available_cells[i];
        if (score > bestScore) {
            bestScore = score;
            move = available_cells[i];
        }
    }

    return move;
   
}

function minimax(gameState, isMax){

    var available_cell = emptyCells();

	if (checkWinner(gameState, humanPlayer)) {
		return -10;
	} else if (checkWinner(gameState, AiPlayer)) {
		return 10;
	} else if (available_cell.length === 0) {
		return  0;
	}

    if (isMax){
        let bestScore = -10000;
        for (let i = 0; i < available_cell.length;i++){
            gameState[available_cell[i]] = AiPlayer;
            let score = minimax(gameState, false);
            gameState[available_cell[i]] = available_cell[i];
            bestScore = Math.max(score, bestScore);
        }
        return bestScore;
    } else {
        let bestScore = 10000;
        for (let i = 0; i < available_cell.length;i++){
            gameState[available_cell[i]] = humanPlayer;
            let score = minimax(gameState, true);
            gameState[available_cell[i]] = available_cell[i];
            bestScore = Math.min(score, bestScore);
        }
        return bestScore;

    }
	

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