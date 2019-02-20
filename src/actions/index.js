import { getAllComplements, getCharacters } from '../apis/starwars-api';
import {
  mergeCharacterWidthComplements,
  reduceComplementsCharacter
} from '../services/utils';

export const fetchCharacters = (pages = []) => async dispatch => {
  const characters = await getCharacters(pages);
  const complementsUrls = reduceComplementsCharacter(characters);
  const complements = await getAllComplements(complementsUrls);

  const payload = mergeCharacterWidthComplements(characters, complements);

  dispatch({ type: 'FETCH_CHARACTERS', payload });
};

export const updateCharacters = character => {
  return {
    type: 'CHARACTER_UPDATE',
    payload: character
  };
};

export const selectCharacter = character => {
  return {
    type: 'CHARACTER_SELECTED',
    payload: character
  };
};

export const changePage = page => {
  return {
    type: 'PAGE_CHANGE',
    payload: page
  };
};

export const startTimer = start => {
  return {
    type: 'TIMER_CHANGED',
    payload: start
  };
};

export const finishGame = finished => {
  return {
    type: 'FINISHED_GAME',
    payload: finished
  };
};

export const sumScore = character => {
  return {
    type: 'ANSWER',
    payload: character.helped ? 5 : 10
  };
};
