import React from 'react'
import renderer from 'react-test-renderer'

import { Avatar } from './Avatar'

describe('<Avatar />', () => {
  const defaultProps = { id: '1', className: ''};
  const wrapper = renderer.create(<Avatar { ...defaultProps } />).toJSON();
  
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
