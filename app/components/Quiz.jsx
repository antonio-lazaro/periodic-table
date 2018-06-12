import React from 'react';
import './../assets/scss/quiz.scss';

import * as Utils from '../vendors/Utils.js';
import {addObjectives, resetObjectives, finishApp, updateQuestions, updateCurrentQuestionIndex, startQuiz} from './../reducers/actions';

import QuizHeader from './QuizHeader.jsx';
import OCQuestion from './OCQuestion.jsx';
import MCQuestion from './MCQuestion.jsx';
import PTOCQuestion from './PTOCQuestion.jsx';
import PTMCQuestion from './PTMCQuestion.jsx';
import OCCompareQuestion from './OCCompareQuestion.jsx';

import { ANSWER_TYPES } from '../constants/constants.jsx';

import { elements as elementsEN } from '../constants/PeriodicTableJSON.json';
import { elements as elementsES } from '../constants/PeriodicTableJSON.es.json';

export default class Quiz extends React.Component {
  constructor(props){
    super(props);

    let quiz = undefined;
    let current_question_index = undefined;
    let objectives = undefined;

    if (this.props.quiz.started) {
      quiz = this.props.quiz;
      current_question_index = this.props.quiz.current_question_index;
      objectives = this.props.tracking.objectives;
    } else {
      quiz = this.createNewQuiz();

      this.props.dispatch(updateQuestions(quiz.questions));
      
      current_question_index = 1;
      this.props.dispatch(updateCurrentQuestionIndex(current_question_index));

      let objectivesList = this.createObjectives(quiz);
      objectives = [];
      for(let i = 0; i < objectivesList.length; i++){
        if(typeof objectivesList[i].id !== "undefined"){
          objectives[objectivesList[i].id] = objectivesList[i];
        }
      }
      this.props.dispatch(addObjectives(objectivesList));

      this.props.dispatch(startQuiz());
    }

    this.state = {
      quiz: quiz,
      current_question_index: current_question_index,
      objectives: objectives
    };

    this.createNewQuiz = this.createNewQuiz.bind(this);
    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.onResetQuiz = this.onResetQuiz.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
  }

  createObjectives(quiz) {
    // Create objectives (One per question included in the quiz)
    let objectives = [];
    let nQuestions = quiz.questions.length;
    for(let i = 0; i < nQuestions; i++){
      objectives.push(new Utils.Objective({id:("Question" + (i + 1)), progress_measure:(1 / nQuestions), score:(1 / nQuestions)}));
    }
    return objectives;
  }

