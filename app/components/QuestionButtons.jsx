import React from 'react';

import { PAGES, MODES } from '../constants/constants.jsx';

import { changePage } from '../reducers/actions.jsx';

export default class QuestionButtons extends React.Component {
  constructor(props){
    super(props);
  }

  goToPT() {
    this.props.dispatch(changePage(PAGES.LEARN_PAGE));
  }

  render(){
    let disable_answer = (this.props.answered || this.props.quizCompleted);
    let disable_resetQuestion = (!this.props.answered || this.props.quizCompleted);
    let disable_next = (!this.props.answered || this.props.quizCompleted);

    // Buttons enabled
    let answerQuestionButton = (!disable_answer) ? <button className="answerQuestion" onClick={this.props.onAnswerQuestion} disabled={disable_answer}>{this.props.I18n.getTrans("i.answer")}</button> : "";
    let resetQuestionButton = ((this.props.mode == MODES.LEARN) && !disable_resetQuestion) ? <button className="resetQuestion" onClick={this.props.onResetQuestion} disabled={disable_resetQuestion}>{this.props.I18n.getTrans("i.reset_question")}</button> : "";
    let nextQuestionButton = (!disable_next) ? <button className="nextQuestion" onClick={this.props.onNextQuestion} disabled={disable_next}>{this.props.allow_finish ? this.props.I18n.getTrans("i.finish_quiz") : this.props.I18n.getTrans("i.next")}</button> : "";
    let goToPTButton = (this.props.mode == MODES.LEARN) ? <button className="goToPT" onClick={this.goToPT.bind(this)}>{this.props.I18n.getTrans("i.go_to_pt")}</button> : "";

    return (
      <div className="questionButtonsWrapper">
        {answerQuestionButton}
        {resetQuestionButton}
        {nextQuestionButton}
        {goToPTButton}
      </div>
    );
  }
}