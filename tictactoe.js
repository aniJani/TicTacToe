const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') return true;
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') return true;
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') return true;
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') return true;

    return false;
}

const board = []
for (let i = 0; i < 3; i++) {
    board[i] = []
    for (let j = 0; j < 3; j++) {
        board[i][j] = " "
    }
}

let iternum = 1;

function nextTurn() {
    if (checkWin() || iternum >= 9) {
        console.log('Game over');
        rl.close();
        return;
    }

    const player = iternum % 2 === 0 ? 'X' : 'O';
    console.log(`Player ${player}'s turn`);
    printBoard();

    rl.question('Enter row and column numbers (0, 1, 2), separated by a space: ', (input) => {
        const [row, col] = input.split(' ').map(Number);
        if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === ' ') {
            board[row][col] = player;
            iternum++;
            nextTurn();
        } else {
            console.log('Invalid input. Please try again.');
            nextTurn();
        }
    });
}

function printBoard() {
    console.log(board)
}

nextTurn();