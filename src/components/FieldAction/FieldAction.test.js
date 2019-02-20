import React from 'react';
import { shallow } from 'enzyme';

import { FieldAction } from './FieldAction';

describe('<FieldAction />', () => {
  let component;
  let wrapper;
  let props;
  
  beforeEach(() => {
    props = {
      classes: {
        button: 'button',
      },
      onConfirm: jest.fn()
    };
    wrapper = shallow(<FieldAction {...props} />);
    component  = wrapper.instance();
  });
  
  test('smoke test', () => {
    expect(FieldAction).toBeDefined();
    expect(component).toBeInstanceOf(FieldAction);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should have call handleChange()', () => {
    const handleSpy = jest.fn();
    component.handleChange = handleSpy;
    component.forceUpdate();

    const input = wrapper.find('TextField');
    expect(input).toHaveLength(1);
    input.simulate('change', { target: { value: 'value changed'  } });
    expect(handleSpy).toHaveBeenCalled();
  });

  test('should have changed value', () => {
    component.handleChange({ target:  { } });
    expect(wrapper.state('value')).toBe('');

    component.handleChange({ target:  { value: 'value changed'  } });
    expect(wrapper.state('value')).toBe('value changed');
  });
  
  test('should have call handleConfirmClick()', () => {    
    const handleSpy = jest.fn();
    component.handleConfirmClick = handleSpy;
    component.forceUpdate();

    const button = wrapper.find('.button');
    
    expect(button).toHaveLength(1);
    button.simulate('click');
    expect(handleSpy).toHaveBeenCalled();
  });

  test('should have confirm change', () => {
    component.handleConfirmClick();
    expect(component.props.onConfirm).toHaveBeenCalledTimes(1);
  });
});
