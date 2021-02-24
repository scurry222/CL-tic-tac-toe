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
        this.player = 1;
    }
    printBoard() {
        for (let row of this.board) {
            process.stdout.write('[ ')
            for (let box of row) {
                process.stdout.write(`${box === 1 ? 'X' : box === 2 ? 'O' : '-'} `)
            }
            process.stdout.write(']\n');
        }
    }
    logPiece(play) {
        let b = this.board;
        const p = this.player;
        play === '1' && b[0][0] === 0 ? b[0][0] = p
        : play === '2' && b[0][1] === 0 ? b[0][1] = p
        : play === '3' && b[0][2] === 0 ? b[0][2] = p
        : play === '4' && b[1][0] === 0 ? b[1][0] = p
        : play === '5' && b[1][1] === 0 ? b[1][1] = p
        : play === '6' && b[1][2] === 0 ? b[1][2] = p
        : play === '7' && b[2][0] === 0 ? b[2][0] = p
        : play === '8' && b[2][1] === 0 ? b[2][1] = p
        : play === '9' && b[2][2] === 0 ? b[2][2] = p
        : console.log('please enter a valid placement');
    }
    selectPiece(player) {
        return new Promise((resolve) => rl.question('choose next play (1 - 9): ', (play) => {
            resolve(this.logPiece(play, player))
        }))
    }
    win() {
        const b = this.board;
        const p = this.player === 1 ? 2 : 1;
        return (
            (b[0][0] === p && b[0][1] === p && b[0][2] === p) ||
            (b[1][0] === p && b[1][1] === p && b[1][2] === p) ||
            (b[2][0] === p && b[2][1] === p && b[2][2] === p) ||
            (b[0][0] === p && b[1][0] === p && b[2][0] === p) ||
            (b[0][1] === p && b[1][1] === p && b[2][1] === p) ||
            (b[0][2] === p && b[1][2] === p && b[2][2] === p) ||
            (b[0][0] === p && b[1][1] === p && b[2][2] === p) ||
            (b[2][0] === p && b[1][1] === p && b[0][2] === p))
        ? true: false;
    }
 
    stalemate() {
        for (let row of this.board) {
            if (!row.includes(0)) {
                return true;
            }
        }
        return false;
    }
}

const gameLoop = async() => {
    const board = new Board();
    let player = board.player;
    let playing = true;
    while (playing) {
        await board.printBoard();
        if (board.win(player)) {
            console.log(`player ${board.player === 1 ? 2 : 1} wins!`);
            rl.close();
            playing = false;

        } else if (board.stalemate()) {
            console.log(`stalemate!`);
            rl.close();
            playing = false;
        } else {
            await board.selectPiece(player);
            board.player === 1 ? board.player = 2 : board.player = 1;
        }
    }

}

gameLoop();
