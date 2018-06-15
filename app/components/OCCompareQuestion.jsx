import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import OCQuestionChoice from './OCQuestionChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class OCCompareQuestion extends React.Component {
  constructor(props){
    super(props);

    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.onAnswerQuestion = this.onAnswerQuestion.bind(this);
    this.onResetQuestion = this.onResetQuestion.bind(this);
    this.onNextQuestion = this.onNextQuestion.bind(this);
  }

  handleChoiceChange(choice){
    if(this.props.question.answered){ return; }
    let question = this.props.question;
    question.checkedPosition = choice.index;
    this.props.updateQuestion(question);
  }
  onAnswerQuestion(){
    // Send data via SCORM
    let objective = this.props.objective;
    let scorePercentage = 0;

    if(this.props.question.checkedPosition == this.props.question.randomPosition){
      scorePercentage = 1;
    } else {
      scorePercentage = 0;
    }

    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    let question = this.props.question;
    question.answered = true;
    this.props.updateQuestion(question);
  }
  onResetQuestion(){
    let question = this.props.question;
    question.checkedPosition = undefined;
    question.answered = false;
    this.props.updateQuestion(question);
    this.props.dispatch(objectiveAccomplished(this.props.objective.id, 0));
  }
  onNextQuestion(){
    this.props.onNextQuestion();
  }
  render(){
    let question = this.props.I18n.getTransWithParams(this.props.question.question, this.props.question.askedElement);

    let choices = [];
    let j = 0;

    for(let i = 0; i < 4; i++){
      if(i == this.props.question.randomPosition){
        choices.push(<OCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={{value:this.props.question.correctElement[this.props.question.answerField], answer:true, index:i}} checked={(i == this.props.question.checkedPosition)} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.props.question.answered}/>);
      } else if(typeof this.props.question.randomElements[j] !== 'undefined'){
        choices.push(<OCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={{value:this.props.question.randomElements[j][this.props.question.answerField], answer:false, index:i}} checked={(i == this.props.question.checkedPosition)} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.props.question.answered}/>);
        j += 1;
      }
    }
    return (
      <div className="question">
        <p className="title">{question}</p>
        <div className="question_choices">
          {choices}
        </div>
        <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.props.question.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion} dispatch={this.props.dispatch} mode={this.props.mode} />
      </div>
    );
  }
}