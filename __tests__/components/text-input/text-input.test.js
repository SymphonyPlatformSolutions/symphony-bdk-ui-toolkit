import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../../../src/components/text-input/text-input';

const wrapper = shallow(<TextInput />);

describe('TextInput', () => {
  it('Should render an input with the correct class', () => {
    expect(wrapper.find('input').exists()).toBeTruthy();
    expect(wrapper.find('input').hasClass('default-input')).toBeTruthy();
  });
});
