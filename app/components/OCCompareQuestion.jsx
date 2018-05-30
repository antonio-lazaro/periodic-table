import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import OCQuestionChoice from './OCQuestionChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class OCCompareQuestion extends React.Component {
  constructor(props){
    super(props);

    let askedElement = this.props.posibleElements[Math.floor(Math.random() * this.props.posibleElements.length)];
    let randomPosition = Math.floor(Math.random() * 4);

    let condition = this.props.question.condition;
    let correctAnswers;

    if (condition == '=') {
      correctAnswers = this.props.posibleElements.filter((element) => {
        if (condition == '=') {
          return element[this.props.question.comparedField] == askedElement[this.props.question.comparedField]
        }
        return false;
      });
    }

    let incorrectAnswers = this.props.posibleElements.filter((element) => {
      if (condition == '=') {
        return element[this.props.question.comparedField] != askedElement[this.props.question.comparedField]
      } else if (condition == '>') {
        return element[this.props.question.comparedField] > askedElement[this.props.question.comparedField]
      } else if (condition == '<') {
        return element[this.props.question.comparedField] < askedElement[this.props.question.comparedField]
      }
      return false;
    })

    let correctElement;
    if (condition == '=') {
      correctElement = correctAnswers[Math.floor(Math.random() * correctAnswers.length)];
    } else {
      correctElement = askedElement;
    }

    let randomElements = [];

    for(let i = 0; i < 4; i++) {
      let randomElement = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
      randomElements.push(randomElement);
    }

    this.state = {
      answered: false,
      askedElement: askedElement,
      correctElement: correctElement,
      randomPosition: randomPosition,
      randomElements: randomElements,
      checkedPosition: undefined
    };
  }
  componentWillUpdate(prevProps, prevState) {
    if(prevProps.question !== this.props.question){
      this.setState({checkedPosition: undefined, answered:false});
    }
  }
  handleChoiceChange(choice) {
    this.setState({checkedPosition: choice.index});
  }
  onAnswerQuestion() {
    // Send data via SCORM
    let objective = this.props.objective;
    let scorePercentage = 0;

    if (this.state.checkedPosition && this.state.checkedPosition == this.state.randomPosition) {
      scorePercentage = 1;
    } else {
      scorePercentage = 0;
    }

    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    this.setState({answered:true});
  }
  onResetQuestion() {
    this.setState({checkedPosition: undefined, answered: false});
  }
  onNextQuestion() {
    this.props.onNextQuestion();

    let askedElement = this.props.posibleElements[Math.floor(Math.random() * this.props.posibleElements.length)];

    let condition = this.props.question.condition;
    let correctAnswers;

    if (condition == '=') {
      correctAnswers = this.props.posibleElements.filter((element) => {
        if (condition == '=') {
          return element[this.props.question.comparedField] == askedElement[this.props.question.comparedField]
        }
        return false;
      });
    }

    let incorrectAnswers = this.props.posibleElements.filter((element) => {
      if (condition == '=') {
        return element[this.props.question.comparedField] != askedElement[this.props.question.comparedField]
      } else if (condition == '>') {
        return element[this.props.question.comparedField] > askedElement[this.props.question.comparedField]
      } else if (condition == '<') {
        return element[this.props.question.comparedField] < askedElement[this.props.question.comparedField]
      }
      return false;
    })

    let correctElement;
    if (condition == '=') {
      correctElement = correctAnswers[Math.floor(Math.random() * correctAnswers.length)];
    } else {
      correctElement = askedElement;
    }

    let randomElements = [];

    for(let i = 0; i < 4; i++) {
      let randomElement = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
      randomElements.push(randomElement);
    }

    this.setState({
      askedElement:  askedElement,
      correctElement: correctElement,
      randomPosition: Math.floor(Math.random() * 4),
      randomElements: randomElements,
      checkedPosition: undefined,
    });
  }
  render() {
    // let question = this.props.question.question.replace(/__(.*)__/g, function (x, param) {
    //   return param; // this.state.askedElement[param];
    // });

    // let question = this.props.question.question.replace(/__name__/g, this.state.askedElement['name']);
    // question = this.props.question.question.replace(/__symbol__/g, this.state.askedElement['symbol']);
    // question = this.props.question.question.replace(/__atomicNumber__/g, elements.indexOf(this.state.askedElement) + 1);

    let question = this.props.I18n.getTransWithParams(this.props.question.question, this.state.askedElement);

    let choices = [];
    let j = 0;

    for(let i = 0; i < 4; i++) {
      if (i == this.state.randomPosition) {
        choices.push(<OCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={{ value: this.state.correctElement[this.props.question.answerField], answer: true, index: i }} checked={(i == this.state.checkedPosition) ? true : false} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
      } else if (typeof this.state.randomElements[j] != 'undefined') {
        choices.push(<OCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={{ value: this.state.randomElements[j][this.props.question.answerField], answer: false, index: i }} checked={(i == this.state.checkedPosition) ? true : false} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
        j += 1;
      }
    }
    return (
      <div className="question">
        <p className="title">{question}</p>
        <div className="question_choices">
          {choices}
        </div>
        <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion} dispatch={this.props.dispatch} mode={this.props.mode} />
      </div>
    );
  }
}