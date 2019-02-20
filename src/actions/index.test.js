import configureStore from 'redux-mock-store';
import * as actions from './index';
import moxios from 'moxios';

const store = configureStore()();
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
describe('Redux actions', () => {
  beforeEach(() => store.clearActions());

  // describe('fetchCharacters()', () => {
  //   beforeEach(() => moxios.install());
  //   afterEach(() => moxios.uninstall());

  //   test('should have get character after async request', () => {
  //     moxios.wait(() => {
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         status: 200,
  //         response: [],
  //       });
  //     });


  //     const expectedActions = [
  //       {
  //         type: 'FETCH_CHARACTERS',
  //         payload: [{...character}]
  //       }
  //     ];

  //     store.dispatch(actions.fetchCharacters(character));
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });

  describe('updateCharacters()', () => {
    test('should have return update characters action', () => {
      const expectedActions = [
        {
          type: 'CHARACTER_UPDATE',
          payload: { ...character }
        }
      ];

      store.dispatch(actions.updateCharacters(character));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('selectCharacter()', () => {
    test('should have return selected character', () => {
      const expectedActions = [
        {
          type: 'CHARACTER_SELECTED',
          payload: { ...character }
        }
      ];

      store.dispatch(actions.selectCharacter(character));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('changePage()', () => {
    test('should have return change page action', () => {
      const page = 2;
      const expectedActions = [
        {
          type: 'PAGE_CHANGE',
          payload: page
        }
      ];

      store.dispatch(actions.changePage(page));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('startTimer()', () => {
    test('should have return start time action', () => {
      const start = true;
      const expectedActions = [
        {
          type: 'TIMER_CHANGED',
          payload: start
        }
      ];

      store.dispatch(actions.startTimer(start));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('finishGame()', () => {
    test('should have return finish game action', () => {
      const finish = true;
      const expectedActions = [
        {
          type: 'FINISHED_GAME',
          payload: finish
        }
      ];

      store.dispatch(actions.finishGame(finish));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('sumScore()', () => {
    test('should have return correct point action with helper', () => {
      const characterWithHelper = { ...character, helped: true };
      const expectedActions = [
        {
          type: 'ANSWER',
          payload: 5
        }
      ];

      store.dispatch(actions.sumScore(characterWithHelper));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('should have return correct point action without helper', () => {
      const expectedActions = [
        {
          type: 'ANSWER',
          payload: 10
        }
      ];

      store.dispatch(actions.sumScore(character));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
