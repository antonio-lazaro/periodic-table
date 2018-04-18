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
    let selectedClass = "element-selected";
    let selected = (this.props.selected) ? " " + selectedClass : "";
    return (
      <td className={"element " + this.props.element.category.replace(/ /g, "-").split(",")[0] + selected} onClick={this.handleClick}>
        <div className="element-container">
          <p className="element-atomic-number">{this.props.element.number}</p>
          <p className="element-symbol">{this.props.element.symbol}</p>
          <p className="element-name">{this.props.element.name}</p>
        </div>
      </td>
    );
  }
}