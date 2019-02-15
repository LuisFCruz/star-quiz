import React from 'react';
import { Button } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';

import { Pagination } from './Pagination';

describe('<Pagination />', () => {
  const props = {};
  const shallow = createShallow();
  const wrapper = shallow(<Pagination {...props} />);
  const component = wrapper.instance();

  test('smoke test', () => {
    expect(Pagination).toBeDefined();
    expect(component).toBeInstanceOf(Pagination);
  });

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should have call handleClickPrev()', () => {    
    const handleSpy = jest.fn();
    component.handleClickPrev = handleSpy;
    component.forceUpdate();

    const button = wrapper.find(Button).first();
    expect(button).toHaveLength(1);

    button.simulate('click');
    expect(handleSpy).toHaveBeenCalled();
  });

  test('should have call handleClickNext()', () => {    
    const handleSpy = jest.fn();
    component.handleClickNext = handleSpy;
    component.forceUpdate();

    const button = wrapper.find(Button).last();
    expect(button).toHaveLength(1);

    button.simulate('click');
    expect(handleSpy).toHaveBeenCalled();
  });
});
