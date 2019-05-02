import React from 'react';
import { shallow } from 'enzyme';
import Tabs from '.../../../src/components/tabs/tabs';
import Tab from '../../../src/components/tabs/tab';

let wrapper;
const MockTabItem = () => (<div>Test</div>);

beforeEach(() => {
  wrapper = shallow(
    <Tabs direction="center">
      <MockTabItem title="DIRECT CHAT" />
      <MockTabItem title="ROOMS CHAT" />
    </Tabs>,
  );
});

describe('A wrapper which handle the Tab component', () => {
  it('Should render a Tab as child component', () => {
    expect(wrapper.find(Tab)).toHaveLength(2);
  });

  it('Should call changeTab upon tab changed', () => {
    const mockTab = 'ROOMS CHAT';
    wrapper.instance().changeTab(mockTab);
    expect(wrapper.state().activeTab).toEqual('ROOMS CHAT');
  });
});
