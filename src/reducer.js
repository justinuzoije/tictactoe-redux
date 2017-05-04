
let init_state = {
  board: [null, null, null,null, null, null,null, null, null],
  currentPlayer: "x",
  winner: null,
  xWon: 0,
  oWon: 0,
  draw: 0
}

export default function reducer (state=init_state, action) {
  let nextState
  function checkwin(board_copy, a, b, c){
    if(board_copy[a]===board_copy[b]&&board_copy[b]===board_copy[c]&&board_copy[b]!==null){
      return true;
    }else{
      return false;
    }
  }

  if(action.type==="move" && !state.board[action.index]){
    let board_copy = state.board.map((item)=>item);
    board_copy[action.index] = state.currentPlayer;
    let length = board_copy.join("").length;
    if(state.currentPlayer === "x"){
      if(
        checkwin(board_copy, 0, 1, 2)||
        checkwin(board_copy, 3, 4, 5)||
        checkwin(board_copy, 6, 7, 8)||
        checkwin(board_copy, 0, 3, 6)||
        checkwin(board_copy, 1, 4, 7)||
        checkwin(board_copy, 2, 5, 8)||
        checkwin(board_copy, 0, 4, 8)||
        checkwin(board_copy, 2, 4, 6)
      ){
        nextState = Object.assign({}, state, {
          board: board_copy,
          currentPlayer: "o",
          winner: "x",
          xWon: state.xWon + 1
        })
      }else if (length === 9 && state.winner === null){
        nextState = Object.assign({}, state, {
          board: board_copy,
          winner: "draw",
          draw: state.draw + 1
        })
      }else{
        nextState = Object.assign({}, state, {
          board: board_copy,
          currentPlayer: "o"
        })
      }
    }else if(state.currentPlayer === "o"){
      if(
        checkwin(board_copy, 0, 1, 2)||
        checkwin(board_copy, 3, 4, 5)||
        checkwin(board_copy, 6, 7, 8)||
        checkwin(board_copy, 0, 3, 6)||
        checkwin(board_copy, 1, 4, 7)||
        checkwin(board_copy, 2, 5, 8)||
        checkwin(board_copy, 0, 4, 8)||
        checkwin(board_copy, 2, 4, 6)
      ){
        nextState = Object.assign({}, state, {
          board: board_copy,
          currentPlayer: "x",
          winner: "o",
          oWon: state.oWon + 1
        })
      }else if (length === 9 && state.winner === null){
        nextState = Object.assign({}, state, {
          board: board_copy,
          winner: "draw",
          draw: state.draw + 1
        })
      }else{
        nextState = Object.assign({}, state, {
          board: board_copy,
          currentPlayer: "x"
        })
      }
    }
  } else if (action.type === "restart") {
    nextState = Object.assign({}, state, {
      board: [null, null, null,null, null, null,null, null, null],
      currentPlayer: "x",
      winner: null
    })
  } else{
    nextState = Object.assign({}, state)
  }
  return nextState;
}
