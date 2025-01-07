//your JS code here. If required.
const submitButton = document.getElementById('submit');
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const board = document.getElementById('board');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');

    let player1 = '';
    let player2 = '';
    let currentPlayer = '';
    let currentSymbol = '';
    let gameActive = true;
    const boardState = Array(9).fill(null);

    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return true;
        }
      }
      return false;
    }

    function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = parseInt(cell.id) - 1;

      if (boardState[cellIndex] || !gameActive) {
        return;
      }

      boardState[cellIndex] = currentSymbol;
      cell.textContent = currentSymbol;

      if (checkWinner()) {
        messageDiv.textContent = ${currentPlayer}, congratulations you won!;
        gameActive = false;
        return;
      }

      if (boardState.every(cell => cell !== null)) {
        messageDiv.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;
      currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
      messageDiv.textContent = ${currentPlayer}, you're up!;
    }

    submitButton.addEventListener('click', () => {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();

      if (!player1 || !player2) {
        alert('Please enter names for both players.');
        return;
      }

      currentPlayer = player1;
      currentSymbol = 'X';
      messageDiv.textContent = ${currentPlayer}, you're up!;
      board.style.display = 'block';
    });

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));