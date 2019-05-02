import React from 'react';
import { shallow } from 'enzyme';
import RadioButton from '../../../src/components/radio/radio-button';

const wrapper = shallow(<RadioButton id="my-id" groupName="group-name" checked />);

describe('RadioButton', () => {
  it('Should render an radio-button type input with the correct class', () => {
    expect(wrapper.find('input').exists()).toBeTruthy();
    expect(wrapper.find('.radio-input').exists()).toBeTruthy();
  });
});
