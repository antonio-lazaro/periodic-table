import React from 'react';

export default class QuizHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="quizHeader">
        <span id="progress-title">{this.props.I18n.getTrans("i.progress")}</span>
        <div id="progress-bar">
          <div id="progress-bar-progress" style={{ width:  this.props.currentQuestionIndex / this.props.quiz.questions.length * 100 + "%" }}></div>
        </div>
        <span>{this.props.currentQuestionIndex}/{this.props.quiz.questions.length}</span>
      </div>
    );
  }
}