  createNewQuiz() {
    let difficulty = this.props.user_profile.learner_preference.difficulty;

    let quiz = this.props.QUIZ;
    let questions = Object.assign([], quiz.questions);

    // Adaptive behaviour
    // Sort questions based on difficulty
    let adaptive_sorted = false;
    if((this.props.config.adaptive === true) && (typeof this.props.user_profile === "object") && (typeof this.props.user_profile.learner_preference === "object") && (typeof difficulty === "number")) {
      if((difficulty >= 0) && (difficulty <= 10)) {
        for(let i = 0; i < questions.length; i++){
          if((typeof questions[i].difficulty !== "number") || (questions[i].difficulty < 0) || (questions[i].difficulty > 10)){
            questions[i].difficulty = 5;
          }
          questions[i].suitability = (10 - Math.abs((questions[i].difficulty - difficulty))) / 10;
        }
        questions.sort(function(a, b){ return b.suitability - a.suitability; });
        adaptive_sorted = true;
      }
    }

    if(adaptive_sorted === false){
      questions = Utils.shuffleArray(questions);
    }

    // Language
    let elements = (this.props.I18n.getLanguage() == 'es') ? elementsES : elementsEN;

    // Get posible asked Elments
    let posibleElements = elements.filter((element) => {
      if (difficulty < 6) {
        return (element.ypos <= 6 || element.xpos == 1)
      }
      return true
    });

    // Choose questions
    let questionsToAsk = [];
    for (var i = 0; i < this.props.config.n; i++) {
      let randomQuestionIndex = Math.floor(Math.random() * questions.length);
      let question = Object.assign({}, questions[randomQuestionIndex])
      let askedElement;
      let randomElement;
      let correctAnswers;
      let incorrectAnswers;
      let randomElements;
      let randomPosition;
      switch (question.answerType) {
        case ANSWER_TYPES.SELECT_ONE_ANSWER:
          askedElement = posibleElements[Math.floor(Math.random() * posibleElements.length)];
          randomPosition = Math.floor(Math.random() * 4);

          incorrectAnswers = posibleElements.filter((element) => {
            return element[question.answerField] != askedElement[question.answerField]
          })

          randomElements = [];

          for(let i = 0; i < 4; i++) {
            let randomElement = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
            randomElements.push(randomElement);
          }

          question.askedElement = askedElement;
          question.randomPosition = randomPosition;
          question.randomElements = randomElements;
          question.checkedPosition = undefined;
          question.answered = false;
          break;
        case ANSWER_TYPES.SELECT_MULTIPLE_ANSWER:
          // Select a random element
          randomElement = posibleElements[Math.floor(Math.random() * posibleElements.length)];

          // Filter all correct answers
          correctAnswers = posibleElements.filter((element) => {
            return element[question.askedField] == randomElement[question.askedField]
          });

          // Filter all incorrect answers
          incorrectAnswers = posibleElements.filter((element) => {
            return element[question.askedField] != randomElement[question.askedField]
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
          let posiblePositions = [1,2,3,4];
          for (let i = 0; i < numberOfCorrectAnswers; i++) {
            let rnNumber = posiblePositions.slice(Math.floor(Math.random() * posiblePositions.length), 1);
            randomPositions.push(rnNumber);
          }

          randomElements = [];
          for(let i = 0; i < 4; i++) {
            let randomElement2 = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
            randomElements.push(randomElement2);
          }

          question.askedElements = askedElements;
          question.randomPositions = randomPositions;
          question.randomElements = randomElements;
          question.randomElement = randomElement;
          question.checkedPositions = [];
          question.answered = false;
          break;
        case ANSWER_TYPES.PT_SELECT_ONE_ANSWER:
          askedElement = posibleElements[Math.floor(Math.random() * posibleElements.length)];
          question.askedElement = askedElement;
          question.selectedElement = undefined;
          question.answered = false;
          break;
        case ANSWER_TYPES.PT_SELECT_MULTIPLE_ANSWER:
          // Select a random element
          randomElement = posibleElements[Math.floor(Math.random() * posibleElements.length)];

          // Filter all correct answers
          correctAnswers = elements.filter((element) => {
            return element[question.askedField] == randomElement[question.askedField]
          });

          question.randomElement = randomElement;
          question.correctAnswers = correctAnswers;
          question.selectedElements = [];
          question.answered = false;
          break;
        case ANSWER_TYPES.SELECT_ONE_ANSWER_COMPARE:
          askedElement = posibleElements[Math.floor(Math.random() * posibleElements.length)];
          randomPosition = Math.floor(Math.random() * 4);

          let condition = question.condition;

          if (condition == '=') {
            correctAnswers = posibleElements.filter((element) => {
              if (condition == '=') {
                return element[question.comparedField] == askedElement[question.comparedField]
              }
              return false;
            });
          }

          incorrectAnswers = posibleElements.filter((element) => {
            if (condition == '=') {
              return element[question.comparedField] != askedElement[question.comparedField]
            } else if (condition == '>') {
              return element[question.comparedField] > askedElement[question.comparedField]
            } else if (condition == '<') {
              return element[question.comparedField] < askedElement[question.comparedField]
            }
            return false;
          })

          let correctElement;
          if (condition == '=') {
            correctElement = correctAnswers[Math.floor(Math.random() * correctAnswers.length)];
          } else {
            correctElement = askedElement;
          }

          randomElements = [];

          for(let i = 0; i < 4; i++) {
            let randomElement = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
            randomElements.push(randomElement);
          }

          question.askedElement = askedElement;
          question.correctElement = correctElement;
          question.randomPosition = randomPosition;
          question.randomElements = randomElements;
          question.checkedPosition = undefined;
          question.answered = false;
          break;
      }
      
      questionsToAsk.push(Object.assign({}, question));
    }

    return { questions: questionsToAsk };
  }

  onNextQuestion() {
    let isLastQuestion = (this.state.current_question_index === this.state.quiz.questions.length);
    if(isLastQuestion === false){
      this.setState({ current_question_index: this.state.current_question_index + 1 });
      this.props.dispatch(updateCurrentQuestionIndex(this.props.quiz.current_question_index + 1))
    } else {
      this.props.dispatch(finishApp(true));
    }
  }

  onResetQuiz(){
    this.setState({ current_question_index: 1 });
    let questions = this.props.quiz.questions;
    for (var i = 0; i < questions.length; i++) {
      questions[i].answered = false;
      questions[i].checkedPosition = undefined;
      questions[i].checkedPositions = [];
      questions[i].selectedElement = undefined;
      questions[i].selectedElements = [];
    }
    this.props.dispatch(updateCurrentQuestionIndex(1));
    this.props.dispatch(updateQuestions(questions));
    this.props.dispatch(finishApp(false));
    this.props.dispatch(resetObjectives());
    this.props.dispatch(updateQuestions(questions));
  }

  updateQuestion(question) {
    let questions = this.props.quiz.questions;
    questions[this.state.current_question_index - 1] = question;
    this.props.dispatch(updateQuestions(questions));
  }

  render() {
    let currentQuestion = this.state.quiz.questions[this.state.current_question_index - 1];
    let isLastQuestion = (this.state.current_question_index === this.state.quiz.questions.length);

    let objective = this.state.objectives["Question" + (this.state.current_question_index)];
    let onNextQuestion = this.onNextQuestion.bind(this);
    let onResetQuiz = this.onResetQuiz.bind(this);
    let currentQuestionRender = "";

    switch (currentQuestion.answerType) {
      case ANSWER_TYPES.SELECT_ONE_ANSWER:
        currentQuestionRender = (<OCQuestion question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.config.mode} updateQuestion={this.updateQuestion} />);
        break;
      case ANSWER_TYPES.SELECT_MULTIPLE_ANSWER:
        currentQuestionRender = (<MCQuestion question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.config.mode} updateQuestion={this.updateQuestion} />);
        break;
      case ANSWER_TYPES.PT_SELECT_ONE_ANSWER:
        currentQuestionRender = (<PTOCQuestion question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.config.mode} updateQuestion={this.updateQuestion} />);
        break;
      case ANSWER_TYPES.PT_SELECT_MULTIPLE_ANSWER:
        currentQuestionRender = (<PTMCQuestion question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.config.mode} updateQuestion={this.updateQuestion} />);
        break;
      case ANSWER_TYPES.SELECT_ONE_ANSWER_COMPARE:
        currentQuestionRender = (<OCCompareQuestion question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.config.mode} updateQuestion={this.updateQuestion} />);
        break;
      default:
        currentQuestionRender = "Question type not supported";
    }

    return (
      <div className="quiz">
        <QuizHeader I18n={this.props.I18n} quiz={this.props.quiz} currentQuestionIndex={this.props.quiz.current_question_index}/>
        {currentQuestionRender}
      </div>
    );
  }
}