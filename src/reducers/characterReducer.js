export const charactersReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CHARACTERS':
      return action.payload;
    case 'CHARACTER_UPDATE':
      return updateCharacter(state, action.payload);
    default:
      return state;
  }
};

export const selectCharacterReducer = (state = null, action) => {
  if (action.type === 'CHARACTER_SELECTED') {
    return action.payload;
  }

  return state;
};

const updateCharacter = (state, payload) => {
  const index = state.findIndex(({ id }) => id === payload.id);
  state.splice(index, 1, payload);
  return [...state];
};