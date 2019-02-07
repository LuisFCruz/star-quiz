import { combineReducers } from 'redux';

import { charactersReducer, selectCharacter, sliceCharactersReducer } from './characterReducer';

export default combineReducers({
  allCharacters: charactersReducer,
  characters: sliceCharactersReducer,
  selectedCharacter: selectCharacter,
});