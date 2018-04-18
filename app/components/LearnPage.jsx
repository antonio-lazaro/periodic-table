import React from 'react';
import { connect } from 'react-redux';
import './../assets/scss/main.scss';

import { changePage } from '../reducers/actions.jsx';

import PeriodicTable from './PeriodicTable.jsx';
import ElementDetail from './ElementDetail.jsx';

import { PAGES } from '../constants/constants.jsx';

export class LearnPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedElement: undefined
    }
  }

  handleClick() {
    this.props.dispatch(changePage(PAGES.QUIZ_PAGE));
  }

  selectElement(element) {
    this.setState({ selectedElement: element });
  }

  render() {
    return (
      <div id="learn-page">
        <p id="learn-page-title">Periodic Table of Elements</p>
        <button type="button" onClick={this.handleClick.bind(this)}>Start Quiz!</button>
        <div style={{ clear: 'both' }}></div>
        <PeriodicTable selectElement={this.selectElement.bind(this)} selectedElements={(this.state.selectedElement) ? [this.state.selectedElement] : []}/>
        {(this.state.selectedElement) ? <div id="element-detail-shadow"></div> : undefined}
        {(this.state.selectedElement) ? <ElementDetail element={this.state.selectedElement} selectElement={this.selectElement.bind(this)} /> : undefined}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LearnPage);