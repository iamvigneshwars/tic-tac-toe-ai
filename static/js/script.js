const humanPlayer = 'x';
const AiPlayer = 'o';
var BOARD;

// Get all the cell elements
const cellElements = document.querySelectorAll('.cell')
// Initializes the game
startGame();

function startGame(){
    // Clear the board everytime the game restarts.  
    BOARD = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    // Default result message
    document.getElementById("result_message").innerHTML = "Can you beat the AI?"
    // Remove previous games moves from the board, and add event listener to all cells.
    for (var i = 0; i < cellElements.length; i++){
        cellElements[i].classList.remove('x');
        cellElements[i].classList.remove('o');
        cellElements[i].addEventListener('click', playMove, true);
    }
    document.querySelector(".message").style.display = "none"
}

function playMove(cell){
    // Get the cell id and split it into row and column id.
    let i = cell.target.id.split("_")[0];
    let j = cell.target.id.split("_")[1];
    // Check if the clicked cell is empty.
    if (BOARD[i][j] == ''){
        // Place the player marker on the board
        turn(cell.target.id, humanPlayer);
        let gameWon =  checkWinner(BOARD, humanPlayer);
        if (gameWon) gameOver(humanPlayer);
        // If the game is not won by human, call the ai function to make the next move.
        if (!gameWon && !checkTie()) turn(AiMove(), AiPlayer);
        gameWon = checkWinner(BOARD, AiPlayer);
        // Place the Ai marker on the board
        if (gameWon) gameOver(AiPlayer);
    }
}

// Utility Function:
function numberOfEmptyCells(board, returnSpots = false){
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

// Places the players marker on the board.
function turn(cellId, player){
    let i = cellId.split("_")[0];
    let j = cellId.split("_")[1];
    BOARD[i][j] = player;
    document.getElementById(cellId).classList.add(player);
}



function AiMove(){
    let bestScore = -Infinity;
    let move;
    // Get the scores from all the available cells,
    // and return the cell with highest score since the ai 
    // is the maximizing player.
    for (let i= 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (BOARD[i][j] == ''){
                BOARD[i][j] = AiPlayer;
                let score = miniMax(BOARD, false);
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

function miniMax(gameState, isMax){

    // Get the number of empty cells.
    let no_empty_spots = numberOfEmptyCells(gameState);

    // Check for terminal states.
    // Number of empty spots at states is multiplied with the score,
    // as it helps to find the move that leads to win with less number of moves.
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
                    let score = miniMax(gameState, false);
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
                    let score = miniMax(gameState, true);
                    gameState[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

function equals3(a, b, c){
    return a == b && b == c && c == a && a != '';
}

// Check for winner.
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

// Check for Tie.
function checkTie(){
    if (numberOfEmptyCells(BOARD) == 0) {
        for (var i = 0 ; i < cellElements.length; i++){
            cellElements[i].removeEventListener('click', playMove, false);
        }
        gameOver("TIE")
        return true;
    }
    return false;
}

// Display the result.
function gameOver(gameWon){
    for (var i = 0; i < cellElements.length; i++){
        cellElements[i].removeEventListener('click', playMove, true);
    }
    let result;
    if (gameWon == 'x') {
        result = "You Win!";
        document.querySelector(".message").style.display = "block";
        document.querySelector(".message .text").innerText = "WIN";
        document.querySelector(".message").style.backgroundColor = "rgba(46, 207, 40, 0.945)";
    }
    else if (gameWon == 'o'){
        result = "You Lose";
        document.querySelector(".message").style.display = "block";
        document.querySelector(".message .text").innerText = "AI WINS!";
        document.querySelector(".message").style.backgroundColor = "rgba(207, 40, 40, 0.945)";
    }
    else{
        result = "Ah,.. that's a tie";
        document.querySelector(".message").style.display = "block";
        document.querySelector(".message .text").innerText = "TIE!";
        document.querySelector(".message").style.backgroundColor = "rgba(199, 190, 62, 0.945)";
    } 
    document.getElementById("result_message").innerHTML = result;
}