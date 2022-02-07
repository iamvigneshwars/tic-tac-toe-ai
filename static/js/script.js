const huPlayer = 'x';
const aiPlayer = 'o';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

var Board ; 
const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){
    document.querySelector(".endgame").style.display ="none";
    Board = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick);
        cells[i].classList.remove('x');
        cells[i].classList.remove('o');
    }
}


function turnClick(square){
    if (typeof Board[square.target.id] == 'number') {
        turn(square.target.id, huPlayer);
        let gameWon = checkWin(Board, huPlayer)
        if (gameWon) gameOver(gameWon);
        if (!gameWon && !checkTie()) turn(bestSpot(), aiPlayer);
        gameWon = checkWin(Board, aiPlayer)
        if (gameWon) gameOver(gameWon);
    }
}

function turn(squareId, player){
    Board[squareId] = player;
    // document.getElementById(squareId).innerText = player;
    document.getElementById(squareId).classList.add(player)

}

function emptySquares() {
    return Board.filter(s => typeof s == 'number');
}


function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function checkTie(){
    if (emptySquares().length == 0) {
        for (var i = 0 ; i < cells.length; i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game");
        return true;
    }
    return false;
}

function gameOver(gameWon){
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == huPlayer ? "green" : "red";
    }
    for (var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false)
    }
    declareWinner(gameWon.player == huPlayer ? "You Win!" : "You Lose!");
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display= "block";
    document.querySelector(".endgame .text").innerText= who;

}


function bestSpot() {
    return minimax(Board, aiPlayer).index;
}

function minimax(state, player){
    var availSpots = emptySquares(state);

    if (checkWin(state, player)){
        return {score: -10};
    } else if (checkWin(state, aiPlayer)){
        return {score: 10};
    } else if (availSpots.length === 0) {
        return {score : 0};
    }
    var moves = [];
    for (var i= 0; i < availSpots.length; i++){
        var move = {};
        move.index = state[availSpots[i]];
        state[availSpots[i]] = player;

        if (player == aiPlayer) {
            var result = minimax(state, huPlayer);
            move.score = result.score;
        } else {
            var result = minimax(state, aiPlayer);
            move.score = result.score;
        }
        state[availSpots[i]] = move.index;
        moves.push(move);
    }
    
    var bestMove;
    if (player === aiPlayer){
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++){
            if (moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }else {
        var bestScore= 10000;
        for (var i =0; i < moves.length; i++){
            if (moves[i].score < bestScore){
                bestScore= moves[i].score;
                bestMove =i;
            }
        }
    }
    return moves[bestMove];
}