import { charactersReducer, selectCharacterReducer } from './characterReducer';
const character = {
  answered: false,
  films: 'name',
  hairColor: 'n/a',
  height: '187',
  helped: false,
  homeworld: 'name',
  id: '1',
  name: 'r2-d2',
  species: 'name',
  vehicles: 'n/a'
};

describe('characterReducer', () => {
  describe('charactersReducer()', () => {
    test('should have return initial state', () => {
      expect(charactersReducer(undefined, { type: 'UNDEFINED' })).toHaveLength(
        0
      );
    });

    test('should have return fecth caracters', () => {
      const expected = [character];
      const action = { type: 'FETCH_CHARACTERS', payload: expected };

      expect(charactersReducer(undefined, action)).toBe(expected);
    });

    test('should have return CHARACTER_UPDATE', () => {
      const characters = [character];
      const expectedCharacter = { ...character, answered: true };
      const action = { type: 'CHARACTER_UPDATE', payload: expectedCharacter };

      expect(charactersReducer(characters, action)).toContain(
        expectedCharacter
      );
    });
  });

  describe('selectCharacterReducer()', () => {
    test('should have return initial state', () => {
      expect(
        selectCharacterReducer(undefined, { type: 'UNDEFINED' })
      ).toBeNull();
    });

    test('should have return selected character', () => {
      const action = { type: 'CHARACTER_SELECTED', payload: character };
      expect(selectCharacterReducer(null, action)).toBe(character);
    });
  });
});
