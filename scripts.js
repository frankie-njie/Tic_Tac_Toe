let marker_x = document.getElementById('marker-x');
let marker_o = document.getElementById('marker-o');
const gridItems = document.getElementsByClassName('grid-item');
//const player2 = document.querySelector('#player2');
const ai = document.querySelector('ai');


const gameBoard = (() => {
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener('click', function(e) {
        insertSymbol(e.target.id)
    })
  }

    const _players = []
    var board = new Array(9).fill('')
    let isPlayer2HumanOrAI = false
    let round = 0

    function setPlayer(index, p) {
        _players[index] = p
    }

    function getPlayers() {
        return players
    }

    function insertSymbol(id) {
        if (board[id] !== "") {
            alert('position is already occupied')
        }
        var element = document.getElementById(id)
        var currentPlayerIndex = round % 2
        var player = _players[currentPlayerIndex]
        element.textContent = player.mark
        board[id] = player.mark
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

    function setPlayer2HumanOrAI(b) {
        isPlayer2HumanOrAI = b
    }

    function nextPlayer() {
        /**
         * if next player == AI, then make AI move.
         * else, do nothing and wait for human player 2 to play.
         */
    }

    function checkWin(board, symbol) {

    }

    function checkDraw(board, symbol) {

    }

    return { setPlayer, getPlayers, insertSymbol, setPlayer2HumanOrAI }

})();




const getPlayers = (() => {
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

return{Player}
})();







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