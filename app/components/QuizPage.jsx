import React from 'react';
import { connect } from 'react-redux';
import './../assets/scss/main.scss';

import { GLOBAL_CONFIG } from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import * as SAMPLES from '../config/samples.js';

import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
import Quiz from './Quiz.jsx';

import { QUIZ } from '../constants/constants.jsx';

export class QuizPage extends React.Component {
  constructor(props) {
    super(props);
    I18n.init();
  }

  render() {
    let appHeader = "";
    let appContent = "";

    if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
      appHeader = (
        <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
      );
      if(this.props.wait_for_user_profile !== true){
        appContent = (
          <Quiz dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={QUIZ} config={GLOBAL_CONFIG} I18n={I18n}/>
        );
      }
    } else {
      appContent = (
        <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={QUIZ} config={GLOBAL_CONFIG} I18n={I18n}/>
      );
    }

    return (
      <div id="quiz-page-container">
        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        {appHeader}
        {appContent}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(QuizPage);