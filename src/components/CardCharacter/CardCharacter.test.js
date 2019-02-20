import { Button } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';

import { CardCharacter } from './CardCharacter';
import { FieldAction } from '../FieldAction/FieldAction';

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
  let wrapper;
  let component;
  
  beforeEach(() => {
    const props = {
      character,
      finished: false,
      updateCharacters: jest.fn(),
      selectCharacter: jest.fn(),
      sumScore: jest.fn()
    };
    wrapper = shallow(<CardCharacter {...props} />);
    component = wrapper.instance();
  });

  test('smoke test', () => {
    expect(CardCharacter).toBeDefined();
    expect(component).toBeInstanceOf(CardCharacter);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should have call handleReplyClick()', () => {
    const handleSpy = jest.fn();
    component.handleReplyClick = handleSpy;
    component.forceUpdate();

    const button = wrapper.find(Button);

    expect(button).toHaveLength(2);
    button.first().simulate('click');
    expect(handleSpy).toHaveBeenCalled();
  });

  test('should have changed reply value', () => {
    component.handleReplyClick();
    expect(wrapper.state('reply')).toBeTruthy();
  });

  test('should have call handleHelpClick()', () => {
    const handleSpy = jest.fn();
    component.handleHelpClick = handleSpy;
    component.forceUpdate();

    const button = wrapper.find(Button);

    expect(button).toHaveLength(2);
    button.last().simulate('click');
    expect(handleSpy).toHaveBeenCalled();
  });

  test('should have call updateCharacters() and selectCharacter()', () => {
    component.handleHelpClick();
    expect(component.props.updateCharacters).toHaveBeenCalledTimes(1);
    expect(component.props.selectCharacter).toHaveBeenCalledTimes(1);
  });

  test('should have call updateCharacters() and sumScore()', () => {
    component.handleConfirm(character.name);
    expect(component.props.updateCharacters).toHaveBeenCalledTimes(1);
    expect(component.props.sumScore).toHaveBeenCalledTimes(1);
  });

  test('should not have call updateCharacters() and sumScore()', () => {
    component.handleConfirm();
    expect(component.props.updateCharacters).toHaveBeenCalledTimes(0);
    expect(component.props.sumScore).toHaveBeenCalledTimes(0);
    expect(wrapper.state('reply')).toBeFalsy();
  });
});
