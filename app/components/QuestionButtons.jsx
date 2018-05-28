import React from 'react';

export default class QuestionButtons extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let disable_answer = (this.props.answered || this.props.quizCompleted);
    let disable_resetQuestion = (!this.props.answered || this.props.quizCompleted);
    let disable_next = (!this.props.answered || this.props.quizCompleted);
    let resetQuiz = "";
    if((this.props.allow_finish) && (disable_next === false)){
      resetQuiz = (<button className="resetQuiz" onClick={this.props.onResetQuiz}>{this.props.I18n.getTrans("i.reset_quiz")}</button>);
    }

    // Buttons enabled
    let answerQuestionButton = (!disable_answer) ? <button className="answerQuestion" onClick={this.props.onAnswerQuestion} disabled={disable_answer}>{this.props.I18n.getTrans("i.answer")}</button> : "";
    let resetQuestionButton = (!disable_resetQuestion) ? <button className="resetQuestion" onClick={this.props.onResetQuestion} disabled={disable_resetQuestion}>{this.props.I18n.getTrans("i.reset_question")}</button> : "";
    let nextQuestionButton = (!disable_next) ? <button className="nextQuestion" onClick={this.props.onNextQuestion} disabled={disable_next}>{this.props.allow_finish ? this.props.I18n.getTrans("i.finish_quiz") : this.props.I18n.getTrans("i.next")}</button> : "";

    return (
      <div className="questionButtonsWrapper">
        {answerQuestionButton}
        {resetQuestionButton}
        {nextQuestionButton}
        {resetQuiz}
      </div>
    );
  }
}