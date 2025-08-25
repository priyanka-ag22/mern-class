<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chess Game</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f0f0f0;
    }
    table {
      border-collapse: collapse;
    }
    td {
      width: 60px;
      height: 60px;
      text-align: center;
      vertical-align: middle;
      font-size: 36px;
      cursor: pointer;
    }
    .black { background-color: #769656; }
    .white { background-color: #eeeed2; }
    .selected { outline: 3px solid red; }
  </style>
</head>
<body>

<table id="chessboard"></table>

<script>
const board = document.getElementById('chessboard');

// Unicode chess pieces
const pieces = {
  'bR': '♜', 'bN': '♞', 'bB': '♝', 'bQ': '♛', 'bK': '♚', 'bP': '♟',
  'wR': '♖', 'wN': '♘', 'wB': '♗', 'wQ': '♕', 'wK': '♔', 'wP': '♙'
};

// Initial board setup
let gameBoard = [
  ['bR','bN','bB','bQ','bK','bB','bN','bR'],
  ['bP','bP','bP','bP','bP','bP','bP','bP'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['wP','wP','wP','wP','wP','wP','wP','wP'],
  ['wR','wN','wB','wQ','wK','wB','wN','wR']
];

let selected = null;

function drawBoard() {
  board.innerHTML = '';
  for (let i=0; i<8; i++) {
    const row = board.insertRow();
    for (let j=0; j<8; j++) {
      const cell = row.insertCell();
      cell.className = (i+j)%2 === 0 ? 'white' : 'black';
      cell.textContent = pieces[gameBoard[i][j]] || '';
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.onclick = () => cellClick(i, j);
      if (selected && selected.row == i && selected.col == j) {
        cell.classList.add('selected');
      }
    }
  }
}

function cellClick(row, col) {
  const piece = gameBoard[row][col];
  if (selected) {
    // Move piece
    gameBoard[row][col] = gameBoard[selected.row][selected.col];
    gameBoard[selected.row][selected.col] = '';
    selected = null;
    drawBoard();
  } else if (piece) {
    // Select piece
    selected = {row, col};
    drawBoard();
  }
}

drawBoard();
</script>

</body>
</html>
