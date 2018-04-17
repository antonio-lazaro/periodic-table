import React from 'react';
import './../assets/scss/periodicTable.scss';

export default class Element extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.element.symbol);
    this.props.selectElement(this.props.element);
  }

  render() {
    return (
      <td className={"element " + this.props.element.category.replace(/ /g, "-").split(",")[0]} onClick={this.handleClick}>
        <div className="element-container">
          <p className="element-atomic-number">{this.props.atomicNumber}</p>
          <p className="element-symbol">{this.props.element.symbol}</p>
          <p className="element-name">{this.props.element.name}</p>
        </div>
      </td>
    );
  }
}