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
        cells[i].addEventListener('click', turnClick, false);
    }
}


function turnClick(square){
    if (typeof Board[square.target.id] == 'number') {
        turn(square.target.id, huPlayer);
        let gameWon = checkWin(Board, huPlayer)
        if (gameWon) gameOver(gameWon);
        if (!checkTie()) turn(bestSpot(), aiPlayer);
        // console.log(Board[square.target.id]);
    }
}

function turn(squareId, player){
    Board[squareId] = player;
    document.getElementById(squareId).innerText = player;

}

function emptySquares() {
    return Board.filter(s => typeof s == 'number');
}

function bestSpot() {
    return emptySquares()[0];
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
            console.log(plays);
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
        gameWon.player == huPlayer ? "blue" : "red";
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

