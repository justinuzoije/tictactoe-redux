import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import './index.css';
import TicTacToe from "./tictactoe";
import reducer from "./reducer";


//This is to connect the store we must make to the Redux DevTools so we can see
// the store using the Chrome extension
let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// This is the container, it is the only thing that will be put in the
// ReactDOM.render section so it will have to contain everything

const TictactoeContainer = ReactRedux.connect(
  // We assign the state to be equal to whatever properties we have made for it
  // in the reducer file
  // We made the state Object have a board, currentPlayer, winner, xWon, oWon,
  // and draw properties. Each of these must be represented

  state => ({ board: state.board, currentPlayer: state.currentPlayer, winner: state.winner, xWon: state.xWon, oWon:state.oWon, draw: state.draw}),

  // Next is the dispatch section. Each action type created in the reducer must
  // be represented. The move action type gets the idx from the button in tictactoe.js
  // The button has an idx attached to it, and a onClick function that sends that
  // same idx into the move function. This is the middle man

  //tictactoe.js move button idx ->index.js move dispatch -> reducer.js move

  dispatch => ({
    move: (idx) => dispatch({
      type: 'move',
      index: idx
    }),
    restart: () => dispatch({
      type: 'restart'
    })
  })
)(TicTacToe)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
  <div>
    <TictactoeContainer/>
  </div>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
