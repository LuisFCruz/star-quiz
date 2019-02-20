import { shallow } from 'enzyme';
import React from 'react';

import { Modal } from './Modal';
import { Button } from '@material-ui/core';


describe('<Modal />', () => {
  let wrapper;
  let component;
  const character = {
      id: '1',
      height: '178',
      hairColor: 'red',
      films: 'star wars',
      species: 'human',
      homeworld: 'earth',
      vehicles: 'car',
  };
  beforeEach(() => {
    const props = {
      character,
      classes: {},
      selectCharacter: jest.fn()
    };
    wrapper = shallow(<Modal { ...props } />);
    component = wrapper.instance();
  });

  test('render with character', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('render without character', () => {
    const props = { character: null, classes: {} };
    const localWrapper = shallow(<Modal { ...props } />);
    expect(localWrapper).toMatchSnapshot();
  });

  test('should have call handleClose()', () => {
    const handleSpy = jest.fn();
    component.handleClose = handleSpy;
    component.forceUpdate();

    const button = wrapper.find(Button);
    expect(button).toHaveLength(1);
    button.simulate('click');
    expect(handleSpy).toHaveBeenCalled();
  });
  
  test('should have call selectCharacter()', () => {
    component.handleClose();
    expect(component.props.selectCharacter).toHaveBeenCalledTimes(1);
  });
});
