import React from 'react';
import { connect } from 'react-redux';
import './../assets/scss/main.scss';

import { GLOBAL_CONFIG } from '../config/config.js';
import * as SAMPLES from '../config/samples.js';

import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
import Quiz from './Quiz.jsx';

import { QUIZ_EN } from '../constants/constants.jsx';
import { QUIZ_ES } from '../constants/constants.jsx';

export class QuizPage extends React.Component {
  constructor(props) {
    super(props);

    // Language
    this.quiz = (this.props.I18n.getLanguage() == 'es') ? QUIZ_ES : QUIZ_EN;
  }

  render() {
    let appHeader = "";
    let appContent = "";

    if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
      appHeader = (
        <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={this.props.I18n}/>
      );
      if(this.props.wait_for_user_profile !== true){
        appContent = (
          <Quiz dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.quiz} config={GLOBAL_CONFIG} I18n={this.props.I18n}/>
        );
      }
    } else {
      appContent = (
        <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.quiz} config={GLOBAL_CONFIG} I18n={this.props.I18n}/>
      );
    }

    return (
      <div id="quiz-page-container">
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