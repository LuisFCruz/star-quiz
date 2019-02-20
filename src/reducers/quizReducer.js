export const changePageReducer = (state = 1, action) => {
    if (action.type === 'PAGE_CHANGE') {
      return action.payload;
    }
  
    return state;
  };
  
  export const timerReducer = (state = false, action) => {
    if (action.type === 'TIMER_CHANGED') {
      return action.payload;
    }
  
    return state;
  };
  
  export const updateStatusReducer = (state = false, action) => {
    if (action.type === 'FINISHED_GAME') {
      return action.payload;
    }
  
    return state;
  };
  
  export const totalReducer = (state = 0, action) => {
    if (action.type === 'ANSWER') {
      return state + action.payload;
    }
  
    return state;
  };
  