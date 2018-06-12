import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';

import * as SAMPLES from '../config/samples.js';

import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
import Quiz from './Quiz.jsx';

import {QUIZ_EN} from '../constants/constants.jsx';
import {QUIZ_ES} from '../constants/constants.jsx';

import {addObjectives, updateQuestions, startQuiz} from './../reducers/actions';

export class QuizPage extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    // Language
    this.quiz = (this.props.I18n.getLanguage() == 'es') ? QUIZ_ES : QUIZ_EN;

    let appHeader = "";
    let appContent = "";

    if((this.props.tracking.finished !== true) || (this.props.config.finish_screen === false)){
      appHeader = (
        <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={this.props.config} I18n={this.props.I18n}/>
      );
      if(this.props.wait_for_user_profile !== true){
        appContent = (
          <Quiz dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.props.quiz} QUIZ={this.quiz} config={this.props.config} I18n={this.props.I18n} mode={this.props.mode}/>
        );
      }
    } else {
      appContent = (
        <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.props.quiz} config={this.props.config} I18n={this.props.I18n}/>
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

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(QuizPage);