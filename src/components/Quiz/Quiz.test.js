import { shallow } from 'enzyme';
import React from 'react';

import Quiz from './Quiz';

describe('<Quiz />', () => {
  const props = {};
  const wrapper = shallow(<Quiz {...props} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
