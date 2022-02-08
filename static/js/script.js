const humanPlayer = 'x'
const AiPlayer = 'o'

var BOARD;

const cellElements = document.querySelectorAll('.cell')
startGame();

function startGame(){
    BOARD = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    document.getElementById("result_message").innerHTML = "Can you beat the AI?"
    for (var i = 0; i < cellElements.length; i++){
        cellElements[i].classList.remove('x');
        cellElements[i].classList.remove('o');
        cellElements[i].addEventListener('click', playMove, true);
    }
}

function playMove(cell){
    let i = cell.target.id.split("_")[0];
    let j = cell.target.id.split("_")[1];
    if (BOARD[i][j] == ''){
        turn(cell.target.id, humanPlayer);
        let gameWon =  checkWinner(BOARD, humanPlayer);
        if (gameWon) gameOver(humanPlayer);
        if (!gameWon && !checkTie()) turn(AiMove(), AiPlayer);
        gameWon = checkWinner(BOARD, AiPlayer);
        if (gameWon) gameOver(AiPlayer);
    }
}
function turn(cellId, player){
    let i = cellId.split("_")[0];
    let j = cellId.split("_")[1];
    BOARD[i][j] = player;
    document.getElementById(cellId).classList.add(player);
}

function equals3(a, b, c){
    return a == b && b == c && c == a && a != '';
}

function checkWinner(board, player){
    // checkrows
    for (let i = 0; i < 3; i++){
        if (equals3(board[i][0], board[i][1], board[i][2]) && board[i][0] == player)
            return true;
    }
    // check Colomns
    for (let i = 0; i < 3; i++){
        if (equals3(board[0][i], board[1][i], board[2][i]) && board[0][i] == player)
            return true;
    }

    // Check Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2]) && board[1][1] == player)
        return true;
    if (equals3(board[0][2], board[1][1], board[2][0]) && board[1][1] == player)
        return true;

    return false;
}

// Check Winner
function checkTie(){
    if (numberOfEmpty(BOARD) == 0) {
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
    let result;
    if (gameWon == 'x') result = "You Win!";
    else if (gameWon == 'o') result = "You Lose";
    else result = "Ah,.. that's a tie";
    document.getElementById("result_message").innerHTML = result;
}

// Utility Function:
function numberOfEmpty(board, returnSpots = false){
    let numberOfspots = 0;
    let spots = [];
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (board[i][j] == ''){
                numberOfspots++;
                spots.push(i+"_"+j);

            } 
        }
    }

    if (returnSpots == true) return spots
    else return numberOfspots;
    
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
function AiMove(){
    let bestScore = -Infinity;
    let move;
    for (let i= 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (BOARD[i][j] == ''){
                BOARD[i][j] = AiPlayer;
                let score = minimax(BOARD, false);
                BOARD[i][j] = '';
                if (score > bestScore){
                    bestScore = score
                    move = [i,j];
                }
            }
        }
    }
    return move[0]+"_"+move[1];
}

function minimax(gameState, isMax){

    let no_empty_spots = numberOfEmpty(gameState);

	if (checkWinner(gameState, humanPlayer)) {
		return -10 * (no_empty_spots + 1);
	} else if (checkWinner(gameState, AiPlayer)) {
		return 10 * (no_empty_spots + 1);
	} else if (no_empty_spots === 0) {
		return  0;
	}

    if (isMax){
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (gameState[i][j] == ''){
                    gameState[i][j] = AiPlayer;
                    let score = minimax(gameState, false);
                    gameState[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (gameState[i][j] == ''){
                    gameState[i][j] = humanPlayer;
                    let score = minimax(gameState, true);
                    gameState[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}