import {
  changePageReducer,
  timerReducer,
  updateStatusReducer,
  totalReducer
} from './quizReducer';

describe('quizReducer', () => {
  describe('changePageReducer()', () => {
    test('should have return initial state', () => {
      const action = { type: 'UNDEFINED' };
      expect(changePageReducer(undefined, action)).toBe(1);
    });

    test('should have return changed page', () => {
      const action = { type: 'PAGE_CHANGE', payload: 2 };
      expect(changePageReducer(undefined, action)).toBe(2);
    });
  });

  describe('timerReducer()', () => {
    test('should have return initial state', () => {
      const action = { type: 'UNDEFINED' };
      expect(timerReducer(undefined, action)).toBeFalsy();
    });

    test('should have return changed timer', () => {
      const action = { type: 'TIMER_CHANGED', payload: true };
      expect(timerReducer(undefined, action)).toBeTruthy();
    });
  });

  describe('updateStatusReducer()', () => {
    test('should have return initial state', () => {
      const action = { type: 'UNDEFINED' };
      expect(updateStatusReducer(undefined, action)).toBeFalsy();
    });

    test('should have return changed status', () => {
      const action = { type: 'FINISHED_GAME', payload: true };
      expect(updateStatusReducer(false, action)).toBeTruthy();
    });
  });

  describe('totalReducer()', () => {
    test('should have return initial state', () => {
      const action = { type: 'UNDEFINED' };
      expect(totalReducer(undefined, action)).toBe(0);
    });

    test('should have return score', () => {
      const action = { type: 'ANSWER', payload: 10 };
      expect(totalReducer(15, action)).toBe(25);
    });
  });
});
