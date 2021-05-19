
const gameBoardDiv =document.querySelector('.gameboard')
const gridItems = document.getElementsByClassName('grid-item');
const startGameBtn = document.querySelector('.start-game');
const restartBtn = document.querySelector('.restart-game');
let results = document.getElementById("results");




const displayController = (() => {
  
  const selectMarkerdiv = document.querySelector('.select-marker')
  const selectOpponentdiv = document.querySelector('.enemy-select')

  startGameBtn.style.visibility = "hidden"

  startGameBtn.addEventListener('click', function(e){
    gameBoardDiv.style.display = "block"
    selectMarkerdiv.style.display = "none"
    selectOpponentdiv.style.display = "none"
    startGameBtn.style.display = "none"
    restartBtn.style.display = "inline"
  })
  
  const displayWinner = function (mark){
    let winner = document.createElement('h3');
    winner.textContent = `The winner is Player ${mark}`;
    results.appendChild(winner);
  }
  
  const displayDraw = function(){
    let results = document.getElementById("results");
    let draw = document.createElement('h3');
    draw.textContent = `We have a Tie`;
    results.appendChild(draw);
  }



  return{displayWinner, displayDraw}
})();


const gameBoard = (() => {
  gameBoardDiv.style.display = "none";
  restartBtn.style.display = "none"

  const _players = []
  let board = new Array(9).fill('')
  let isPlayer2HumanOrAI = false
  let round = 0

  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener('click', playGame)
  }

    function setPlayer(index, p) {
        _players[index] = p
    }

    function getPlayers() {
        return _players
    }

    function insertSymbol(id) {
        if (board[id] !== "") {
            console.log('Invalid move');
            return false
        }
        
        let element = document.getElementById(id)
        let currentPlayerIndex = round % 2
        let player = _players[currentPlayerIndex]
        element.textContent = player.mark
        board[id] = player.mark
        
        // if(checkWin(board, player.mark) || checkDraw(board, player.mark)){
        //   _endGame();
        // }
        if(checkWin(board, player.mark)){
          displayController.displayWinner(player.mark.toUpperCase())
          _endGame();
        }else if(checkDraw(board, player.mark)){
          displayController.displayDraw();
        }

            /**
             * if horizontal wins, end game
             * if vertical wins, end game
             * if major diagonal wins, end game
             * if minor diagonal wins, end game
             * else, continue game
             */

        round++
        nextPlayer()
    }

    function playGame(e){
      insertSymbol(e.target.id);
    }

    function setPlayer2HumanOrAI(opponent, opponentSymbol) {
        isPlayer2HumanOrAI = opponent;
        console.log(isPlayer2HumanOrAI);
    }

    function aiMove() {
      // let aiSymbol = _players[1].mark
      let playerSymbol = _players[0].mark
      let boardIsFull = board.every(e => e !== "")
      let randomIndex = Math.floor(Math.random() * board.length);

      if(board[randomIndex] === "" ){
        if(!boardIsFull && checkWin(board,playerSymbol)){
          console.log('player1 won');
          return 
        }
        else insertSymbol(randomIndex); 
      }
      else if (boardIsFull){
        return false
      }
      else aiMove()
    }

    function nextPlayer() {
      if((round % 2) && isPlayer2HumanOrAI === "ai"){
        aiMove()
      }else {
        return
      }
        /**
         * if next player == AI, then make AI move.
         * else, do nothing and wait for human player 2 to play.
         */
    }

    function _checkHorizontal (board, mark){

     if (board[0] === mark && board[1] === mark && board[2] === mark  ||
      board[3] === mark && board[4] === mark && board[5] === mark ||
      board[6] === mark && board[7] === mark && board[8] === mark
      ){    
        return true
     }      
    }

    function _checkVertical (board, mark){

      if (board[0] === mark && board[3] === mark && board[6] === mark  ||
       board[1] === mark && board[4] === mark && board[7] === mark ||
       board[2] === mark && board[5] === mark && board[8] === mark
       ){     
         return true
      }      
     }

    function _checkDiagonal (board, mark){

      if (board[0] === mark && board[4] === mark && board[8] === mark  ||
       board[2] === mark && board[4] === mark && board[6] === mark
       ){     
         return true
      }      
     }

    let checkWin = function (board, mark) {

      if (_checkHorizontal(board, mark) || _checkVertical(board, mark) || _checkDiagonal(board, mark) ){
        console.log("winner is ", mark);
        return true
      }
      return false
    } 

    let checkDraw = function (board, mark) {

      let boardIsFull =  board.every(e => e !== "")
     
      if(!checkWin(board, mark) && boardIsFull ){
        console.log("We have a tie");
        winner = "We have a Tie"
        return true
      }
    }

    const _endGame = function () {
      for( let i = 0; i < gridItems.length; i++){
        gridItems[i].removeEventListener('click', playGame)
      }
    }

    const restartGame = function (){
      round = 0;
      for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].textContent = ""
      }
      board = new Array(9).fill('');
      for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].addEventListener('click', playGame)
      }
      results.innerHTML = "";

    }

    restartBtn.addEventListener('click', restartGame )

    return { setPlayer, getPlayers, insertSymbol, setPlayer2HumanOrAI, checkWin, checkDraw, aiMove, restartGame}

})();



const createPlayers = (() => {
  let marker_x = document.getElementById('marker-x');
  let marker_o = document.getElementById('marker-o');
  const humanPlayer = document.querySelector('#player2');
  const aiPlayer = document.querySelector('#ai');

  function Player(mark) {
    return { mark }
  }

marker_o.addEventListener('click', function(e) {
    player1 = Player('o');
    player2 = Player('x');
    gameBoard.setPlayer(0, player1)
    gameBoard.setPlayer(1, player2)
});

marker_x.addEventListener('click', function(e) {
    player1 = Player('x');
    player2 = Player('o');
    gameBoard.setPlayer(0, player1)
    gameBoard.setPlayer(1, player2)
});

humanPlayer.addEventListener('click', function(e){
  console.log(player2);
  gameBoard.setPlayer2HumanOrAI('human',player2)
  startGameBtn.style.visibility = "visible"
})
aiPlayer.addEventListener('click', function(e) {
  console.log(e.target.value);
  gameBoard.setPlayer2HumanOrAI('ai', player2)
  startGameBtn.style.visibility = "visible"
})
})();