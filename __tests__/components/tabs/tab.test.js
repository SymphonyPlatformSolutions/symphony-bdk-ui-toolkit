import React from 'react';
import { shallow } from 'enzyme';
import Tab from '../../../src/components/tabs/tab';

let wrapper;
const changeTab = jest.fn();

beforeEach(() => {
  wrapper = shallow(
    <Tab
      title="NEW TAB"
      changeTab={changeTab}
      activeTab="OTHER TAB"
    />,
  );
});

describe('A tab component', () => {
  it('Should a tab title when Tabs are rendered', () => {
    expect(wrapper.text()).toEqual('NEW TAB');
  });

  it('Should render just "tab__item tab__item--active" when activeTab is not equal to title', () => {
    wrapper.setProps({ activeTab: 'NEW TAB' });
    expect(wrapper.find('.tab__item.tab__item--active').exists()).toBeTruthy();
  });

  it('Should call changeTab upon click on tab', () => {
    wrapper.find('li').simulate('click');
    expect(changeTab).toHaveBeenCalled();
  });
});
