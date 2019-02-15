import React from 'react';
import { shallow } from 'enzyme';

import CardCharacter from './CardCharacter';
import { Button } from '@material-ui/core';

describe('<CardCharacter />', () => {
  const props = {};
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
