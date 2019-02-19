import { shallow } from 'enzyme';
import React from 'react';

import { Home } from './Home';

describe('<Home />', () => {
  const props = { classes: {} };
  const wrapper = shallow(<Home {...props} />);

  test('Smoke test', () => {
    expect(Home).toBeDefined();
    expect(wrapper.instance()).toBeInstanceOf(Home);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
