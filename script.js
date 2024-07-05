const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
let currentPlayer = "x";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameState[index] !== "" || checkWin()) return;

    gameState[index] = currentPlayer;
    e.target.classList.add(currentPlayer);
    e.target.textContent = currentPlayer.toUpperCase();

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer.toUpperCase()} wins!`;
    } else if (gameState.every(cell => cell !== "")) {
        message.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "x" ? "o" : "x";
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.classList.remove("x", "o");
        cell.textContent = "";
    });
    currentPlayer = "x";
    message.textContent = "";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", resetGame);
