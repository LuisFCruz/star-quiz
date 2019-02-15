import {
  reduceComplementsCharacter,
  mergeCharacterWidthComplements
} from './utils';

const characters = [
  {
    url: 'starwars/1',
    name: 'r2-d2',
    height: '187',
    hair_color: 'n/a',
    films: ['starwars/1'],
    species: ['starwars/1'],
    homeworld: 'starwars/1',
    vehicles: ['starwars/1']
  }
];

const complementValue = { '1': 'name' };

const complements = {
  films: complementValue,
  species: complementValue,
  homeworld: complementValue,
  vehicles: complementValue
};

describe('utils', () => {

  describe(('reduceComplementsCharacter'), () => {

    test('smoke test', () => {
      expect(reduceComplementsCharacter).toBeDefined();
    });

    test('reduceComplementsCharacter()', () => {
      const starwars = ['starwars/1'];
      const match = {
        films: starwars,
        species: starwars,
        homeworld: starwars,
        vehicles: starwars
      };
      const result = reduceComplementsCharacter(characters);
      expect(result).toMatchObject(match);
    });
  });

  describe('mergeCharacterWidthComplements', () => {
    let localCharacters;

    beforeEach(() => {
      localCharacters = [...characters];
    });

    test('smoke test', () => {
      expect(mergeCharacterWidthComplements).toBeDefined();
    });
    
    test('mergeCharacterWidthComplements() with vehicle', () => {
      const match = [
        {
          answered: false,
          films: 'name',
          hairColor: 'n/a',
          height: '187',
          helped: false,
          homeworld: 'name',
          id: '1',
          name: 'r2-d2',
          species: 'name',
          vehicles: 'name'
        }
      ];
      const result = mergeCharacterWidthComplements(localCharacters, complements);
      expect(result).toMatchObject(match);
    });

    test('mergeCharacterWidthComplements() without vehicle', () => {
      const match = [
        {
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
        }
      ];
      const [ character ] = localCharacters;
      const result = mergeCharacterWidthComplements([{ ...character, vehicles: [] }], complements);
      expect(result).toMatchObject(match);
    });
  });
});
