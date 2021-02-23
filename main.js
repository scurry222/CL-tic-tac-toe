const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

class Board {
    constructor() {
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.player = 'X'
    }
    printBoard() {
        for (let row of this.board) {
            console.log(row);
        }
    }
    logPiece(play, token) {
        let b = this.board;
        play === '1' ? b[0][0] = token
        : play === '2' ? b[0][1] = token
        : play === '3' ? b[0][2] = token
        : play === '4' ? b[1][0] = token
        : play === '5' ? b[1][1] = token
        : play === '6' ? b[1][2] = token
        : play === '7' ? b[2][0] = token
        : play === '8' ? b[2][1] = token
        : play === '9' ? b[2][2] = token
        : console.log('please enter a valid placement');
    }
    selectPiece(player) {
        rl.question('choose next play (1 - 9): ', (play) => {
            this.logPiece(play, player);
            rl.close();
        })
    }
    win(token) {
        const b = this.board;
        return (
            (b[0][0] === token && b[0][1] === token && b[0][2] === token) ||
            (b[1][0] === token && b[1][1] === token && b[1][2] === token) ||
            (b[2][0] === token && b[2][1] === token && b[2][2] === token) ||
            (b[0][0] === token && b[1][0] === token && b[2][0] === token) ||
            (b[0][1] === token && b[1][1] === token && b[2][1] === token) ||
            (b[0][2] === token && b[1][2] === token && b[2][2] === token) ||
            (b[0][0] === token && b[1][1] === token && b[2][2] === token) ||
            (b[2][0] === token && b[1][1] === token && b[0][2] === token))
        ? true: false;
    }
 
    stalemate() {
        return !this.board.includes(0);
    }
}

const gameLoop = () => {
    const board = new Board();
    let player = board.player;
    while(!board.win(player) && !board.stalemate()) {
        board.printBoard();
        board.selectPiece(player);
        player === 'X' ? 'O' : 'X';
    }
}

gameLoop();
