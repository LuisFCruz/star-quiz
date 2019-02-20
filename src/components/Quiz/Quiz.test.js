import { shallow } from 'enzyme';
import React from 'react';

import { Quiz } from './Quiz';

describe('<Quiz />', () => {
  let wrapper;
  let component;

  beforeEach(() => {
    const props = {
      classes: {},
      maxPage: 3,
      finished: false,
      fetchCharacters: jest.fn(),
      startTimer: jest.fn()
    };
    wrapper = shallow(<Quiz {...props} />);
    component = wrapper.instance();
  });

  test('smoke test', () => {
    expect(Quiz).toBeDefined();
    expect(component).toBeInstanceOf(Quiz);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should have call fetchCharacters() and startTimer()', () => {
    expect(component.props.fetchCharacters).toHaveBeenCalledTimes(1);
    expect(component.props.startTimer).toHaveBeenCalledTimes(1);
  });

  test('should not have call fetchCharacters() and startTimer()', () => {
    const props = {
      classes: {},
      maxPage: 3,
      finished: false,
      fetchCharacters: jest.fn().mockRejectedValue(''),
      startTimer: jest.fn()
    };
    const localWrapper = shallow(<Quiz {...props} />);
    const localComponent = localWrapper.instance();

    expect(localComponent.props.fetchCharacters).toHaveBeenCalledTimes(1);
    expect(localComponent.props.startTimer).toHaveBeenCalledTimes(0);
  });
});
