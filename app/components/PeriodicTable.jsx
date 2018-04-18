import React from 'react';
import { connect } from 'react-redux';
import './../assets/scss/periodicTable.scss';

import ELEMENTS from '../constants/constants';
import { elements } from '../constants/PeriodicTableJSON.json';
import { PAGES } from '../constants/constants.jsx';

import Element from './Element.jsx';

export class PeriodicTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Row 2
    var rowTwo = [];
    for (var i = 3; i <= 10; i++) {
      rowTwo.push(<Element element={this.props.elements[i - 1]} key={this.props.elements[i - 1].name} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[i - 1])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[i - 1])) ? true : false } />);
    }

    // Row 3
    var rowThree = [];
    for (var i = 11; i <= 18; i++) {
      rowThree.push(<Element element={this.props.elements[i - 1]} key={this.props.elements[i - 1].name} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[i - 1])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[i - 1])) ? true : false } />);
    }

    // Row 4
    var rowFour = [];
    for (var i = 19; i <= 36; i++) {
      rowFour.push(<Element element={this.props.elements[i - 1]} key={this.props.elements[i - 1].name} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[i - 1])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[i - 1])) ? true : false } />);
    }

    // Row 5
    var rowFive = [];
    for (var i = 37; i <= 54; i++) {
      rowFive.push(<Element element={this.props.elements[i - 1]} key={this.props.elements[i - 1].name} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[i - 1])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[i - 1])) ? true : false } />);
    }

    // Row 6
    var rowSix = [];
    for (var i = 55; i <= 86; i++) {
      if (!(i >= 58 && i <= 71)) {
        if (i == 57) {
          rowSix.push(
            <td key={'lantanos'} id="lantanos-cell">
              <p>57-71</p>
              <p>Lantanos</p>
            </td>);
        } else {
          rowSix.push(<Element element={this.props.elements[i - 1]} key={this.props.elements[i - 1].name} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[i - 1])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[i - 1])) ? true : false } />);
        }
      }
    }

    // Row 7
    var rowSeven = [];
    for (var i = 87; i <= 118; i++) {
      if (!(i >= 90 && i <= 103)) {
        if (i == 89) {
          rowSeven.push(
            <td key={'actinios'} id="actinios-cell">
              <p>89-103</p>
              <p>Actinios</p>
            </td>);
        } else {
          rowSeven.push(<Element element={this.props.elements[i - 1]} key={this.props.elements[i - 1].name} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[i - 1])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[i - 1])) ? true : false } />);
        }
      }
    }

    // Lantanos
    var lanthanides = [];
    for (var i = 57; i <= 71; i++) {
      lanthanides.push(<Element element={this.props.elements[i - 1]} key={this.props.elements[i - 1].name} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[i - 1])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[i - 1])) ? true : false } />);
    }

    // Actinios
    var actinides = [];
    for (var i = 89; i <= 103; i++) {
      actinides.push(<Element element={this.props.elements[i - 1]} key={this.props.elements[i - 1].name} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[i - 1])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[i - 1])) ? true : false } />);
    }

    return (
      <div id="scroll-container" className={(this.props.selectedElements.length > 0 && this.props.page == PAGES.LEARN_PAGE) ? "selected" : ""}>
        <div id="table-container">
          <table id="periodicTable">
            <tbody>

              <tr>
                <Element element={this.props.elements[0]} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[0])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[0])) ? true : false } />
                <td></td>
                <td colSpan="10" rowSpan="3"></td>
                <td colSpan="5"></td>
                <Element element={this.props.elements[1]} selectElement={this.props.selectElement} selected={(this.props.selectedElements.includes(this.props.elements[1])) ? true : false } answered={this.props.answered} correct={(this.props.askedElements && this.props.askedElements.includes(this.props.elements[1])) ? true : false } />
              </tr>
              
              <tr>{rowTwo}</tr>

              <tr>{rowThree}</tr>

              <tr>{rowFour}</tr>

              <tr>{rowFive}</tr>

              <tr>{rowSix}</tr>

              <tr>{rowSeven}</tr>

              <tr style={{ height: 55 }}></tr>

              <tr>
                <td colSpan="2"></td>
                {lanthanides}
              </tr>

              <tr>
                <td colSpan="2"></td>
                {actinides}
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    elements: elements,
    page: state.page
  };
}

export default connect(mapStateToProps)(PeriodicTable);