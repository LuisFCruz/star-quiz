import { render } from 'enzyme';
import React from 'react';

import { Modal } from './Modal';


describe('<Modal />', () => {
  const character = {
      id: '1',
      height: '178',
      hairColor: 'red',
      films: 'star wars',
      species: 'human',
      homeworld: 'earth',
      vehicles: 'car',
  };
  const props = { character, classes: {} };
  const wrapper = render(<Modal { ...props } />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
