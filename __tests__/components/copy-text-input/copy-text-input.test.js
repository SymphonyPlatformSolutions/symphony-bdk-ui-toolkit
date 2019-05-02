import React from 'react';
import { shallow, mount } from 'enzyme';
import CopyTextInput from '../../../src/components/copy-text-input/copy-text-input';

const mockText = 'Text Input';
const wrapper = shallow(<CopyTextInput>{mockText}</CopyTextInput>);

describe('CopyTextInput', () => {
  it('Should render the two main components', () => {
    expect(wrapper.find('TextInput')).toHaveLength(1);
    expect(wrapper.find('CopyToClipboard')).toHaveLength(1);
  });

  it('Should add the class to copy-coin when activated', () => {
    const mounted = mount(<CopyTextInput>{mockText}</CopyTextInput>);
    mounted.instance().activateCoin();
    expect(mounted.instance().copyCoin.classList[1]).toEqual('begin');
  });
});
