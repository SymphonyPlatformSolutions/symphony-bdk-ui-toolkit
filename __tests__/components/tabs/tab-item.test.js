import React from 'react';
import { shallow } from 'enzyme';
import TabItem from '../../../src/components/tabs/tab-item';

let wrapper;
const MockItem = () => (<div>Test</div>);

beforeEach(() => {
  wrapper = shallow(
    <TabItem title="DIRECT CHAT">
      <MockItem />
    </TabItem>,
  );
});

describe('A TabItem component as children for Tabs Component', () => {
  it('Should have a Component as children to render a tab content', () => {
    expect(wrapper.find(MockItem)).toHaveLength(1);
  });
});
