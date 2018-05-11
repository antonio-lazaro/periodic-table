import {combineReducers} from 'redux';
import trackingReducer from './trackingReducer';
import scormReducer from './scormReducer';
import userProfileReducer from './userProfileReducer';
import waitForUserProfileReducer from './waitForUserProfileReducer';

import pageReducer from './pageReducer';
import learnPageReducer from './learnPageReducer';

function modeReducer(state = null, action) {
  switch (action.type){
  case 'CHANGE_MODE':
  	return action.mode;
  default:
    return state;
  }
}

const GlobalState = combineReducers({
  tracking:trackingReducer,
  scorm:scormReducer,
  user_profile:userProfileReducer,
  wait_for_user_profile:waitForUserProfileReducer,
  page: pageReducer,
  learnPage: learnPageReducer,
  mode: modeReducer,
});

export default GlobalState;