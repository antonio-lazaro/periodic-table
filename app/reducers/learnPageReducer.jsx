function learnPageReducer(state = null, action) {
  switch (action.type){
  case 'SELECT_ELEMENT':

    return action.selectedElement;
  default:
    return state;
  }
}

export default learnPageReducer;