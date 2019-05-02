import React from 'react';
import { shallow } from 'enzyme';
import DropdownConfig, { DropdownIndicator } from '../../../src/components/dropdown-config/dropdown-config';

let wrapper;

describe('DropdownConfig', () => {
  it('Should render the dropdown', () => {
    wrapper = shallow(
      <DropdownConfig
        entry={[{ name: 'option1' }]}
        selectName="Select an option"
        onChangeOptions={jest.fn()}
        identifier="id"
        placeholder="Enter here"
      />,
    );
    expect(wrapper.dive().find('Select').exists()).toBeTruthy();
  });

  describe('Custom DropdownIndicator', () => {
    beforeAll(() => {
      wrapper = shallow(<DropdownIndicator selectProps={{ menuIsOpen: false }} />);
    });

    it('Should include the custom DropdownIndicator component', () => {
      expect(wrapper.find('.dropdown-custom-indicator').exists()).toBeTruthy();
    });

    it('Should add the "is-open" class if menuIsOpen', () => {
      wrapper.setProps({ selectProps: { menuIsOpen: true } });
      expect(wrapper.find('.dropdown-menu-is-open').exists()).toBeTruthy();
    });
  });
});
