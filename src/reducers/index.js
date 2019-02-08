import { combineReducers } from 'redux';

import { changePageReducer, charactersReducer, selectCharacterReducer } from './characterReducer';

export default combineReducers({
  characters: charactersReducer,
  selectedCharacter: selectCharacterReducer,
  page: changePageReducer
});