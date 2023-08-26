
//Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
// Create a Tic-Tac-Toe game grid using your HTML element of choice.
// When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
// A heading should say whether it is X's or O's turn and change with each move made.
// A button should be available to clear the grid and restart the game.
// When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.


const cells = document.querySelectorAll(".cell");
const statusMessage = document.querySelector("#statusMessage");
const restartBtn = document.querySelector("#restartBtn");
const winningNumbers = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];//different combinations to determine the winner

let playerTurn = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;


initializeGame();
//this function will start the game
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", selectedBox));
    restartBtn.addEventListener("click", restartGame);
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    running = true;
}
//this function will fill in each cell with character once clicked
function selectedBox(){
    const cellIndex = this.getAttribute("cellIndex");

    if(playerTurn[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
   playerTurn[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
//this function changes the player based on the clicked cells
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}
//this function will check the winner based on the combinations from the array
function checkWinner(){
    let roundWinner = false;
    for(let i = 0; i < winningNumbers.length; i++){
        const condition = winningNumbers[i];
        const cellA = playerTurn[condition[0]];
        const cellB = playerTurn[condition[1]];
        const cellC = playerTurn[condition[2]];
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWinner = true;
            break;
        }
    }

    
    if(roundWinner){
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        running = false; //this declares the winner of the game
    }
    else if(!playerTurn.includes("")){
        statusMessage.textContent = `It's a Draw!`;
        running = false; //this declares a draw if all cells were filled in and no winning combinations
    }
    else{
        changePlayer(); //this keeps the game running until all cells are filled in
    }
}

//this function is to reset the game
function restartGame(){
    currentPlayer = "X";
    playerTurn = ["", "", "", "", "", "", "", "", ""];
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}