import React from 'react';
import './../assets/scss/periodicTable.scss';

export default class ElementDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCloseButtonClick() {
    this.props.selectElement(undefined);
  }

  render() {
    let closeButtonStyle = {
      margin: 0,
      backgroundColor: '#23323E',
      width: 88,
      float: 'right'
    };
    return (
      <div id="element-detail-container">
        <button id="close-button" style={closeButtonStyle} onClick={this.handleCloseButtonClick.bind(this)}>Close</button>
        <p className="symbol">{this.props.element.symbol}</p>
        <div style={{ clear: 'both' }}></div>
        <p className="name">{this.props.element.name}</p>
      </div>
    );
  }
}