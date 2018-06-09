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
        <button id="close-button" style={closeButtonStyle} onClick={this.handleCloseButtonClick.bind(this)}>{this.props.I18n.getTrans("i.close")}</button>
        <p className="symbol">{this.props.element.symbol}</p>
        <div style={{ clear: 'both' }}></div>
        <p className="name">{this.props.element.name}</p>
        <p className="description">{this.props.element.summary}</p>
        <div className="spec-box first">
          <p className="spec-title">{this.props.I18n.getTrans("i.atomic_number")}</p>
          <p className="spec-value">{this.props.element.number}</p>
        </div>
        <div className="spec-box">
          <p className="spec-title">{this.props.I18n.getTrans("i.group")}</p>
          <p className="spec-value">{this.props.element.category}</p>
        </div>
        <div className="spec-box">
          <p className="spec-title">{this.props.I18n.getTrans("i.atomic_mass")}</p>
          <p className="spec-value">{this.props.element.atomic_mass} <span className="spec-measure">u</span></p>
        </div>
        <div className="spec-box">
          <p className="spec-title">{this.props.I18n.getTrans("i.molar_heat")}</p>
          <p className="spec-value">{this.props.element.molar_heat} <span className="spec-measure">g/mol</span></p>
        </div>
        <div className="spec-box">
          <p className="spec-title">{this.props.I18n.getTrans("i.density")}</p>
          <p className="spec-value">{this.props.element.density} <span className="spec-measure">g/cm³</span></p>
        </div>
        <div className="spec-box">
          <p className="spec-title">{this.props.I18n.getTrans("i.state")}</p>
          <p className="spec-value">{this.props.element.phase}</p>
        </div>
        <div className="spec-box">
          <p className="spec-title">{this.props.I18n.getTrans("i.discovered_by")}</p>
          <p className="spec-value">{this.props.element.discovered_by}</p>
        </div>
      </div>
    );
  }
}