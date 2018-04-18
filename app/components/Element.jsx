import React from 'react';
import './../assets/scss/periodicTable.scss';

export default class Element extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectElement(this.props.element);
  }

  render() {
    let classes = "";

    if (typeof this.props.answered === "undefined") {
      let group = this.props.element.category.replace(/ /g, "-").split(",")[0];
      classes += " " + group;
    }

    let selectedClass = "element-selected";
    classes += (this.props.selected) ? " " + selectedClass : "";

    if (typeof this.props.answered !== "undefined" && (this.props.answered || this.props.correct)) {
      let correctClass = "choice-correct";
      let incorrectClass = "choice-incorrect";
      let correct = (this.props.answered && this.props.correct) ? " " + correctClass : ((this.props.answered) ? " " + incorrectClass : "");
      classes += correct;
    }
    return (
      <td className={"element " + classes} onClick={this.handleClick}>
        <div className="element-container">
          <p className="element-atomic-number">{this.props.element.number}</p>
          <p className="element-symbol">{this.props.element.symbol}</p>
          <p className="element-name">{this.props.element.name}</p>
        </div>
      </td>
    );
  }
}