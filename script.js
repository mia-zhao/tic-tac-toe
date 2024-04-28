Player = {
  X: "X",
  O: "O",
};

const initialState = {
  currentPlayer: Player.X,
  winner: null,
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

let state = {};
resetState();

document.addEventListener("DOMContentLoaded", function () {
  const cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const row = Math.floor(i / 3),
      col = i % 3;
    cell.addEventListener("click", function () {
      if (state.board[row][col] || state.winner) return;

      cell.innerText = state.currentPlayer;
      state.board[row][col] = state.currentPlayer;

      switchPlayer();

      checkWinner();

      if (state.winner) return;

      checkTie();
    });

    document.getElementById("reset").addEventListener("click", function () {
      resetState();

      for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
      }
    });
  }
});

function resetState() {
  state = JSON.parse(JSON.stringify(initialState));
}

function switchPlayer() {
  if (state.currentPlayer === Player.X) {
    state.currentPlayer = Player.O;
  } else {
    state.currentPlayer = Player.X;
  }
}

function checkWinner() {
  const board = state.board;
  const winner = checkRows(board) || checkCols(board) || checkDiagonals(board);
  if (winner) {
    state.winner = winner;
    setTimeout(() => {
      alert(`Player ${winner} wins!`);
    }, 0);
  }
}

function checkRows(board) {
  for (var i = 0; i < 3; i++) {
    if (!board[i][0]) continue;
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }
  return null;
}

function checkCols(board) {
  for (var i = 0; i < 3; i++) {
    if (!board[0][i]) continue;
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }
  return null;
}

function checkDiagonals(board) {
  var player = board[0][0];
  if (player && board[1][1] === player && board[2][2] === player) {
    return player;
  }
  player = board[0][2];
  if (player && board[1][1] === player && board[2][0] === player) {
    return player;
  }
  return null;
}

function checkTie() {
  if (state.board.every((row) => row.every((cell) => cell))) {
    setTimeout(() => {
      alert("Game is tied!");
    }, 0);
  }
}
