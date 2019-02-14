import React from 'react';
import { shallow } from 'enzyme';

import { Timer } from './Timer';

describe('<Timer />', () => {
  const props = {
    classes: {},
    duration: 120,
    start: false,
  };
  const wrapper = shallow(<Timer {...props} />);

  test('smoke test', () => {
    expect(Timer).toBeDefined();
    expect(wrapper.instance()).toBeInstanceOf(Timer);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should transform seconds to minutes ', () => {
    expect(wrapper.instance().secondsToMinutes).toBeDefined();
    const minutes = wrapper.instance().secondsToMinutes(60);
    expect(minutes).toBe('01:00');
  }); 

  test('should have set timer', () => {
    const seconds = 115;
    const component =  wrapper.instance();

    expect(component.setSecondsRemaining).toBeDefined();

    component.setSecondsRemaining(seconds);

    expect(wrapper.state('stopwatch')).toBe('01:55');
    expect(wrapper.state('secondsRemaining')).toBe(seconds);
  });

  test('should have call action finishGame()', () => {
    //Implementar quando estudar testes de ações do redux
  });
});
