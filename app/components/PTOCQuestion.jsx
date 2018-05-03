import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import PeriodicTable from './PeriodicTable.jsx';
import OCQuestionChoice from './OCQuestionChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';

import { elements } from '../constants/PeriodicTableJSON.json';

export default class PTOCQuestion extends React.Component {
  constructor(props){
    super(props);

    let askedElement = elements[Math.floor(Math.random() * elements.length)];

    this.state = {
      answered: false,
      askedElement: askedElement,
      selectedElement: undefined
    };
  }
  componentWillUpdate(prevProps, prevState) {
    if(prevProps.question !== this.props.question){
      this.setState({selectedElement: undefined, answered:false});
    }
  }
  selectElement(element) {
    this.setState({ selectedElement: element });
  }
  onAnswerQuestion() {
    // Send data via SCORM
    let objective = this.props.objective;
    let scorePercentage = 0;

    if (this.state.selectedElement && this.state.selectedElement == this.state.askedElement) {
      scorePercentage = 1;
    } else {
      scorePercentage = 0;
    }

    this.props.dispatch(objectiveAccomplished(objective.id, scorePercentage));

    // Mark question as answered
    this.setState({answered:true});
  }
  onResetQuestion() {
    this.setState({selectedElement: undefined, answered: false});
  }
  onNextQuestion() {
    this.props.onNextQuestion();

    this.setState({
      askedElement:  elements[Math.floor(Math.random() * elements.length)],
      selectedElement: undefined,
    });
  }
  render() {
    let question = this.props.I18n.getTransWithParams(this.props.question.question, this.state.askedElement);

    return (
      <div className="question">
        <p className="title">{question}</p>
        <PeriodicTable selectElement={this.selectElement.bind(this)} selectedElements={(this.state.selectedElement) ? [this.state.selectedElement] : []} askedElements={[this.state.askedElement]} answered={this.state.answered} showElements={this.props.question.showElements}/>
        <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>
      </div>
    );
  }
}