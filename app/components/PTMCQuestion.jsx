import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import PeriodicTable from './PeriodicTable.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class PTMCQuestion extends React.Component {
  constructor(props){
    super(props);

    this.selectElement = this.selectElement.bind(this);
    this.onAnswerQuestion = this.onAnswerQuestion.bind(this);
    this.onResetQuestion = this.onResetQuestion.bind(this);
    this.onNextQuestion = this.onNextQuestion.bind(this);
  }
  selectElement(element){
    if(this.props.question.answered){ return; }
    let newSelectedElements = Object.assign([], this.props.question.selectedElements);
    let indexOf = newSelectedElements.indexOf(element);
    if(indexOf === -1){
      newSelectedElements.push(element);
    } else {
      newSelectedElements.splice(indexOf, 1);
    }
    let question = this.props.question;
    question.selectedElements = newSelectedElements;
    this.props.updateQuestion(question);
  }
  onAnswerQuestion(){
    // Calculate score
    let nChoices = this.props.question.selectedElements.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    for(let i = 0; i < nChoices; i++){
      if(this.props.question.correctAnswers.includes(this.props.question.selectedElements[i])){
        correctAnswers += 1;
      } else {
        incorrectAnswers += 1;
      }
    }
    let scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / this.props.question.correctAnswers.length);

    // Send data via SCORM
    let objective = this.props.objective;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    let question = this.props.question;
    question.answered = true;
    this.props.updateQuestion(question);
  }
  onResetQuestion(){
    let question = this.props.question;
    question.selectedElements = [];
    question.answered = false;
    this.props.updateQuestion(question);
    this.props.dispatch(objectiveAccomplished(this.props.objective.id, 0));
  }
  onNextQuestion(){
    this.props.onNextQuestion();
  }
  render(){
    let question = this.props.I18n.getTransWithParams(this.props.question.question, this.props.question.randomElement);

    return (
      <div className="question">
        <p className="title">{question}</p>
        <PeriodicTable selectElement={this.selectElement.bind(this)} selectedElements={this.props.question.selectedElements} askedElements={this.props.question.correctAnswers} answered={this.props.question.answered} showElements={this.props.question.showElements} I18n={this.props.I18n} />
        <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.props.question.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion} dispatch={this.props.dispatch} mode={this.props.mode} />
      </div>
    );
  }
}