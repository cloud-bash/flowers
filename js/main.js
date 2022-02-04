/* define application constant variables */
const winningCombos = [
    /* horizontal */
    [0,1,2],[3,4,5],[6,7,8],
    /* vertical */
    [0,3,6],[1,4,7],[2,5,6],
/* diagonal */
[0,4,8],[6,4,2],
];

/* define application state variables */

let board
let turn = "X";
let message = `It's ${turn}'s turn!`

/* DOM functions: caching element references */
const squares = Array.from(document.querySelectorAll('#board div'))
const gamestatus = document.getElementById("gameStatus")
console.log(squares)

/* DOM functions: add event listeners to our elements */
document.getElementById('board').addEventListener('click', handleTurn)

/* General Gameplay functions:  */

function handleTurn(event) {
    let index = squares.findIndex((square) =>{
        return square === event.target
    })
    board[index] = turn;
    if(turn === "X") {
        turn = "O"
    } else {
        turn = "X"
    }

    gamestatus.innerHTML = `It's ${turn}'s turn!`;
    render()
}

function init() {
    board = ['','','','','','','','','']

    render()
}

function render() {
    board.forEach((mark, index)=> {
        console.log(mark)
        squares[index].textContent = mark
    });
}

init()