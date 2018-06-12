function quizReducer(state = null, action){
  let newState;
  switch (action.type){
  case 'UPDATE_QUESTIONS':
    newState = JSON.parse(JSON.stringify(state));
    newState.questions = action.questions;
    return newState;
  case 'UPDATE_CURRENT_QUESTION_INDEX':
    newState = JSON.parse(JSON.stringify(state));
    newState.current_question_index = action.index;
    return newState;
  case 'START_QUIZ':
    newState = JSON.parse(JSON.stringify(state));
    newState.started = true;
    return newState;
  case 'FINISH_QUIZ':
    newState = JSON.parse(JSON.stringify(state));
    newState.started = false;
    return newState;
  default:
    return state;
  }
}

export default quizReducer;