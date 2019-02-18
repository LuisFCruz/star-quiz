import { shallow } from 'enzyme';
import React from 'react';
import CardCharacter from './CardCharacter';

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

describe('<CardCharacter />', () => {
  const props = {
    character,
    finished: false,
    updateCharacters: jest.fn(),
    selectCharacter: jest.fn(),
    sumScore: jest.fn(),
  };
  const wrapper = shallow(<CardCharacter {...props} />);
  const component = wrapper.instance();

  test('smoke test', () => {
    expect(CardCharacter).toBeDefined();
    expect(component).toBeInstanceOf(CardCharacter);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
