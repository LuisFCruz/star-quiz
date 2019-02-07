export const charactersReducer = (state = null, action) => {
  if (action.type === 'FETCH_CHARACTERS') {
    return action.payload;
  }

  return state;
};

export const sliceCharactersReducer = (state = [], action) => {
  if (action.type === 'CHARACTERS_SLICED') {
    return action.payload;
  }

  return state;
};

export const selectCharacter = (state = null, action) => {
  if (action.type === 'CHARACTER_SELECTED') {
    return action.payload;
  }

  return state;
}
