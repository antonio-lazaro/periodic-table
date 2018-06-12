import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/periodicTable.scss';

import ELEMENTS from '../constants/constants';
import {elements as elementsEN} from '../constants/PeriodicTableJSON.json';
import {elements as elementsES} from '../constants/PeriodicTableJSON.es.json';
import {PAGES} from '../constants/constants.jsx';

import Element from './Element.jsx';

export class PeriodicTable extends React.Component {
  constructor(props){
    super(props);
  }

  getElementComponent(i){
    return (
      <Element
        element={this.elements[i - 1]}
        key={this.elements[i - 1].name}
        selectElement={this.props.selectElement}
        selected={!!(this.props.selectedElements.includes(this.elements[i - 1])) }
        answered={this.props.answered}
        correct={!!((this.props.askedElements && this.props.askedElements.includes(this.elements[i - 1]))) }
        show={this.props.showElements}
        />
    );
  }

  render(){
    this.elements = (this.props.I18n.getLanguage() == 'es') ? elementsES : elementsEN;

    // Row 2
    let rowTwo = [];
    for(var i = 3; i <= 10; i++){
      rowTwo.push(this.getElementComponent(i));
    }

    // Row 3
    let rowThree = [];
    for(var i = 11; i <= 18; i++){
      rowThree.push(this.getElementComponent(i));
    }

    // Row 4
    let rowFour = [];
    for(var i = 19; i <= 36; i++){
      rowFour.push(this.getElementComponent(i));
    }

    // Row 5
    let rowFive = [];
    for(var i = 37; i <= 54; i++){
      rowFive.push(this.getElementComponent(i));
    }

    // Row 6
    let rowSix = [];
    for(var i = 55; i <= 86; i++){
      if(!(i >= 58 && i <= 71)){
        if(i == 57){
          rowSix.push(
            <td key={'lantanos'} id="lantanos-cell">
              <p>57-71</p>
              <p>{this.props.I18n.getTrans("i.lanthanides")}</p>
            </td>);
        } else {
          rowSix.push(this.getElementComponent(i));
        }
      }
    }

    // Row 7
    let rowSeven = [];
    for(var i = 87; i <= 118; i++){
      if(!(i >= 90 && i <= 103)){
        if(i == 89){
          rowSeven.push(
            <td key={'actinios'} id="actinios-cell">
              <p>89-103</p>
              <p>{this.props.I18n.getTrans("i.actinides")}</p>
            </td>);
        } else {
          rowSeven.push(this.getElementComponent(i));
        }
      }
    }

    // Lantanos
    let lanthanides = [];
    for(var i = 57; i <= 71; i++){
      lanthanides.push(this.getElementComponent(i));
    }

    // Actinios
    let actinides = [];
    for(var i = 89; i <= 103; i++){
      actinides.push(this.getElementComponent(i));
    }

    return (
      <div id="scroll-container" className={(this.props.selectedElements.length > 0 && this.props.page == PAGES.LEARN_PAGE) ? "selected" : ""}>
        <div id="table-container">
          <table id="periodicTable">
            <tbody>

              <tr>
                {this.getElementComponent(1)}
                <td />
                <td colSpan="10" rowSpan="3" />
                <td colSpan="5" />
                {this.getElementComponent(2)}
              </tr>

              <tr>{rowTwo}</tr>

              <tr>{rowThree}</tr>

              <tr>{rowFour}</tr>

              <tr>{rowFive}</tr>

              <tr>{rowSix}</tr>

              <tr>{rowSeven}</tr>

              <tr style={{height:55}} />

              <tr>
                <td colSpan="2" />
                {lanthanides}
              </tr>

              <tr>
                <td colSpan="2" />
                {actinides}
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    page:state.page,
  };
}

export default connect(mapStateToProps)(PeriodicTable);