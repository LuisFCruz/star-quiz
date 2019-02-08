export const charactersReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CHARACTERS':
      return action.payload;
    case 'CHARACTER_UPDATE':
      const index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1, action.payload);
      return [...state];
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

export const changePageReducer = (state = 1, action) => {
  if (action.type === 'PAGE_CHANGE') {
    return action.payload;
  }

  return state;
};
