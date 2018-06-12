import React from 'react';
import './../assets/scss/finish_screen.scss';

import { changePage, resetObjectives, finishApp, finishQuiz, updateCurrentQuestionIndex, update, updateQuestions } from '../reducers/actions.jsx';

import { PAGES } from '../constants/constants.jsx';

export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
  }

  handleClick() {
    this.props.dispatch(changePage(PAGES.LEARN_PAGE));
    this.props.dispatch(resetObjectives());
    this.props.dispatch(finishApp(false));
    this.props.dispatch(finishQuiz());
  }

  handleReset() {
    let questions = this.props.quiz.questions;
    for (var i = 0; i < questions.length; i++) {
      questions[i].answered = false;
      questions[i].checkedPosition = undefined;
      questions[i].checkedPositions = [];
      questions[i].selectedElement = undefined;
      questions[i].selectedElements = [];
    }
    this.props.dispatch(updateCurrentQuestionIndex(1));
    this.props.dispatch(updateQuestions(questions));
    this.props.dispatch(resetObjectives());
    this.props.dispatch(finishApp(false));
  }

  _getFinishScreenTitle(progress_measure, score){
    let finishTitleText;
    let hasProgressMeasure = (typeof progress_measure === "number");
    let hasScore = (typeof score === "number");
    if(hasProgressMeasure && hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_full", {progress_measure:(progress_measure * 100), score:(score * 100)});
    } else if(hasProgressMeasure){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_wpm", {progress_measure:(progress_measure * 100)});
    } else if(hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_ws", {score:(score * 100)});
    }
    if(typeof finishTitleText === "undefined"){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_simple");
    }
    return finishTitleText;
  }
  render(){
    let finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_full", { score:Math.trunc(this.props.tracking.score * 100) });
    let goToPTButton = (this.props.config.mode == "LEARN") ? <button type="button" onClick={this.handleClick.bind(this)}>{this.props.I18n.getTrans("i.go_to_pt!")}</button> : "";
    let resetButton = (this.props.config.mode == "LEARN") ? <button type="button" onClick={this.handleReset.bind(this)}>{this.props.I18n.getTrans("i.reset_quiz!")}</button> : "";
    return (
      <div className="finish_screen">
        <p id="finish_title">{finishTitleText}</p>
        {goToPTButton}
        {resetButton}
      </div>
    );
  }
}