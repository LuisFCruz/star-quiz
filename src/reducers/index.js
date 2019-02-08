import { combineReducers } from 'redux';

import {
  changePageReducer,
  charactersReducer,
  selectCharacterReducer,
  timerReducer,
  updateStatusReducer,
  totalReducer,
} from './characterReducer';

export default combineReducers({
  characters: charactersReducer,
  selectedCharacter: selectCharacterReducer,
  page: changePageReducer,
  start: timerReducer,
  finished: updateStatusReducer,
  score: totalReducer,
});