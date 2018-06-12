import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import PeriodicTable from './PeriodicTable.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class PTMCQuestion extends React.Component {
  constructor(props){
    super(props);

    // Select a random element
    let randomElement = this.props.posibleElements[Math.floor(Math.random() * this.props.posibleElements.length)];

    // Filter all correct answers
    let correctAnswers = this.props.posibleElements.filter((element) => {
      return element[this.props.question.askedField] == randomElement[this.props.question.askedField]
    });

    this.state = {
      answered: false,
      randomElement: randomElement,
      correctAnswers: correctAnswers,
      selectedElements: []
    };
  }
  componentWillUpdate(prevProps, prevState) {
    if(prevProps.question !== this.props.question){
      this.setState({selectedElements: [], answered: false});
    }
  }
  selectElement(element) {
    if (this.state.answered) { return }
    let newSelectedElements = Object.assign([], this.state.selectedElements);
    let indexOf = newSelectedElements.indexOf(element);
    if (indexOf === -1) {
      newSelectedElements.push(element);
    } else {
      newSelectedElements.splice(indexOf, 1);
    }
    this.setState({ selectedElements: newSelectedElements });
  }
  onAnswerQuestion() {
    // Calculate score
    let nChoices = this.state.selectedElements.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    for(let i = 0; i < nChoices; i++) {
      if(this.state.correctAnswers.includes(this.state.selectedElements[i])) {
        correctAnswers += 1;
      } else {
        incorrectAnswers += 1;
      }
    }
    let scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / this.state.correctAnswers.length);

    // Send data via SCORM
    let objective = this.props.objective;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    this.setState({answered:true});
  }
  onResetQuestion() {
    this.setState({selectedElements: [], answered: false});
  }
  onNextQuestion() {
    this.props.onNextQuestion();

    this.setState({
      randomElement:  this.props.posibleElements[Math.floor(Math.random() * this.props.posibleElements.length)],
      selectedElements: [],
      answered: false
    });
  }
  render() {
    let question = this.props.I18n.getTransWithParams(this.props.question.question, this.state.randomElement);

    return (
      <div className="question">
        <p className="title">{question}</p>
        <PeriodicTable selectElement={this.selectElement.bind(this)} selectedElements={this.state.selectedElements} askedElements={this.state.correctAnswers} answered={this.state.answered} showElements={this.props.question.showElements} I18n={this.props.I18n} />
        <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion} dispatch={this.props.dispatch} mode={this.props.mode} />
      </div>
    );
  }
}