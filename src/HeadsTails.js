import React from 'react';

export default class HeadsTails extends React.Component {
  render() {
    let value = this.props.headstails.value;
    let coinDisplay;
    if (value) {
      let imageUrl = value > 0.5 ?
        'images/quarter-front.png' :
        'images/quarter-back.png';
      coinDisplay = <img src={imageUrl}/>;
    }
    return (
      <div>
        {coinDisplay}
        <button onClick={this.props.flip}>
          Flip!
        </button>
      </div>
    );
  }
}
