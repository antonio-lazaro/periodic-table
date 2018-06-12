import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import PeriodicTable from './PeriodicTable.jsx';
import OCQuestionChoice from './OCQuestionChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class PTOCQuestion extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      answered: this.props.question.answered,
      askedElement: this.props.question.askedElement,
      selectedElement: this.props.question.selectedElement
    };

    this.selectElement = this.selectElement.bind(this);
    this.onAnswerQuestion = this.onAnswerQuestion.bind(this);
    this.onResetQuestion = this.onResetQuestion.bind(this);
    this.onNextQuestion = this.onNextQuestion.bind(this);
  }
  componentWillUpdate(prevProps, prevState) {
    if(prevProps.question !== this.props.question){
      this.setState({selectedElement: undefined, answered:false});
    }
  }

  selectElement(element) {
    if (this.state.answered) { return }
    this.setState({ selectedElement: element });
    let question = this.props.question;
    question.selectedElement = element;
    this.props.updateQuestion(question);
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
    let question = this.props.question;
    question.answered = true;
    this.props.updateQuestion(question);
  }
  onResetQuestion() {
    this.setState({selectedElement: undefined, answered: false});
  }
  onNextQuestion() {
    this.props.onNextQuestion();
  }
  render() {
    let question = this.props.I18n.getTransWithParams(this.props.question.question, this.state.askedElement);

    return (
      <div className="question">
        <p className="title">{question}</p>
        <PeriodicTable selectElement={this.selectElement.bind(this)} selectedElements={(this.state.selectedElement) ? [this.state.selectedElement] : []} askedElements={[this.state.askedElement]} answered={this.state.answered} showElements={this.props.question.showElements} I18n={this.props.I18n} />
        <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion} dispatch={this.props.dispatch} mode={this.props.mode} />
      </div>
    );
  }
}