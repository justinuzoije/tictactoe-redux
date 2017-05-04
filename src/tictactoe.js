import React from "react";

// This file has to do with visualization of the content to be posted to the htm file,
//Every class is a React component because it extends the React.Component
export default class TicTacToe extends React.Component {

  //This begins with the render method
  render() {
    //This is what will appear visually in the html file

    //We can use this.props.board to access the board that's inside the reducer. We are mapping a button to each
    //element in the board array. This button has an onclick event that does this.props.move, passing in the index
    //of the button as a parameter. If there is a winner, then the default action will be prevented. This will
    //make it so that if there is a winner, you will not be able to click on anything.
    //The slot variable is the actual content of the board.

    //This show the result of the game by posting the winner, which will exist when there is one

    //There is a Play Again button that will only appear when there is a winner.
    // This button does this.props.restart which is a method in the reducer file.
    // The restart method fills everything with the parameter after the : sign, which is null
    // So all the board positions will be filled with null

    //At the bottom of the screen it shows the number of times there has been a winner

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
