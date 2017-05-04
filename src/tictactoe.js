import React from "react";

export default class TicTacToe extends React.Component {
  render() {
    return (
      <div id="wrapper">
      {this.props.board.map((slot, idx)=>
        <div className="button" key={idx} onClick={(event)=>this.props.winner? event.preventdefault(): this.props.move(idx)}><span>{slot}</span></div>
      )}
      <p>the result of the game is: {this.props.winner}</p>
      {this.props.winner?<button onClick={this.props.restart}>Play Again</button>: null}
      <p>xWon: {this.props.xWon}  oWon: {this.props.oWon}  draw: {this.props.draw}</p>
      </div>
    );
  }
}
