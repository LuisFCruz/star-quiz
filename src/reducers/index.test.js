import combineReducers from './index';

describe('combineReducers', () => {
  test('smokeTest', () => {
    expect(combineReducers).toBeDefined();
  });

  test('should have return initial state', () => {
    const expectedState = {
      characters: [],
      finished: false,
      page: 1,
      score: 0,
      selectedCharacter: null,
      start: false
    };
    expect(combineReducers(undefined, { type: 'UNDEFINED' })).toMatchObject(
      expectedState
    );
  });
});
