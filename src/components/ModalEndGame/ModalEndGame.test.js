import React from 'react';
import { shallow } from 'enzyme';
import { Input, Button } from '@material-ui/core';

import { ModalEndGame } from './ModalEndGame';

describe('<ModalEndGame />', () => {
  const props = {
		classes: {},
		finished: false,
	};
 let wrapper;
 let component;
 
	beforeEach(() => {
		wrapper = shallow(<ModalEndGame {...props} />);
		component = wrapper.instance();
	});

	test('smoke test', () => {
		expect(ModalEndGame).toBeDefined();
		expect(component).toBeInstanceOf(ModalEndGame);
	});

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
	});

	test('should have call setName() on input changed', () => {
		const handleSpy = jest.fn();
    component.setName = handleSpy;
    component.forceUpdate();

    const inputs = wrapper.find(Input);
		expect(inputs).toHaveLength(2);

    inputs.first().simulate('change', { target: { value: 'value changed'  } });
    expect(handleSpy).toHaveBeenCalled();
	});
	
	test('should have set name in state', () => {
		component.setName({ target: { value: 'User' } });
		expect(wrapper.state('name')).toBe('User');
	});

	test('should have call setEmail() on input changed', () => {
		const handleSpy = jest.fn();
    component.setEmail = handleSpy;
    component.forceUpdate();

    const inputs = wrapper.find(Input);
		expect(inputs).toHaveLength(2);

    inputs.last().simulate('change', { target: { value: 'value changed'  } });
    expect(handleSpy).toHaveBeenCalled();
	});

	test('should have set email in state', () => {
		component.setEmail({ target: { value: 'user@user.com' } });
		expect(wrapper.state('email')).toBe('user@user.com');
	});

	test('should have call handleClose() on click in close button', () => {
		const handleSpy = jest.fn();
    component.handleClose = handleSpy;
    component.forceUpdate();

    const buttons = wrapper.find(Button);
		expect(buttons).toHaveLength(2);

    buttons.first().simulate('click');
    expect(handleSpy).toHaveBeenCalled();
	});

	test('should have set open in state', () => {
		component.handleClose();
		expect(wrapper.state('open')).toBeFalsy();
	});

	test('should have call handleConfirm() on click in save button', () => {
		const handleSpy = jest.fn();
    component.handleConfirm = handleSpy;
    component.forceUpdate();

    const buttons = wrapper.find(Button);
		expect(buttons).toHaveLength(2);

    buttons.last().simulate('click');
    expect(handleSpy).toHaveBeenCalled();
	});
});
