import React from 'react';
import { shallow } from 'enzyme';

import { Timer } from './Timer';


describe('<Timer />', () => {
  let wrapper;
  let component;
  
  beforeEach(() => {
    const props = {
      classes: {},
      duration: 120,
      start: false,
      finishGame: jest.fn(),
    };

    jest.useFakeTimers();

    wrapper = shallow(<Timer {...props} />);
    component =  wrapper.instance();
  });

  test('smoke test', () => {
    expect(Timer).toBeDefined();
    expect(component).toBeInstanceOf(Timer);
  });

  describe('render', () => {
  
    test('without started timer', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('with started timer', () => {
      const props = {
        classes: {},
        duration: 120,
        start: true,
        finishGame: jest.fn(),
      };
      const localWrapper = shallow(<Timer {...props} />);
      expect(localWrapper).toMatchSnapshot();
    });
  });
  


  test('should transform seconds to minutes ', () => {
    expect(wrapper.instance().secondsToMinutes).toBeDefined();
    const minutes = wrapper.instance().secondsToMinutes(600);
    expect(minutes).toBe('10:00');
  }); 

  test('should have set timer', () => {
    const seconds = 115;

    expect(component.setSecondsRemaining).toBeDefined();

    component.setSecondsRemaining(seconds);

    expect(wrapper.state('stopwatch')).toBe('01:55');
    expect(wrapper.state('secondsRemaining')).toBe(seconds);
  });

  test('should have call action finishGame()', () => {
    const seconds = 0;

    component.setSecondsRemaining(seconds);

    expect(wrapper.state('stopwatch')).toBe('00:00');
    expect(component.props.finishGame).toHaveBeenCalledTimes(1);
  });

  test('should have initilized a timer', () => {
    component.startCountDown();
    jest.runAllTimers();
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  test('should not have call setInterval()', () => {
    component.interval = 1;
    component.startCountDown();
    jest.runAllTimers();
    expect(setInterval).toHaveBeenCalledTimes(0);
  });

  test('unmount', () => {
    component.interval = 1;
    jest.runAllTimers();
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
});
