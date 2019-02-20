import axios from 'axios';
import moxios from 'moxios';

import * as api from './starwars-api';

const people = [
  {
    name: 'R2-D2',
    height: '96',
    mass: '32',
    hair_color: 'n/a',
    skin_color: 'white, blue',
    eye_color: 'red',
    birth_year: '33BBY',
    gender: 'n/a',
    homeworld: 'https://swapi.co/api/planets/8/',
    films: ['https://swapi.co/api/films/2/'],
    species: ['https://swapi.co/api/species/2/'],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:11:50.376000Z',
    edited: '2014-12-20T21:17:50.311000Z',
    url: 'https://swapi.co/api/people/3/'
  }
];

const complement = {
  title: 'A New Hope',
  name: 'A New Hope',
  url: 'starwars.com/1'
};

const expectedComplement = { '1': 'A New Hope' };

const user = {
  name: 'Teste Unitario',
  email: null,
  score: 100
};

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock()
});

describe('starwars-api', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  test('getCharacters()', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { results: people }
      });
    });
    const result = await api.getCharacters([1]);
    expect(result).toEqual(people);
  });

  test('getFilms()', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: complement
      });
    });
    const [character] = people;
    const result = await api.getFilms(character.films);
    expect(result).toEqual(expectedComplement);
  });

  test('getVehicles()', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: complement
      });
    });
    const [character] = people;
    const result = await api.getVehicles(character.films);
    expect(result).toEqual(expectedComplement);
  });

  test('getSpecies()', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: complement
      });
    });
    const [character] = people;
    const result = await api.getSpecies(character.films);
    expect(result).toEqual(expectedComplement);
  });

  test('getPlanets()', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: complement
      });
    });
    const [character] = people;
    const result = await api.getPlanets(character.films);
    expect(result).toEqual(expectedComplement);
  });

  test('getAllComplements()', async () => {
    const expectedResult = {
      films: expectedComplement,
      homeworld: expectedComplement,
      species: expectedComplement,
      vehicles: {}
    };
    moxios.wait(() => {
      const count = moxios.requests.count();
      for (let index = 0; index < count; index++) {
        const request = moxios.requests.at(index);
        request.respondWith({
          status: 200,
          response: complement
        });
      }
    });
    const complements = {
      species: ['https://swapi.co/api/species/2/'],
      vehicles: [],
      homeworld: ['https://swapi.co/api/planets/8/'],
      films: ['https://swapi.co/api/films/2/']
    };
    const result = await api.getAllComplements(complements);
    expect(result).toEqual(expectedResult);
  });

  test('getPlayers()', () => {
    expect(api.getPlayers()).toEqual([]);
  });

  test('setPlayer()', () => {
    api.savePlayer(user);
    expect(api.getPlayers()).toEqual([user]);
  });
});
