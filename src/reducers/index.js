import { combineReducers } from 'redux';

import {
  charactersReducer,
  selectCharacterReducer,
} from './characterReducer';

import {
  changePageReducer,
  timerReducer,
  updateStatusReducer,
  totalReducer,
} from './quizReducer';

export default combineReducers({
  characters: charactersReducer,
  selectedCharacter: selectCharacterReducer,
  page: changePageReducer,
  start: timerReducer,
  finished: updateStatusReducer,
  score: totalReducer,
});