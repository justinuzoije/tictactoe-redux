//The reducer file has the state initialization for the entire game
// The state has a board filled with nine nulls, which represent the nine spaces of tic tac toe
// It also has a currentPlayer value which starts as X because X goes first
// It has a winner which starts out as null, which means the game is still in session
// It also has a counter for number of times X has won, O has won, and there has been a draw
let init_state = {
  board: [null, null, null,null, null, null,null, null, null],
  currentPlayer: "x",
  winner: null,
  xWon: 0,
  oWon: 0,
  draw: 0
}

// This is the entire reducer function. It passes in the state, the action
// In order to keep the function pure, we have a nextState, which we will later on use as a copy of the real state
// We do this to keep the state the same
// We have a function  outside of the action.type if statements called checkwin
// It is outside because it is needs to access the board itself. Like the nextState copying state
// The board_copy is a copy of the board so that we can change it without changing the actual board itself
// checkwin takes in the board_copy and three numbers as parameters. These numbers will be the indexes of the
// the board_copy array, which matches different combinations of a win on a tic tac toe board.
// If one of the eight winning combinations have the same letter, then there is a winner.
// The condition !==null is there so that having three blank spaces in the winning combination doesn't end the game,
// which is what would happen without it
export default function reducer (state=init_state, action) {
  let nextState
  function checkwin(board_copy, a, b, c){
    if(board_copy[a]===board_copy[b]&&board_copy[b]===board_copy[c]&&board_copy[b]!==null){
      return true;
    }else{
      return false;
    }
  }

  // The first action type in the reducer if statements is move

  // Move is the action type that puts a letter X or O on the tic tac toe board.
  // The spot must be empty to place a letter there.
  // We can access properties inside the init_state object by saying state.name of the property
  // This is because we made an alias for it called state
  // By passing in state=init_state in the reducer function, we use state.board to get the board
  // or state.winner to get the value of the winner property of the state object
  // The !state.board[action.index] means there cannot be anything inside the board's index
  // Assuming this is the case, the move action makes a copy of the real board
  // It maps the every element of the board array using item as the name of the element
  // To get the size of the board, we cannot use board copy.length because
  // this will always return 9. We use join("") to convert the array into a string
  // Seperate by commas. So a board of [null, x, null, o] is xo which is seen as two
  if(action.type==="move" && !state.board[action.index]){
    let board_copy = state.board.map((item)=>item);
    board_copy[action.index] = state.currentPlayer;
    let length = board_copy.join("").length;

    // There are three scenarios that can occure when the move action is performed
    // If the value of currentPlayer property is x, then the following applies

    if(state.currentPlayer === "x"){
      //Scenario 1 - There is a winning combination of Xs on the board
      if(
        //These are passing in the different combinations of winning
        // The checkwin function takes in the copy of the board, different locations
        // And sees if they are full with the same letter.
        checkwin(board_copy, 0, 1, 2)||
        checkwin(board_copy, 3, 4, 5)||
        checkwin(board_copy, 6, 7, 8)||
        checkwin(board_copy, 0, 3, 6)||
        checkwin(board_copy, 1, 4, 7)||
        checkwin(board_copy, 2, 5, 8)||
        checkwin(board_copy, 0, 4, 8)||
        checkwin(board_copy, 2, 4, 6)
      ){
        //This is a copy of the state so that we are not changing the state itself
        // The state is an object, so we copy it over
        // Object.assign() is a method made specifically for copying one object into a new one
        // The first parameter is the target object, the second parameter is the source
        // The third parameter is what we are immediately chaning about the copy to be
        // The third parameter includes everything the source does, but with the changes we want
        // This is how we change the state object without actually changing it
        // The changes we are making is the board array is now the board copy
        // The current player is o instead of x
        // The winner is x
        // And the xWon property is equal to itself plus 1
        nextState = Object.assign({}, state, {
          board: board_copy,
          currentPlayer: "o",
          winner: "x",
          xWon: state.xWon + 1
        })
        // Scenario 2 - All the spaces are filled and there is still no winner
        //If there are nine different letters in the board array, and there is no winner
        // Then we do the same creation of a new state with the property values we want
        // This is the same as before
      }else if (length === 9 && state.winner === null){
        nextState = Object.assign({}, state, {
          board: board_copy,
          winner: "draw",
          draw: state.draw + 1
        })
        // Scenario 3 - There is no winning combination, and there are still empty spaces.
        // In this cause we create the new state and the wonly things we cange are the board
        // to be the board copy, and the currentPlayer being o instead of x
      }else{
        nextState = Object.assign({}, state, {
          board: board_copy,
          currentPlayer: "o"
        })
      }
      // If the player is o instead of x, there are three Scenarios that can happen
    }else if(state.currentPlayer === "o"){  //If the currentPlayer property is o, then the following applies
      //Scenario 1 - The board is filled with a winning combination of Os
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
        // Scenario 2 - The board is filled with letters and there is no winner
      }else if (length === 9 && state.winner === null){
        nextState = Object.assign({}, state, {
          board: board_copy,
          winner: "draw",
          draw: state.draw + 1
        })
        // Scenario 3 - There is neither a winner, nor are all the spaces filled.
        // There are still spaces, so the new state is created with the only changes
        // being a the board is a copy of the board, and the current player
        // becomes x instead of o
      }else{
        nextState = Object.assign({}, state, {
          board: board_copy,
          currentPlayer: "x"
        })
      }
    }
    //This is for the action type of restart
    // As you can see, the action type move is considerably longer
    // The purpose of the restart action type is to start the game over
    // It creates a new state, and makes the board filled with nulls, like at
    // the beginning. It makes the current player the x player, and makes the
    // the winner property set to null
  } else if (action.type === "restart") {
    nextState = Object.assign({}, state, {
      board: [null, null, null,null, null, null,null, null, null],
      currentPlayer: "x",
      winner: null
    })
    // This is in the case of none of the other scenarios are chosen, as an edge
    // case. It makes the new state a carbon copy of the current state, with
    // no changes
  } else{
    nextState = Object.assign({}, state)
  }
  // There are many scenarios that could have taken place, each one creating
  // a new state with possibly many changes. It will return this new state
  return nextState;
}
