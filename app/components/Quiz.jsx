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

    let difficulty = this.props.user_profile.learner_preference.difficulty;
    
    // Language
    this.elements = (this.props.I18n.getLanguage() == 'es') ? elementsES : elementsEN;

    // Get posible asked Elments
    let posibleElements = this.elements.filter((element) => {
      if (difficulty < 6) {
        return (element.ypos <= 6 || element.xpos == 1)
      }
      return true
    });

    this.posibleElements = posibleElements;

    this.state = {
      quiz: quiz,
      current_question_index: current_question_index,
      objectives: objectives
    };
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
    let questions = quiz.questions;

    // Adaptive behaviour
    // Sort questions based on difficulty
    // 0.5 * element difficulty (ypos) + 0.5 * question difficulty
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

    if((typeof this.props.config.n === "number") && (this.props.config.n >= 1)) {
      // Limit number of questions
      questions = questions.slice(0, Math.min(this.props.config.n, questions.length));
    }

    quiz.questions = questions;

    return quiz;
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
    this.props.dispatch(updateCurrentQuestionIndex(1));
    this.props.dispatch(resetObjectives());
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
        currentQuestionRender = (<OCQuestion quizLength={this.state.quiz.questions.length} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.mode} posibleElements={this.posibleElements} />);
        break;
      case ANSWER_TYPES.SELECT_MULTIPLE_ANSWER:
        currentQuestionRender = (<MCQuestion quizLength={this.state.quiz.questions.length} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.mode} posibleElements={this.posibleElements} />);
        break;
      case ANSWER_TYPES.PT_SELECT_ONE_ANSWER:
        currentQuestionRender = (<PTOCQuestion quizLength={this.state.quiz.questions.length} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.mode} posibleElements={this.posibleElements} />);
        break;
      case ANSWER_TYPES.PT_SELECT_MULTIPLE_ANSWER:
        currentQuestionRender = (<PTMCQuestion quizLength={this.state.quiz.questions.length} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.mode} posibleElements={this.posibleElements} />);
        break;
      case ANSWER_TYPES.SELECT_ONE_ANSWER_COMPARE:
        currentQuestionRender = (<OCCompareQuestion quizLength={this.state.quiz.questions.length} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished} mode={this.props.mode} posibleElements={this.posibleElements} />);
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