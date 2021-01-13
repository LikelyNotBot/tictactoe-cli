const ReadlineSync = require('readline-sync');


let name_1 =  ReadlineSync.question('Player 1 name: ');
let name_2 =  ReadlineSync.question('Player 2 name: ');

let E = '.';
let X = 'X';
let O = 'O';
let board = [
  [ E, E, E],
  [ E, E, E],
  [ E, E, E]
];

const regex = new RegExp('^r[0-2]c[0-2]$');
let winner = null;
let turn = X;
while (!winner) {
  let done = false;
  let valid = false;
  while (!done) {
    let move = ReadlineSync.question(`${(turn === X) ? name_1 : name_2}, enter your move: `);
    valid = regex.test(move);
    if (valid) {
      valid = (board[Number(move[1])][Number(move[3])] === E);
    } 
    if (valid) {
      board[Number(move[1])][Number(move[3])] = (turn === X) ? X : O;
      done = true;
    } else {
      console.log('Invalid move: moves have form r[0-2]c[0-2], e.g. "r0c2", and must target an empty square.');
    }
  }
  board.forEach(row => {
    if (row[0] === row[1] && row[1] === row[2] && row[0] !== E) {
      winner = (row[0] === X) ? name_1 : name_2;
    }
  })
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== E) {
      winner = (board[0][i] === X) ? name_1 : name_2;
    }
  }
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== E) {
    winner = (board[0][0] === X) ? name_1 : name_2;
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== E) {
    winner = (board[0][2] === X) ? name_1 : name_2;
  }
  board.forEach(row => console.log(row));
  turn = (turn === X) ? O : X;
}
console.log(`${winner} wins the game!`);

board.forEach(row => {console.log(row)});