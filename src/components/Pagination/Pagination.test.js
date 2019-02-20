import React from 'react';
import { Button } from '@material-ui/core';

import { Pagination } from './Pagination';
import { shallow } from 'enzyme';

describe('<Pagination />', () => {
  let wrapper;
  let component;

  beforeEach(() => {
    const props = { page: 1, changePage: jest.fn() };
    wrapper = shallow(<Pagination {...props} />);
    component = wrapper.instance();
  });

  test('smoke test', () => {
    expect(Pagination).toBeDefined();
    expect(component).toBeInstanceOf(Pagination);
  });

  describe('render', () => {
    test('should render without disabled', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('should render with disabled', () => {
      const props = {
        page: 2,
        disabled: true,
        changePage: jest.fn()
      };
      const localWrapper = shallow(<Pagination {...props} />);
      expect(localWrapper).toMatchSnapshot();
    });
  });

  describe('handleClickPrev()', () => {
    test('should have call handleClickPrev()', () => {
      const handleSpy = jest.fn();
      component.handleClickPrev = handleSpy;
      component.forceUpdate();

      const button = wrapper.find(Button).first();
      expect(button).toHaveLength(1);

      button.simulate('click');
      expect(handleSpy).toHaveBeenCalled();
    });

    test('should have call changePage', () => {
      component.handleClickPrev();
      expect(component.props.changePage).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleClickNext()', () => {
    test('should have call handleClickNext()', () => {
      const handleSpy = jest.fn();
      component.handleClickNext = handleSpy;
      component.forceUpdate();

      const button = wrapper.find(Button).last();
      expect(button).toHaveLength(1);

      button.simulate('click');
      expect(handleSpy).toHaveBeenCalled();
    });

    test('should have call changePage', () => {
      component.handleClickNext();
      expect(component.props.changePage).toHaveBeenCalledTimes(1);
    });
  });
});
