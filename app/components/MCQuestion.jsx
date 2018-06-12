import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import MCQuestionChoice from './MCQuestionChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class MCQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.onAnswerQuestion = this.onAnswerQuestion.bind(this);
    this.onResetQuestion = this.onResetQuestion.bind(this);
    this.onNextQuestion = this.onNextQuestion.bind(this);
  }

  handleChoiceChange(choice) {
    if (this.props.question.answered) { return }
    let newSelectedChoices = Object.assign([], this.props.question.checkedPositions);
    let indexOf = newSelectedChoices.indexOf(choice.index);
    if (indexOf === -1) {
      newSelectedChoices.push(choice.index);
    } else {
      newSelectedChoices.splice(indexOf, 1);
    }
    let question = this.props.question;
    question.checkedPositions = newSelectedChoices;
    this.props.updateQuestion(question);
  }
  onAnswerQuestion() {
    // Calculate score
    let nChoices = this.props.question.checkedPositions.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    for(let i = 0; i < nChoices; i++) {
      if(this.props.question.randomPositions.includes(this.props.question.checkedPositions[i])) {
        correctAnswers += 1;
      } else {
        incorrectAnswers += 1;
      }
    }

    let scorePercentage;

    if (this.props.question.askedElements.length > 0) {
      scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / this.props.question.askedElements.length);
    } else {
      if (incorrectAnswers > 0) {
        scorePercentage = 0;
      } else {
        scorePercentage = 1;
      }
    }

    // Send data via SCORM
    let objective = this.props.objective;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    let question = this.props.question;
    question.answered = true;
    this.props.updateQuestion(question);
  }
  onResetQuestion() {
    let question = this.props.question;
    question.checkedPositions = [];
    question.answered = false;
    this.props.updateQuestion(question);
    this.props.dispatch(objectiveAccomplished(this.props.objective.id, 0));
  }
  onNextQuestion() {
    this.props.onNextQuestion();
  }

  render() {
    let question = this.props.I18n.getTransWithParams(this.props.question.question, this.props.question.randomElement);
    
    let choices = [];
    let jAsked = 0;
    let jRandom = 0;

    for(let i = 0; i < 4; i++) {
      if (this.props.question.randomPositions.includes(i)) {
        choices.push(<MCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={{ value: this.props.question.askedElements[jAsked][this.props.question.answerField], answer: true, index: i }} checked={this.props.question.checkedPositions.includes(i)} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.props.question.answered}/>);
        jAsked += 1;
      } else if (typeof this.props.question.randomElements[jRandom] != 'undefined') {
        choices.push(<MCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={{ value: this.props.question.randomElements[jRandom][this.props.question.answerField], answer: false, index: i }} checked={this.props.question.checkedPositions.includes(i)} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.props.question.answered}/>);
        jRandom += 1;
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