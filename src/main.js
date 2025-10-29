const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const clearScoresBtn = document.getElementById('clearScoresBtn');
const turnInfo = document.getElementById('turnInfo');
const currentPlayerSpan = document.querySelector('.current-player');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreDrawElement = document.getElementById('scoreDraw');
const winModal = document.getElementById('winModal');
const winMessage = document.getElementById('winMessage');
const nextRoundBtn = document.getElementById('nextRoundBtn');
const pvpBtn = document.getElementById('pvpBtn');
const pvcBtn = document.getElementById('pvcBtn');
const winningLine = document.getElementById('winningLine');
const board = document.getElementById('board');

let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let gameMode = 'pvp';
let scores = {
  X: 0,
  O: 0,
  draw: 0
};

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function initGame() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  resetBtn.addEventListener('click', resetGame);
  clearScoresBtn.addEventListener('click', clearScores);
  nextRoundBtn.addEventListener('click', nextRound);
  pvpBtn.addEventListener('click', () => setGameMode('pvp'));
  pvcBtn.addEventListener('click', () => setGameMode('pvc'));

  loadScores();
  updateScoreDisplay();
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !isGameActive) {
    return;
  }

  if (gameMode === 'pvc' && currentPlayer === 'O') {
    return;
  }

  makeMove(clickedCellIndex, currentPlayer);

  if (gameMode === 'pvc' && isGameActive && currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  }
}

function makeMove(index, player) {
  gameState[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add(player.toLowerCase());
  cells[index].disabled = true;

  checkResult();
}

function checkResult() {
  let roundWon = false;
  let winningCombination = null;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      winningCombination = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    handleWin(currentPlayer, winningCombination);
    return;
  }

  const isDraw = !gameState.includes('');
  if (isDraw) {
    handleDraw();
    return;
  }

  switchPlayer();
}

function handleWin(winner, combination) {
  isGameActive = false;
  scores[winner]++;
  saveScores();
  updateScoreDisplay();
  drawWinningLine(combination);

  setTimeout(() => {
    const winnerText = gameMode === 'pvc' && winner === 'O' ? 'La IA gana!' : `Jugador ${winner} gana!`;
    winMessage.textContent = winnerText;
    winModal.classList.add('show');
  }, 800);
}

function handleDraw() {
  isGameActive = false;
  scores.draw++;
  saveScores();
  updateScoreDisplay();

  setTimeout(() => {
    winMessage.textContent = '¡Empate!';
    winModal.classList.add('show');
  }, 500);
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerSpan.textContent = currentPlayer;
}

function aiMove() {
  if (!isGameActive) return;

  const availableMoves = gameState
    .map((cell, index) => cell === '' ? index : null)
    .filter(val => val !== null);

  if (availableMoves.length === 0) return;

  let move = findBestMove(availableMoves);

  makeMove(move, 'O');
}

function findBestMove(availableMoves) {
  for (let move of availableMoves) {
    gameState[move] = 'O';
    if (checkWinningMove('O')) {
      gameState[move] = '';
      return move;
    }
    gameState[move] = '';
  }

  for (let move of availableMoves) {
    gameState[move] = 'X';
    if (checkWinningMove('X')) {
      gameState[move] = '';
      return move;
    }
    gameState[move] = '';
  }

  if (gameState[4] === '') {
    return 4;
  }

  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(corner => availableMoves.includes(corner));
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function checkWinningMove(player) {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] === player && gameState[b] === player && gameState[c] === player) {
      return true;
    }
  }
  return false;
}

function drawWinningLine(combination) {
  const boardRect = board.getBoundingClientRect();
  const cellSize = cells[0].getBoundingClientRect();

  const positions = combination.map(index => {
    const cell = cells[index];
    const cellRect = cell.getBoundingClientRect();
    return {
      x: cellRect.left - boardRect.left + cellRect.width / 2,
      y: cellRect.top - boardRect.top + cellRect.height / 2
    };
  });

  const line = winningLine.querySelector('line');
  line.setAttribute('x1', positions[0].x);
  line.setAttribute('y1', positions[0].y);
  line.setAttribute('x2', positions[2].x);
  line.setAttribute('y2', positions[2].y);

  winningLine.classList.add('show');
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  currentPlayerSpan.textContent = currentPlayer;
  winModal.classList.remove('show');
  winningLine.classList.remove('show');

  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o');
  });

  if (gameMode === 'pvc' && currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  }
}

function nextRound() {
  resetGame();
}

function clearScores() {
  scores = {
    X: 0,
    O: 0,
    draw: 0
  };
  saveScores();
  updateScoreDisplay();
  resetGame();
}

function setGameMode(mode) {
  gameMode = mode;

  if (mode === 'pvp') {
    pvpBtn.classList.add('active');
    pvcBtn.classList.remove('active');
  } else {
    pvpBtn.classList.remove('active');
    pvcBtn.classList.add('active');
  }

  resetGame();
  clearScores();
}

function updateScoreDisplay() {
  scoreXElement.textContent = scores.X;
  scoreOElement.textContent = scores.O;
  scoreDrawElement.textContent = scores.draw;
}

function saveScores() {
  localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

function loadScores() {
  const savedScores = localStorage.getItem('ticTacToeScores');
  if (savedScores) {
    scores = JSON.parse(savedScores);
  }
}

initGame();
