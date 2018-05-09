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
        <p id="learn-page-title">{this.props.I18n.getTrans("i.learn_page_title")}</p>
        <button type="button" onClick={this.handleClick.bind(this)}>{this.props.I18n.getTrans("i.start_quiz_text")}</button>
        <div style={{ clear: 'both' }}></div>
        <PeriodicTable selectElement={this.selectElement.bind(this)} selectedElements={(this.state.selectedElement) ? [this.state.selectedElement] : []} I18n={this.props.I18n} />
        {(this.state.selectedElement) ? <div id="element-detail-shadow"></div> : undefined}
        {(this.state.selectedElement) ? <ElementDetail element={this.state.selectedElement} selectElement={this.selectElement.bind(this)} I18n={this.props.I18n} /> : undefined}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LearnPage);