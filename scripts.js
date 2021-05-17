let marker_x = document.getElementById('marker-x');
let marker_o = document.getElementById('marker-o');
const gridItems = document.getElementsByClassName('grid-item');
const humanPlayer = document.querySelector('#player2');
const aiPlayer = document.querySelector('#ai');

//const displayController 

const gameBoard = (() => {
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener('click', playGame)
  }

    const _players = []
    let board = new Array(9).fill('')
    let isPlayer2HumanOrAI = false
    let round = 0
    //let endGame = false
    console.log(board);

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
        
        if(checkWin(board, player.mark) || checkDraw(board, player.mark)){
          _endGame();
        }
        
        //console.log(board);
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
        //const isAI = opponent === 'ai';
        // const player2 = { ...gameBoard.getPlayers()[1], isAI }
        // gameBoard.setPlayer(1, player2);
        console.log(isPlayer2HumanOrAI);
    }

    function aiMove() {
      //for ai moves, get player2 symbol or mark
      let aiSymbol = _players[1].mark
      console.log(aiSymbol);
      console.log(board);
      // var availableIndices = board.map((v, i) => console.log(v)).filter((v, i) => {
      //   console.log(!board[i]);
      //   return !board[i];
      // });
      //let availableIndices = board.filter(element => element === "")
      //console.log("avail indicies", availableIndices);

      // console.log(availableIndices);
      // console.log(availableIndices)
      //const index = Math.floor(Math.random() * availableIndices.length);
      let randomIndex = board[Math.floor(Math.random() * board.length)];
      
      //console.log(board.includes(''))
      console.log(randomIndex);
      // if(board[randomIndex] === ""){
      //   insertSymbol(randomIndex);
      //   console.log(board.length );
      // }
      // // else if(board !== "") {
      // //   console.log("board is full");
      // //   return 0
      // // }
      // else aiMove()
      

      
      //input player2symbol in a random position in board array
      //display symbol in corresponding position on div
    }
    let random = () => {
      
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

      let boardIsFull = board.indexOf('')
      //console.log( boardIsFull);
     
      if(!checkWin(board, mark) && boardIsFull === -1 ){
        console.log("We have a tie");
        return "We have a tie !"
      }
    }
    const _endGame = () => {
      for( let i = 0; i < gridItems.length; i++){
        gridItems[i].removeEventListener('click', playGame)
      }
    }



    return { setPlayer, getPlayers, insertSymbol, setPlayer2HumanOrAI, checkWin, checkDraw, aiMove }

})();



const createPlayers = (() => {
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
})
aiPlayer.addEventListener('click', function(e) {
  console.log(e.target.value);
  gameBoard.setPlayer2HumanOrAI('ai', player2)
})
})();


// To select an opponent, click human or ai
// if human is clicked assigned player2 marker to human or if ai is clicked assign player 2 marker to ai
// To




// const PlayerFactory = (() => {
//   function selectSymbol(symbol) {
//     if (symbol !== 'x' && symbol !== 'o') {
//       return null;
//     }
//     const opponentSymbol = symbol === 'x' ? 'o' : 'x';
//     return [
//       {
//         symbol: symbol
//       },
//       {
//         symbol: opponentSymbol
//       },
//     ];
//   }
//   return {
//     createPlayer: createPlayer
//   };
// })();
//
// const BoardFactory = (() => {
//   function createBoard() {
//     return {
//       cells: new Array(9).fill('');
//       nextPlayer: null,
//     };
//   }
//
//   function horizontalWin({cells}, playerSymbol) {
//     const aWin = cells[0] === cells[1] === cells[2] ||
//       cells[3] === cells[4] === cells[5] ||
//       cells[6] === cells[7] === cells[8];
//     return aWin ? playerSymbol: false;
//   }
//
//   function verticalWin({cells}, playerSymbol) {
//     const aWin = cells[0] === cells[3] === cells[6] ||
//       cells[1] === cells[4] === cells[7] ||
//       cells[2] === cells[5] === cells[8];
//     return aWin ? playerSymbol: false;
//   }
//
//   function diagonalWin({cells}, playerSymbol) {
//     const aWin = cells[0] === cells[4] === cells[8] ||
//       cells[2] === cells[4] === cells[6];
//     return aWin ? playerSymbol: false;
//   }
//
//   function weHaveAWinner(board, playerSymbol) {
//     return horizontalWin(board, playerSymbol) ||
//       verticalWin(board, playerSymbol) ||
//       diagonalWin(board, playerSymbol);
//   }
//
//   function weHaveADraw(board) {
//     const boardIsFull = board.cells.every(cell => !!cell);
//     if (boardIsFull && !weHaveAWinner(board)) {
//       return true;
//     }
//     return false;
//   }
//
//   function play(board, playerSymbol, index) {
//     if (!!board.cells[index]) {
//       return false;
//     }
//     board.cells[index] = playerSymbol;
//     board.nextPlayer = board.nextPlayer === 'x' ? 'o' : 'x';
//     return true;
//   }
//
//   return {
//     createBoard: createBoard,
//     weHaveADraw: weHaveADraw,
//     weHaveAWinner: weHaveAWinner,
//     play: play
//   };
// })();
