import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '../../../src/components/checkbox/checkbox';

const wrapper = shallow(<Checkbox>My Checkbox label</Checkbox>);

describe('Checkbox', () => {
  it('Should render an radio-button type input with the correct class', () => {
    expect(wrapper.find('input').exists()).toBeTruthy();
    expect(wrapper.find('.checkbox__input').exists()).toBeTruthy();
  });
});
