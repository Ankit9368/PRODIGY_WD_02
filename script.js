// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
  // Select all the cells of the game board
  const cells = document.querySelectorAll(".innerbox");

  // Select the restart button and the score reset button
  const restartButton = document.getElementById("restart");
  const scoreResetButton = document.getElementById("score-reset");

  // Initialize the game board, current player, and scores
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let scores = { X: 0, O: 0 };

  // Add click event listeners to each cell
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      // Get the index of the clicked cell
      let index = parseInt(cell.getAttribute("data-index"));

      // Check if the cell is empty and the game is not over
      if (board[index] === "" && !checkWin() && !checkTie()) {
        // Update the board with the current player's symbol
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Check if the current player has won or if it's a tie
        if (checkWin()) {
          endGame(`Player ${currentPlayer} wins!`);
        } else if (checkTie()) {
          endGame("It's a draw!");
        } else {
          // Switch to the other player if the game is still ongoing
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    });
  });

  // Function to check if a player has won
  function checkWin() {
    const wincombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Iterate through all winning combinations
    for (const combo of wincombos) {
      const [a, b, c] = combo;
      // Check if the cells in the current combo are all the same symbol
      if (board[a] != "" && board[a] === board[b] && board[a] === board[c]) {
        return combo;
      }
    }
    return null;
  }

  // Function to check if the game is a tie
  function checkTie() {
    return board.every((cell) => cell !== "");
  }

  // Function to end the game
  function endGame(message) {
    const winningCombo = checkWin();
    if (winningCombo) {
      const [a, b, c] = winningCombo;
      const winningCells = [cells[a], cells[b], cells[c]];
      winningCells.forEach((cell) => {
        cell.classList.add("winning-cell");
      });
    }

    setTimeout(() => {
      alert(message);
      // Reset the board and scores after the game ends
      if (winningCombo) {
        const [a, b, c] = winningCombo;
        const winningCells = [cells[a], cells[b], cells[c]];
        winningCells.forEach((cell) => {
          cell.classList.remove("winning-cell");
        });
      }

      if (message.includes("wins")) {
        scores[currentPlayer]++;
        document.querySelector(".score").textContent = scores["X"];
        document.querySelector(".score2").textContent = scores["O"];
      }

      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";

      cells.forEach((cell) => {
        cell.textContent = "";
      });

      updateUI(); // Update the UI after resetting the game
    }, 10);
  }

  // Event listener for the restart button to reset the game
  restartButton.addEventListener("click", resetGame);

  // Event listener for the score reset button to reset the scores
  scoreResetButton.addEventListener("click", () => {
    scores = { X: 0, O: 0 };
    document.querySelector(".score").textContent = scores["X"];
    document.querySelector(".score2").textContent = scores["O"];
  });

  // Function to reset the game
  function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";

    cells.forEach((cell) => {
      cell.textContent = "";
    });

    updateUI();
  }

  // Function to update the UI based on the current state of the board
  function updateUI() {
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  }
});
