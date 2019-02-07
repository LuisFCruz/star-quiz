import { getAllComplements, getCharacters } from '../apis/starwars-api';
import { mergeCharacterWidthComplements, reduceComplementsCharacter } from '../services/utils';

export const fetchCharacters = (pages = []) => async (dispatch) => {
  const characters = await getCharacters(pages);
  const complementsUrls = reduceComplementsCharacter(characters);
  const complements = await getAllComplements(complementsUrls);

  const payload = mergeCharacterWidthComplements(characters, complements);

  dispatch({ type: 'FETCH_CHARACTERS', payload });
};

export const filterCharacters = (characters, page) => {
  const start = (page - 1) * 10;
  const end = (page * 10);
  
  const activeKeys = Object.keys(characters).slice(start, end);
  const payload = activeKeys.map(key => characters[key]);

  return {
    type: 'CHARACTERS_SLICED',
    payload,
  }
} 

export const selectCharacter = (character) => {
  return {
    type: 'CHARACTER_SELECTED',
    payload: character,
  }
}
