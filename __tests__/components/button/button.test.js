import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../src/components/button/button';

let wrapper;
const onClick = jest.fn();
const MockedSpinner = () => 'spinner';

beforeEach(() => {
  wrapper = shallow(
    <Button
      type="raised"
      color="primary"
      onClick={onClick}
      disable={false}
      isLoading={false}
      loadingComponent={<MockedSpinner />}
    >Save
    </Button>,
  );
});


describe('Button', () => {
  it('Should render a button with the correct CSS classes', () => {
    const buttonElement = wrapper.find('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.text()).toEqual('Save');
    expect(buttonElement.hasClass('btn-raised--primary')).toBeTruthy();
  });

  it('Should render a disabled button when receive "disable" props', () => {
    wrapper.setProps({ disable: true });
    expect(wrapper.find('.btn.btn-raised--disable').exists()).toBeTruthy();
  });

  it('Should call onClick upon button press', () => {
    wrapper.find('button').simulate('click', { stopPropagation() {} });
    expect(onClick).toHaveBeenCalled();
  });

  it('Should hide button text when button is loading', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('.button-text--hide').exists()).toBeTruthy();
  });

  it('Should show loading component when button is loading', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('MockedSpinner').exists()).toBeTruthy();
  });
});
