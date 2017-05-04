import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import './index.css';
import TicTacToe from "./tictactoe";
import reducer from "./reducer";

let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const TictactoeContainer = ReactRedux.connect(
  state => ({ board: state.board, currentPlayer: state.currentPlayer, winner: state.winner, xWon: state.xWon, oWon:state.oWon, draw: state.draw}),
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
