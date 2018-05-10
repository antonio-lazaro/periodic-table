import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import MCQuestionChoice from './MCQuestionChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';

import { elements as elementsEN } from '../constants/PeriodicTableJSON.json';
import { elements as elementsES } from '../constants/PeriodicTableJSON.es.json';

export default class MCQuestion extends React.Component {
  constructor(props) {
    super(props);

    // Language
    this.elements = (this.props.I18n.getLanguage() == 'es') ? elementsES : elementsEN;

    // Select a random element
    let randomElement = this.elements[Math.floor(Math.random() * this.elements.length)];

    // Filter all correct answers
    let correctAnswers = this.elements.filter((element) => {
      return element[this.props.question.askedField] == randomElement[this.props.question.askedField]
    });

    // Filter all incorrect answers
    let incorrectAnswers = this.elements.filter((element) => {
      return element[this.props.question.askedField] != randomElement[this.props.question.askedField]
    })

    let numberOfCorrectAnswers = Math.floor(Math.random() * 4);
    while (numberOfCorrectAnswers > correctAnswers.length) {
      numberOfCorrectAnswers -= 1;
    }

    let askedElements = [];
    for (let i = 0; i < numberOfCorrectAnswers; i++) {
      askedElements.push(correctAnswers[Math.floor(Math.random() * correctAnswers.length)]);
    }

    let randomPositions = [];
    for (let i = 0; i < numberOfCorrectAnswers; i++) {
      randomPositions.push(Math.floor(Math.random() * 4));
    }

    let randomElements = [];
    for(let i = 0; i < 4 - numberOfCorrectAnswers; i++) {
      let randomElement = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
      randomElements.push(randomElement);
    }

    this.state = {
      answered: false,
      askedElements: askedElements,
      randomPositions: randomPositions,
      randomElements: randomElements,
      checkedPositions: [],
      randomElement: randomElement
    };
  }
  componentWillUpdate(prevProps, prevState){
    if(prevProps.question !== this.props.question){
      this.setState({ checkedPositions: [], answered: false });
    }
  }
  handleChoiceChange(choice) {
    let newSelectedChoices = Object.assign([], this.state.checkedPositions);
    let indexOf = newSelectedChoices.indexOf(choice.index);
    if (indexOf === -1) {
      newSelectedChoices.push(choice.index);
    } else {
      newSelectedChoices.splice(indexOf, 1);
    }
    this.setState({ checkedPositions: newSelectedChoices });
  }
  onAnswerQuestion() {
    // Calculate score
    let nChoices = this.state.checkedPositions.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    for(let i = 0; i < nChoices; i++) {
      if(this.state.randomPositions.includes(this.state.checkedPositions[i])) {
        correctAnswers += 1;
      } else {
        incorrectAnswers += 1;
      }
    }

    let scorePercentage;

    if (this.state.askedElements.length > 0) {
      scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / this.state.askedElements.length);
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
    this.setState({answered:true});
  }
  onResetQuestion() {
    this.setState({selected_choices_ids:[], answered:false});
  }
  onNextQuestion() {
    this.props.onNextQuestion();
    // Select a random element
    let randomElement = this.elements[Math.floor(Math.random() * this.elements.length)];

    // Filter all correct answers
    let correctAnswers = this.elements.filter((element) => {
      return element[this.props.question.askedField] == randomElement[this.props.question.askedField]
    });

    // Filter all correct answers
    let incorrectAnswers = this.elements.filter((element) => {
      return element[this.props.question.askedField] != randomElement[this.props.question.askedField]
    })

    let numberOfCorrectAnswers = Math.floor(Math.random() * 4);
    while (numberOfCorrectAnswers > correctAnswers.length) {
      numberOfCorrectAnswers -= 1;
    }

    let askedElements = [];
    for (let i = 0; i < numberOfCorrectAnswers; i++) {
      askedElements.push(correctAnswers[Math.floor(Math.random() * correctAnswers.length)]);
    }

    let randomPositions = [];
    for (let i = 0; i < numberOfCorrectAnswers; i++) {
      randomPositions.push(Math.floor(Math.random() * 4));
    }

    let randomElements = [];
    for(let i = 0; i < 4 - numberOfCorrectAnswers; i++) {
      let randomElement = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
      randomElements.push(randomElement);
    }

    this.state = {
      answered: false,
      askedElements: askedElements,
      randomPositions: randomPositions,
      randomElements: randomElements,
      checkedPositions: [],
      randomElement: randomElement
    };
  }

  render() {
    let question = this.props.I18n.getTransWithParams(this.props.question.question, this.state.randomElement);
    
    let choices = [];
    let jAsked = 0;
    let jRandom = 0;

    for(let i = 0; i < 4; i++) {
      if (this.state.randomPositions.includes(i)) {
        choices.push(<MCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={{ value: this.state.askedElements[jAsked][this.props.question.answerField], answer: true, index: i }} checked={this.state.checkedPositions.includes(i)} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
        jAsked += 1;
      } else {
        choices.push(<MCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={{ value: this.state.randomElements[jRandom][this.props.question.answerField], answer: false, index: i }} checked={this.state.checkedPositions.includes(i)} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
        jRandom += 1;
      }
    }
    return (
      <div className="question">
        <p className="title">{question}</p>
        <div className="question_choices">
          {choices}
        </div>
        <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>
      </div>
    );
  }
}