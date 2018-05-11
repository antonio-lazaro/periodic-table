import React from 'react';
import { connect } from 'react-redux';
import './../assets/scss/main.scss';

import * as I18n from '../vendors/I18n.js';
import { GLOBAL_CONFIG } from '../config/config.js';

import SCORM from './SCORM.jsx';
import LearnPage from './LearnPage.jsx';
import QuizPage from './QuizPage.jsx';

import { PAGES } from '../constants/constants.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);
    I18n.init();
  }

  render() {
    let appContent = "";

    switch (this.props.page) {
      case PAGES.LEARN_PAGE:
        appContent = (<LearnPage I18n={I18n} mode={this.props.mode} dispatch={this.props.dispatch} />);
        break;
      case PAGES.QUIZ_PAGE:
        appContent = (<QuizPage I18n={I18n} />);
        break;
      default:
        appContent = (<LearnPage I18n={I18n} mode={this.props.mode} dispatch={this.props.dispatch} />);
    }

    return (
      <div id="container">
        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        {appContent}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);