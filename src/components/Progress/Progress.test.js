import React from 'react';
import { shallow } from 'enzyme';

import { Progress } from './Progress';

describe('<Progress />', () => {
  const props = {};
  const wrapper = shallow(<Progress {...props} />);

  test('smoke test', () => {
      expect(Progress).toBeDefined();
      expect(wrapper.instance()).toBeInstanceOf(Progress);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
