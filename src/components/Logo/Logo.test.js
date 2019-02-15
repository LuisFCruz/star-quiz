import React from 'react';
import renderer from 'react-test-renderer';

import { Logo } from './Logo';

describe('<Logo />', () => {
  
  test('render without className', () => {
    const props = {
      image: 'http://star-wars.com/image.jpg',
    };
    const wrapper = renderer.create(<Logo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('render with className', () => {
    const props = {
      image: 'http://star-wars.com/image.jpg',
      className: 'something'
    };
    const wrapper = renderer.create(<Logo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
