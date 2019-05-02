import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../src/components/spinner/spinner';

const wrapper = shallow(<Spinner />);

describe('Spinner', () => {
  it('Should render a small version of the Spinner by default', () => {
    expect(wrapper.find('onlyUpdateForKeys(Loader)').exists()).toBeTruthy();
    const wrapperProps = wrapper.props();
    expect(wrapperProps.size).toEqual(8);
    expect(wrapperProps.sizeUnit).toEqual('px');
  });

  it('Should render a big Spinner if "isBig"', () => {
    wrapper.setProps({ isBig: true });
    const wrapperProps = wrapper.props();
    expect(wrapperProps.size).toEqual(1.1);
    expect(wrapperProps.sizeUnit).toEqual('rem');
  });
});
