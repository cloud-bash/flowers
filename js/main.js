/* define application constant variables */
const winningCombos = [
    /* horizontal */
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    /* vertical */
    [0, 3, 6], [1, 4, 7], [2, 5, 6],
    /* diagonal */
    [0, 4, 8], [6, 4, 2],
];

/* define application state variables */

let board
let turn = "X";
let message = `It's ${turn}'s turn`
let isGameOver = false

/* DOM functions: caching element references */
const squares = Array.from(document.querySelectorAll('#board div'))
const gamestatus = document.getElementById("gameStatus")
const button = document.getElementById("reset")

/* DOM functions: add event listeners to our elements */
document.getElementById('board').addEventListener('click', handleTurn)
button.addEventListener('click', resetGame)

/* General Gameplay functions:  */

function handleTurn(event) {
    if (!isGameOver) {
        let index = squares.findIndex((square) => {
            return square === event.target
        })

        if (board[index] === '') {
            board[index] = turn;
            if (turn === "X") {
                turn = "O"
            } else {
                turn = "X"
            }
        }


        checkForWin(board, winningCombos, turn)

        if (checkForWin(board, winningCombos, turn) === "DRAW" ||
            checkForWin(board, winningCombos, turn) === "X" ||
            checkForWin(board, winningCombos, turn) === "O") {
            isGameOver = true
            console.log("gameOver")
        }
    }

    render()
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']
    turn = "X"
    gamestatus.innerHTML = `It's ${turn}'s turn!`;
    isGameOver = false
    render()
}

function init() {
    board = ['', '', '', '', '', '', '', '', '']

    render()
}

function render() {
    board.forEach((mark, index) => {
        squares[index].textContent = mark
    });
}

function checkForWin(board, winningCombos, turn) {
    for (var i = 0; i < winningCombos.length; i++) {
        if (board[winningCombos[i][0]] !== '' &&
            board[winningCombos[i][0]] === board[winningCombos[i][1]] &&
            board[winningCombos[i][1]] === board[winningCombos[i][2]]) {
            gamestatus.innerHTML = `${board[winningCombos[i][0]]} wins!`;
            return `${board[winningCombos[i][1]]}`;

        } else { gamestatus.innerHTML = `It's ${turn}'s turn`; }


    }
    if (!board.includes('')) {
        console.log('draw')
        gamestatus.innerHTML = `Draw`;
        return "DRAW"
    }
}

init()